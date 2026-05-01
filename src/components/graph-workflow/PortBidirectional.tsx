/**
 * @fileoverview PortBidirectional — Bidirectional port for two-way flow.
 * Supports both incoming and outgoing connections on the same port.
 */

import React from 'react';
import { Port } from './Port';
import type { PortProps } from './Port';

/**
 * PortBidirectional — Bidirectional port.
 *
 * A port that supports both incoming and outgoing connections,
 * used for nodes that both receive and send data on the same anchor.
 */
export const PortBidirectional: React.FC<PortProps> = ({
  className = '',
  ...props
}) => {
  return (
    <Port
      className={`tf-port-bidirectional ${className}`}
      {...props}
    />
  );
};

PortBidirectional.displayName = 'PortBidirectional';
export default PortBidirectional;
