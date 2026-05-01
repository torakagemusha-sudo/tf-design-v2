/**
 * @fileoverview PortCondition — Condition port for branching flow.
 * Carries a condition label for true/false or case-based branches.
 */

import React from 'react';
import { Port } from './Port';
import type { PortProps } from './Port';

/**
 * PortCondition — Condition port.
 *
 * A specialized output port used on decision/condition nodes that
 * carries a condition label (e.g., "true", "false", "default").
 */
export const PortCondition: React.FC<PortProps> = ({
  className = '',
  ...props
}) => {
  return (
    <Port
      className={`tf-port-condition ${className}`}
      {...props}
    />
  );
};

PortCondition.displayName = 'PortCondition';
export default PortCondition;
