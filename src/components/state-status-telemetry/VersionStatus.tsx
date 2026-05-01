/**
 * ============================================================
 * VersionStatus — Torafirma Design System
 * ============================================================
 *
 * Component or system version display. Shows version number,
 * build info, and whether an update is available.
 *
 * From 03.2 State, Status & Telemetry
 * ============================================================
 */

import React from 'react';

/**
 * Props for the VersionStatus component.
 */
export interface VersionStatusProps {
  /** Current version string. */
  version: string;
  /** Build number or hash. */
  build?: string;
  /** Build timestamp. */
  builtAt?: string;
  /** Component or system name. */
  name?: string;
  /** Whether a newer version is available. */
  updateAvailable?: boolean;
  /** Available version string. */
  availableVersion?: string;
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

/**
 * VersionStatus renders version and build information.
 *
 * @example
 * ```tsx
 * <VersionStatus version="2.4.1" build="a1b2c3d" builtAt="2024-01-15T02:00:00Z" name="Torafirma Core" />
 * <VersionStatus version="2.3.0" updateAvailable={true} availableVersion="2.4.1" />
 * ```
 */
export const VersionStatus: React.FC<VersionStatusProps> = ({
  version,
  build,
  builtAt,
  name,
  updateAvailable,
  availableVersion,
  className = '',
  testId,
}) => {
  return (
    <div
      className={`tf-version-status ${updateAvailable ? 'tf-version-status--update-available' : ''} ${className}`}
      data-testid={testId}
      data-version={version}
      role="status"
      aria-label={`${name || 'Version'} ${version}${updateAvailable ? `, update to ${availableVersion} available` : ''}`}
    >
      {name && <span className="tf-version-status__name">{name}</span>}
      <span className="tf-version-status__version">v{version}</span>
      {build && <span className="tf-version-status__build">({build})</span>}
      {builtAt && <span className="tf-version-status__built">Built: {builtAt}</span>}
      {updateAvailable && availableVersion && (
        <span className="tf-version-status__update">
          Update available: v{availableVersion}
        </span>
      )}
    </div>
  );
};

VersionStatus.displayName = 'VersionStatus';

export default VersionStatus;
