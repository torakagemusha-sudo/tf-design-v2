/**
 * @fileoverview PortError — Error port for exception flow connections.
 * Dedicated port for routing error/exception paths separately from normal flow.
 */

import React from 'react';
import { Port } from './Port';
import type { PortProps } from './Port';

/**
 * PortError — Error port.
 *
 * A dedicated error output port used to route exception flows
 * to error handler nodes. Visually distinct with red accent.
 */
export const PortError: React.FC<PortProps> = ({
  className = '',
  ...props
}) => {
  return (
    <Port
      className={`tf-port-error ${className}`}
      {...props}
    />
  );
};

PortError.displayName = 'PortError';
export default PortError;
