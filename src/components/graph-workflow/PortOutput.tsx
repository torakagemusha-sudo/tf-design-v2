/**
 * @fileoverview PortOutput — Output port for sending connections.
 * Emits flow to downstream nodes via outgoing connections.
 */

import React from 'react';
import { Port } from './Port';
import type { PortProps } from './Port';

/**
 * PortOutput — Output port.
 *
 * An output port positioned on the right or bottom of a node that
 * emits flow to downstream connected nodes.
 */
export const PortOutput: React.FC<PortProps> = ({
  className = '',
  ...props
}) => {
  return (
    <Port
      className={`tf-port-output ${className}`}
      {...props}
    />
  );
};

PortOutput.displayName = 'PortOutput';
export default PortOutput;
