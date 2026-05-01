/**
 * @fileoverview GraphZoomControls — Zoom in/out/fit controls for the graph canvas.
 * Provides buttons for adjusting the zoom level and fitting content.
 */

import React from 'react';
import type { GraphComponentProps } from './types';

export interface GraphZoomControlsProps extends GraphComponentProps {
  /** Current zoom level */
  zoom: number;
  /** Minimum allowed zoom */
  minZoom?: number;
  /** Maximum allowed zoom */
  maxZoom?: number;
  /** Zoom step factor */
  zoomStep?: number;
  /** Callback when zoom in is clicked */
  onZoomIn?: () => void;
  /** Callback when zoom out is clicked */
  onZoomOut?: () => void;
  /** Callback when fit to screen is clicked */
  onFit?: () => void;
  /** Callback when reset zoom is clicked */
  onReset?: () => void;
  /** Callback when zoom percentage is clicked */
  onZoomClick?: () => void;
}

/**
 * GraphZoomControls — Zoom in/out/fit controls.
 *
 * A set of controls for adjusting the canvas zoom level:
 * zoom in (+), zoom out (-), fit to content, and reset to 100%.
 *
 * @example
 * <GraphZoomControls
 *   zoom={1.25}
 *   onZoomIn={() => setZoom(z => z * 1.2)}
 *   onZoomOut={() => setZoom(z => z / 1.2)}
 *   onFit={() => fitToContent()}
 * />
 */
export const GraphZoomControls: React.FC<GraphZoomControlsProps> = ({
  className = '',
  style,
  zoom,
  minZoom = 0.1,
  maxZoom = 5,
  zoomStep = 1.2,
  onZoomIn,
  onZoomOut,
  onFit,
  onReset,
  onZoomClick,
  ...rest
}) => {
  const pct = Math.round(zoom * 100);

  return (
    <div
      className={`tf-graph-zoom-controls ${className}`}
      style={{
        position: 'absolute',
        bottom: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        padding: '4px 8px',
        backgroundColor: 'rgba(16, 22, 36, 0.95)',
        border: '1px solid #2a3a4e',
        borderRadius: 6,
        zIndex: 50,
        ...style,
      }}
      {...rest}
    >
      <button
        className="tf-graph-zoom-controls__out"
        onClick={onZoomOut}
        disabled={zoom <= minZoom}
        title="Zoom out"
        type="button"
        style={{
          width: 28,
          height: 28,
          background: 'none',
          border: '1px solid transparent',
          borderRadius: 4,
          color: zoom <= minZoom ? '#3a5274' : '#8b9db8',
          cursor: zoom <= minZoom ? 'not-allowed' : 'pointer',
          fontSize: 16,
        }}
      >
        −
      </button>

      <button
        className="tf-graph-zoom-controls__percent"
        onClick={onZoomClick}
        title="Click to set zoom"
        type="button"
        style={{
          minWidth: 48,
          height: 28,
          padding: '0 6px',
          background: 'none',
          border: '1px solid transparent',
          borderRadius: 4,
          color: '#c8d6e5',
          cursor: 'pointer',
          fontSize: 12,
          fontWeight: 500,
        }}
      >
        {pct}%
      </button>

      <button
        className="tf-graph-zoom-controls__in"
        onClick={onZoomIn}
        disabled={zoom >= maxZoom}
        title="Zoom in"
        type="button"
        style={{
          width: 28,
          height: 28,
          background: 'none',
          border: '1px solid transparent',
          borderRadius: 4,
          color: zoom >= maxZoom ? '#3a5274' : '#8b9db8',
          cursor: zoom >= maxZoom ? 'not-allowed' : 'pointer',
          fontSize: 16,
        }}
      >
        +
      </button>

      <div style={{ width: 1, height: 20, backgroundColor: '#2a3a4e', margin: '0 4px' }} />

      <button
        className="tf-graph-zoom-controls__fit"
        onClick={onFit}
        title="Fit to screen"
        type="button"
        style={{
          width: 28,
          height: 28,
          background: 'none',
          border: '1px solid transparent',
          borderRadius: 4,
          color: '#8b9db8',
          cursor: 'pointer',
          fontSize: 12,
        }}
      >
        ⧉
      </button>

      <button
        className="tf-graph-zoom-controls__reset"
        onClick={onReset}
        title="Reset zoom"
        type="button"
        style={{
          width: 28,
          height: 28,
          background: 'none',
          border: '1px solid transparent',
          borderRadius: 4,
          color: '#8b9db8',
          cursor: 'pointer',
          fontSize: 12,
        }}
      >
        100%
      </button>
    </div>
  );
};

GraphZoomControls.displayName = 'GraphZoomControls';
export default GraphZoomControls;
