import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Props for FieldBarcodeScanner.
 */
export interface FieldBarcodeScannerProps {
  /** Called when a barcode is successfully scanned. */
  onScan: (barcode: string) => void;
  /** Called on scan error. */
  onError?: (error: Error) => void;
  /** Supported barcode formats. */
  formats?: string[];
  /** Scanner label. */
  label?: string;
  /** Whether the scanner is active. */
  active?: boolean;
  /** Torch on/off. */
  torch?: boolean;
  /** Toggle torch handler. */
  onToggleTorch?: () => void;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * FieldBarcodeScanner — barcode scanner.
 *
 * Wraps the device camera with barcode detection overlay.
 * Viewfinder crosshairs guide alignment for reliable scanning.
 * Torch toggle for low-light scanning conditions.
 * Continuous scan mode — calls onScan for each detected barcode.
 */
export const FieldBarcodeScanner: React.FC<FieldBarcodeScannerProps> = ({
  onScan,
  onError,
  formats = ['qr', 'code_128', 'ean_13'],
  label = 'Scan barcode',
  active = true,
  torch = false,
  onToggleTorch,
  className = '',
  testId,
}) => {
  const [scanning, setScanning] = React.useState(active);
  const [lastScan, setLastScan] = React.useState<string | null>(null);

  // Mock scan handler — in production this would use BarcodeDetector API
  const handleSimulatedScan = () => {
    const mockBarcode = `SCAN-${Date.now()}`;
    setLastScan(mockBarcode);
    onScan(mockBarcode);
  };

  React.useEffect(() => {
    setScanning(active);
  }, [active]);

  return (
    <div
      data-testid={testId}
      className={[
        'tf-barcode-scanner',
        scanning ? 'tf-barcode-scanner--active' : '',
        className,
      ].join(' ')}
    >
      {/* Camera viewport */}
      <div className="tf-barcode-scanner__viewport">
        {/* Viewfinder overlay */}
        <div className="tf-barcode-scanner__viewfinder" aria-hidden="true">
          {/* Corner brackets */}
          <div className="tf-barcode-scanner__corner tf-barcode-scanner__corner--tl" />
          <div className="tf-barcode-scanner__corner tf-barcode-scanner__corner--tr" />
          <div className="tf-barcode-scanner__corner tf-barcode-scanner__corner--bl" />
          <div className="tf-barcode-scanner__corner tf-barcode-scanner__corner--br" />

          {/* Center reticle */}
          <div className="tf-barcode-scanner__reticle" />

          {/* Scan line */}
          {scanning && (
            <div className="tf-barcode-scanner__scan-line" />
          )}
        </div>

        {/* Label */}
        <span className="tf-barcode-scanner__label">{label}</span>

        {/* Supported formats */}
        <span className="tf-barcode-scanner__formats">
          {formats.join(', ')}
        </span>
      </div>

      {/* Controls */}
      <div className="tf-barcode-scanner__controls">
        {/* Torch toggle */}
        {onToggleTorch && (
          <button
            type="button"
            className={[
              'tf-barcode-scanner__ctrl-btn',
              torch ? 'tf-barcode-scanner__ctrl-btn--active' : '',
            ].join(' ')}
            onClick={onToggleTorch}
            aria-label={torch ? 'Turn torch off' : 'Turn torch on'}
          >
            {torch ? '🔦 On' : '🔦 Off'}
          </button>
        )}

        {/* Simulate scan (dev/demo) */}
        <button
          type="button"
          className="tf-barcode-scanner__ctrl-btn"
          onClick={handleSimulatedScan}
        >
          Simulate
        </button>
      </div>

      {/* Last scan */}
      {lastScan && (
        <div className="tf-barcode-scanner__last">
          Last: <code>{lastScan}</code>
        </div>
      )}
    </div>
  );
};

FieldBarcodeScanner.displayName = 'FieldBarcodeScanner';

export default FieldBarcodeScanner;
