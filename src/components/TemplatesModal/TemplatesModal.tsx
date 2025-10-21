/**
 * Templates Modal Component
 * Browse and insert code templates
 */

import React, { useState } from 'react';
import { CODE_TEMPLATES, TEMPLATE_CATEGORIES, KEYBOARD_SHORTCUTS } from '../../constants/templates';
import styles from './TemplatesModal.module.css';

interface TemplatesModalProps {
  onInsert: (code: string) => void;
  onClose: () => void;
}

export const TemplatesModal: React.FC<TemplatesModalProps> = ({ onInsert, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(TEMPLATE_CATEGORIES[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showShortcuts, setShowShortcuts] = useState(false);

  const filteredTemplates = CODE_TEMPLATES.filter(template => {
    const matchesCategory = template.category === selectedCategory;
    const matchesSearch = searchQuery === '' ||
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleInsert = (code: string) => {
    onInsert(code);
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Code Templates</h2>
          <div className={styles.headerActions}>
            <button
              className={styles.shortcutsButton}
              onClick={() => setShowShortcuts(!showShortcuts)}
            >
              ⌨️ Shortcuts
            </button>
            <button className={styles.closeButton} onClick={onClose}>
              ×
            </button>
          </div>
        </div>

        {showShortcuts && (
          <div className={styles.shortcutsPanel}>
            <h3>Keyboard Shortcuts</h3>
            <div className={styles.shortcutsList}>
              {KEYBOARD_SHORTCUTS.map((shortcut, index) => (
                <div key={index} className={styles.shortcutItem}>
                  <span className={styles.shortcutKey}>{shortcut.key}</span>
                  <span className={styles.shortcutChar}>{shortcut.char}</span>
                  <span className={styles.shortcutName}>{shortcut.name}</span>
                </div>
              ))}
            </div>
            <p className={styles.shortcutNote}>
              Or use: <code>{'<-'}</code> for ←, <code>{'<='}</code> for ≤, <code>{'>='}</code> for ≥, <code>{'<>'}</code> for ≠
            </p>
          </div>
        )}

        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.content}>
          <div className={styles.sidebar}>
            <h3 className={styles.sidebarTitle}>Categories</h3>
            {TEMPLATE_CATEGORIES.map(category => {
              const count = CODE_TEMPLATES.filter(t => t.category === category).length;
              return (
                <button
                  key={category}
                  className={`${styles.categoryButton} ${selectedCategory === category ? styles.active : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                  <span className={styles.count}>{count}</span>
                </button>
              );
            })}
          </div>

          <div className={styles.templates}>
            {filteredTemplates.length === 0 ? (
              <div className={styles.emptyState}>
                <p>No templates found</p>
                <p className={styles.emptyHint}>Try a different category or search term</p>
              </div>
            ) : (
              filteredTemplates.map(template => (
                <div key={template.id} className={styles.templateCard}>
                  <div className={styles.templateHeader}>
                    <h4 className={styles.templateName}>{template.name}</h4>
                    <button
                      className={styles.insertButton}
                      onClick={() => handleInsert(template.code)}
                    >
                      Insert
                    </button>
                  </div>
                  <p className={styles.templateDescription}>{template.description}</p>
                  <pre className={styles.templatePreview}>
                    {template.code.split('\n').slice(0, 5).join('\n')}
                    {template.code.split('\n').length > 5 ? '\n...' : ''}
                  </pre>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
