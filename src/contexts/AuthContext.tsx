/**
 * Authentication Context
 * Manages user authentication state and provides auth methods
 */

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  updateProfile,
  sendEmailVerification
} from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  isGuestMode: boolean;
  signup: (email: string, password: string, displayName?: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  setGuestMode: (isGuest: boolean) => void;
  resendVerificationEmail: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGuestMode, setIsGuestMode] = useState(false);

  // Sign up with email and password
  async function signup(email: string, password: string, displayName?: string) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName && userCredential.user) {
      await updateProfile(userCredential.user, { displayName });
    }
    
    // Try to send email verification, but don't fail signup if it errors
    try {
      await sendEmailVerification(userCredential.user);
      console.log('Verification email sent successfully');
    } catch (emailError: any) {
      // Log the error but don't throw it
      console.error('Failed to send verification email:', emailError);
      console.error('Error code:', emailError.code);
      console.error('Error message:', emailError.message);
      
      // Account is still created, just couldn't send email
      // User can try resending from the banner later
    }
    
    setIsGuestMode(false);
  }

  // Login with email and password
  async function login(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password);
    setIsGuestMode(false);
  }

  // Login with Google
  async function loginWithGoogle() {
    await signInWithPopup(auth, googleProvider);
    setIsGuestMode(false);
  }

  // Logout
  async function logout() {
    await signOut(auth);
    setIsGuestMode(false);
  }

  // Set guest mode
  function setGuestMode(isGuest: boolean) {
    setIsGuestMode(isGuest);
  }

  // Resend verification email
  async function resendVerificationEmail() {
    if (!currentUser) {
      throw new Error('No user logged in');
    }
    
    if (currentUser.emailVerified) {
      throw new Error('Email is already verified');
    }
    
    try {
      await sendEmailVerification(currentUser);
      console.log('Verification email resent successfully');
    } catch (error: any) {
      console.error('Failed to resend verification email:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      
      // Throw a more user-friendly error
      if (error.code === 'auth/too-many-requests') {
        throw new Error('Too many requests. Please wait a few minutes before trying again.');
      } else if (error.code === 'auth/network-request-failed') {
        throw new Error('Network error. Please check your connection and try again.');
      } else {
        throw new Error('Failed to send verification email. Please try again later.');
      }
    }
  }

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    currentUser,
    loading,
    isGuestMode,
    signup,
    login,
    loginWithGoogle,
    logout,
    setGuestMode,
    resendVerificationEmail
  };

  // Only show loading screen on initial mount, not during transitions
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px',
        color: '#666'
      }}>
        Loading...
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
