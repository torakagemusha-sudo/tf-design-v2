/**
 * @fileoverview AuditEventItem — Single audit event row.
 *
 * Compact row rendering of an audit event with severity badge,
 * timestamp, actor, action, and target.
 */

import React from "react";
import { AuditEvent } from "./types";
import { GovernanceComponentBaseProps } from "./types";

export interface AuditEventItemProps extends GovernanceComponentBaseProps {
  event: AuditEvent;
  onSelect: () => void;
  selected?: boolean;
}

const severityClassMap: Record<string, string> = {
  info: "tf-audit-severity--info",
  notice: "tf-audit-severity--notice",
  warning: "tf-audit-severity--warning",
  critical: "tf-audit-severity--critical",
  emergency: "tf-audit-severity--emergency",
};

const resultClassMap: Record<string, string> = {
  success: "tf-audit-result--success",
  failure: "tf-audit-result--failure",
  blocked: "tf-audit-result--blocked",
  override: "tf-audit-result--override",
};

/**
 * AuditEventItem renders a single audit event row.
 */
const AuditEventItem: React.FC<AuditEventItemProps> = ({
  event,
  onSelect,
  selected = false,
  className = "",
  "data-testid": dataTestId = "audit-event-item",
}) => (
  <li
    className={`tf-audit-event-item ${selected ? "tf-audit-event-item--selected" : ""} ${className}`.trim()}
    onClick={onSelect}
    data-testid={dataTestId}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => e.key === "Enter" && onSelect()}
  >
    <span className={`tf-audit-event-item__severity ${severityClassMap[event.severity]}`}>
      {event.severity.toUpperCase()}
    </span>
    <span className="tf-audit-event-item__timestamp">{event.timestamp}</span>
    <span className="tf-audit-event-item__actor">{event.actor}</span>
    <span className="tf-audit-event-item__action">{event.action}</span>
    <span className="tf-audit-event-item__target">{event.target}</span>
    <span className={`tf-audit-event-item__result ${resultClassMap[event.result]}`}>
      {event.result.toUpperCase()}
    </span>
  </li>
);

AuditEventItem.displayName = "AuditEventItem";

export default AuditEventItem;
