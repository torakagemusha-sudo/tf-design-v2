import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Single objective item.
 */
export interface MissionObjective {
  /** Objective text. */
  text: string;
  /** Whether completed. */
  completed?: boolean;
  /** Objective ID. */
  id: string;
}

/**
 * Props for MissionCardObjective.
 */
export interface MissionCardObjectiveProps {
  /** Array of objectives. */
  objectives: MissionObjective[];
  /** Callback when an objective is toggled. */
  onToggle?: (objectiveId: string) => void;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * MissionCardObjective — mission objectives with completion checkboxes.
 *
 * Displays a checklist of mission objectives with completion state.
 * Each item is a 44 px+ touch target for field operatives wearing gloves.
 */
export const MissionCardObjective: React.FC<MissionCardObjectiveProps> = ({
  objectives,
  onToggle,
  className = '',
  testId,
}) => {
  const completedCount = objectives.filter((o) => o.completed).length;
  const total = objectives.length;

  return (
    <div
      data-testid={testId}
      className={['tf-mission-card-objectives', className].join(' ')}
    >
      <div className="tf-mission-card-objectives__progress">
        <span className="tf-mission-card-objectives__count">
          {completedCount}/{total}
        </span>
        <div
          className="tf-mission-card-objectives__bar"
          role="progressbar"
          aria-valuenow={completedCount}
          aria-valuemax={total}
          aria-label="Objectives completed"
        >
          <div
            className="tf-mission-card-objectives__fill"
            style={{ width: `${total ? (completedCount / total) * 100 : 0}%` }}
          />
        </div>
      </div>
      <ul className="tf-mission-card-objectives__list" role="list">
        {objectives.map((obj) => (
          <li
            key={obj.id}
            className={[
              'tf-mission-card-objectives__item',
              obj.completed
                ? 'tf-mission-card-objectives__item--completed'
                : '',
            ].join(' ')}
          >
            <button
              type="button"
              className="tf-mission-card-objectives__toggle"
              onClick={() => onToggle?.(obj.id)}
              aria-pressed={obj.completed}
            >
              <span
                className={[
                  'tf-mission-card-objectives__check',
                  obj.completed
                    ? 'tf-mission-card-objectives__check--checked'
                    : '',
                ].join(' ')}
                aria-hidden="true"
              >
                {obj.completed ? '✓' : '○'}
              </span>
              <span className="tf-mission-card-objectives__text">
                {obj.text}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

MissionCardObjective.displayName = 'MissionCardObjective';

export default MissionCardObjective;
