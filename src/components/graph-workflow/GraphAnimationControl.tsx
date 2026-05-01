/**
 * @fileoverview GraphAnimationControl — Animation playback control panel.
 * Controls execution animation with play, pause, step, and speed controls.
 */

import React from 'react';
import type { PlaybackState, GraphComponentProps } from './types';

export interface GraphAnimationControlProps extends GraphComponentProps {
  /** Current playback state */
  playbackState: PlaybackState;
  /** Current time in the animation */
  currentTime: number;
  /** Total animation duration */
  totalTime: number;
  /** Playback speed multiplier */
  speed?: number;
  /** Whether looping is enabled */
  loop?: boolean;
  /** Callback when play is requested */
  onPlay: () => void;
  /** Callback when pause is requested */
  onPause: () => void;
  /** Callback when stop is requested */
  onStop: () => void;
  /** Callback when step forward is requested */
  onStepForward?: () => void;
  /** Callback when step backward is requested */
  onStepBackward?: () => void;
  /** Callback when speed changes */
  onSpeedChange?: (speed: number) => void;
  /** Callback when loop is toggled */
  onLoopToggle?: () => void;
  /** Callback when timeline is scrubbed */
  onSeek?: (time: number) => void;
}

/**
 * GraphAnimationControl — Animation playback control panel.
 *
 * A control bar for playing, pausing, and stepping through a
 * graph execution animation. Shows the current progress and
 * allows timeline scrubbing.
 *
 * @example
 * <GraphAnimationControl
 *   playbackState="paused"
 *   currentTime={12.5}
 *   totalTime={60}
 *   onPlay={() => playAnimation()}
 *   onPause={() => pauseAnimation()}
 * />
 */
export const GraphAnimationControl: React.FC<GraphAnimationControlProps> = ({
  className = '',
  style,
  playbackState,
  currentTime,
  totalTime,
  speed = 1,
  loop = false,
  onPlay,
  onPause,
  onStop,
  onStepForward,
  onStepBackward,
  onSpeedChange,
  onLoopToggle,
  onSeek,
  ...rest
}) => {
  const progress = totalTime > 0 ? (currentTime / totalTime) * 100 : 0;
  const isPlaying = playbackState === 'playing';

  return (
    <div
      className={`tf-graph-animation-control ${className}`}
      style={{
        position: 'absolute',
        bottom: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '6px 14px',
        backgroundColor: 'rgba(16, 22, 36, 0.95)',
        border: '1px solid #2a3a4e',
        borderRadius: 8,
        zIndex: 60,
        ...style,
      }}
      {...rest}
    >
      {/* Playback controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <button
          className="tf-graph-animation-control__step-back"
          onClick={onStepBackward}
          type="button"
          style={{ background: 'none', border: 'none', color: '#8b9db8', cursor: 'pointer', fontSize: 12, padding: '4px' }}
        >
          ⏮
        </button>

        {isPlaying ? (
          <button
            className="tf-graph-animation-control__pause"
            onClick={onPause}
            type="button"
            style={{ background: 'none', border: 'none', color: '#f39c12', cursor: 'pointer', fontSize: 16, padding: '4px 8px' }}
          >
            ⏸
          </button>
        ) : (
          <button
            className="tf-graph-animation-control__play"
            onClick={onPlay}
            type="button"
            style={{ background: 'none', border: 'none', color: '#2ecc71', cursor: 'pointer', fontSize: 16, padding: '4px 8px' }}
          >
            ▶
          </button>
        )}

        <button
          className="tf-graph-animation-control__stop"
          onClick={onStop}
          type="button"
          style={{ background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer', fontSize: 12, padding: '4px' }}
        >
          ⏹
        </button>

        <button
          className="tf-graph-animation-control__step-forward"
          onClick={onStepForward}
          type="button"
          style={{ background: 'none', border: 'none', color: '#8b9db8', cursor: 'pointer', fontSize: 12, padding: '4px' }}
        >
          ⏭
        </button>
      </div>

      {/* Timeline */}
      <div
        className="tf-graph-animation-control__timeline"
        style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 150 }}
      >
        <span style={{ fontSize: 10, color: '#6b7f9e', minWidth: 36, textAlign: 'right' }}>
          {currentTime.toFixed(1)}s
        </span>
        <input
          type="range"
          min={0}
          max={totalTime}
          step={0.1}
          value={currentTime}
          onChange={(e) => onSeek?.(parseFloat(e.target.value))}
          style={{ flex: 1, accentColor: '#4a6fa5' }}
        />
        <span style={{ fontSize: 10, color: '#6b7f9e', minWidth: 36 }}>
          {totalTime.toFixed(1)}s
        </span>
      </div>

      {/* Speed and loop */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <select
          className="tf-graph-animation-control__speed"
          value={speed}
          onChange={(e) => onSpeedChange?.(parseFloat(e.target.value))}
          style={{
            background: '#1a2332',
            border: '1px solid #2a3a4e',
            borderRadius: 4,
            color: '#8b9db8',
            fontSize: 10,
            padding: '2px 4px',
            outline: 'none',
          }}
        >
          <option value={0.25}>0.25x</option>
          <option value={0.5}>0.5x</option>
          <option value={1}>1x</option>
          <option value={1.5}>1.5x</option>
          <option value={2}>2x</option>
          <option value={4}>4x</option>
        </select>

        <button
          className={`tf-graph-animation-control__loop ${loop ? 'tf-graph-animation-control__loop--active' : ''}`}
          onClick={onLoopToggle}
          title="Loop"
          type="button"
          style={{
            background: 'none',
            border: 'none',
            color: loop ? '#4a6fa5' : '#6b7f9e',
            cursor: 'pointer',
            fontSize: 12,
            padding: '4px',
          }}
        >
          🔁
        </button>
      </div>
    </div>
  );
};

GraphAnimationControl.displayName = 'GraphAnimationControl';
export default GraphAnimationControl;
