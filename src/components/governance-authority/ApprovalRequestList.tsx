/**
 * @fileoverview ApprovalRequestList — List of pending approvals.
 *
 * Displays a filterable list of approval requests grouped by status.
 * Supports batch actions and quick filtering by priority.
 */

import React, { useState, useMemo } from "react";
import { ApprovalRequest } from "./types";
import { GovernanceComponentBaseProps } from "./types";
import ApprovalRequestCard from "./ApprovalRequestCard";

export interface ApprovalRequestListProps extends GovernanceComponentBaseProps {
  requests: ApprovalRequest[];
  onApprove?: (requestId: string, comment: string) => void;
  onReject?: (requestId: string, comment: string) => void;
  onDelegate?: (requestId: string, delegateTo: string, comment: string) => void;
}

/**
 * ApprovalRequestList renders a list of pending approval requests.
 */
const ApprovalRequestList: React.FC<ApprovalRequestListProps> = ({
  requests,
  onApprove,
  onReject,
  onDelegate,
  className = "",
  "data-testid": dataTestId = "approval-request-list",
}) => {
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");

  const filtered = useMemo(() => {
    if (filter === "all") return requests;
    return requests.filter((r) => r.status === filter);
  }, [requests, filter]);

  return (
    <div
      className={`tf-approval-request-list ${className}`.trim()}
      data-testid={dataTestId}
    >
      <div className="tf-approval-request-list__toolbar">
        {(["all", "pending", "approved", "rejected"] as const).map((f) => (
          <button
            key={f}
            type="button"
            className={`tf-approval-request-list__filter ${
              filter === f ? "tf-approval-request-list__filter--active" : ""
            }`}
            onClick={() => setFilter(f)}
            data-testid={`approval-filter-${f}`}
          >
            {f.toUpperCase()} ({f === "all" ? requests.length : requests.filter((r) => r.status === f).length})
          </button>
        ))}
      </div>
      <div className="tf-approval-request-list__items">
        {filtered.map((req) => (
          <ApprovalRequestCard
            key={req.id}
            request={req}
            onApprove={onApprove}
            onReject={onReject}
            onDelegate={onDelegate}
          />
        ))}
      </div>
    </div>
  );
};

ApprovalRequestList.displayName = "ApprovalRequestList";

export default ApprovalRequestList;
