/**
 * @fileoverview ApprovalChainConnector — Connector between steps.
 *
 * Visual connector line or branch indicator between approval steps.
 * Shows parallel vs sequential flow.
 */

import React from "react";
import { GovernanceComponentBaseProps } from "./types";

export interface ApprovalChainConnectorProps extends GovernanceComponentBaseProps {
  parallel: boolean;
}

/**
 * ApprovalChainConnector renders the connector between chain steps.
 */
const ApprovalChainConnector: React.FC<ApprovalChainConnectorProps> = ({
  parallel,
  className = "",
  "data-testid": dataTestId = "approval-chain-connector",
}) => (
  <div
    className={`tf-approval-connector ${
      parallel ? "tf-approval-connector--parallel" : "tf-approval-connector--sequential"
    } ${className}`.trim()}
    data-testid={dataTestId}
  >
    <div className="tf-approval-connector__line" />
    {parallel && (
      <span className="tf-approval-connector__label">PARALLEL</span>
    )}
  </div>
);

ApprovalChainConnector.displayName = "ApprovalChainConnector";

export default ApprovalChainConnector;
