/**
 * @fileoverview GraphPlaybackPlayPause — Play/pause toggle button for animation.
 * Switches between play and pause states for controlling animation playback.
 */

import React from 'react';
import type { PlaybackState, GraphComponentProps } from './types';

export interface GraphPlaybackPlayPauseProps extends GraphComponentProps {
  /** Current playback state */
  state: PlaybackState;
  /** Callback when play is requested */
  onPlay: () => void;
  /** Callback when pause is requested */
  onPause: () => void;
  /** Button size in pixels */
  size?: number;
}

/**
 * GraphPlaybackPlayPause — Play/pause toggle button.
 *
 * A single button that toggles between play and pause states
 * for controlling graph execution animation.
 *
 * @example
 * <GraphPlaybackPlayPause
 *   state={playbackState}
 *   onPlay={() => play()}
 *   onPause={() => pause()}
 *   size={36}
 * />
 */
export const GraphPlaybackPlayPause: React.FC<GraphPlaybackPlayPauseProps> = ({
  className = '',
  style,
  state,
  onPlay,
  onPause,
  size = 32,
  ...rest
}) => {
  const isPlaying = state === 'playing';

  return (
    <button
      className={`tf-graph-playback-play-pause ${isPlaying ? 'tf-graph-playback-play-pause--playing' : ''} ${className}`}
      onClick={isPlaying ? onPause : onPlay}
      title={isPlaying ? 'Pause' : 'Play'}
      type="button"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        backgroundColor: isPlaying ? 'rgba(243, 156, 18, 0.15)' : 'rgba(46, 204, 113, 0.15)',
        border: `1px solid ${isPlaying ? '#f39c12' : '#2ecc71'}`,
        borderRadius: '50%',
        color: isPlaying ? '#f39c12' : '#2ecc71',
        cursor: 'pointer',
        fontSize: size * 0.5,
        transition: 'all 0.15s ease',
        ...style,
      }}
      {...rest}
    >
      {isPlaying ? '⏸' : '▶'}
    </button>
  );
};

GraphPlaybackPlayPause.displayName = 'GraphPlaybackPlayPause';
export default GraphPlaybackPlayPause;
