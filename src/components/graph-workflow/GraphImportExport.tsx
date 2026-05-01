/**
 * @fileoverview GraphImportExport — Import/export panel for graph data exchange.
 * Supports importing from and exporting to various formats (JSON, XML, etc.).
 */

import React, { useState } from 'react';
import type { ExportFormat, GraphComponentProps } from './types';

export interface GraphImportExportProps extends GraphComponentProps {
  /** Whether the panel is visible */
  visible?: boolean;
  /** Supported export formats */
  exportFormats?: ExportFormat[];
  /** Callback when export is requested */
  onExport?: (format: ExportFormat, config: { filename?: string; includeLayout?: boolean }) => void;
  /** Callback when import is requested */
  onImport?: (file: File) => void;
  /** Callback when the panel is closed */
  onClose?: () => void;
}

/**
 * GraphImportExport — Import/export panel.
 *
 * Provides a UI for exporting the current graph to various formats
 * (JSON, SVG, PNG, PDF) and importing graphs from files.
 *
 * @example
 * <GraphImportExport
 *   visible={showImportExport}
 *   onExport={(format, config) => exportGraph(format, config)}
 *   onImport={(file) => importGraph(file)}
 *   onClose={() => setShowImportExport(false)}
 * />
 */
export const GraphImportExport: React.FC<GraphImportExportProps> = ({
  className = '',
  style,
  visible = true,
  exportFormats = ['json', 'svg', 'png'],
  onExport,
  onImport,
  onClose,
  ...rest
}) => {
  const [filename, setFilename] = useState('graph');
  const [includeLayout, setIncludeLayout] = useState(true);
  const [dragOver, setDragOver] = useState(false);

  if (!visible) return null;

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) onImport?.(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onImport?.(file);
  };

  return (
    <div
      className={`tf-graph-import-export ${className}`}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        backgroundColor: 'rgba(16, 22, 36, 0.98)',
        border: '1px solid #2a3a4e',
        borderRadius: 8,
        zIndex: 250,
        ...style,
      }}
      {...rest}
    >
      <div
        className="tf-graph-import-export__header"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          borderBottom: '1px solid #2a3a4e',
        }}
      >
        <span style={{ fontWeight: 600, fontSize: 14, color: '#c8d6e5' }}>Import / Export</span>
        <button
          className="tf-graph-import-export__close"
          onClick={onClose}
          type="button"
          style={{ background: 'none', border: 'none', color: '#6b7f9e', cursor: 'pointer', fontSize: 14 }}
        >
          ✕
        </button>
      </div>

      <div style={{ padding: 16 }}>
        {/* Export */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#6b7f9e', textTransform: 'uppercase', marginBottom: 10 }}>
            Export
          </div>

          <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
            <input
              type="text"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              placeholder="Filename"
              style={{
                flex: 1,
                padding: '6px 10px',
                background: '#1a2332',
                border: '1px solid #2a3a4e',
                borderRadius: 4,
                color: '#c8d6e5',
                fontSize: 12,
                outline: 'none',
              }}
            />
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#8b9db8', marginBottom: 10, cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={includeLayout}
              onChange={(e) => setIncludeLayout(e.target.checked)}
            />
            Include layout positions
          </label>

          <div style={{ display: 'flex', gap: 8 }}>
            {exportFormats.map((format) => (
              <button
                key={format}
                className={`tf-graph-import-export__format-btn tf-graph-import-export__format-btn--${format}`}
                onClick={() => onExport?.(format, { filename, includeLayout })}
                type="button"
                style={{
                  flex: 1,
                  padding: '6px 0',
                  background: '#2a4a6f',
                  border: '1px solid #4a6fa5',
                  borderRadius: 4,
                  color: '#c8d6e5',
                  cursor: 'pointer',
                  fontSize: 11,
                  textTransform: 'uppercase',
                }}
              >
                .{format}
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, backgroundColor: '#2a3a4e', marginBottom: 20 }} />

        {/* Import */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#6b7f9e', textTransform: 'uppercase', marginBottom: 10 }}>
            Import
          </div>

          <div
            className={`tf-graph-import-export__dropzone ${dragOver ? 'tf-graph-import-export__dropzone--active' : ''}`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            style={{
              padding: 24,
              border: `2px dashed ${dragOver ? '#4a6fa5' : '#2a3a4e'}`,
              borderRadius: 6,
              textAlign: 'center',
              backgroundColor: dragOver ? 'rgba(42, 74, 111, 0.15)' : 'transparent',
              transition: 'all 0.15s ease',
            }}
          >
            <div style={{ fontSize: 24, marginBottom: 8 }}>📁</div>
            <div style={{ fontSize: 12, color: '#8b9db8', marginBottom: 8 }}>
              Drop a file here or click to browse
            </div>
            <input
              type="file"
              accept=".json,.xml,.bpmn,.yaml,.yml"
              onChange={handleFileChange}
              style={{ fontSize: 11, color: '#8b9db8' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

GraphImportExport.displayName = 'GraphImportExport';
export default GraphImportExport;
