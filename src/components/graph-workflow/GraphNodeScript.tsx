/**
 * @fileoverview GraphNodeScript — Script node for custom code execution.
 * Executes inline scripts (JS, Python, etc.) as part of the workflow.
 */

import React from 'react';
import { GraphNode } from './GraphNode';
import type { GraphNodeProps } from './GraphNode';

/**
 * GraphNodeScript — Script node.
 *
 * Executes a custom script (JavaScript, Python, Groovy, etc.)
 * within the workflow context. Displays the script language if known.
 */
export const GraphNodeScript: React.FC<GraphNodeProps> = ({
  className = '',
  ...props
}) => {
  const language = props.node.data?.language as string | undefined;

  return (
    <GraphNode className={`tf-graph-node-script ${className}`} {...props}>
      <div className="tf-graph-node-script__code">
        <span className="tf-graph-node-script__icon">{props.node.icon || '{ }'}</span>
        {language && (
          <span className="tf-graph-node-script__lang">{language}</span>
        )}
      </div>
      {props.children}
    </GraphNode>
  );
};

GraphNodeScript.displayName = 'GraphNodeScript';
export default GraphNodeScript;
