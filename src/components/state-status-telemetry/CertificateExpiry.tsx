/**
 * ============================================================
 * CertificateExpiry — Torafirma Design System
 * ============================================================
 *
 * SSL certificate expiry warning. Shows certificate subject,
 * expiry date, days remaining, and alert status.
 *
 * From 03.2 State, Status & Telemetry
 * ============================================================
 */

import React from 'react';

/**
 * Props for the CertificateExpiry component.
 */
export interface CertificateExpiryProps {
  /** Certificate subject or domain. */
  subject: string;
  /** Expiry date string. */
  expiresAt: string;
  /** Days until expiry. */
  daysRemaining: number;
  /** Certificate issuer. */
  issuer?: string;
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

/**
 * CertificateExpiry renders an SSL certificate expiry warning.
 *
 * @example
 * ```tsx
 * <CertificateExpiry subject="*.example.com" expiresAt="2024-06-15" daysRemaining={45} issuer="Let's Encrypt" />
 * <CertificateExpiry subject="api.example.com" expiresAt="2024-02-01" daysRemaining={5} />
 * ```
 */
export const CertificateExpiry: React.FC<CertificateExpiryProps> = ({
  subject,
  expiresAt,
  daysRemaining,
  issuer,
  className = '',
  testId,
}) => {
  const variant = daysRemaining <= 7 ? 'danger' : daysRemaining <= 30 ? 'warning' : 'run';

  return (
    <div
      className={`tf-certificate-expiry tf-certificate-expiry--${variant} ${className}`}
      data-testid={testId}
      data-days-remaining={daysRemaining}
      role="status"
      aria-label={`Certificate ${subject} expires in ${daysRemaining} days`}
    >
      <span className="tf-certificate-expiry__icon" aria-hidden="true">&#x1F510;</span>
      <div className="tf-certificate-expiry__content">
        <span className="tf-certificate-expiry__subject">{subject}</span>
        <span className={`tf-certificate-expiry__days tf-certificate-expiry__days--${variant}`}>
          {daysRemaining} day{daysRemaining !== 1 ? 's' : ''} remaining
        </span>
        <span className="tf-certificate-expiry__expires">Expires: {expiresAt}</span>
        {issuer && <span className="tf-certificate-expiry__issuer">{issuer}</span>}
      </div>
    </div>
  );
};

CertificateExpiry.displayName = 'CertificateExpiry';

export default CertificateExpiry;
