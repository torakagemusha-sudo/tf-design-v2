/**
 * @fileoverview GraphValidationPanel — Graph validation results panel.
 * Displays validation errors, warnings, and info messages with fix actions.
 */

import React from 'react';
import type { ValidationResult, GraphComponentProps } from './types';

export interface GraphValidationPanelProps extends GraphComponentProps {
  /** Validation results */
  results: ValidationResult[];
  /** Whether the panel is visible */
  visible?: boolean;
  /** Callback when a result is clicked (navigates to the element) */
  onResultClick?: (result: ValidationResult) => void;
  /** Callback when auto-fix is requested */
  onAutoFix?: (resultId: string) => void;
  /** Callback when the panel is closed */
  onClose?: () => void;
}

const SEVERITY_CONFIG = {
  error: { color: '#e74c3c', bg: 'rgba(231, 76, 60, 0.1)', icon: '✕' },
  warning: { color: '#f39c12', bg: 'rgba(243, 156, 18, 0.1)', icon: '!' },
  info: { color: '#3498db', bg: 'rgba(52, 152, 219, 0.1)', icon: 'i' },
};

/**
 * GraphValidationPanel — Validation results panel.
 *
 * Displays graph validation results organized by severity (error,
 * warning, info). Each result can be clicked to navigate to the
 * offending element, and auto-fixable issues show a fix button.
 *
 * @example
 * <GraphValidationPanel
 *   results={validationResults}
 *   onResultClick={(r) => centerOnElement(r.nodeId || r.edgeId)}
 *   onAutoFix={(id) => applyAutoFix(id)}
 * />
 */
export const GraphValidationPanel: React.FC<GraphValidationPanelProps> = ({
  className = '',
  style,
  results,
  visible = true,
  onResultClick,
  onAutoFix,
  onClose,
  ...rest
}) => {
  if (!visible) return null;

  const errorCount = results.filter((r) => r.severity === 'error').length;
  const warningCount = results.filter((r) => r.severity === 'warning').length;
  const infoCount = results.filter((r) => r.severity === 'info').length;

  return (
    <div
      className={`tf-graph-validation-panel ${className}`}
      style={{
        position: 'absolute',
        bottom: 60,
        right: 16,
        width: 340,
        maxHeight: 360,
        backgroundColor: 'rgba(16, 22, 36, 0.98)',
        border: '1px solid #2a3a4e',
        borderRadius: 6,
        zIndex: 70,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        ...style,
      }}
      {...rest}
    >
      <div
        className="tf-graph-validation-panel__header"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 12px',
          borderBottom: '1px solid #2a3a4e',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontWeight: 600, fontSize: 12, color: '#c8d6e5' }}>Validation</span>
          <div style={{ display: 'flex', gap: 8, fontSize: 10 }}>
            {errorCount > 0 && <span style={{ color: '#e74c3c' }}>{errorCount} errors</span>}
            {warningCount > 0 && <span style={{ color: '#f39c12' }}>{warningCount} warnings</span>}
            {infoCount > 0 && <span style={{ color: '#3498db' }}>{infoCount} info</span>}
          </div>
        </div>
        <button
          className="tf-graph-validation-panel__close"
          onClick={onClose}
          type="button"
          style={{ background: 'none', border: 'none', color: '#6b7f9e', cursor: 'pointer', fontSize: 12 }}
        >
          ✕
        </button>
      </div>

      <div className="tf-graph-validation-panel__list" style={{ overflowY: 'auto', flex: 1 }}>
        {results.length === 0 && (
          <div style={{ padding: 24, textAlign: 'center', color: '#2ecc71', fontSize: 12 }}>
            ✓ All validations passed
          </div>
        )}

        {results.map((result) => {
          const config = SEVERITY_CONFIG[result.severity];
          return (
            <div
              key={result.id}
              className={`tf-graph-validation-panel__result tf-graph-validation-panel__result--${result.severity}`}
              onClick={() => onResultClick?.(result)}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 8,
                padding: '8px 12px',
                cursor: onResultClick ? 'pointer' : 'default',
                backgroundColor: config.bg,
                borderBottom: '1px solid #1a2332',
              }}
            >
              <span style={{ fontSize: 10, color: config.color, fontWeight: 700, marginTop: 1, minWidth: 14, textAlign: 'center' }}>
                {config.icon}
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 11, color: '#c8d6e5' }}>{result.message}</div>
                <div style={{ fontSize: 9, color: '#6b7f9e', marginTop: 2 }}>
                  {result.nodeId && `Node: ${result.nodeId}`}
                  {result.edgeId && `Edge: ${result.edgeId}`}
                  {result.rule && ` • Rule: ${result.rule}`}
                </div>
              </div>
              {result.autoFixable && onAutoFix && (
                <button
                  className="tf-graph-validation-panel__fix"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAutoFix(result.id);
                  }}
                  type="button"
                  style={{
                    padding: '2px 8px',
                    backgroundColor: '#1a3a2a',
                    border: '1px solid #2a5a3a',
                    borderRadius: 3,
                    color: '#2ecc71',
                    cursor: 'pointer',
                    fontSize: 10,
                    whiteSpace: 'nowrap',
                  }}
                >
                  Fix
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

GraphValidationPanel.displayName = 'GraphValidationPanel';
export default GraphValidationPanel;
