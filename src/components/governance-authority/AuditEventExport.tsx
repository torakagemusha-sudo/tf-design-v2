/**
 * @fileoverview AuditEventExport — Export audit trail.
 *
 * Provides format selection and triggers export of the current
 * filtered audit event set.
 */

import React, { useState } from "react";
import { GovernanceComponentBaseProps } from "./types";

export interface AuditEventExportProps extends GovernanceComponentBaseProps {
  onExport: (format: "json" | "csv" | "pdf") => void;
  eventCount: number;
}

/**
 * AuditEventExport renders export controls for the audit trail.
 */
const AuditEventExport: React.FC<AuditEventExportProps> = ({
  onExport,
  eventCount,
  className = "",
  "data-testid": dataTestId = "audit-event-export",
}) => {
  const [format, setFormat] = useState<"json" | "csv" | "pdf">("json");

  return (
    <div
      className={`tf-audit-event-export ${className}`.trim()}
      data-testid={dataTestId}
    >
      <span className="tf-audit-event-export__count">
        {eventCount} EVENTS SELECTED
      </span>
      <div className="tf-audit-event-export__formats">
        {(["json", "csv", "pdf"] as const).map((f) => (
          <button
            key={f}
            type="button"
            className={`tf-audit-export-format ${
              format === f ? "tf-audit-export-format--active" : ""
            }`}
            onClick={() => setFormat(f)}
            data-testid={`export-format-${f}`}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="tf-btn tf-btn--export"
        onClick={() => onExport(format)}
        data-testid="audit-export-submit"
      >
        EXPORT AUDIT TRAIL
      </button>
    </div>
  );
};

AuditEventExport.displayName = "AuditEventExport";

export default AuditEventExport;
