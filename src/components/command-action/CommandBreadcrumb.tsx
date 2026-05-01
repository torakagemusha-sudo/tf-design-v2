import React from 'react';
import { TorafirmaComponentBaseProps } from '../../types';

/**
 * A single breadcrumb segment descriptor.
 */
export interface BreadcrumbSegment {
  id: string;
  label: string;
  commandId?: string;
  active?: boolean;
}

/**
 * Props for the CommandBreadcrumb component.
 * Path navigation with active command at each level.
 */
export interface CommandBreadcrumbProps extends TorafirmaComponentBaseProps {
  /** Array of breadcrumb segments */
  segments: BreadcrumbSegment[];
  /** The currently active segment ID */
  activeSegment?: string;
  /** Callback fired when a segment is navigated to */
  onNavigate: (segment: BreadcrumbSegment) => void;
}

/**
 * CommandBreadcrumb — path navigation with active command at each level.
 *
 * Displays a hierarchical trail of command contexts, allowing operators
 * to navigate up through nested command surfaces. Each segment can
 * expose a command relevant to that level of the hierarchy.
 *
 * @example
 * ```tsx
 * <CommandBreadcrumb
 *   segments={[
 *     { id: 'workspace', label: 'Workspace' },
 *     { id: 'runtime', label: 'Runtime' },
 *     { id: 'deploy', label: 'Deploy' },
 *   ]}
 *   activeSegment="deploy"
 *   onNavigate={(seg) => console.log(seg.label)}
 * />
 * ```
 */
const CommandBreadcrumb: React.FC<CommandBreadcrumbProps> = ({
  segments,
  activeSegment,
  onNavigate,
  className = '',
  'data-testid': testId,
  ...rest
}) => {
  return (
    <nav
      className={`tf-command-breadcrumb ${className}`}
      aria-label="Command breadcrumb"
      data-testid={testId}
      {...rest}
    >
      <ol className="tf-command-breadcrumb__list">
        {segments.map((segment, index) => {
          const isActive = segment.id === activeSegment;
          const isLast = index === segments.length - 1;

          return (
            <li
              key={segment.id}
              className={`tf-command-breadcrumb__item ${isActive ? 'tf-command-breadcrumb__item--active' : ''}`}
            >
              <button
                type="button"
                className={`tf-command-breadcrumb__segment ${isActive ? 'tf-command-breadcrumb__segment--active' : ''}`}
                onClick={() => onNavigate(segment)}
                aria-current={isLast ? 'page' : undefined}
              >
                {segment.label}
              </button>
              {!isLast && (
                <span className="tf-command-breadcrumb__separator" aria-hidden="true">/</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default CommandBreadcrumb;
