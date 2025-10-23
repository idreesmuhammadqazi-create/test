import { useState, useEffect } from 'react';
import { explainCode, CodeExplanation } from '../../utils/codeExplainer';
import { detectCommonMistakes, CommonMistake } from '../../utils/commonMistakes';
import styles from './LearningTools.module.css';

interface LearningToolsProps {
  code: string;
  onClose: () => void;
}

type TabType = 'explanation' | 'mistakes' | 'flowchart';

export default function LearningTools({ code, onClose }: LearningToolsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('explanation');
  const [explanation, setExplanation] = useState<CodeExplanation | null>(null);
  const [mistakes, setMistakes] = useState<CommonMistake[]>([]);

  useEffect(() => {
    if (code.trim()) {
      setExplanation(explainCode(code));
      setMistakes(detectCommonMistakes(code));
    }
  }, [code]);

  if (!code.trim()) {
    return (
      <div className={styles.overlay}>
        <div className={styles.panel}>
          <div className={styles.header}>
            <h2>Learning Tools</h2>
            <button className={styles.closeButton} onClick={onClose}>×</button>
          </div>
          <div className={styles.emptyState}>
            <p>Write some code first to analyze it!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.panel}>
        <div className={styles.header}>
          <h2>Learning Tools</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>

        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'explanation' ? styles.active : ''}`}
            onClick={() => setActiveTab('explanation')}
          >
            📖 Code Explanation
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'mistakes' ? styles.active : ''}`}
            onClick={() => setActiveTab('mistakes')}
          >
            ⚠️ Common Mistakes
            {mistakes.length > 0 && (
              <span className={styles.badge}>{mistakes.length}</span>
            )}
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'flowchart' ? styles.active : ''}`}
            onClick={() => setActiveTab('flowchart')}
          >
            📊 Flowchart
          </button>
        </div>

        <div className={styles.content}>
          {activeTab === 'explanation' && explanation && (
            <div className={styles.explanationView}>
              <section className={styles.section}>
                <h3>📝 Summary</h3>
                <p className={styles.summary}>{explanation.summary}</p>
              </section>

              <section className={styles.section}>
                <h3>🔍 Details</h3>
                <ul className={styles.detailsList}>
                  {explanation.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </section>

              <section className={styles.section}>
                <h3>⚡ Time Complexity</h3>
                <div className={styles.complexity}>
                  <code>{explanation.complexity}</code>
                </div>
                <p className={styles.complexityNote}>
                  This indicates how the program's execution time grows with input size.
                </p>
              </section>

              <section className={styles.section}>
                <h3>💡 Suggestions</h3>
                <ul className={styles.suggestionsList}>
                  {explanation.suggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </section>
            </div>
          )}

          {activeTab === 'mistakes' && (
            <div className={styles.mistakesView}>
              {mistakes.length === 0 ? (
                <div className={styles.noMistakes}>
                  <div className={styles.icon}>✅</div>
                  <h3>Great Job!</h3>
                  <p>No common mistakes detected in your code.</p>
                </div>
              ) : (
                <>
                  <p className={styles.mistakesIntro}>
                    Found {mistakes.length} potential issue{mistakes.length !== 1 ? 's' : ''} that students commonly make:
                  </p>
                  {mistakes.map((mistake, index) => (
                    <div
                      key={index}
                      className={`${styles.mistakeCard} ${
                        mistake.type === 'warning' ? styles.warning : styles.info
                      }`}
                    >
                      <div className={styles.mistakeHeader}>
                        <span className={styles.mistakeLine}>Line {mistake.line}</span>
                        <span className={styles.mistakeCategory}>{mistake.category}</span>
                      </div>
                      <div className={styles.mistakeMessage}>{mistake.message}</div>
                      <div className={styles.mistakeSuggestion}>
                        <strong>💡 Tip:</strong> {mistake.suggestion}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}

          {activeTab === 'flowchart' && (
            <div className={styles.flowchartView}>
              <div className={styles.flowchartPlaceholder}>
                <div className={styles.icon}>📊</div>
                <h3>Flowchart Visualization</h3>
                <p>Visual flowchart representation of your code structure:</p>

                <div className={styles.simpleFlow}>
                  <div className={styles.flowNode}>START</div>
                  {code.includes('DECLARE') && (
                    <div className={styles.flowNode}>Declare Variables</div>
                  )}
                  {code.includes('INPUT') && (
                    <div className={styles.flowNode}>Input Data</div>
                  )}
                  {(code.includes('FOR') || code.includes('WHILE') || code.includes('REPEAT')) && (
                    <div className={styles.flowNode}>Loop Processing</div>
                  )}
                  {code.includes('IF') && (
                    <div className={styles.flowNode}>Decision Making</div>
                  )}
                  {code.includes('FUNCTION') && (
                    <div className={styles.flowNode}>Function Calls</div>
                  )}
                  {code.includes('OUTPUT') && (
                    <div className={styles.flowNode}>Output Results</div>
                  )}
                  <div className={styles.flowNode}>END</div>
                </div>

                <p className={styles.flowNote}>
                  This is a simplified representation showing the main components of your program.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
