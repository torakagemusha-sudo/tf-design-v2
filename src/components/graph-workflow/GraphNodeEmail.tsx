/**
 * @fileoverview GraphNodeEmail — Email node for sending email messages.
 * Configures and dispatches email via SMTP or email service providers.
 */

import React from 'react';
import { GraphNode } from './GraphNode';
import type { GraphNodeProps } from './GraphNode';

/**
 * GraphNodeEmail — Email node.
 *
 * Sends email messages via SMTP or transactional email services.
 * Shows the template name if configured.
 */
export const GraphNodeEmail: React.FC<GraphNodeProps> = ({
  className = '',
  ...props
}) => {
  return (
    <GraphNode className={`tf-graph-node-email ${className}`} {...props}>
      <div className="tf-graph-node-email__envelope">
        <span className="tf-graph-node-email__icon">{props.node.icon || '✉'}</span>
        {props.node.data?.template && (
          <span className="tf-graph-node-email__template">
            {String(props.node.data.template)}
          </span>
        )}
      </div>
      {props.children}
    </GraphNode>
  );
};

GraphNodeEmail.displayName = 'GraphNodeEmail';
export default GraphNodeEmail;
