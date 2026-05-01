import React, { useState } from 'react';
import { TorafirmaComponentBaseProps } from '../../types';

/**
 * A single node in the dependency tree.
 */
export interface DependencyNode {
  id: string;
  label: string;
  commandClass: string;
  state: string;
  children?: DependencyNode[];
  dependsOn?: string[];
}

/**
 * Props for the CommandDependencyTree component.
 * Visual tree of command dependencies.
 */
export interface CommandDependencyTreeProps extends TorafirmaComponentBaseProps {
  /** Root dependency nodes */
  dependencies: DependencyNode[];
  /** Callback fired when a node is selected */
  onSelect: (node: DependencyNode) => void;
}

/**
 * Recursive tree node renderer.
 */
const TreeNode: React.FC<{
  node: DependencyNode;
  depth: number;
  onSelect: (node: DependencyNode) => void;
}> = ({ node, depth, onSelect }) => {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = (node.children?.length ?? 0) > 0;
  const indent = depth * 20;

  return (
    <li className="tf-command-dependency-tree__node">
      <div
        className={`tf-command-dependency-tree__node-content tf-command-dependency-tree__node-content--${node.state}`}
        style={{ paddingLeft: `${indent}px` }}
      >
        {hasChildren && (
          <button
            type="button"
            className="tf-command-dependency-tree__expand"
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            aria-label={expanded ? 'Collapse' : 'Expand'}
          >
            <span aria-hidden="true">{expanded ? '&#9660;' : '&#9654;'}</span>
          </button>
        )}
        <button
          type="button"
          className={`tf-command-dependency-tree__node-button tf-command-dependency-tree__node-button--${node.commandClass}`}
          onClick={() => onSelect(node)}
        >
          <span className="tf-command-dependency-tree__node-class">{node.commandClass.toUpperCase()}</span>
          <span className="tf-command-dependency-tree__node-label">{node.label}</span>
        </button>
      </div>
      {hasChildren && expanded && (
        <ul className="tf-command-dependency-tree__node-children">
          {node.children!.map((child) => (
            <TreeNode key={child.id} node={child} depth={depth + 1} onSelect={onSelect} />
          ))}
        </ul>
      )}
    </li>
  );
};

/**
 * CommandDependencyTree — visual tree of command dependencies.
 *
 * Displays a hierarchical tree showing command execution
 * dependencies. Each node shows its command class and state.
 * Expandable children reveal sub-dependencies. Nodes can be
 * selected to view or act upon them.
 *
 * @example
 * ```tsx
 * <CommandDependencyTree
 *   dependencies={[
 *     { id: 'root', label: 'Deploy', commandClass: 'deploy', state: 'staged', children: [
 *       { id: 'child1', label: 'Validate', commandClass: 'validate', state: 'complete' },
 *     ]},
 *   ]}
 *   onSelect={(node) => console.log(node.label)}
 * />
 * ```
 */
const CommandDependencyTree: React.FC<CommandDependencyTreeProps> = ({
  dependencies,
  onSelect,
  className = '',
  'data-testid': testId,
  ...rest
}) => {
  return (
    <div
      className={`tf-command-dependency-tree ${className}`}
      role="tree"
      aria-label="Command dependency tree"
      data-testid={testId}
      {...rest}
    >
      <ul className="tf-command-dependency-tree__root">
        {dependencies.map((node) => (
          <TreeNode key={node.id} node={node} depth={0} onSelect={onSelect} />
        ))}
      </ul>
    </div>
  );
};

export default CommandDependencyTree;
