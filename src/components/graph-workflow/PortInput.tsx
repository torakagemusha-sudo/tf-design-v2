/**
 * @fileoverview PortInput — Input port for receiving connections.
 * Accepts a single incoming connection from an upstream node.
 */

import React from 'react';
import { Port } from './Port';
import type { PortProps } from './Port';

/**
 * PortInput — Input port.
 *
 * An input port positioned on the left or top of a node that
 * accepts incoming connections from upstream nodes.
 */
export const PortInput: React.FC<PortProps> = ({
  className = '',
  ...props
}) => {
  return (
    <Port
      className={`tf-port-input ${className}`}
      {...props}
    />
  );
};

PortInput.displayName = 'PortInput';
export default PortInput;
