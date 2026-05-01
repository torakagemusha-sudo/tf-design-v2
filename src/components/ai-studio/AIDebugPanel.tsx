/**
 * ============================================================================
 * Torafirma Design System — AIDebugPanel
 * ============================================================================
 * AI-Assisted Studio component — AI DebugPanel.
 *
 * @module   ai-studio/AIDebugPanel
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';

/** Props for the AIDebugPanel component */
export interface AIDebugPanelProps {
  logs: { timestamp: Date; level: 'debug' | 'info' | 'warn' | 'error'; message: string; metadata?: Record<string, unknown> }[];
  onClear: () => void;
  onExport: () => void;
  filterLevel?: string;
}

/**
 * AIDebugPanel
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AIDebugPanel: React.FC<AIDebugPanelProps> = ({
  logs,
  onClear,
  onExport,
  filterLevel,
}) => {
  const [expandedLog, setExpandedLog] = React.useState<string | null>(null);
  const filtered = filterLevel ? logs.filter((l) => l.level === filterLevel) : logs;

  return (
    <div className="tf-ai-debug-panel">
      <div className="tf-ai-debug-panel__header">
        <h4 className="tf-ai-debug-panel__title">Debug / Trace</h4>
        <div className="tf-ai-debug-panel__actions">
          <button className="tf-ai-debug-panel__btn" onClick={onClear} type="button">Clear</button>
          <button className="tf-ai-debug-panel__btn" onClick={onExport} type="button">Export</button>
        </div>
      </div>
      <div className="tf-ai-debug-panel__logs">
        {filtered.length === 0 ? (
          <p className="tf-ai-debug-panel__empty">No logs</p>
        ) : (
          filtered.map((log, i) => (
            <div
              key={i}
              className={`tf-ai-debug-panel__log tf-ai-debug-panel__log--${log.level}`}
              onClick={() => setExpandedLog(expandedLog === String(i) ? null : String(i))}
              role="button"
              tabIndex={0}
            >
              <time className="tf-ai-debug-panel__time">{log.timestamp.toLocaleTimeString()}</time>
              <span className="tf-ai-debug-panel__level">{log.level.toUpperCase()}</span>
              <span className="tf-ai-debug-panel__message">{log.message}</span>
              {log.metadata && expandedLog === String(i) && (
                <pre className="tf-ai-debug-panel__metadata">
                  {JSON.stringify(log.metadata, null, 2)}
                </pre>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AIDebugPanel;
