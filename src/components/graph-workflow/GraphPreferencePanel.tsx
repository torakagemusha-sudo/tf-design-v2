/**
 * @fileoverview GraphPreferencePanel — User preferences panel for graph editor settings.
 * Allows customization of editor behavior, appearance, and defaults.
 */

import React, { useState } from 'react';
import type { GraphPreferences, GraphComponentProps } from './types';

export interface GraphPreferencePanelProps extends GraphComponentProps {
  /** Current preferences */
  preferences: GraphPreferences;
  /** Whether the panel is visible */
  visible?: boolean;
  /** Callback when preferences change */
  onPreferencesChange: (preferences: GraphPreferences) => void;
  /** Callback when the panel is closed */
  onClose?: () => void;
}

/**
 * GraphPreferencePanel — User preferences panel.
 *
 * Provides a settings panel for customizing the graph editor
 * behavior including grid, snapping, auto-save, and display options.
 *
 * @example
 * <GraphPreferencePanel
 *   preferences={{
 *     showGrid: true,
 *     snapToGrid: true,
 *     autoSave: true,
 *     autoSaveInterval: 30,
 *   }}
 *   onPreferencesChange={(prefs) => savePreferences(prefs)}
 * />
 */
export const GraphPreferencePanel: React.FC<GraphPreferencePanelProps> = ({
  className = '',
  style,
  preferences,
  visible = true,
  onPreferencesChange,
  onClose,
  ...rest
}) => {
  if (!visible) return null;

  const update = (partial: Partial<GraphPreferences>) => {
    onPreferencesChange({ ...preferences, ...partial });
  };

  return (
    <div
      className={`tf-graph-preference-panel ${className}`}
      style={{
        position: 'absolute',
        top: 60,
        right: 16,
        width: 280,
        backgroundColor: 'rgba(16, 22, 36, 0.98)',
        border: '1px solid #2a3a4e',
        borderRadius: 6,
        zIndex: 70,
        overflow: 'hidden',
        ...style,
      }}
      {...rest}
    >
      <div
        className="tf-graph-preference-panel__header"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 12px',
          borderBottom: '1px solid #2a3a4e',
        }}
      >
        <span style={{ fontWeight: 600, fontSize: 12, color: '#c8d6e5' }}>Preferences</span>
        <button
          className="tf-graph-preference-panel__close"
          onClick={onClose}
          type="button"
          style={{ background: 'none', border: 'none', color: '#6b7f9e', cursor: 'pointer', fontSize: 12 }}
        >
          ✕
        </button>
      </div>

      <div className="tf-graph-preference-panel__body" style={{ padding: '10px 12px' }}>
        {/* Grid section */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#6b7f9e', textTransform: 'uppercase', marginBottom: 8 }}>
            Grid & Snapping
          </div>

          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 0', cursor: 'pointer', fontSize: 12, color: '#c8d6e5' }}>
            Show grid
            <input
              type="checkbox"
              checked={preferences.showGrid}
              onChange={(e) => update({ showGrid: e.target.checked })}
            />
          </label>

          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 0', cursor: 'pointer', fontSize: 12, color: '#c8d6e5' }}>
            Snap to grid
            <input
              type="checkbox"
              checked={preferences.snapToGrid}
              onChange={(e) => update({ snapToGrid: e.target.checked })}
            />
          </label>
        </div>

        {/* Auto-save section */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#6b7f9e', textTransform: 'uppercase', marginBottom: 8 }}>
            Auto-save
          </div>

          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 0', cursor: 'pointer', fontSize: 12, color: '#c8d6e5' }}>
            Enable auto-save
            <input
              type="checkbox"
              checked={preferences.autoSave}
              onChange={(e) => update({ autoSave: e.target.checked })}
            />
          </label>

          {preferences.autoSave && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 0', fontSize: 12, color: '#c8d6e5' }}>
              <span>Interval (seconds)</span>
              <input
                type="number"
                value={preferences.autoSaveInterval}
                onChange={(e) => update({ autoSaveInterval: parseInt(e.target.value, 10) || 30 })}
                min={5}
                max={300}
                style={{ width: 50, padding: '2px 4px', background: '#1a2332', border: '1px solid #2a3a4e', borderRadius: 3, color: '#c8d6e5', fontSize: 11 }}
              />
            </div>
          )}
        </div>

        {/* Display section */}
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#6b7f9e', textTransform: 'uppercase', marginBottom: 8 }}>
            Display
          </div>

          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 0', cursor: 'pointer', fontSize: 12, color: '#c8d6e5' }}>
            Show minimap
            <input
              type="checkbox"
              checked={preferences.showMinimap}
              onChange={(e) => update({ showMinimap: e.target.checked })}
            />
          </label>

          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 0', cursor: 'pointer', fontSize: 12, color: '#c8d6e5' }}>
            Show ports
            <input
              type="checkbox"
              checked={preferences.showPorts}
              onChange={(e) => update({ showPorts: e.target.checked })}
            />
          </label>

          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 0', cursor: 'pointer', fontSize: 12, color: '#c8d6e5' }}>
            Show edge labels
            <input
              type="checkbox"
              checked={preferences.showEdgeLabels}
              onChange={(e) => update({ showEdgeLabels: e.target.checked })}
            />
          </label>

          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 0', cursor: 'pointer', fontSize: 12, color: '#c8d6e5' }}>
            Confirm delete
            <input
              type="checkbox"
              checked={preferences.confirmDelete}
              onChange={(e) => update({ confirmDelete: e.target.checked })}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

GraphPreferencePanel.displayName = 'GraphPreferencePanel';
export default GraphPreferencePanel;
