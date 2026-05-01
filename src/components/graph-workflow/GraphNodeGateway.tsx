/**
 * @fileoverview GraphNodeGateway — Gateway node for complex routing patterns.
 * Inclusive, exclusive, or complex gateway for BPMN-style routing.
 */

import React from 'react';
import { GraphNode } from './GraphNode';
import type { GraphNodeProps } from './GraphNode';

/**
 * GraphNodeGateway — Gateway node.
 *
 * BPMN-style gateway for inclusive, exclusive, or complex
 * routing decisions with multiple conditional outgoing paths.
 */
export const GraphNodeGateway: React.FC<GraphNodeProps> = ({
  className = '',
  ...props
}) => {
  const gatewayType = props.node.data?.gatewayType as string | undefined;

  return (
    <GraphNode className={`tf-graph-node-gateway ${className}`} {...props}>
      <div className="tf-graph-node-gateway__diamond">
        <span className="tf-graph-node-gateway__icon">{props.node.icon || '◇'}</span>
        {gatewayType && (
          <span className="tf-graph-node-gateway__type">{gatewayType}</span>
        )}
      </div>
      {props.children}
    </GraphNode>
  );
};

GraphNodeGateway.displayName = 'GraphNodeGateway';
export default GraphNodeGateway;
