/**
 * @fileoverview PolicyBrowser — Browse all policies.
 *
 * Displays a searchable, filterable grid of policy cards. Each card
 * shows policy name, version, active status, rule count, and authority
 * requirement. Supports creating, editing, and viewing policies.
 *
 * Torafirma Governance Component — Authority Gold / Dark Theme
 */

import React, { useState, useMemo } from "react";
import { Policy } from "./types";
import { GovernanceComponentBaseProps } from "./types";
import PolicyCard from "./PolicyCard";

export interface PolicyBrowserProps extends GovernanceComponentBaseProps {
  policies: Policy[];
  onSelect?: (policy: Policy) => void;
  onEdit?: (policy: Policy) => void;
  onToggleActive?: (policyId: string, active: boolean) => void;
}

/**
 * PolicyBrowser renders a browsable grid of all policies.
 */
const PolicyBrowser: React.FC<PolicyBrowserProps> = ({
  policies,
  onSelect,
  onEdit,
  onToggleActive,
  className = "",
  "data-testid": dataTestId = "policy-browser",
}) => {
  const [search, setSearch] = useState("");
  const [showInactive, setShowInactive] = useState(true);

  const filtered = useMemo(() => {
    return policies
      .filter((p) => showInactive || p.active)
      .filter(
        (p) =>
          !search ||
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase())
      );
  }, [policies, search, showInactive]);

  return (
    <div
      className={`tf-policy-browser ${className}`.trim()}
      data-testid={dataTestId}
    >
      <div className="tf-policy-browser__toolbar">
        <input
          type="search"
          className="tf-policy-browser__search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search policies…"
          data-testid="policy-browser-search"
        />
        <label className="tf-policy-browser__toggle">
          <input
            type="checkbox"
            checked={showInactive}
            onChange={(e) => setShowInactive(e.target.checked)}
            data-testid="policy-browser-show-inactive"
          />
          SHOW INACTIVE
        </label>
        <span className="tf-policy-browser__count">
          {filtered.length} OF {policies.length} POLICIES
        </span>
      </div>
      <div className="tf-policy-browser__grid">
        {filtered.map((policy) => (
          <PolicyCard
            key={policy.id}
            policy={policy}
            onSelect={onSelect}
            onEdit={onEdit}
            onToggleActive={onToggleActive}
          />
        ))}
      </div>
    </div>
  );
};

PolicyBrowser.displayName = "PolicyBrowser";

export default PolicyBrowser;
