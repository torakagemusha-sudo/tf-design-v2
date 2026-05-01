/**
 * @fileoverview DataRetentionPolicyEditor — Retention policy editor.
 *
 * Edits a data retention policy: retention period, auto-purge,
 * archive settings, and legal hold flag.
 *
 * Torafirma Governance Component — Authority Gold / Dark Theme
 */

import React, { useState } from "react";
import { DataRetentionPolicy } from "./types";
import { GovernanceComponentBaseProps } from "./types";

export interface DataRetentionPolicyEditorProps extends GovernanceComponentBaseProps {
  policy: DataRetentionPolicy;
  onSave: (policy: DataRetentionPolicy) => void;
}

/**
 * DataRetentionPolicyEditor renders a retention policy editor form.
 */
const DataRetentionPolicyEditor: React.FC<DataRetentionPolicyEditorProps> = ({
  policy,
  onSave,
  className = "",
  "data-testid": dataTestId = "data-retention-policy-editor",
}) => {
  const [form, setForm] = useState<DataRetentionPolicy>({ ...policy });

  const update = <K extends keyof DataRetentionPolicy>(key: K, value: DataRetentionPolicy[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div
      className={`tf-data-retention-policy-editor ${className}`.trim()}
      data-testid={dataTestId}
    >
      <h3 className="tf-data-retention-policy-editor__title">
        EDIT RETENTION POLICY
      </h3>

      <div className="tf-data-retention-policy-editor__field">
        <label htmlFor="retention-name">NAME</label>
        <input
          id="retention-name"
          type="text"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          data-testid="retention-name-input"
        />
      </div>

      <div className="tf-data-retention-policy-editor__field">
        <label htmlFor="retention-desc">DESCRIPTION</label>
        <textarea
          id="retention-desc"
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          rows={2}
          data-testid="retention-desc-input"
        />
      </div>

      <div className="tf-data-retention-policy-editor__field">
        <label htmlFor="retention-days">RETENTION (DAYS)</label>
        <input
          id="retention-days"
          type="number"
          min={1}
          value={form.retentionDays}
          onChange={(e) => update("retentionDays", Number(e.target.value))}
          data-testid="retention-days-input"
        />
      </div>

      <div className="tf-data-retention-policy-editor__toggles">
        <label className="tf-data-retention-policy-editor__toggle">
          <input
            type="checkbox"
            checked={form.autoPurge}
            onChange={(e) => update("autoPurge", e.target.checked)}
            data-testid="retention-autopurge-toggle"
          />
          AUTO-PURGE AFTER RETENTION
        </label>
        <label className="tf-data-retention-policy-editor__toggle">
          <input
            type="checkbox"
            checked={form.archiveBeforePurge}
            onChange={(e) => update("archiveBeforePurge", e.target.checked)}
            data-testid="retention-archive-toggle"
          />
          ARCHIVE BEFORE PURGE
        </label>
        <label className="tf-data-retention-policy-editor__toggle">
          <input
            type="checkbox"
            checked={form.legalHold}
            onChange={(e) => update("legalHold", e.target.checked)}
            data-testid="retention-legalhold-toggle"
          />
          LEGAL HOLD (OVERRIDES PURGE)
        </label>
      </div>

      {form.archiveBeforePurge && (
        <div className="tf-data-retention-policy-editor__field">
          <label htmlFor="archive-days">ARCHIVE FOR (DAYS)</label>
          <input
            id="archive-days"
            type="number"
            min={1}
            value={form.archiveDays}
            onChange={(e) => update("archiveDays", Number(e.target.value))}
            data-testid="retention-archive-days-input"
          />
        </div>
      )}

      <button
        type="button"
        className="tf-btn tf-btn--save"
        onClick={() => onSave(form)}
        data-testid="retention-save-btn"
      >
        SAVE RETENTION POLICY
      </button>
    </div>
  );
};

DataRetentionPolicyEditor.displayName = "DataRetentionPolicyEditor";

export default DataRetentionPolicyEditor;
