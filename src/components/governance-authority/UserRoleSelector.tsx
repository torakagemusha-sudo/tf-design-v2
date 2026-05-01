/**
 * @fileoverview UserRoleSelector — Role selector dropdown.
 *
 * Dropdown for assigning roles to a user. Shows role name,
 * authority level, and description for each option.
 */

import React from "react";
import { Role, AUTHORITY_LEVELS } from "./types";
import { GovernanceComponentBaseProps } from "./types";

export interface UserRoleSelectorProps extends GovernanceComponentBaseProps {
  roles: Role[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

/**
 * UserRoleSelector renders a role assignment dropdown/multi-select.
 */
const UserRoleSelector: React.FC<UserRoleSelectorProps> = ({
  roles,
  selected,
  onChange,
  className = "",
  "data-testid": dataTestId = "user-role-selector",
}) => {
  const toggleRole = (roleId: string) => {
    const next = selected.includes(roleId)
      ? selected.filter((id) => id !== roleId)
      : [...selected, roleId];
    onChange(next);
  };

  return (
    <div
      className={`tf-user-role-selector ${className}`.trim()}
      data-testid={dataTestId}
    >
      <span className="tf-user-role-selector__label">ASSIGN ROLES</span>
      <div className="tf-user-role-selector__options">
        {roles.map((role) => {
          const isSelected = selected.includes(role.id);
          return (
            <label
              key={role.id}
              className={`tf-user-role-option ${
                isSelected ? "tf-user-role-option--selected" : ""
              }`}
              data-testid={`role-option-${role.id}`}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => toggleRole(role.id)}
              />
              <span className="tf-user-role-option__name">{role.name}</span>
              <span className="tf-user-role-option__auth">
                AUTH {role.authorityLevel} · {AUTHORITY_LEVELS[role.authorityLevel]}
              </span>
              <span className="tf-user-role-option__desc">{role.description}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

UserRoleSelector.displayName = "UserRoleSelector";

export default UserRoleSelector;
