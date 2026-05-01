/**
 * @fileoverview GraphPlaybackSlider — Timeline scrubber for animation playback.
 * A draggable slider for navigating through the animation timeline.
 */

import React from 'react';
import type { GraphComponentProps } from './types';

export interface GraphPlaybackSliderProps extends GraphComponentProps {
  /** Current time value */
  currentTime: number;
  /** Minimum time value */
  minTime?: number;
  /** Maximum time value */
  maxTime: number;
  /** Step increment */
  step?: number;
  /** Callback when the slider value changes */
  onChange: (time: number) => void;
  /** Callback when the user starts dragging */
  onDragStart?: () => void;
  /** Callback when the user stops dragging */
  onDragEnd?: () => void;
}

/**
 * GraphPlaybackSlider — Timeline scrubber.
 *
 * A horizontal slider that allows the user to scrub through
 * the animation timeline to any point in the execution.
 *
 * @example
 * <GraphPlaybackSlider
 *   currentTime={15.2}
 *   maxTime={60}
 *   onChange={(t) => seekToTime(t)}
 * />
 */
export const GraphPlaybackSlider: React.FC<GraphPlaybackSliderProps> = ({
  className = '',
  style,
  currentTime,
  minTime = 0,
  maxTime,
  step = 0.1,
  onChange,
  onDragStart,
  onDragEnd,
  ...rest
}) => {
  const progress = maxTime > minTime ? ((currentTime - minTime) / (maxTime - minTime)) * 100 : 0;

  return (
    <div
      className={`tf-graph-playback-slider ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        ...style,
      }}
      {...rest}
    >
      <span className="tf-graph-playback-slider__time" style={{ fontSize: 10, color: '#6b7f9e', minWidth: 40, textAlign: 'right' }}>
        {currentTime.toFixed(1)}s
      </span>

      <div style={{ position: 'relative', flex: 1, height: 16, display: 'flex', alignItems: 'center' }}>
        <div
          className="tf-graph-playback-slider__track"
          style={{
            width: '100%',
            height: 4,
            backgroundColor: '#1a2332',
            borderRadius: 2,
            position: 'relative',
          }}
        >
          <div
            className="tf-graph-playback-slider__fill"
            style={{
              width: `${progress}%`,
              height: '100%',
              backgroundColor: '#4a6fa5',
              borderRadius: 2,
              transition: 'width 0.05s linear',
            }}
          />
        </div>

        <input
          className="tf-graph-playback-slider__input"
          type="range"
          min={minTime}
          max={maxTime}
          step={step}
          value={currentTime}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          onMouseDown={onDragStart}
          onMouseUp={onDragEnd}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0,
            cursor: 'pointer',
            margin: 0,
          }}
        />
      </div>

      <span className="tf-graph-playback-slider__total" style={{ fontSize: 10, color: '#6b7f9e', minWidth: 40 }}>
        {maxTime.toFixed(1)}s
      </span>
    </div>
  );
};

GraphPlaybackSlider.displayName = 'GraphPlaybackSlider';
export default GraphPlaybackSlider;
