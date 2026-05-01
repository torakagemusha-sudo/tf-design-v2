/**
 * @fileoverview GovernanceReportViewer — View generated report.
 *
 * Displays a generated governance report with metadata, download
 * link, and preview of report contents.
 */

import React from "react";
import { GovernanceReport } from "./types";
import { GovernanceComponentBaseProps } from "./types";

export interface GovernanceReportViewerProps extends GovernanceComponentBaseProps {
  report: GovernanceReport;
  onDownload?: (reportId: string) => void;
}

const statusClassMap: Record<string, string> = {
  generating: "tf-report-viewer--generating",
  ready: "tf-report-viewer--ready",
  failed: "tf-report-viewer--failed",
};

/**
 * GovernanceReportViewer renders a generated report card.
 */
const GovernanceReportViewer: React.FC<GovernanceReportViewerProps> = ({
  report,
  onDownload,
  className = "",
  "data-testid": dataTestId = "governance-report-viewer",
}) => (
  <div
    className={`tf-governance-report-viewer ${statusClassMap[report.status]} ${className}`.trim()}
    data-testid={dataTestId}
  >
    <div className="tf-governance-report-viewer__header">
      <h4 className="tf-governance-report-viewer__title">
        {report.config.title}
      </h4>
      <span className="tf-governance-report-viewer__status">
        {report.status.toUpperCase()}
      </span>
    </div>
    <dl className="tf-governance-report-viewer__meta">
      <div className="tf-governance-report-viewer__field">
        <dt>PERIOD</dt>
        <dd>{report.config.period}</dd>
      </div>
      <div className="tf-governance-report-viewer__field">
        <dt>FORMAT</dt>
        <dd>{report.config.format.toUpperCase()}</dd>
      </div>
      <div className="tf-governance-report-viewer__field">
        <dt>GENERATED</dt>
        <dd>{report.generatedAt}</dd>
      </div>
      <div className="tf-governance-report-viewer__field">
        <dt>BY</dt>
        <dd>{report.generatedBy}</dd>
      </div>
      {report.size && (
        <div className="tf-governance-report-viewer__field">
          <dt>SIZE</dt>
          <dd>{(report.size / 1024).toFixed(1)} KB</dd>
        </div>
      )}
    </dl>
    <div className="tf-governance-report-viewer__sections">
      {report.config.includeAuditTrail && <span className="tf-report-section-tag">AUDIT</span>}
      {report.config.includeViolations && <span className="tf-report-section-tag">VIOLATIONS</span>}
      {report.config.includeCompliance && <span className="tf-report-section-tag">COMPLIANCE</span>}
      {report.config.includeRisk && <span className="tf-report-section-tag">RISK</span>}
      {report.config.includeRoles && <span className="tf-report-section-tag">ROLES</span>}
    </div>
    {report.status === "ready" && report.url && onDownload && (
      <button
        type="button"
        className="tf-btn tf-btn--download"
        onClick={() => onDownload(report.id)}
        data-testid="report-download-btn"
      >
        DOWNLOAD REPORT
      </button>
    )}
    {report.status === "failed" && (
      <span className="tf-governance-report-viewer__error">
        REPORT GENERATION FAILED. RETRY OR CONTACT ADMINISTRATOR.
      </span>
    )}
  </div>
);

GovernanceReportViewer.displayName = "GovernanceReportViewer";

export default GovernanceReportViewer;
