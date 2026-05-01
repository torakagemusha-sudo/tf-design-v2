/**
 * @fileoverview OverridePanelHeader — Override panel header.
 *
 * Shows the operation being overridden and the target object.
 */

import React from "react";
import { GovernanceComponentBaseProps } from "./types";

export interface OverridePanelHeaderProps extends GovernanceComponentBaseProps {
  operation: string;
  target: string;
}

/**
 * OverridePanelHeader renders the panel title with operation context.
 */
const OverridePanelHeader: React.FC<OverridePanelHeaderProps> = ({
  operation,
  target,
  className = "",
  "data-testid": dataTestId = "override-panel-header",
}) => (
  <div
    className={`tf-override-panel-header ${className}`.trim()}
    data-testid={dataTestId}
  >
    <span className="tf-override-panel-header__icon">🔐</span>
    <h3 className="tf-override-panel-header__title">REQUEST AUTHORITY OVERRIDE</h3>
    <div className="tf-override-panel-header__context">
      <span className="tf-override-panel-header__label">OPERATION</span>
      <span className="tf-override-panel-header__value">{operation}</span>
      <span className="tf-override-panel-header__label">TARGET</span>
      <span className="tf-override-panel-header__value">{target}</span>
    </div>
  </div>
);

OverridePanelHeader.displayName = "OverridePanelHeader";

export default OverridePanelHeader;
