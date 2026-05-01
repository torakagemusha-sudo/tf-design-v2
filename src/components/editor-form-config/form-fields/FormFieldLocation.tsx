import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * FormFieldLocation — location picker with coordinate inputs and map placeholder.
 *
 * @example
 * <FormFieldLocation name="location" label="Location" value={{lat:40.7,lng:-74}} onChange={handleChange} />
 */
export interface FormFieldLocationProps extends BaseComponentProps {
  name: string;
  label?: string;
  value?: { lat?: number; lng?: number; address?: string };
  onChange: (name: string, value: FormFieldLocationProps["value"]) => void;
  error?: string;
  disabled?: boolean;
  readonly?: boolean;
  /** Enable geolocation button */
  enableGeolocation?: boolean;
}

export const FormFieldLocation: React.FC<FormFieldLocationProps> = ({
  name,
  label,
  value = {},
  onChange,
  error,
  disabled = false,
  readonly = false,
  enableGeolocation = true,
  className = "",
  style,
  ...rest
}) => {
  const handleGeolocate = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        onChange(name, { ...value, lat: pos.coords.latitude, lng: pos.coords.longitude });
      });
    }
  }, [name, value, onChange]);

  return (
    <div className={`tf-form-field-location ${error ? "tf-form-field--error" : ""} ${className}`} style={style} data-testid={`form-field-location-${name}`} {...rest}>
      {label && <label className="tf-form-field__label">{label}</label>}
      <div className="tf-form-field-location__inputs">
        <input
          className="tf-form-field-location__lat"
          type="number"
          placeholder="Latitude"
          value={value.lat ?? ""}
          onChange={e => onChange(name, { ...value, lat: Number(e.target.value) })}
          disabled={disabled}
          readOnly={readonly}
          step="any"
        />
        <input
          className="tf-form-field-location__lng"
          type="number"
          placeholder="Longitude"
          value={value.lng ?? ""}
          onChange={e => onChange(name, { ...value, lng: Number(e.target.value) })}
          disabled={disabled}
          readOnly={readonly}
          step="any"
        />
        {enableGeolocation && !readonly && (
          <button type="button" className="tf-form-field-location__geo" onClick={handleGeolocate} title="Get current location">📍</button>
        )}
      </div>
      <input
        className="tf-form-field-location__address"
        type="text"
        placeholder="Address"
        value={value.address ?? ""}
        onChange={e => onChange(name, { ...value, address: e.target.value })}
        disabled={disabled}
        readOnly={readonly}
      />
      <div className="tf-form-field-location__map">
        {value.lat && value.lng ? (
          <span className="tf-form-field-location__coords">{value.lat.toFixed(6)}, {value.lng.toFixed(6)}</span>
        ) : (
          <span className="tf-form-field-location__placeholder">Map view — enter coordinates</span>
        )}
      </div>
      {error && <span className="tf-form-field__error">{error}</span>}
    </div>
  );
};

FormFieldLocation.displayName = "FormFieldLocation";
export default FormFieldLocation;
