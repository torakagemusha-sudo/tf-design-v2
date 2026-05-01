/**
 * @fileoverview GraphNodeEvent — Event trigger node responding to external events.
 * Activates the workflow when a specified event occurs.
 */

import React from 'react';
import { GraphNode } from './GraphNode';
import type { GraphNodeProps } from './GraphNode';

/**
 * GraphNodeEvent — Event trigger node.
 *
 * Listens for external events (webhooks, message bus, file arrival)
 * and triggers workflow execution when the event fires.
 */
export const GraphNodeEvent: React.FC<GraphNodeProps> = ({
  className = '',
  ...props
}) => {
  return (
    <GraphNode className={`tf-graph-node-event ${className}`} {...props}>
      <div className="tf-graph-node-event__trigger">
        <span className="tf-graph-node-event__icon">{props.node.icon || '⚡'}</span>
        {props.node.data?.eventType && (
          <span className="tf-graph-node-event__type">
            {String(props.node.data.eventType)}
          </span>
        )}
      </div>
      {props.children}
    </GraphNode>
  );
};

GraphNodeEvent.displayName = 'GraphNodeEvent';
export default GraphNodeEvent;
