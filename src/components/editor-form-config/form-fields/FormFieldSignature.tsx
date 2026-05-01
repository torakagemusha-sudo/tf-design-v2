import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * FormFieldSignature — digital signature pad for drawing signatures.
 *
 * @example
 * <FormFieldSignature name="signature" label="Sign here" value={signatureData} onChange={handleChange} />
 */
export interface FormFieldSignatureProps extends BaseComponentProps {
  name: string;
  label?: string;
  value?: string;
  onChange: (name: string, value: string) => void;
  error?: string;
  disabled?: boolean;
  width?: number;
  height?: number;
  penColor?: string;
  penWidth?: number;
  backgroundColor?: string;
}

export const FormFieldSignature: React.FC<FormFieldSignatureProps> = ({
  name,
  label,
  value,
  onChange,
  error,
  disabled = false,
  width = 400,
  height = 150,
  penColor = "#1e293b",
  penWidth = 2,
  backgroundColor = "#ffffff",
  className = "",
  style,
  ...rest
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const getPos = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }, []);

  const startDraw = useCallback((e: React.MouseEvent) => {
    if (disabled) return;
    setIsDrawing(true);
    const { x, y } = getPos(e);
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) { ctx.beginPath(); ctx.moveTo(x, y); }
  }, [disabled, getPos]);

  const draw = useCallback((e: React.MouseEvent) => {
    if (!isDrawing || disabled) return;
    const { x, y } = getPos(e);
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
      ctx.strokeStyle = penColor;
      ctx.lineWidth = penWidth;
      ctx.lineCap = "round";
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  }, [isDrawing, disabled, getPos, penColor, penWidth]);

  const endDraw = useCallback(() => {
    setIsDrawing(false);
    if (canvasRef.current) onChange(name, canvasRef.current.toDataURL());
  }, [name, onChange]);

  const clear = useCallback(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx && canvasRef.current) {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
    onChange(name, "");
  }, [name, onChange, backgroundColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx && value) {
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0);
      img.src = value;
    }
  }, [value]);

  return (
    <div className={`tf-form-field-signature ${error ? "tf-form-field--error" : ""} ${className}`} style={style} data-testid={`form-field-signature-${name}`} {...rest}>
      {label && <label className="tf-form-field__label">{label}</label>}
      <div className="tf-form-field-signature__pad">
        <canvas
          ref={canvasRef}
          className="tf-form-field-signature__canvas"
          width={width}
          height={height}
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={endDraw}
          onMouseLeave={endDraw}
          style={{ backgroundColor, cursor: disabled ? "not-allowed" : "crosshair" }}
        />
        {!disabled && <button type="button" className="tf-form-field-signature__clear" onClick={clear}>Clear</button>}
      </div>
      {error && <span className="tf-form-field__error">{error}</span>}
    </div>
  );
};

FormFieldSignature.displayName = "FormFieldSignature";
export default FormFieldSignature;
