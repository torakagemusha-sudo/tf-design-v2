/**
 * @fileoverview GraphThemeSelector — Graph theme selector for visual appearance.
 * Switch between dark, light, or custom color themes for the graph canvas.
 */

import React from 'react';
import type { GraphTheme, GraphComponentProps } from './types';

export interface GraphThemeSelectorProps extends GraphComponentProps {
  /** Available themes */
  themes: GraphTheme[];
  /** Currently selected theme ID */
  selectedThemeId: string;
  /** Whether the selector is visible */
  visible?: boolean;
  /** Callback when a theme is selected */
  onThemeSelect: (themeId: string) => void;
  /** Callback when the selector is closed */
  onClose?: () => void;
}

/**
 * GraphThemeSelector — Graph theme selector.
 *
 * Allows the user to switch between different visual themes
 * for the graph editor including dark, light, and custom themes.
 *
 * @example
 * <GraphThemeSelector
 *   themes={[
 *     { id: 'dark', name: 'Dark', backgroundColor: '#0b0f19', gridColor: '#1e2d4a', ... },
 *     { id: 'light', name: 'Light', backgroundColor: '#f5f5f5', gridColor: '#ddd', ... },
 *   ]}
 *   selectedThemeId="dark"
 *   onThemeSelect={(id) => setTheme(id)}
 * />
 */
export const GraphThemeSelector: React.FC<GraphThemeSelectorProps> = ({
  className = '',
  style,
  themes,
  selectedThemeId,
  visible = true,
  onThemeSelect,
  onClose,
  ...rest
}) => {
  if (!visible) return null;

  return (
    <div
      className={`tf-graph-theme-selector ${className}`}
      style={{
        position: 'absolute',
        top: 60,
        right: 16,
        width: 240,
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
        className="tf-graph-theme-selector__header"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 12px',
          borderBottom: '1px solid #2a3a4e',
        }}
      >
        <span style={{ fontWeight: 600, fontSize: 12, color: '#c8d6e5' }}>Theme</span>
        <button
          className="tf-graph-theme-selector__close"
          onClick={onClose}
          type="button"
          style={{ background: 'none', border: 'none', color: '#6b7f9e', cursor: 'pointer', fontSize: 12 }}
        >
          ✕
        </button>
      </div>

      <div className="tf-graph-theme-selector__list" style={{ padding: '6px 8px' }}>
        {themes.map((theme) => {
          const isSelected = theme.id === selectedThemeId;
          return (
            <button
              key={theme.id}
              className={`tf-graph-theme-selector__item ${isSelected ? 'tf-graph-theme-selector__item--selected' : ''}`}
              onClick={() => onThemeSelect(theme.id)}
              type="button"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                width: '100%',
                padding: '8px 10px',
                marginBottom: 4,
                backgroundColor: isSelected ? '#1a3050' : 'transparent',
                border: `1px solid ${isSelected ? '#4a6fa5' : 'transparent'}`,
                borderRadius: 6,
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              {/* Theme preview */}
              <div
                style={{
                  width: 32,
                  height: 24,
                  borderRadius: 4,
                  backgroundColor: theme.backgroundColor,
                  border: `1px solid ${theme.gridColor}`,
                  flexShrink: 0,
                  display: 'flex',
                  gap: 2,
                  padding: 3,
                }}
              >
                <div style={{ width: 6, height: 6, borderRadius: 2, backgroundColor: theme.nodeColors?.default || '#3498db' }} />
                <div style={{ width: 6, height: 6, borderRadius: 2, backgroundColor: theme.edgeColors?.default || '#ecf0f1' }} />
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: isSelected ? 600 : 400, color: '#c8d6e5' }}>
                  {theme.name}
                </div>
              </div>

              {isSelected && <span style={{ fontSize: 12, color: '#4a6fa5' }}>✓</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
};

GraphThemeSelector.displayName = 'GraphThemeSelector';
export default GraphThemeSelector;
