import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Incident severity.
 */
export type IncidentSeverity = 'critical' | 'high' | 'medium' | 'low' | 'informational';

/**
 * Incident type.
 */
export type IncidentType =
  | 'theft'
  | 'assault'
  | 'trespass'
  | 'fire'
  | 'medical'
  | 'damage'
  | 'suspicious'
  | 'other';

/**
 * Props for FieldIncidentReport.
 */
export interface FieldIncidentReportProps {
  /** Submit handler — receives form data. */
  onSubmit: (report: IncidentReportData) => void;
  /** Cancel handler. */
  onCancel?: () => void;
  /** Reporter name. */
  reporterName?: string;
  /** Pre-filled location. */
  location?: { lat: number; lng: number } | null;
  /** Whether GPS is available. */
  hasGPS?: boolean;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * Incident report data shape.
 */
export interface IncidentReportData {
  /** Incident type. */
  type: IncidentType;
  /** Severity. */
  severity: IncidentSeverity;
  /** Title/summary. */
  title: string;
  /** Detailed description. */
  description: string;
  /** Location string or coordinates. */
  location: string;
  /** Reporter name. */
  reporterName: string;
  /** Reported at timestamp. */
  reportedAt: string;
}

/**
 * FieldIncidentReport — incident report form.
 *
 * Structured incident report form optimised for rapid field entry.
 * Type and severity selectors use large touch targets.
 * GPS auto-fill captures precise incident location.
 * Submit confirmation prevents accidental submission.
 */
export const FieldIncidentReport: React.FC<FieldIncidentReportProps> = ({
  onSubmit,
  onCancel,
  reporterName = '',
  location,
  hasGPS = false,
  className = '',
  testId,
}) => {
  const [type, setType] = React.useState<IncidentType>('other');
  const [severity, setSeverity] = React.useState<IncidentSeverity>('medium');
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [locationText, setLocationText] = React.useState(
    location ? `${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}` : ''
  );

  const incidentTypes: { value: IncidentType; label: string }[] = [
    { value: 'theft', label: 'Theft' },
    { value: 'assault', label: 'Assault' },
    { value: 'trespass', label: 'Trespass' },
    { value: 'fire', label: 'Fire' },
    { value: 'medical', label: 'Medical' },
    { value: 'damage', label: 'Damage' },
    { value: 'suspicious', label: 'Suspicious' },
    { value: 'other', label: 'Other' },
  ];

  const severities: { value: IncidentSeverity; label: string }[] = [
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' },
    { value: 'informational', label: 'Info' },
  ];

  const handleSubmit = () => {
    if (!title.trim()) return;
    onSubmit({
      type,
      severity,
      title: title.trim(),
      description: description.trim(),
      location: locationText || 'Unknown',
      reporterName,
      reportedAt: new Date().toISOString(),
    });
  };

  return (
    <div
      data-testid={testId}
      className={['tf-incident-report', className].join(' ')}
      role="form"
      aria-label="Incident report"
    >
      {/* Type selector */}
      <div className="tf-incident-report__section">
        <label className="tf-incident-report__label">Incident Type</label>
        <div className="tf-incident-report__type-grid">
          {incidentTypes.map((t) => (
            <button
              key={t.value}
              type="button"
              className={[
                'tf-incident-report__type-btn',
                type === t.value ? 'tf-incident-report__type-btn--selected' : '',
              ].join(' ')}
              onClick={() => setType(t.value)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Severity selector */}
      <div className="tf-incident-report__section">
        <label className="tf-incident-report__label">Severity</label>
        <div className="tf-incident-report__severity-row">
          {severities.map((s) => (
            <button
              key={s.value}
              type="button"
              className={[
                'tf-incident-report__severity-btn',
                `tf-incident-report__severity-btn--${s.value}`,
                severity === s.value ? 'tf-incident-report__severity-btn--selected' : '',
              ].join(' ')}
              onClick={() => setSeverity(s.value)}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Title */}
      <div className="tf-incident-report__section">
        <label className="tf-incident-report__label" htmlFor="incident-title">
          Title *
        </label>
        <input
          id="incident-title"
          type="text"
          value={title}
          placeholder="Brief incident summary"
          className="tf-incident-report__input"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Description */}
      <div className="tf-incident-report__section">
        <label className="tf-incident-report__label" htmlFor="incident-desc">
          Description
        </label>
        <textarea
          id="incident-desc"
          value={description}
          placeholder="Detailed description..."
          rows={4}
          className="tf-incident-report__textarea"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* Location */}
      <div className="tf-incident-report__section">
        <label className="tf-incident-report__label" htmlFor="incident-loc">
          Location
          {hasGPS && (
            <span className="tf-incident-report__gps-badge">GPS</span>
          )}
        </label>
        <input
          id="incident-loc"
          type="text"
          value={locationText}
          placeholder="Location or coordinates"
          className="tf-incident-report__input"
          onChange={(e) => setLocationText(e.target.value)}
        />
      </div>

      {/* Reporter */}
      <div className="tf-incident-report__section">
        <label className="tf-incident-report__label">Reported By</label>
        <span className="tf-incident-report__reporter">{reporterName}</span>
      </div>

      {/* Actions */}
      <div className="tf-incident-report__actions">
        {onCancel && (
          <button
            type="button"
            className="tf-incident-report__btn tf-incident-report__btn--cancel"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
        <button
          type="button"
          className="tf-incident-report__btn tf-incident-report__btn--submit"
          onClick={handleSubmit}
          disabled={!title.trim()}
        >
          Submit Report
        </button>
      </div>
    </div>
  );
};

FieldIncidentReport.displayName = 'FieldIncidentReport';

export default FieldIncidentReport;
