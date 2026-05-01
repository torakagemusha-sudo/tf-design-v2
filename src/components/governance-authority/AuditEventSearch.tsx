/**
 * @fileoverview AuditEventSearch — Search audit events.
 *
 * Free-text search input for filtering audit events by message content.
 */

import React from "react";
import { GovernanceComponentBaseProps } from "./types";

export interface AuditEventSearchProps extends GovernanceComponentBaseProps {
  query: string;
  onChange: (query: string) => void;
}

/**
 * AuditEventSearch renders a search input for audit events.
 */
const AuditEventSearch: React.FC<AuditEventSearchProps> = ({
  query,
  onChange,
  className = "",
  "data-testid": dataTestId = "audit-event-search",
}) => (
  <div
    className={`tf-audit-event-search ${className}`.trim()}
    data-testid={dataTestId}
  >
    <label className="tf-audit-event-search__label" htmlFor="audit-search">
      SEARCH
    </label>
    <input
      id="audit-search"
      type="search"
      className="tf-audit-event-search__input"
      value={query}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search audit events…"
      data-testid="audit-search-input"
    />
  </div>
);

AuditEventSearch.displayName = "AuditEventSearch";

export default AuditEventSearch;
