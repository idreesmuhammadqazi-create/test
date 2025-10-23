import { useState, useEffect } from 'react';
import { explainCode, CodeExplanation } from '../../utils/codeExplainer';
import { detectCommonMistakes, CommonMistake } from '../../utils/commonMistakes';
import { generateTraceTable, TraceTable } from '../../utils/traceTableGenerator';
import styles from './LearningTools.module.css';

interface LearningToolsProps {
  code: string;
  onClose: () => void;
}

type TabType = 'explanation' | 'mistakes' | 'tracetable';

export default function LearningTools({ code, onClose }: LearningToolsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('explanation');
  const [explanation, setExplanation] = useState<CodeExplanation | null>(null);
  const [mistakes, setMistakes] = useState<CommonMistake[]>([]);
  const [traceTable, setTraceTable] = useState<TraceTable | null>(null);

  useEffect(() => {
    if (code.trim()) {
      setExplanation(explainCode(code));
      setMistakes(detectCommonMistakes(code));
      setTraceTable(generateTraceTable(code));
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
            className={`${styles.tab} ${activeTab === 'tracetable' ? styles.active : ''}`}
            onClick={() => setActiveTab('tracetable')}
          >
            📋 Trace Table
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

          {activeTab === 'tracetable' && traceTable && (
            <div className={styles.traceTableView}>
              <div className={styles.traceTableHeader}>
                <h3>📋 Trace Table - Step-by-Step Execution</h3>
                <p className={styles.traceTableDescription}>
                  This table shows how variables change as your program executes. 
                  Each row represents a step in the execution. '?' means the variable is declared but not assigned yet.
                </p>
              </div>

              {traceTable.rows.length === 0 ? (
                <div className={styles.noTraceData}>
                  <div className={styles.icon}>📋</div>
                  <p>No trace data available. Make sure your code declares variables and performs operations.</p>
                </div>
              ) : (
                <div className={styles.tableContainer}>
                  <table className={styles.traceTable}>
                    <thead>
                      <tr>
                        <th className={styles.stepColumn}>Step</th>
                        <th className={styles.lineColumn}>Line</th>
                        <th className={styles.statementColumn}>Statement</th>
                        {traceTable.variables.map((varName) => (
                          <th key={varName} className={styles.variableColumn}>{varName}</th>
                        ))}
                        {traceTable.hasOutput && (
                          <th className={styles.outputColumn}>Output</th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {traceTable.rows.map((row) => (
                        <tr key={row.step}>
                          <td className={styles.stepCell}>{row.step}</td>
                          <td className={styles.lineCell}>{row.line}</td>
                          <td className={styles.statementCell}>
                            <code>{row.statement}</code>
                          </td>
                          {traceTable.variables.map((varName) => (
                            <td key={varName} className={styles.variableCell}>
                              {row.variables[varName] || ''}
                            </td>
                          ))}
                          {traceTable.hasOutput && (
                            <td className={styles.outputCell}>
                              {row.output || ''}
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className={styles.traceTableNote}>
                <strong>Note:</strong> This is a simulated execution with example input values. 
                Actual execution may vary based on real input values. 
                Complex loops and conditions are simplified for clarity.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
