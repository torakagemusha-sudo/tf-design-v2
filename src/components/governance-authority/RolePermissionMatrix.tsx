/**
 * @fileoverview RolePermissionMatrix — Role vs permission matrix.
 *
 * Displays a matrix of roles (rows) vs permissions (columns) with
 * cells indicating granted/inherited/denied. Supports bulk editing
 * and shows effective authority per role.
 *
 * Torafirma Governance Component — Authority Gold / Dark Theme
 */

import React from "react";
import { Role, Permission, PermissionMatrixCell } from "./types";
import { GovernanceComponentBaseProps } from "./types";
import RolePermissionCell from "./RolePermissionCell";

export interface RolePermissionMatrixProps extends GovernanceComponentBaseProps {
  roles: Role[];
  permissions: Permission[];
  cells: PermissionMatrixCell[];
  onToggle?: (roleId: string, permissionId: string) => void;
}

/**
 * RolePermissionMatrix renders the full role-permission matrix.
 */
const RolePermissionMatrix: React.FC<RolePermissionMatrixProps> = ({
  roles,
  permissions,
  cells,
  onToggle,
  className = "",
  "data-testid": dataTestId = "role-permission-matrix",
}) => {
  const isGranted = (roleId: string, permId: string): boolean => {
    const cell = cells.find((c) => c.roleId === roleId && c.permissionId === permId);
    return cell?.granted ?? false;
  };

  const isInherited = (roleId: string, permId: string): boolean => {
    const cell = cells.find((c) => c.roleId === roleId && c.permissionId === permId);
    return cell?.inherited ?? false;
  };

  return (
    <div
      className={`tf-role-permission-matrix ${className}`.trim()}
      data-testid={dataTestId}
    >
      <div className="tf-role-permission-matrix__scroll">
        <table className="tf-role-permission-matrix__table">
          <thead>
            <tr>
              <th className="tf-role-permission-matrix__corner">ROLE / PERMISSION</th>
              {permissions.map((perm) => (
                <th
                  key={perm.id}
                  className="tf-role-permission-matrix__col-header"
                  title={perm.description}
                >
                  <span className="tf-role-permission-matrix__perm-label">
                    {perm.label}
                  </span>
                  <span className="tf-role-permission-matrix__perm-cat">
                    {perm.category}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.id}>
                <th className="tf-role-permission-matrix__row-header">
                  <span className="tf-role-permission-matrix__role-name">
                    {role.name}
                  </span>
                  <span className="tf-role-permission-matrix__role-auth">
                    AUTH {role.authorityLevel}
                  </span>
                </th>
                {permissions.map((perm) => (
                  <RolePermissionCell
                    key={`${role.id}-${perm.id}`}
                    granted={isGranted(role.id, perm.id)}
                    inherited={isInherited(role.id, perm.id)}
                    onToggle={onToggle ? () => onToggle(role.id, perm.id) : undefined}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

RolePermissionMatrix.displayName = "RolePermissionMatrix";

export default RolePermissionMatrix;
