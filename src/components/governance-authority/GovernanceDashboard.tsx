/**
 * @fileoverview GovernanceDashboard — Overview dashboard.
 *
 * High-level governance dashboard showing stats, alerts, violations,
 * compliance score, and risk indicators. Aggregated view of the
 * governance posture across the system.
 *
 * Torafirma Governance Component — Authority Gold / Dark Theme
 */

import React from "react";
import {
  GovernanceStat,
  GovernanceAlert,
  PolicyViolation,
  ComplianceScore,
  RiskIndicator,
} from "./types";
import { GovernanceComponentBaseProps } from "./types";
import GovernanceStatsCard from "./GovernanceStatsCard";
import GovernanceAlertList from "./GovernanceAlertList";
import GovernanceViolationCard from "./GovernanceViolationCard";
import GovernanceComplianceMeter from "./GovernanceComplianceMeter";
import GovernanceRiskIndicator from "./GovernanceRiskIndicator";

export interface GovernanceDashboardProps extends GovernanceComponentBaseProps {
  stats: GovernanceStat[];
  alerts: GovernanceAlert[];
  violations: PolicyViolation[];
  compliance: ComplianceScore;
  risk: RiskIndicator;
  onAcknowledgeAlert?: (alertId: string) => void;
  onResolveViolation?: (violationId: string) => void;
}

/**
 * GovernanceDashboard renders the governance overview surface.
 */
const GovernanceDashboard: React.FC<GovernanceDashboardProps> = ({
  stats,
  alerts,
  violations,
  compliance,
  risk,
  onAcknowledgeAlert,
  onResolveViolation,
  className = "",
  "data-testid": dataTestId = "governance-dashboard",
}) => (
  <div
    className={`tf-governance-dashboard ${className}`.trim()}
    data-testid={dataTestId}
  >
    <header className="tf-governance-dashboard__header">
      <h2 className="tf-governance-dashboard__title">GOVERNANCE DASHBOARD</h2>
      <span className="tf-governance-dashboard__timestamp">
        {new Date().toISOString()}
      </span>
    </header>

    <section className="tf-governance-dashboard__stats">
      <GovernanceStatsCard stats={stats} />
    </section>

    <section className="tf-governance-dashboard__meters">
      <GovernanceComplianceMeter score={compliance} />
      <GovernanceRiskIndicator risk={risk} />
    </section>

    <section className="tf-governance-dashboard__alerts">
      <GovernanceAlertList alerts={alerts} onAcknowledge={onAcknowledgeAlert} />
    </section>

    <section className="tf-governance-dashboard__violations">
      <span className="tf-governance-dashboard__section-label">VIOLATIONS</span>
      <div className="tf-governance-dashboard__violation-cards">
        {violations.map((v) => (
          <GovernanceViolationCard
            key={v.id}
            violation={v}
            onResolve={onResolveViolation}
          />
        ))}
      </div>
    </section>
  </div>
);

GovernanceDashboard.displayName = "GovernanceDashboard";

export default GovernanceDashboard;
