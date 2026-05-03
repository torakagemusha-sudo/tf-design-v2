import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react';


/**
 * Props for Dial component.
 *
 * @public
 */
export interface DialProps {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  size?: number;
  label?: string;
  showValue?: boolean;
  disabled?: boolean;
  className?: string;
}

/**
 * Rotary dial control for selecting numeric values with drag interaction.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <Dial />
 * ```
 */
const Dial: React.FC<DialProps> = ({
  value, min, max, step, onChange, size, label, showValue, disabled, className
}) => {
  const dialRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const angleMin = -135;
  const angleMax = 135;
  const angleRange = angleMax - angleMin;
  const currentAngle = angleMin + ((value - min) / (max - min)) * angleRange;

  const handleInteraction = useCallback((clientX: number, clientY: number) => {
    if (!dialRef.current || disabled) return;
    const rect = dialRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const angle = Math.atan2(clientY - cy, clientX - cx) * 180 / Math.PI;
    let adjusted = angle + 90;
    if (adjusted < angleMin) adjusted = angleMin;
    if (adjusted > angleMax) adjusted = angleMax;
    const newValue = min + ((adjusted - angleMin) / angleRange) * (max - min);
    const stepped = Math.round(newValue / (step || 1)) * (step || 1);
    onChange(Math.min(max, Math.max(min, stepped)));
  }, [disabled, min, max, step, angleMin, angleMax, angleRange, onChange]);

  return (
    <div className={`tf-dial ${disabled ? 'tf-dial--disabled' : ''} ${className || ''}`}>
      <div ref={dialRef} className="tf-dial__face" style={{ width: size || 120, height: size || 120 }}
        onMouseDown={() => setIsDragging(true)}
        onMouseMove={(e) => isDragging && handleInteraction(e.clientX, e.clientY)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
      >
        <svg className="tf-dial__svg" viewBox="0 0 100 100">
          <circle cx={50} cy={50} r={42} className="tf-dial__track" />
          <line x1={50} y1={50} x2={50 + 38 * Math.cos((currentAngle - 90) * Math.PI / 180)} y2={50 + 38 * Math.sin((currentAngle - 90) * Math.PI / 180)} className="tf-dial__pointer" />
          <circle cx={50} cy={50} r={5} className="tf-dial__knob" />
        </svg>
      </div>
      {showValue !== false && <span className="tf-dial__value">{value.toFixed(step ? Math.log10(1 / step) : 0)}</span>}
      {label && <span className="tf-dial__label">{label}</span>}
    </div>
  );
};

export default Dial;
