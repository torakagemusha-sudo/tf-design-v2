/**
 * @fileoverview ApprovalDelegationPicker — Delegate to another user.
 *
 * User picker for delegating an approval step to another person.
 * Shows eligible users with their roles and authority levels.
 */

import React from "react";
import { GovernanceComponentBaseProps } from "./types";

export interface ApprovalDelegationPickerProps extends GovernanceComponentBaseProps {
  users: { id: string; name: string; role: string; authorityLevel: number }[];
  selected?: string;
  onSelect: (userId: string) => void;
}

/**
 * ApprovalDelegationPicker renders a user picker for delegation.
 */
const ApprovalDelegationPicker: React.FC<ApprovalDelegationPickerProps> = ({
  users,
  selected,
  onSelect,
  className = "",
  "data-testid": dataTestId = "approval-delegation-picker",
}) => (
  <div
    className={`tf-approval-delegation-picker ${className}`.trim()}
    data-testid={dataTestId}
  >
    <span className="tf-approval-delegation-picker__label">DELEGATE TO</span>
    <ul className="tf-approval-delegation-users">
      {users.map((user) => (
        <li
          key={user.id}
          className={`tf-approval-delegation-user ${
            selected === user.id ? "tf-approval-delegation-user--selected" : ""
          }`}
          onClick={() => onSelect(user.id)}
          role="radio"
          aria-checked={selected === user.id}
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && onSelect(user.id)}
          data-testid={`delegate-user-${user.id}`}
        >
          <span className="tf-approval-delegation-user__name">{user.name}</span>
          <span className="tf-approval-delegation-user__role">{user.role}</span>
          <span className="tf-approval-delegation-user__authority">
            AUTH {user.authorityLevel}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

ApprovalDelegationPicker.displayName = "ApprovalDelegationPicker";

export default ApprovalDelegationPicker;
