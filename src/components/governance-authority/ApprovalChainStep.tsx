/**
 * @fileoverview ApprovalChainStep — Approval step.
 *
 * Displays and edits a single approval step: role, authority level,
 * assigned user, and status. Supports inline editing.
 */

import React from "react";
import { ApprovalStep } from "./types";
import { AUTHORITY_LEVELS } from "./types";
import { GovernanceComponentBaseProps } from "./types";

export interface ApprovalChainStepProps extends GovernanceComponentBaseProps {
  step: ApprovalStep;
  editing?: boolean;
  onEditToggle: () => void;
  onUpdate: (step: ApprovalStep) => void;
  onRemove: () => void;
}

const statusClassMap: Record<string, string> = {
  pending: "tf-approval-step--pending",
  approved: "tf-approval-step--approved",
  rejected: "tf-approval-step--rejected",
  delegated: "tf-approval-step--delegated",
  skipped: "tf-approval-step--skipped",
};

/**
 * ApprovalChainStep renders a single approval chain step.
 */
const ApprovalChainStep: React.FC<ApprovalChainStepProps> = ({
  step,
  editing = false,
  onEditToggle,
  onUpdate,
  onRemove,
  className = "",
  "data-testid": dataTestId,
}) => (
  <div
    className={`tf-approval-step ${statusClassMap[step.status]} ${className}`.trim()}
    data-testid={dataTestId || `approval-step-${step.id}`}
  >
    <div className="tf-approval-step__card">
      <span className="tf-approval-step__order">{step.order + 1}</span>
      {editing ? (
        <>
          <input
            type="text"
            className="tf-approval-step__role-input"
            value={step.role}
            onChange={(e) => onUpdate({ ...step, role: e.target.value })}
            data-testid="step-role-input"
          />
          <select
            className="tf-approval-step__auth-select"
            value={step.authorityLevel}
            onChange={(e) =>
              onUpdate({ ...step, authorityLevel: Number(e.target.value) as 0 | 1 | 2 | 3 | 4 | 5 | 6 })
            }
            data-testid="step-auth-select"
          >
            {([0, 1, 2, 3, 4, 5, 6] as const).map((lvl) => (
              <option key={lvl} value={lvl}>
                AUTH {lvl} · {AUTHORITY_LEVELS[lvl]}
              </option>
            ))}
          </select>
          <input
            type="text"
            className="tf-approval-step__user-input"
            value={step.userName ?? ""}
            onChange={(e) => onUpdate({ ...step, userName: e.target.value })}
            placeholder="Assign user (optional)"
            data-testid="step-user-input"
          />
        </>
      ) : (
        <>
          <span className="tf-approval-step__role">{step.role}</span>
          <span className="tf-approval-step__authority">
            AUTH {step.authorityLevel}
          </span>
          {step.userName && (
            <span className="tf-approval-step__assignee">{step.userName}</span>
          )}
          <span className="tf-approval-step__status">{step.status.toUpperCase()}</span>
        </>
      )}
      <div className="tf-approval-step__actions">
        <button
          type="button"
          className="tf-btn tf-btn--edit"
          onClick={onEditToggle}
          data-testid="step-edit-toggle"
        >
          {editing ? "DONE" : "EDIT"}
        </button>
        <button
          type="button"
          className="tf-btn tf-btn--remove"
          onClick={onRemove}
          data-testid="step-remove-btn"
        >
          ✕
        </button>
      </div>
    </div>
  </div>
);

ApprovalChainStep.displayName = "ApprovalChainStep";

export default ApprovalChainStep;
