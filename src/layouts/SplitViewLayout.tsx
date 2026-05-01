/**
 * @fileoverview SplitViewLayout — Generic Split View Layout
 *
 * Flexible split-pane layout supporting horizontal and vertical splits
 * with configurable ratios. Variants for 50/50, 30/70, 40/60, and
 * triple-pane configurations.
 *
 * ```
 * +----------------------------------------------+
 * |                    TOP BAR                     |  (optional)
 * +----------------------+-----------------------+
 * |                      |                       |
 * |      Pane A          |       Pane B          |  MAIN
 * |                      |                       |
 * |                      |                       |
 * +----------------------+-----------------------+
 * |                    BOTTOM BAR                  |  (optional)
 * +----------------------+-----------------------+
 * ```
 */

import React, { useState, useCallback, useRef, useEffect } from 'react';
import type { LayoutBaseProps, TorafirmaTheme } from './types';
import { THEME_TOKENS } from './types';
import { useLayout } from './useLayout';

export type SplitVariant = 'horizontal50_50' | 'horizontal30_70' | 'vertical40_60' | 'triplepane';

export interface SplitViewLayoutProps extends LayoutBaseProps {
  variant?: SplitVariant;
  /** Top bar content */
  topBar?: React.ReactNode;
  /** Bottom bar content */
  bottomBar?: React.ReactNode;
  /** Pane A (left/top) content */
  paneA?: React.ReactNode;
  /** Pane B (right/bottom) content */
  paneB?: React.ReactNode;
  /** Pane C (triple-pane only, rightmost/bottom) content */
  paneC?: React.ReactNode;
  /** Split ratio override (0.1 - 0.9) */
  splitRatio?: number;
  /** Enable resize handle */
  resizable?: boolean;
  /** Minimum pane size in pixels */
  minPaneSize?: number;
  /** On split ratio change */
  onSplitChange?: (ratio: number) => void;
}

function getDefaultRatio(variant: SplitVariant): number {
  switch (variant) {
    case 'horizontal50_50': return 0.5;
    case 'horizontal30_70': return 0.3;
    case 'vertical40_60': return 0.4;
    case 'triplepane': return 0.33;
    default: return 0.5;
  }
}

function getGridTemplate(variant: SplitVariant, ratio: number): string {
  switch (variant) {
    case 'horizontal50_50':
    case 'horizontal30_70':
      return `${ratio}fr ${1 - ratio}fr`;
    case 'vertical40_60':
      return `${ratio}fr ${1 - ratio}fr`;
    case 'triplepane':
      return `${ratio}fr ${ratio}fr ${1 - 2 * ratio}fr`;
    default:
      return '1fr 1fr';
  }
}

export const SplitViewLayout: React.FC<SplitViewLayoutProps> = ({
  theme: propTheme,
  variant = 'horizontal50_50',
  topBar,
  bottomBar,
  paneA,
  paneB,
  paneC,
  splitRatio: propRatio,
  resizable = true,
  minPaneSize = 120,
  onSplitChange,
  className,
  style,
  children,
  testId,
}) => {
  const { state } = useLayout();
  const theme = propTheme ?? state.theme;
  const t = THEME_TOKENS[theme];
  const defaultRatio = getDefaultRatio(variant);
  const [ratio, setRatio] = useState(propRatio ?? defaultRatio);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (propRatio !== undefined) setRatio(propRatio);
  }, [propRatio]);

  const handleMouseDown = useCallback(() => {
    if (!resizable) return;
    setDragging(true);
  }, [resizable]);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!dragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const isHorizontal = variant === 'horizontal50_50' || variant === 'horizontal30_70';
      const pos = isHorizontal ? e.clientX - rect.left : e.clientY - rect.top;
      const total = isHorizontal ? rect.width : rect.height;
      const newRatio = Math.max(minPaneSize / total, Math.min(1 - minPaneSize / total, pos / total));
      setRatio(newRatio);
      onSplitChange?.(newRatio);
    },
    [dragging, variant, minPaneSize, onSplitChange]
  );

  const handleMouseUp = useCallback(() => {
    setDragging(false);
  }, []);

  useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [dragging, handleMouseMove, handleMouseUp]);

  const isHorizontal = variant === 'horizontal50_50' || variant === 'horizontal30_70';
  const gridTemplate = getGridTemplate(variant, ratio);
  const hasTopBar = !!topBar;
  const hasBottomBar = !!bottomBar;

  const gridTemplateRows = hasTopBar && hasBottomBar
    ? '48px 1fr 28px'
    : hasTopBar
    ? '48px 1fr'
    : hasBottomBar
    ? '1fr 28px'
    : '1fr';

  const gridTemplateColumns = isHorizontal ? gridTemplate : variant === 'triplepane' ? gridTemplate : '1fr';

  const containerStyle: React.CSSProperties = {
    width: '100%',
    height: '100vh',
    display: 'grid',
    gridTemplateRows,
    gridTemplateColumns,
    gridTemplateAreas:
      variant === 'triplepane' && isHorizontal
        ? hasTopBar && hasBottomBar
          ? `"topbar topbar topbar" "paneA paneB paneC" "bottom bottom bottom"`
          : hasTopBar
          ? `"topbar topbar topbar" "paneA paneB paneC"`
          : `"paneA paneB paneC"`
        : isHorizontal
        ? hasTopBar && hasBottomBar
          ? `"topbar topbar" "paneA paneB" "bottom bottom"`
          : hasTopBar
          ? `"topbar topbar" "paneA paneB"`
          : `"paneA paneB"`
        : hasTopBar && hasBottomBar
        ? `"topbar" "paneA" "paneB" "bottom"`
        : hasTopBar
        ? `"topbar" "paneA" "paneB"`
        : `"paneA" "paneB"`,
    background: t.background,
    color: t.textPrimary,
    overflow: 'hidden',
    cursor: dragging ? (isHorizontal ? 'col-resize' : 'row-resize') : 'default',
    ...style,
  };

  const paneStyle = (area: string): React.CSSProperties => ({
    gridArea: area,
    overflow: 'auto',
    background: t.background,
    position: 'relative',
  });

  const splitterStyle: React.CSSProperties = {
    position: 'absolute',
    [isHorizontal ? 'right' : 'bottom']: -3,
    [isHorizontal ? 'top' : 'left']: 0,
    [isHorizontal ? 'width' : 'height']: 6,
    [isHorizontal ? 'height' : 'width']: '100%',
    cursor: isHorizontal ? 'col-resize' : 'row-resize',
    zIndex: 10,
    background: 'transparent',
  };

  const renderPane = (area: string, content?: React.ReactNode) => (
    <div style={paneStyle(area)} data-panel={area}>
      {content ?? (area === 'paneA' ? children : undefined)}
      {resizable && <div style={splitterStyle} onMouseDown={handleMouseDown} data-element="splitter" />}
    </div>
  );

  return (
    <div
      ref={containerRef}
      className={`tf-layout tf-split-view tf-split-view--${variant} ${className ?? ''}`}
      data-testid={testId}
      data-layout="split-view"
      data-variant={variant}
      data-theme={theme}
      style={containerStyle}
    >
      {topBar && (
        <div
          style={{
            gridArea: 'topbar',
            display: 'flex',
            alignItems: 'center',
            padding: '0 12px',
            background: t.panelBg,
            borderBottom: `1px solid ${t.borderColor}`,
          }}
          data-panel="topbar"
        >
          {topBar}
        </div>
      )}
      {renderPane('paneA', paneA)}
      {renderPane('paneB', paneB)}
      {variant === 'triplepane' && paneC && renderPane('paneC', paneC)}
      {bottomBar && (
        <div
          style={{
            gridArea: 'bottom',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 12px',
            background: t.raisedPanelBg,
            borderTop: `1px solid ${t.borderColor}`,
            fontSize: 11,
            color: t.textMuted,
          }}
          data-panel="bottom"
        >
          {bottomBar}
        </div>
      )}
    </div>
  );
};

// Variant Exports
export const Horizontal50_50: React.FC<Omit<SplitViewLayoutProps, 'variant'>> = (props) => (
  <SplitViewLayout {...props} variant="horizontal50_50" />
);
Horizontal50_50.displayName = 'Horizontal50_50';

export const Horizontal30_70: React.FC<Omit<SplitViewLayoutProps, 'variant'>> = (props) => (
  <SplitViewLayout {...props} variant="horizontal30_70" />
);
Horizontal30_70.displayName = 'Horizontal30_70';

export const Vertical40_60: React.FC<Omit<SplitViewLayoutProps, 'variant'>> = (props) => (
  <SplitViewLayout {...props} variant="vertical40_60" />
);
Vertical40_60.displayName = 'Vertical40_60';

export const TriplePane: React.FC<Omit<SplitViewLayoutProps, 'variant'>> = (props) => (
  <SplitViewLayout {...props} variant="triplepane" />
);
TriplePane.displayName = 'TriplePane';

export default SplitViewLayout;
