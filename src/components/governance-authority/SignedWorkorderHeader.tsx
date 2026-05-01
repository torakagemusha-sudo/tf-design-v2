/**
 * @fileoverview SignedWorkorderHeader — Workorder card header.
 *
 * Displays the workorder title, ID, priority badge, and status.
 */

import React from "react";
import { GovernanceComponentBaseProps } from "./types";

export interface SignedWorkorderHeaderProps extends GovernanceComponentBaseProps {
  title: string;
  status: string;
  priority: "low" | "medium" | "high" | "critical";
  id: string;
}

const priorityClassMap: Record<string, string> = {
  low: "tf-workorder-priority--low",
  medium: "tf-workorder-priority--medium",
  high: "tf-workorder-priority--high",
  critical: "tf-workorder-priority--critical",
};

const statusClassMap: Record<string, string> = {
  draft: "tf-workorder-status--draft",
  pending: "tf-workorder-status--pending",
  approved: "tf-workorder-status--approved",
  rejected: "tf-workorder-status--rejected",
  executed: "tf-workorder-status--executed",
  closed: "tf-workorder-status--closed",
};

/**
 * SignedWorkorderHeader renders the workorder title and status area.
 */
const SignedWorkorderHeader: React.FC<SignedWorkorderHeaderProps> = ({
  title,
  status,
  priority,
  id,
  className = "",
  "data-testid": dataTestId = "signed-workorder-header",
}) => (
  <header
    className={`tf-signed-workorder-header ${className}`.trim()}
    data-testid={dataTestId}
  >
    <div className="tf-signed-workorder-header__top">
      <span className="tf-signed-workorder-header__id">{id}</span>
      <span className={`tf-workorder-priority ${priorityClassMap[priority]}`}>
        {priority.toUpperCase()}
      </span>
      <span className={`tf-workorder-status ${statusClassMap[status]}`}>
        {status.toUpperCase()}
      </span>
    </div>
    <h3 className="tf-signed-workorder-header__title">{title}</h3>
  </header>
);

SignedWorkorderHeader.displayName = "SignedWorkorderHeader";

export default SignedWorkorderHeader;
