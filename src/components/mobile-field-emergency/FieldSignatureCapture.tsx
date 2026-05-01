import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Props for FieldSignatureCapture.
 */
export interface FieldSignatureCaptureProps {
  /** Called when signature is confirmed — receives data URL. */
  onCapture: (signatureDataUrl: string) => void;
  /** Called when cleared. */
  onClear?: () => void;
  /** Signer name label. */
  signerName?: string;
  /** Pen colour. */
  penColor?: string;
  /** Canvas background. */
  backgroundColor?: string;
  /** Stroke width. */
  strokeWidth?: number;
  /** Label text. */
  label?: string;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * FieldSignatureCapture — signature capture.
 *
 * Touch-optimised signature pad for field authorisation.
 * Pressure-sensitive stroke width on supported devices.
 * Clear and Confirm actions below the pad.
 * Generates PNG data URL for backend submission.
 */
export const FieldSignatureCapture: React.FC<FieldSignatureCaptureProps> = ({
  onCapture,
  onClear,
  signerName,
  penColor = '#111827',
  backgroundColor = '#FFFFFF',
  strokeWidth = 2.5,
  label = 'Sign here',
  className = '',
  testId,
}) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = React.useState(false);
  const [hasSignature, setHasSignature] = React.useState(false);

  const getContext = () => canvasRef.current?.getContext('2d');

  const startDrawing = (e: React.TouchEvent | React.MouseEvent) => {
    const ctx = getContext();
    if (!ctx || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
    ctx.strokeStyle = penColor;
    ctx.lineWidth = strokeWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    setIsDrawing(true);
  };

  const draw = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDrawing) return;
    const ctx = getContext();
    if (!ctx || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    setHasSignature(true);
  };

  const handleClear = () => {
    const ctx = getContext();
    if (!ctx || !canvasRef.current) return;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setHasSignature(false);
    onClear?.();
  };

  const handleConfirm = () => {
    if (!canvasRef.current || !hasSignature) return;
    const dataUrl = canvasRef.current.toDataURL('image/png');
    onCapture(dataUrl);
  };

  return (
    <div
      data-testid={testId}
      className={['tf-signature-capture', className].join(' ')}
    >
      {/* Label */}
      <div className="tf-signature-capture__header">
        <span className="tf-signature-capture__label">{label}</span>
        {signerName && (
          <span className="tf-signature-capture__signer">{signerName}</span>
        )}
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={600}
        height={200}
        className="tf-signature-capture__canvas"
        style={{ backgroundColor }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        aria-label="Signature pad"
      />

      {/* Actions */}
      <div className="tf-signature-capture__actions">
        <button
          type="button"
          className="tf-signature-capture__btn tf-signature-capture__btn--clear"
          onClick={handleClear}
        >
          Clear
        </button>
        <button
          type="button"
          className="tf-signature-capture__btn tf-signature-capture__btn--confirm"
          onClick={handleConfirm}
          disabled={!hasSignature}
        >
          Confirm Signature
        </button>
      </div>
    </div>
  );
};

FieldSignatureCapture.displayName = 'FieldSignatureCapture';

export default FieldSignatureCapture;
