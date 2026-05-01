import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Props for MapCommandOverlay.
 */
export interface MapCommandOverlayProps {
  /** Overlay title. */
  title?: string;
  /** Whether the overlay is visible. */
  isOpen: boolean;
  /** Position on screen. */
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  /** Composed children (MapCommandButtons, etc). */
  children: React.ReactNode;
  /** Close handler. */
  onClose?: () => void;
  /** Draggable? */
  draggable?: boolean;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * MapCommandOverlay — command overlay on map.
 *
 * Floating overlay panel positioned over a map viewport.
 * Semi-transparent background so the map remains visible underneath.
 * Supports all four corners plus center positioning.
 */
export const MapCommandOverlay: React.FC<MapCommandOverlayProps> = ({
  title,
  isOpen,
  position = 'bottom-right',
  children,
  onClose,
  draggable = false,
  className = '',
  testId,
}) => {
  if (!isOpen) return null;

  const positionClass = `tf-map-overlay--${position}`;

  return (
    <div
      data-testid={testId}
      className={['tf-map-overlay', positionClass, className].join(' ')}
      role="complementary"
      aria-label={title || 'Map command overlay'}
    >
      <div className="tf-map-overlay__panel">
        {/* Header */}
        {(title || onClose) && (
          <div className="tf-map-overlay__header">
            {title && (
              <h4 className="tf-map-overlay__title">{title}</h4>
            )}
            {onClose && (
              <button
                type="button"
                className="tf-map-overlay__close"
                onClick={onClose}
                aria-label="Close overlay"
              >
                ✕
              </button>
            )}
          </div>
        )}

        {/* Drag handle */}
        {draggable && (
          <div className="tf-map-overlay__drag-handle" aria-hidden="true">
            ⋮⋮
          </div>
        )}

        {/* Content */}
        <div className="tf-map-overlay__body">{children}</div>
      </div>
    </div>
  );
};

MapCommandOverlay.displayName = 'MapCommandOverlay';

export default MapCommandOverlay;
