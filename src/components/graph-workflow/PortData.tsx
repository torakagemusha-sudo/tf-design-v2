/**
 * @fileoverview PortData — Data port for data-flow connections.
 * Used in dataflow programming to pass data payloads between nodes.
 */

import React from 'react';
import { Port } from './Port';
import type { PortProps } from './Port';

/**
 * PortData — Data port.
 *
 * A port specifically for data-flow connections, used when the
 * primary concern is data movement rather than control flow.
 */
export const PortData: React.FC<PortProps> = ({
  className = '',
  ...props
}) => {
  return (
    <Port
      className={`tf-port-data ${className}`}
      {...props}
    />
  );
};

PortData.displayName = 'PortData';
export default PortData;
