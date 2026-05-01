/**
 * @fileoverview InterlockNoticeDetails — Displays detailed interlock reasons.
 *
 * Lists each blocking reason with severity, source, and whether it is
 * resolvable. Used within InterlockNotice.
 */

import React from "react";
import { InterlockReason } from "./types";
import { GovernanceComponentBaseProps } from "./types";

export interface InterlockNoticeDetailsProps extends GovernanceComponentBaseProps {
  reasons: InterlockReason[];
}

const severityClassMap: Record<string, string> = {
  blocking: "tf-interlock-reason--blocking",
  warning: "tf-interlock-reason--warning",
};

/**
 * InterlockNoticeDetails renders the list of blocking reasons.
 */
const InterlockNoticeDetails: React.FC<InterlockNoticeDetailsProps> = ({
  reasons,
  className = "",
  "data-testid": dataTestId = "interlock-notice-details",
}) => (
  <div
    className={`tf-interlock-notice-details ${className}`.trim()}
    data-testid={dataTestId}
  >
    <span className="tf-interlock-notice-details__label">BLOCKING REASONS</span>
    <ul className="tf-interlock-reasons">
      {reasons.map((reason, i) => (
        <li
          key={`${reason.code}-${i}`}
          className={`tf-interlock-reason ${severityClassMap[reason.severity]}`}
        >
          <span className="tf-interlock-reason__code">{reason.code}</span>
          <span className="tf-interlock-reason__message">{reason.message}</span>
          <span className="tf-interlock-reason__source">{reason.source}</span>
          {reason.resolvable ? (
            <span className="tf-interlock-reason__resolvable">RESOLVABLE</span>
          ) : (
            <span className="tf-interlock-reason__unresolvable">NOT RESOLVABLE</span>
          )}
        </li>
      ))}
    </ul>
  </div>
);

InterlockNoticeDetails.displayName = "InterlockNoticeDetails";

export default InterlockNoticeDetails;
