/**
 * @fileoverview GraphExportImage — Export graph as PNG/JPEG image.
 * Renders the current graph viewport to a raster image for download.
 */

import React, { useCallback } from 'react';
import type { GraphComponentProps } from './types';

export interface GraphExportImageProps extends GraphComponentProps {
  /** Canvas element to export */
  canvasRef?: React.RefObject<HTMLDivElement | null>;
  /** Export scale factor (higher = better quality) */
  scale?: number;
  /** Image format */
  format?: 'png' | 'jpeg';
  /** Filename without extension */
  filename?: string;
  /** Background color (transparent if not specified) */
  backgroundColor?: string;
  /** Callback when export is triggered */
  onExport?: (dataUrl: string) => void;
  /** Button tooltip */
  tooltip?: string;
}

/**
 * GraphExportImage — Export as image button.
 *
 * A button that exports the current graph canvas as a PNG or
 * JPEG image file. Supports quality scaling and custom backgrounds.
 *
 * @example
 * <GraphExportImage
 *   canvasRef={canvasRef}
 *   scale={2}
 *   format="png"
 *   filename="my-workflow"
 *   onExport={(dataUrl) => download(dataUrl, 'workflow.png')}
 * />
 */
export const GraphExportImage: React.FC<GraphExportImageProps> = ({
  className = '',
  style,
  canvasRef,
  scale = 2,
  format = 'png',
  filename = 'graph',
  backgroundColor = '#0b0f19',
  onExport,
  tooltip = 'Export as image',
  ...rest
}) => {
  const handleExport = useCallback(() => {
    if (!canvasRef?.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    // Create a temporary canvas for export
    const tempCanvas = document.createElement('canvas');
    const ctx = tempCanvas.getContext('2d');
    if (!ctx) return;

    tempCanvas.width = rect.width * scale;
    tempCanvas.height = rect.height * scale;

    // Fill background
    if (backgroundColor) {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
    }

    // Convert to data URL
    const mimeType = format === 'jpeg' ? 'image/jpeg' : 'image/png';
    const dataUrl = tempCanvas.toDataURL(mimeType, 0.92);
    onExport?.(dataUrl);
  }, [canvasRef, scale, format, backgroundColor, onExport]);

  return (
    <button
      className={`tf-graph-export-image tf-graph-export-image--${format} ${className}`}
      onClick={handleExport}
      title={tooltip}
      type="button"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 32,
        height: 32,
        backgroundColor: 'rgba(16, 22, 36, 0.95)',
        border: '1px solid #2a3a4e',
        borderRadius: 6,
        color: '#8b9db8',
        cursor: 'pointer',
        fontSize: 14,
        ...style,
      }}
      {...rest}
    >
      🖼
    </button>
  );
};

GraphExportImage.displayName = 'GraphExportImage';
export default GraphExportImage;
