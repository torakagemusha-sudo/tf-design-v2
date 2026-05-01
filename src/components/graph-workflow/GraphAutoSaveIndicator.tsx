/**
 * @fileoverview GraphAutoSaveIndicator — Auto-save status indicator.
 * Shows the current auto-save state: saved, saving, or unsaved changes.
 */

import React from 'react';
import type { GraphComponentProps } from './types';

export type AutoSaveState = 'saved' | 'saving' | 'unsaved' | 'error';

export interface GraphAutoSaveIndicatorProps extends GraphComponentProps {
  /** Current auto-save state */
  state: AutoSaveState;
  /** Last saved timestamp */
  lastSaved?: number;
  /** Error message if state is 'error' */
  errorMessage?: string;
}

const STATE_CONFIG: Record<AutoSaveState, { icon: string; color: string; label: string }> = {
  saved: { icon: '✓', color: '#2ecc71', label: 'Saved' },
  saving: { icon: '⟳', color: '#f39c12', label: 'Saving...' },
  unsaved: { icon: '•', color: '#e74c3c', label: 'Unsaved changes' },
  error: { icon: '✕', color: '#e74c3c', label: 'Save failed' },
};

/**
 * GraphAutoSaveIndicator — Auto-save status indicator.
 *
 * Displays a small status indicator showing whether the graph
 * has been saved, is being saved, or has unsaved changes.
 *
 * @example
 * <GraphAutoSaveIndicator state="saved" lastSaved={Date.now()} />
 * <GraphAutoSaveIndicator state="saving" />
 * <GraphAutoSaveIndicator state="unsaved" />
 */
export const GraphAutoSaveIndicator: React.FC<GraphAutoSaveIndicatorProps> = ({
  className = '',
  style,
  state,
  lastSaved,
  errorMessage,
  ...rest
}) => {
  const config = STATE_CONFIG[state];

  return (
    <div
      className={`tf-graph-auto-save-indicator tf-graph-auto-save-indicator--${state} ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: '2px 8px',
        ...style,
      }}
      {...rest}
    >
      <span
        className="tf-graph-auto-save-indicator__icon"
        style={{
          fontSize: 10,
          color: config.color,
          animation: state === 'saving' ? 'spin 1s linear infinite' : 'none',
        }}
      >
        {config.icon}
      </span>
      <span className="tf-graph-auto-save-indicator__label" style={{ fontSize: 10, color: config.color }}>
        {config.label}
      </span>
      {lastSaved && state === 'saved' && (
        <span className="tf-graph-auto-save-indicator__time" style={{ fontSize: 9, color: '#3a5274' }}>
          {new Date(lastSaved).toLocaleTimeString()}
        </span>
      )}
      {state === 'error' && errorMessage && (
        <span className="tf-graph-auto-save-indicator__error" style={{ fontSize: 9, color: '#e74c3c' }}>
          {errorMessage}
        </span>
      )}
    </div>
  );
};

GraphAutoSaveIndicator.displayName = 'GraphAutoSaveIndicator';
export default GraphAutoSaveIndicator;
