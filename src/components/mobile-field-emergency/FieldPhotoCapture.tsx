import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Props for FieldPhotoCapture.
 */
export interface FieldPhotoCaptureProps {
  /** Called when photo is captured. */
  onCapture: (imageDataUrl: string) => void;
  /** Photo count for limit indicator. */
  photoCount?: number;
  /** Maximum allowed photos. */
  maxPhotos?: number;
  /** Label. */
  label?: string;
  /** Size variant. */
  size?: 'sm' | 'md' | 'lg';
  /** Disabled. */
  disabled?: boolean;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * FieldPhotoCapture — photo capture button.
 *
 * Compact camera button for quick photo capture in the field.
 * Shows photo count against max limit.
 * Three size variants for different contexts (inline, FAB, full-width).
 */
export const FieldPhotoCapture: React.FC<FieldPhotoCaptureProps> = ({
  onCapture,
  photoCount = 0,
  maxPhotos,
  label = 'Photo',
  size = 'md',
  disabled = false,
  className = '',
  testId,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const atLimit = maxPhotos !== undefined && photoCount >= maxPhotos;
  const sizeClass = `tf-photo-capture--${size}`;
  const limitClass = atLimit ? 'tf-photo-capture--limit' : '';

  const handleClick = () => {
    if (atLimit || disabled) return;
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onCapture(reader.result as string);
    reader.readAsDataURL(file);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <button
      type="button"
      data-testid={testId}
      className={['tf-photo-capture', sizeClass, limitClass, className].join(' ')}
      onClick={handleClick}
      disabled={disabled || atLimit}
      aria-label={`${label}${maxPhotos ? ` (${photoCount}/${maxPhotos})` : ''}`}
    >
      {/* Hidden input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="tf-photo-capture__input"
        onChange={handleFileChange}
        aria-hidden="true"
      />

      {/* Camera icon */}
      <span className="tf-photo-capture__icon" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      </span>

      {/* Label */}
      <span className="tf-photo-capture__label">{label}</span>

      {/* Count badge */}
      {maxPhotos !== undefined && (
        <span className="tf-photo-capture__badge">
          {photoCount}/{maxPhotos}
        </span>
      )}
    </button>
  );
};

FieldPhotoCapture.displayName = 'FieldPhotoCapture';

export default FieldPhotoCapture;
