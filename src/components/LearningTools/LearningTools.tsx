import { useState, useEffect } from 'react';
import { explainCode, CodeExplanation } from '../../utils/codeExplainer';
import { detectCommonMistakes, CommonMistake } from '../../utils/commonMistakes';
import {
  generateFlowchart,
  renderNodePath,
  renderConnection,
  Flowchart
} from '../../utils/flowchartGenerator';
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
  const [flowchart, setFlowchart] = useState<Flowchart | null>(null);

  useEffect(() => {
    if (code.trim()) {
      setExplanation(explainCode(code));
      setMistakes(detectCommonMistakes(code));
      setFlowchart(generateFlowchart(code));
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

          {activeTab === 'flowchart' && flowchart && (
            <div className={styles.flowchartView}>
              <div className={styles.flowchartContainer}>
                <div className={styles.flowchartLegend}>
                  <h4>IGCSE/A-LEVELS Flowchart Symbols:</h4>
                  <div className={styles.legendItems}>
                    <div className={styles.legendItem}>
                      <svg width="80" height="40" viewBox="0 0 80 40">
                        <path
                          d="M 20 5 L 60 5 A 15 15 0 0 1 60 35 L 20 35 A 15 15 0 0 1 20 5 Z"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                      <span>Start/End</span>
                    </div>
                    <div className={styles.legendItem}>
                      <svg width="80" height="40" viewBox="0 0 80 40">
                        <rect x="20" y="10" width="40" height="20" fill="none" stroke="currentColor" strokeWidth="2" />
                      </svg>
                      <span>Process</span>
                    </div>
                    <div className={styles.legendItem}>
                      <svg width="80" height="40" viewBox="0 0 80 40">
                        <path
                          d="M 25 10 L 55 10 L 50 30 L 20 30 Z"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                      <span>Input/Output</span>
                    </div>
                    <div className={styles.legendItem}>
                      <svg width="80" height="40" viewBox="0 0 80 40">
                        <path
                          d="M 40 5 L 65 20 L 40 35 L 15 20 Z"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                      <span>Decision</span>
                    </div>
                  </div>
                </div>

                <div className={styles.svgContainer}>
                  <svg
                    width={flowchart.width}
                    height={flowchart.height}
                    viewBox={`0 0 ${flowchart.width} ${flowchart.height}`}
                    className={styles.flowchartSvg}
                  >
                    {/* Render connections first (so they appear behind nodes) */}
                    <g className={styles.connections}>
                      {flowchart.connections.map((conn, index) => {
                        const path = renderConnection(conn, flowchart.nodes);
                        const fromNode = flowchart.nodes.find(n => n.id === conn.from);
                        const toNode = flowchart.nodes.find(n => n.id === conn.to);

                        if (!fromNode || !toNode) return null;

                        // Calculate label position for decision branches
                        let labelX = 0;
                        let labelY = 0;
                        if (conn.label) {
                          if (conn.fromSide === 'right') {
                            labelX = fromNode.x + fromNode.width + 10;
                            labelY = fromNode.y + fromNode.height / 2 - 5;
                          } else if (conn.fromSide === 'bottom') {
                            labelX = fromNode.x + fromNode.width / 2 + 10;
                            labelY = fromNode.y + fromNode.height + 20;
                          }
                        }

                        return (
                          <g key={index}>
                            <path
                              d={path}
                              fill="none"
                              stroke="var(--text-secondary)"
                              strokeWidth="2"
                              markerEnd="url(#arrowhead)"
                            />
                            {conn.label && (
                              <text
                                x={labelX}
                                y={labelY}
                                fontSize="12"
                                fontWeight="600"
                                fill="var(--primary-color)"
                              >
                                {conn.label}
                              </text>
                            )}
                          </g>
                        );
                      })}
                    </g>

                    {/* Render nodes */}
                    <g className={styles.nodes}>
                      {flowchart.nodes.map((node) => {
                        const path = renderNodePath(node);
                        const centerX = node.x + node.width / 2;
                        const centerY = node.y + node.height / 2;

                        // Different fill colors for different node types
                        let fillColor = 'var(--bg-tertiary)';
                        let strokeColor = 'var(--primary-color)';

                        if (node.type === 'start' || node.type === 'end') {
                          fillColor = 'var(--primary-color)';
                          strokeColor = 'var(--primary-color)';
                        } else if (node.type === 'decision') {
                          fillColor = 'rgba(255, 193, 7, 0.15)';
                          strokeColor = '#ffc107';
                        } else if (node.type === 'input' || node.type === 'output') {
                          fillColor = 'rgba(33, 150, 243, 0.15)';
                          strokeColor = '#2196f3';
                        }

                        return (
                          <g key={node.id}>
                            <path
                              d={path}
                              fill={fillColor}
                              stroke={strokeColor}
                              strokeWidth="2"
                            />
                            {/* Add double lines for procedure nodes */}
                            {node.type === 'procedure' && (
                              <>
                                <line
                                  x1={node.x + 10}
                                  y1={node.y}
                                  x2={node.x + 10}
                                  y2={node.y + node.height}
                                  stroke={strokeColor}
                                  strokeWidth="2"
                                />
                                <line
                                  x1={node.x + node.width - 10}
                                  y1={node.y}
                                  x2={node.x + node.width - 10}
                                  y2={node.y + node.height}
                                  stroke={strokeColor}
                                  strokeWidth="2"
                                />
                              </>
                            )}
                            {/* Node label */}
                            <text
                              x={centerX}
                              y={centerY}
                              textAnchor="middle"
                              dominantBaseline="middle"
                              fontSize="12"
                              fontWeight="600"
                              fill={node.type === 'start' || node.type === 'end' ? 'white' : 'var(--text-primary)'}
                              style={{ pointerEvents: 'none' }}
                            >
                              {/* Split long text into multiple lines */}
                              {node.label.length > 20 ? (
                                <>
                                  <tspan x={centerX} dy="-8">
                                    {node.label.substring(0, 20)}
                                  </tspan>
                                  <tspan x={centerX} dy="16">
                                    {node.label.substring(20)}
                                  </tspan>
                                </>
                              ) : (
                                node.label
                              )}
                            </text>
                          </g>
                        );
                      })}
                    </g>

                    {/* Arrow marker definition */}
                    <defs>
                      <marker
                        id="arrowhead"
                        markerWidth="10"
                        markerHeight="10"
                        refX="8"
                        refY="3"
                        orient="auto"
                      >
                        <polygon points="0 0, 10 3, 0 6" fill="var(--text-secondary)" />
                      </marker>
                    </defs>
                  </svg>
                </div>

                <div className={styles.flowchartNote}>
                  <strong>Note:</strong> This flowchart follows IGCSE/A-LEVELS standard symbols and conventions.
                  Arrows indicate the flow of execution through your program.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
