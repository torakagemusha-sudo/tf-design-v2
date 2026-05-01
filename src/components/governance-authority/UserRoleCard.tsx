/**
 * @fileoverview UserRoleCard — User role assignment.
 *
 * Displays a user's assigned roles, effective authority level,
 * and role provenance. Supports removing roles.
 */

import React from "react";
import { UserRole, AUTHORITY_LEVELS } from "./types";
import { GovernanceComponentBaseProps } from "./types";

export interface UserRoleCardProps extends GovernanceComponentBaseProps {
  userRole: UserRole;
  onRemoveRole?: (userId: string, roleId: string) => void;
}

/**
 * UserRoleCard renders a user's role assignment card.
 */
const UserRoleCard: React.FC<UserRoleCardProps> = ({
  userRole,
  onRemoveRole,
  className = "",
  "data-testid": dataTestId = "user-role-card",
}) => (
  <div
    className={`tf-user-role-card ${className}`.trim()}
    data-testid={dataTestId}
  >
    <div className="tf-user-role-card__identity">
      <span className="tf-user-role-card__name">{userRole.userName}</span>
      <span className="tf-user-role-card__id">{userRole.userId}</span>
    </div>
    <div className="tf-user-role-card__authority">
      <span className="tf-user-role-card__auth-label">EFFECTIVE AUTHORITY</span>
      <span className="tf-user-role-card__auth-value">
        AUTH {userRole.effectiveAuthority} ·{" "}
        {AUTHORITY_LEVELS[userRole.effectiveAuthority]}
      </span>
    </div>
    <div className="tf-user-role-card__roles">
      <span className="tf-user-role-card__roles-label">ASSIGNED ROLES</span>
      <ul className="tf-user-role-card__role-list">
        {userRole.roles.map((role) => (
          <li key={role.id} className="tf-user-role-card__role">
            <span className="tf-user-role-card__role-name">{role.name}</span>
            <span className="tf-user-role-card__role-auth">
              AUTH {role.authorityLevel}
            </span>
            {onRemoveRole && (
              <button
                type="button"
                className="tf-btn tf-btn--remove"
                onClick={() => onRemoveRole(userRole.userId, role.id)}
                data-testid={`remove-role-${role.id}`}
                aria-label={`Remove role ${role.name}`}
              >
                ✕
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
    <div className="tf-user-role-card__provenance">
      <span className="tf-user-role-card__granted">
        GRANTED {userRole.grantedAt} BY {userRole.grantedBy}
      </span>
    </div>
  </div>
);

UserRoleCard.displayName = "UserRoleCard";

export default UserRoleCard;
