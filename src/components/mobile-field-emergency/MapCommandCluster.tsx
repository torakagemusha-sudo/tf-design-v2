import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Single command within a cluster.
 */
export interface ClusterCommand {
  /** Command ID. */
  id: string;
  /** Label. */
  label: string;
  /** Icon. */
  icon?: React.ReactNode;
  /** Press handler. */
  onPress: () => void;
  /** Visual variant. */
  variant?: 'primary' | 'danger' | 'governed';
}

/**
 * Props for MapCommandCluster.
 */
export interface MapCommandClusterProps {
  /** Cluster title. */
  title: string;
  /** Commands in this cluster. */
  commands: ClusterCommand[];
  /** Expanded by default? */
  expanded?: boolean;
  /** Toggle expand handler. */
  onToggleExpand?: () => void;
  /** Badge count for collapsed state. */
  badge?: number;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * MapCommandCluster — clustered commands on map overlay.
 *
 * Collapses multiple commands into a single cluster indicator.
 * Tap to expand reveals the full command list.
 * Badge shows total commands in the collapsed cluster.
 */
export const MapCommandCluster: React.FC<MapCommandClusterProps> = ({
  title,
  commands,
  expanded = false,
  onToggleExpand,
  badge,
  className = '',
  testId,
}) => {
  return (
    <div
      data-testid={testId}
      className={[
        'tf-map-cmd-cluster',
        expanded ? 'tf-map-cmd-cluster--expanded' : '',
        className,
      ].join(' ')}
    >
      {/* Collapsed cluster indicator */}
      {!expanded && (
        <button
          type="button"
          className="tf-map-cmd-cluster__collapsed"
          onClick={onToggleExpand}
          aria-expanded="false"
        >
          <span className="tf-map-cmd-cluster__title">{title}</span>
          {(badge !== undefined || commands.length > 0) && (
            <span className="tf-map-cmd-cluster__badge">
              {badge ?? commands.length}
            </span>
          )}
        </button>
      )}

      {/* Expanded command list */}
      {expanded && (
        <div className="tf-map-cmd-cluster__expanded">
          <div className="tf-map-cmd-cluster__header">
            <span className="tf-map-cmd-cluster__header-title">{title}</span>
            <button
              type="button"
              className="tf-map-cmd-cluster__collapse-btn"
              onClick={onToggleExpand}
              aria-label="Collapse cluster"
            >
              −
            </button>
          </div>
          <div className="tf-map-cmd-cluster__list" role="group">
            {commands.map((cmd) => {
              const vClass = cmd.variant
                ? `tf-map-cmd-cluster__item--${cmd.variant}`
                : '';
              return (
                <button
                  key={cmd.id}
                  type="button"
                  className={['tf-map-cmd-cluster__item', vClass].join(' ')}
                  onClick={cmd.onPress}
                >
                  {cmd.icon && (
                    <span
                      className="tf-map-cmd-cluster__item-icon"
                      aria-hidden="true"
                    >
                      {cmd.icon}
                    </span>
                  )}
                  <span className="tf-map-cmd-cluster__item-label">
                    {cmd.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

MapCommandCluster.displayName = 'MapCommandCluster';

export default MapCommandCluster;
