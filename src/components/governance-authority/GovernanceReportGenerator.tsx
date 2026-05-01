/**
 * @fileoverview GovernanceReportGenerator — Generate compliance report.
 *
 * Form for configuring and generating governance compliance reports.
 * Supports selecting sections, output format, and period.
 *
 * Torafirma Governance Component — Authority Gold / Dark Theme
 */

import React, { useState } from "react";
import { GovernanceReportConfig } from "./types";
import { GovernanceComponentBaseProps } from "./types";

export interface GovernanceReportGeneratorProps extends GovernanceComponentBaseProps {
  onGenerate: (config: GovernanceReportConfig) => void;
  loading?: boolean;
}

/**
 * GovernanceReportGenerator renders the report configuration form.
 */
const GovernanceReportGenerator: React.FC<GovernanceReportGeneratorProps> = ({
  onGenerate,
  loading = false,
  className = "",
  "data-testid": dataTestId = "governance-report-generator",
}) => {
  const [config, setConfig] = useState<GovernanceReportConfig>({
    title: "Governance Compliance Report",
    period: "last-30-days",
    includeAuditTrail: true,
    includeViolations: true,
    includeCompliance: true,
    includeRisk: true,
    includeRoles: false,
    format: "pdf",
  });

  const toggle = (key: keyof GovernanceReportConfig) => {
    setConfig((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div
      className={`tf-governance-report-generator ${className}`.trim()}
      data-testid={dataTestId}
    >
      <h3 className="tf-governance-report-generator__title">GENERATE REPORT</h3>

      <div className="tf-governance-report-generator__field">
        <label htmlFor="report-title">TITLE</label>
        <input
          id="report-title"
          type="text"
          value={config.title}
          onChange={(e) => setConfig({ ...config, title: e.target.value })}
          data-testid="report-title-input"
        />
      </div>

      <div className="tf-governance-report-generator__field">
        <label htmlFor="report-period">PERIOD</label>
        <select
          id="report-period"
          value={config.period}
          onChange={(e) => setConfig({ ...config, period: e.target.value })}
          data-testid="report-period-select"
        >
          <option value="last-24-hours">LAST 24 HOURS</option>
          <option value="last-7-days">LAST 7 DAYS</option>
          <option value="last-30-days">LAST 30 DAYS</option>
          <option value="last-90-days">LAST 90 DAYS</option>
          <option value="custom">CUSTOM</option>
        </select>
      </div>

      <div className="tf-governance-report-generator__sections">
        <span className="tf-governance-report-generator__label">INCLUDE SECTIONS</span>
        {(
          [
            ["includeAuditTrail", "AUDIT TRAIL"] as const,
            ["includeViolations", "VIOLATIONS"] as const,
            ["includeCompliance", "COMPLIANCE SCORE"] as const,
            ["includeRisk", "RISK INDICATOR"] as const,
            ["includeRoles", "ROLE ASSIGNMENTS"] as const,
          ] as const
        ).map(([key, label]) => (
          <label key={key} className="tf-governance-report-generator__checkbox">
            <input
              type="checkbox"
              checked={config[key]}
              onChange={() => toggle(key)}
              data-testid={`report-section-${key}`}
            />
            {label}
          </label>
        ))}
      </div>

      <div className="tf-governance-report-generator__formats">
        <span className="tf-governance-report-generator__label">FORMAT</span>
        {(["pdf", "json", "csv"] as const).map((fmt) => (
          <button
            key={fmt}
            type="button"
            className={`tf-report-format ${
              config.format === fmt ? "tf-report-format--selected" : ""
            }`}
            onClick={() => setConfig({ ...config, format: fmt })}
            data-testid={`report-format-${fmt}`}
          >
            {fmt.toUpperCase()}
          </button>
        ))}
      </div>

      <button
        type="button"
        className="tf-btn tf-btn--generate"
        disabled={loading}
        onClick={() => onGenerate(config)}
        data-testid="report-generate-btn"
      >
        {loading ? "GENERATING…" : "GENERATE REPORT"}
      </button>
    </div>
  );
};

GovernanceReportGenerator.displayName = "GovernanceReportGenerator";

export default GovernanceReportGenerator;
