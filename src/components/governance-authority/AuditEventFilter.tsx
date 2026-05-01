/**
 * @fileoverview AuditEventFilter — Filter audit events.
 *
 * Provides category and severity checkboxes for narrowing the
 * audit event list.
 */

import React from "react";
import { AuditEventFilter, AuditEventCategory, AuditEventSeverity } from "./types";
import { GovernanceComponentBaseProps } from "./types";

export interface AuditEventFilterProps extends GovernanceComponentBaseProps {
  filter: AuditEventFilter;
  onChange: (filter: AuditEventFilter) => void;
}

const CATEGORIES: AuditEventCategory[] = [
  "authentication",
  "authorization",
  "policy",
  "execution",
  "override",
  "delegation",
  "escalation",
  "violation",
  "compliance",
  "system",
];

const SEVERITIES: AuditEventSeverity[] = [
  "info",
  "notice",
  "warning",
  "critical",
  "emergency",
];

/**
 * AuditEventFilter renders filter controls for the audit event list.
 */
const AuditEventFilterComp: React.FC<AuditEventFilterProps> = ({
  filter,
  onChange,
  className = "",
  "data-testid": dataTestId = "audit-event-filter",
}) => {
  const toggleCategory = (cat: AuditEventCategory) => {
    const cats = filter.categories.includes(cat)
      ? filter.categories.filter((c) => c !== cat)
      : [...filter.categories, cat];
    onChange({ ...filter, categories: cats });
  };

  const toggleSeverity = (sev: AuditEventSeverity) => {
    const sevs = filter.severities.includes(sev)
      ? filter.severities.filter((s) => s !== sev)
      : [...filter.severities, sev];
    onChange({ ...filter, severities: sevs });
  };

  return (
    <div
      className={`tf-audit-event-filter ${className}`.trim()}
      data-testid={dataTestId}
    >
      <details className="tf-audit-event-filter__details">
        <summary className="tf-audit-event-filter__summary">FILTER</summary>
        <div className="tf-audit-event-filter__section">
          <span className="tf-audit-event-filter__label">CATEGORY</span>
          {CATEGORIES.map((cat) => (
            <label key={cat} className="tf-audit-event-filter__option">
              <input
                type="checkbox"
                checked={filter.categories.includes(cat)}
                onChange={() => toggleCategory(cat)}
                data-testid={`filter-cat-${cat}`}
              />
              {cat.toUpperCase()}
            </label>
          ))}
        </div>
        <div className="tf-audit-event-filter__section">
          <span className="tf-audit-event-filter__label">SEVERITY</span>
          {SEVERITIES.map((sev) => (
            <label key={sev} className="tf-audit-event-filter__option">
              <input
                type="checkbox"
                checked={filter.severities.includes(sev)}
                onChange={() => toggleSeverity(sev)}
                data-testid={`filter-sev-${sev}`}
              />
              {sev.toUpperCase()}
            </label>
          ))}
        </div>
      </details>
    </div>
  );
};

AuditEventFilterComp.displayName = "AuditEventFilter";

export default AuditEventFilterComp;
