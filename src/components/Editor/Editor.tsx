import { useEffect, useRef } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap, placeholder, lineNumbers } from '@codemirror/view';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { syntaxHighlighting, HighlightStyle } from '@codemirror/language';
import { tags as t } from '@lezer/highlight';
import styles from './Editor.module.css';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

// Custom syntax highlighting for IGCSE/A-LEVELS pseudocode
const igcseHighlightStyle = HighlightStyle.define([
  { tag: t.keyword, color: '#0066cc', fontWeight: 'bold' },
  { tag: t.typeName, color: '#008800' },
  { tag: t.operator, color: '#cc6600' },
  { tag: t.comment, color: '#999999', fontStyle: 'italic' },
  { tag: t.string, color: '#cc0000' },
  { tag: t.number, color: '#9933cc' },
]);

export default function Editor({ value, onChange }: EditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  useEffect(() => {
    if (!editorRef.current) return;

    const startState = EditorState.create({
      doc: value,
      extensions: [
        lineNumbers(),
        history(),
        keymap.of([...defaultKeymap, ...historyKeymap]),
        placeholder('// Start typing your IGCSE/A-LEVELS pseudocode here'),
        syntaxHighlighting(igcseHighlightStyle),
        EditorView.lineWrapping,
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            const newValue = update.state.doc.toString();
            onChange(newValue);
          }
        }),
        EditorView.theme({
          '&': {
            height: '100%',
            fontSize: '14px',
            fontFamily: 'Consolas, Monaco, "Courier New", monospace',
          },
          '.cm-content': {
            fontFamily: 'Consolas, Monaco, "Courier New", monospace',
            padding: '10px 0',
          },
          '.cm-line': {
            padding: '0 8px',
            lineHeight: '1.5',
          },
          '.cm-gutters': {
            backgroundColor: '#f5f5f5',
            border: 'none',
          },
          '.cm-activeLineGutter': {
            backgroundColor: '#e0e0e0',
          },
        }),
      ],
    });

    const view = new EditorView({
      state: startState,
      parent: editorRef.current,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
    };
  }, []); // Only create once

  // Update content when value changes externally
  useEffect(() => {
    if (viewRef.current) {
      const currentValue = viewRef.current.state.doc.toString();
      if (currentValue !== value) {
        viewRef.current.dispatch({
          changes: {
            from: 0,
            to: currentValue.length,
            insert: value,
          },
        });
      }
    }
  }, [value]);

  return (
    <div className={styles.editorContainer}>
      <div ref={editorRef} className={styles.editor}></div>
    </div>
  );
}
