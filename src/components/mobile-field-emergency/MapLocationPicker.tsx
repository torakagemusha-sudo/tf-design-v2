import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Props for MapLocationPicker.
 */
export interface MapLocationPickerProps {
  /** Currently selected coordinates. */
  selectedLatLng?: { lat: number; lng: number } | null;
  /** Called when user picks a location. */
  onLocationSelect: (lat: number, lng: number) => void;
  /** Initial map center. */
  defaultCenter?: { lat: number; lng: number };
  /** Geofence radius in metres (visual only). */
  radiusMeters?: number;
  /** Label for the picker. */
  label?: string;
  /** Confirm button text. */
  confirmLabel?: string;
  /** Cancel handler. */
  onCancel?: () => void;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * MapLocationPicker — pick location on map.
 *
 * Renders a map viewport with a crosshair for precise coordinate selection.
 * Displays selected coordinates in a read-out bar with confirm/cancel actions.
 * Optional geofence radius ring for patrol boundary definition.
 */
export const MapLocationPicker: React.FC<MapLocationPickerProps> = ({
  selectedLatLng,
  onLocationSelect,
  defaultCenter,
  radiusMeters,
  label = 'Tap map to set location',
  confirmLabel = 'Confirm Location',
  onCancel,
  className = '',
  testId,
}) => {
  const [activeLatLng, setActiveLatLng] = React.useState(selectedLatLng);

  const handleMapTap = () => {
    // In a real implementation, this would read the tap coordinates from the map.
    // Here we provide the interface contract.
    if (defaultCenter) {
      setActiveLatLng(defaultCenter);
      onLocationSelect(defaultCenter.lat, defaultCenter.lng);
    }
  };

  return (
    <div
      data-testid={testId}
      className={['tf-map-location-picker', className].join(' ')}
      role="application"
      aria-label="Location picker"
    >
      {/* Map viewport placeholder */}
      <div
        className="tf-map-location-picker__viewport"
        onClick={handleMapTap}
        role="button"
        tabIndex={0}
        aria-label={label}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleMapTap();
          }
        }}
      >
        {/* Crosshair */}
        <div className="tf-map-location-picker__crosshair" aria-hidden="true">
          <div className="tf-map-location-picker__crosshair-v" />
          <div className="tf-map-location-picker__crosshair-h" />
        </div>

        {/* Radius ring */}
        {radiusMeters && (
          <div
            className="tf-map-location-picker__radius-ring"
            aria-hidden="true"
          >
            <span className="tf-map-location-picker__radius-label">
              {radiusMeters}m
            </span>
          </div>
        )}
      </div>

      {/* Coordinate read-out */}
      <div className="tf-map-location-picker__readout">
        {activeLatLng ? (
          <>
            <span className="tf-map-location-picker__coords">
              {activeLatLng.lat.toFixed(6)}, {activeLatLng.lng.toFixed(6)}
            </span>
            <div className="tf-map-location-picker__actions">
              {onCancel && (
                <button
                  type="button"
                  className="tf-map-location-picker__btn tf-map-location-picker__btn--cancel"
                  onClick={onCancel}
                >
                  Cancel
                </button>
              )}
              <button
                type="button"
                className="tf-map-location-picker__btn tf-map-location-picker__btn--confirm"
                onClick={() =>
                  activeLatLng &&
                  onLocationSelect(activeLatLng.lat, activeLatLng.lng)
                }
              >
                {confirmLabel}
              </button>
            </div>
          </>
        ) : (
          <span className="tf-map-location-picker__hint">{label}</span>
        )}
      </div>
    </div>
  );
};

MapLocationPicker.displayName = 'MapLocationPicker';

export default MapLocationPicker;
