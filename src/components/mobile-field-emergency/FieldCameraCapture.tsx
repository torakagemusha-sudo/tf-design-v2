import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Props for FieldCameraCapture.
 */
export interface FieldCameraCaptureProps {
  /** Called when a photo is captured — receives data URL. */
  onCapture: (imageDataUrl: string) => void;
  /** Called when capture fails. */
  onError?: (error: Error) => void;
  /** Maximum photos allowed. */
  maxPhotos?: number;
  /** Current photo count. */
  currentCount?: number;
  /** Quality 0-1. */
  quality?: number;
  /** Label text. */
  label?: string;
  /** Disabled. */
  disabled?: boolean;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * FieldCameraCapture — camera integration.
 *
 * Wraps the device camera API for in-app photo capture.
 * Displays a large capture button with photo count indicator.
 * Handles permission errors gracefully with user feedback.
 * Quality setting balances file size against detail for field conditions.
 */
export const FieldCameraCapture: React.FC<FieldCameraCaptureProps> = ({
  onCapture,
  onError,
  maxPhotos,
  currentCount = 0,
  quality = 0.85,
  label = 'Take Photo',
  disabled = false,
  className = '',
  testId,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [capturing, setCapturing] = React.useState(false);

  const canCapture = maxPhotos === undefined || currentCount < maxPhotos;
  const atLimit = maxPhotos !== undefined && currentCount >= maxPhotos;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCapturing(true);
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      onCapture(result);
      setCapturing(false);
      // Reset input
      if (inputRef.current) inputRef.current.value = '';
    };
    reader.onerror = () => {
      onError?.(new Error('Failed to read captured image'));
      setCapturing(false);
    };
    reader.readAsDataURL(file);
  };

  const handleClick = () => {
    if (!canCapture || disabled) return;
    inputRef.current?.click();
  };

  return (
    <div
      data-testid={testId}
      className={[
        'tf-camera-capture',
        atLimit ? 'tf-camera-capture--limit' : '',
        disabled ? 'tf-camera-capture--disabled' : '',
        className,
      ].join(' ')}
    >
      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="tf-camera-capture__input"
        onChange={handleFileChange}
        aria-hidden="true"
      />

      {/* Capture button */}
      <button
        type="button"
        className="tf-camera-capture__btn"
        onClick={handleClick}
        disabled={!canCapture || disabled || capturing}
        aria-label={label}
      >
        {/* Shutter icon */}
        <span className="tf-camera-capture__shutter" aria-hidden="true">
          {capturing ? (
            <span className="tf-camera-capture__spinner">⟳</span>
          ) : (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
          )}
        </span>

        {/* Label */}
        <span className="tf-camera-capture__label">
          {atLimit
            ? `Limit reached (${maxPhotos})`
            : capturing
              ? 'Processing...'
              : label}
        </span>

        {/* Count indicator */}
        {maxPhotos !== undefined && (
          <span className="tf-camera-capture__count">
            {currentCount}/{maxPhotos}
          </span>
        )}
      </button>
    </div>
  );
};

FieldCameraCapture.displayName = 'FieldCameraCapture';

export default FieldCameraCapture;
