import React, { useState, useCallback, useEffect, useMemo } from 'react';
import type { WesternElectricRule } from './types';

/**
 * Props for ControlChartRule component.
 *
 * @public
 */
export interface ControlChartRuleProps {
  rule: WesternElectricRule;
  active: boolean;
  violationCount: number;
  onToggle?: () => void;
  className?: string;
}

/**
 * Western Electric rule indicator displaying which SPC rules are active and their status.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <ControlChartRule />
 * ```
 */
const ControlChartRule: React.FC<ControlChartRuleProps> = ({
  rule, active, violationCount, onToggle, className
}) => {
  return (
    <div className={`tf-control-chart-rule ${active ? 'tf-control-chart-rule--active' : ''} ${className || ''}`} onClick={onToggle} role="switch" aria-checked={active}>
      <span className="tf-control-chart-rule__toggle">
        <span className={`tf-control-chart-rule__indicator ${active ? 'tf-control-chart-rule__indicator--on' : ''}`} />
      </span>
      <span className="tf-control-chart-rule__name">{rule.name}</span>
      <span className="tf-control-chart-rule__description">{rule.description}</span>
      {violationCount > 0 && <span className="tf-control-chart-rule__count">{violationCount}</span>}
    </div>
  );
};

export default ControlChartRule;
