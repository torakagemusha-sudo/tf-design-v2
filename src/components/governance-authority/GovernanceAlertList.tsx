/**
 * @fileoverview GovernanceAlertList — Governance alerts.
 *
 * Displays a scrollable list of governance alerts with severity,
 * timestamp, and acknowledge action. Unacknowledged alerts are
 * visually emphasized.
 */

import React from "react";
import { GovernanceAlert } from "./types";
import { GovernanceComponentBaseProps } from "./types";

export interface GovernanceAlertListProps extends GovernanceComponentBaseProps {
  alerts: GovernanceAlert[];
  onAcknowledge?: (alertId: string) => void;
}

const severityClassMap: Record<string, string> = {
  info: "tf-governance-alert--info",
  notice: "tf-governance-alert--notice",
  warning: "tf-governance-alert--warning",
  critical: "tf-governance-alert--critical",
  emergency: "tf-governance-alert--emergency",
};

/**
 * GovernanceAlertList renders a list of governance alerts.
 */
const GovernanceAlertList: React.FC<GovernanceAlertListProps> = ({
  alerts,
  onAcknowledge,
  className = "",
  "data-testid": dataTestId = "governance-alert-list",
}) => (
  <div
    className={`tf-governance-alert-list ${className}`.trim()}
    data-testid={dataTestId}
  >
    <span className="tf-governance-alert-list__label">
      ALERTS ({alerts.filter((a) => !a.acknowledged).length} UNACK)
    </span>
    <ul className="tf-governance-alerts">
      {alerts.map((alert) => (
        <li
          key={alert.id}
          className={`tf-governance-alert ${severityClassMap[alert.severity]} ${
            alert.acknowledged ? "tf-governance-alert--ack" : "tf-governance-alert--unack"
          }`}
          data-testid={`governance-alert-${alert.id}`}
        >
          <span className="tf-governance-alert__severity">
            {alert.severity.toUpperCase()}
          </span>
          <span className="tf-governance-alert__category">
            {alert.category.toUpperCase()}
          </span>
          <span className="tf-governance-alert__title">{alert.title}</span>
          <span className="tf-governance-alert__message">{alert.message}</span>
          <time className="tf-governance-alert__time">{alert.createdAt}</time>
          {!alert.acknowledged && onAcknowledge && (
            <button
              type="button"
              className="tf-btn tf-btn--ack"
              onClick={() => onAcknowledge(alert.id)}
              data-testid={`alert-ack-${alert.id}`}
            >
              ACKNOWLEDGE
            </button>
          )}
        </li>
      ))}
    </ul>
  </div>
);

GovernanceAlertList.displayName = "GovernanceAlertList";

export default GovernanceAlertList;
