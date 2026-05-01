/**
 * @fileoverview GovernanceStatsCard — Governance statistics.
 *
 * Displays key governance metrics in a grid of stat tiles with
 * trend indicators (up/down/stable) and change percentages.
 */

import React from "react";
import { GovernanceStat } from "./types";
import { GovernanceComponentBaseProps } from "./types";

export interface GovernanceStatsCardProps extends GovernanceComponentBaseProps {
  stats: GovernanceStat[];
}

const trendIconMap: Record<string, string> = {
  up: "▲",
  down: "▼",
  stable: "—",
};

const trendClassMap: Record<string, string> = {
  up: "tf-governance-stat--up",
  down: "tf-governance-stat--down",
  stable: "tf-governance-stat--stable",
};

/**
 * GovernanceStatsCard renders a grid of governance stat tiles.
 */
const GovernanceStatsCard: React.FC<GovernanceStatsCardProps> = ({
  stats,
  className = "",
  "data-testid": dataTestId = "governance-stats-card",
}) => (
  <div
    className={`tf-governance-stats-card ${className}`.trim()}
    data-testid={dataTestId}
  >
    {stats.map((stat, i) => (
      <div
        key={i}
        className={`tf-governance-stat ${trendClassMap[stat.trend]}`}
        data-testid={`governance-stat-${i}`}
      >
        <span className="tf-governance-stat__label">{stat.label}</span>
        <span className="tf-governance-stat__value">
          {stat.value}
          {stat.unit && <span className="tf-governance-stat__unit">{stat.unit}</span>}
        </span>
        <span className="tf-governance-stat__change">
          {trendIconMap[stat.trend]} {stat.change > 0 ? "+" : ""}
          {stat.change}%
        </span>
      </div>
    ))}
  </div>
);

GovernanceStatsCard.displayName = "GovernanceStatsCard";

export default GovernanceStatsCard;
