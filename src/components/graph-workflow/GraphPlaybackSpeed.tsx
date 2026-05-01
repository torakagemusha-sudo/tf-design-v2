/**
 * @fileoverview GraphPlaybackSpeed — Speed control selector for animation playback.
 * Dropdown or segmented control for selecting playback speed multiplier.
 */

import React from 'react';
import type { GraphComponentProps } from './types';

export interface GraphPlaybackSpeedProps extends GraphComponentProps {
  /** Current speed multiplier */
  speed: number;
  /** Available speed options */
  options?: number[];
  /** Callback when speed changes */
  onChange: (speed: number) => void;
}

const DEFAULT_SPEEDS = [0.25, 0.5, 1, 1.5, 2, 4];

/**
 * GraphPlaybackSpeed — Playback speed control.
 *
 * A segmented control or dropdown for selecting the animation
 * playback speed multiplier (0.25x, 0.5x, 1x, 2x, etc.).
 *
 * @example
 * <GraphPlaybackSpeed
 *   speed={1.5}
 *   onChange={(s) => setPlaybackSpeed(s)}
 * />
 */
export const GraphPlaybackSpeed: React.FC<GraphPlaybackSpeedProps> = ({
  className = '',
  style,
  speed,
  options = DEFAULT_SPEEDS,
  onChange,
  ...rest
}) => {
  return (
    <div
      className={`tf-graph-playback-speed ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        backgroundColor: '#1a2332',
        border: '1px solid #2a3a4e',
        borderRadius: 4,
        padding: 2,
        ...style,
      }}
      {...rest}
    >
      {options.map((option) => (
        <button
          key={option}
          className={`tf-graph-playback-speed__option ${speed === option ? 'tf-graph-playback-speed__option--active' : ''}`}
          onClick={() => onChange(option)}
          type="button"
          style={{
            padding: '2px 8px',
            backgroundColor: speed === option ? '#2a4a6f' : 'transparent',
            border: 'none',
            borderRadius: 3,
            color: speed === option ? '#c8d6e5' : '#6b7f9e',
            cursor: 'pointer',
            fontSize: 10,
            fontWeight: speed === option ? 600 : 400,
            whiteSpace: 'nowrap',
          }}
        >
          {option}x
        </button>
      ))}
    </div>
  );
};

GraphPlaybackSpeed.displayName = 'GraphPlaybackSpeed';
export default GraphPlaybackSpeed;
