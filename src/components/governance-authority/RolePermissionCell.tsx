/**
 * @fileoverview RolePermissionCell — Single permission cell.
 *
 * One cell in the role-permission matrix. Shows granted/denied
 * state and whether the permission is inherited from a parent role.
 */

import React from "react";
import { GovernanceComponentBaseProps } from "./types";

export interface RolePermissionCellProps extends GovernanceComponentBaseProps {
  granted: boolean;
  inherited: boolean;
  onToggle?: () => void;
}

/**
 * RolePermissionCell renders a single matrix cell.
 */
const RolePermissionCell: React.FC<RolePermissionCellProps> = ({
  granted,
  inherited,
  onToggle,
  className = "",
  "data-testid": dataTestId = "role-permission-cell",
}) => (
  <td
    className={`tf-role-permission-cell ${
      granted ? "tf-role-permission-cell--granted" : "tf-role-permission-cell--denied"
    } ${inherited ? "tf-role-permission-cell--inherited" : ""} ${className}`.trim()}
    onClick={onToggle}
    role={onToggle ? "button" : undefined}
    tabIndex={onToggle ? 0 : undefined}
    onKeyDown={onToggle ? (e) => e.key === "Enter" && onToggle() : undefined}
    data-testid={dataTestId}
    title={inherited ? "Inherited permission" : granted ? "Granted" : "Denied"}
  >
    <span className="tf-role-permission-cell__indicator">
      {granted ? (inherited ? "◈" : "◉") : "○"}
    </span>
  </td>
);

RolePermissionCell.displayName = "RolePermissionCell";

export default RolePermissionCell;
