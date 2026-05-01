/**
 * @fileoverview ApprovalChainEditor — Edit approval chains.
 *
 * Visual editor for building and modifying approval chains.
 * Supports adding steps, reordering, setting parallel mode,
 * and configuring all-required vs any-required semantics.
 *
 * Torafirma Governance Component — Authority Gold / Dark Theme
 */

import React, { useState } from "react";
import { ApprovalChain, ApprovalStep } from "./types";
import { GovernanceComponentBaseProps } from "./types";
import ApprovalChainStep from "./ApprovalChainStep";
import ApprovalChainConnector from "./ApprovalChainConnector";

export interface ApprovalChainEditorProps extends GovernanceComponentBaseProps {
  chain: ApprovalChain;
  onChange: (chain: ApprovalChain) => void;
}

/**
 * ApprovalChainEditor renders a visual approval chain editor.
 */
const ApprovalChainEditor: React.FC<ApprovalChainEditorProps> = ({
  chain,
  onChange,
  className = "",
  "data-testid": dataTestId = "approval-chain-editor",
}) => {
  const [editingStep, setEditingStep] = useState<string | null>(null);

  const addStep = () => {
    const newStep: ApprovalStep = {
      id: `step-${Date.now()}`,
      order: chain.steps.length,
      role: "new-role",
      authorityLevel: 2,
      status: "pending",
    };
    onChange({ ...chain, steps: [...chain.steps, newStep] });
  };

  const updateStep = (updated: ApprovalStep) => {
    onChange({
      ...chain,
      steps: chain.steps.map((s) => (s.id === updated.id ? updated : s)),
    });
  };

  const removeStep = (stepId: string) => {
    onChange({
      ...chain,
      steps: chain.steps.filter((s) => s.id !== stepId).map((s, i) => ({ ...s, order: i })),
    });
  };

  return (
    <div
      className={`tf-approval-chain-editor ${className}`.trim()}
      data-testid={dataTestId}
    >
      <div className="tf-approval-chain-editor__header">
        <input
          type="text"
          className="tf-approval-chain-editor__name"
          value={chain.name}
          onChange={(e) => onChange({ ...chain, name: e.target.value })}
          data-testid="chain-name-input"
        />
        <label className="tf-approval-chain-editor__parallel">
          <input
            type="checkbox"
            checked={chain.parallel}
            onChange={(e) => onChange({ ...chain, parallel: e.target.checked })}
            data-testid="chain-parallel-toggle"
          />
          PARALLEL
        </label>
        <label className="tf-approval-chain-editor__all-required">
          <input
            type="checkbox"
            checked={chain.allRequired}
            onChange={(e) => onChange({ ...chain, allRequired: e.target.checked })}
            data-testid="chain-all-required-toggle"
          />
          ALL REQUIRED
        </label>
      </div>
      <div className="tf-approval-chain-editor__flow">
        {chain.steps.map((step, i) => (
          <React.Fragment key={step.id}>
            {i > 0 && <ApprovalChainConnector parallel={chain.parallel} />}
            <ApprovalChainStep
              step={step}
              editing={editingStep === step.id}
              onEditToggle={() =>
                setEditingStep(editingStep === step.id ? null : step.id)
              }
              onUpdate={updateStep}
              onRemove={() => removeStep(step.id)}
            />
          </React.Fragment>
        ))}
      </div>
      <button
        type="button"
        className="tf-btn tf-btn--add-step"
        onClick={addStep}
        data-testid="chain-add-step"
      >
        + ADD STEP
      </button>
    </div>
  );
};

ApprovalChainEditor.displayName = "ApprovalChainEditor";

export default ApprovalChainEditor;
