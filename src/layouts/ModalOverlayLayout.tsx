/**
 * @fileoverview ModalOverlayLayout — Modal-Centered Layout
 *
 * Layout pattern for modal, drawer, and overlay presentations. Variants for
 * centered modal dialogs, slide-in drawers from right/bottom, and fullscreen
 * overlays. Manages backdrop, focus trapping, and dismissal behavior.
 *
 * ```
 * +---------------------------------------------------------------+
 * |                                                               |
 * |   +---------------------+    (Centered)                       |
 * |   |                     |                                     |
 * |   |   Modal Content     |                                     |
 * |   |                     |                                     |
 * |   +---------------------+                                     |
 * |                                                               |
 * +---------------------------------------------------------------+
 *
 * +---------------------------------------------------------------+  (SlideRight)
 * |                                          +--------------------+|
 * |                                          |                    ||
 * |                                          | Drawer Content     ||
 * |                                          |                    ||
 * |                                          +--------------------+|
 * +---------------------------------------------------------------+
 * ```
 */

import React, { useEffect, useRef, useCallback } from 'react';
import type { LayoutBaseProps, TorafirmaTheme } from './types';
import { THEME_TOKENS } from './types';
import { useLayout } from './useLayout';

export type ModalVariant = 'centered' | 'slideright' | 'slidebottom' | 'fullscreen';

export interface ModalOverlayLayoutProps extends LayoutBaseProps {
  variant?: ModalVariant;
  /** Modal open state */
  isOpen: boolean;
  /** Modal title / header */
  title?: string;
  /** Modal header actions */
  headerActions?: React.ReactNode;
  /** Modal footer content */
  footer?: React.ReactNode;
  /** Backdrop click closes modal */
  closeOnBackdrop?: boolean;
  /** ESC key closes modal */
  closeOnEscape?: boolean;
  /** On close callback */
  onClose: () => void;
  /** Modal width (centered variant) */
  width?: number | string;
  /** Modal height (centered/slide variants) */
  height?: number | string;
  /** Show backdrop */
  showBackdrop?: boolean;
  /** Z-index */
  zIndex?: number;
}

export const ModalOverlayLayout: React.FC<ModalOverlayLayoutProps> = ({
  theme: propTheme,
  variant = 'centered',
  isOpen,
  title,
  headerActions,
  footer,
  closeOnBackdrop = true,
  closeOnEscape = true,
  onClose,
  width = 520,
  height = 'auto',
  showBackdrop = true,
  zIndex = 1000,
  className,
  style,
  children,
  testId,
}) => {
  const { state } = useLayout();
  const theme = propTheme ?? state.theme;
  const t = THEME_TOKENS[theme];
  const modalRef = useRef<HTMLDivElement>(null);

  // Escape key handler
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeOnEscape, onClose]);

  // Focus trap
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget && closeOnBackdrop) {
        onClose();
      }
    },
    [closeOnBackdrop, onClose]
  );

  if (!isOpen) return null;

  const backdropStyle: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    background: showBackdrop ? 'rgba(5, 6, 8, 0.75)' : 'transparent',
    zIndex,
    display: 'flex',
    alignItems: variant === 'centered' ? 'center' : variant === 'slidebottom' ? 'flex-end' : 'flex-start',
    justifyContent: variant === 'centered' ? 'center' : variant === 'slideright' ? 'flex-end' : 'center',
  };

  const modalStyle: React.CSSProperties = {
    background: t.panelBg,
    border: `1px solid ${t.borderColor}`,
    borderRadius: variant === 'centered' ? 4 : 0,
    width: variant === 'slideright' ? (width ?? 400) : variant === 'fullscreen' ? '100%' : width,
    height: variant === 'slidebottom' ? (height ?? '60vh') : variant === 'fullscreen' ? '100%' : height,
    maxWidth: variant === 'centered' ? '90vw' : '100%',
    maxHeight: variant === 'centered' ? '90vh' : '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    outline: 'none',
    animation:
      variant === 'slideright'
        ? 'slideInRight 0.25s ease'
        : variant === 'slidebottom'
        ? 'slideInBottom 0.25s ease'
        : variant === 'fullscreen'
        ? 'fadeIn 0.2s ease'
        : 'fadeInScale 0.2s ease',
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    borderBottom: `1px solid ${t.borderColor}`,
    flexShrink: 0,
  };

  const bodyStyle: React.CSSProperties = {
    flex: 1,
    overflow: 'auto',
    padding: 16,
  };

  const footerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 8,
    padding: '12px 16px',
    borderTop: `1px solid ${t.borderColor}`,
    flexShrink: 0,
    background: t.raisedPanelBg,
  };

  return (
    <div
      className={`tf-layout tf-modal-overlay tf-modal-overlay--${variant} ${className ?? ''}`}
      data-testid={testId}
      data-layout="modal-overlay"
      data-variant={variant}
      data-theme={theme}
      style={{ ...backdropStyle, ...style }}
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        style={modalStyle}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {(title || headerActions) && (
          <div style={headerStyle} data-panel="header">
            <span
              style={{
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.04em',
                textTransform: 'uppercase' as const,
                color: t.textPrimary,
              }}
            >
              {title}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {headerActions}
              <button
                onClick={onClose}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: t.textMuted,
                  fontSize: 18,
                  cursor: 'pointer',
                  padding: '0 4px',
                  lineHeight: 1,
                }}
                aria-label="Close"
              >
                &#x2715;
              </button>
            </div>
          </div>
        )}

        {/* Body */}
        <div style={bodyStyle} data-panel="body">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div style={footerStyle} data-panel="footer">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

// Variant Exports
export const CenteredModal: React.FC<Omit<ModalOverlayLayoutProps, 'variant'>> = (props) => (
  <ModalOverlayLayout {...props} variant="centered" />
);
CenteredModal.displayName = 'CenteredModal';

export const SlideRightDrawer: React.FC<Omit<ModalOverlayLayoutProps, 'variant'>> = (props) => (
  <ModalOverlayLayout {...props} variant="slideright" />
);
SlideRightDrawer.displayName = 'SlideRightDrawer';

export const SlideBottomDrawer: React.FC<Omit<ModalOverlayLayoutProps, 'variant'>> = (props) => (
  <ModalOverlayLayout {...props} variant="slidebottom" />
);
SlideBottomDrawer.displayName = 'SlideBottomDrawer';

export const FullscreenOverlay: React.FC<Omit<ModalOverlayLayoutProps, 'variant'>> = (props) => (
  <ModalOverlayLayout {...props} variant="fullscreen" />
);
FullscreenOverlay.displayName = 'FullscreenOverlay';

export default ModalOverlayLayout;
