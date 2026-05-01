/**
 * @fileoverview EmergencyLayout — Emergency/Breaker Layout
 *
 * Full-screen emergency interface for critical fault response, circuit breaker
 * activation, and emergency overrides. Minimal chrome, maximum visibility of
 * alert conditions, countdown timers, status tiles, and authority-gated controls.
 *
 * Layout Diagram:
 * ```
 * +--------------------------------------------------------------------+
 * |                                                                      |
 * |   [ALERT BANNER] SYSTEM EMERGENCY - MANUAL OVERRIDE REQUIRED         |  ALERT
 * |                                                                      |
 * +--------------------------------------------------------------------+
 * |                                                                      |
 * |   ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐           |  TILES
 * |   │Breaker   │  │Status    │  │Countdown │  │Authority │           |
 * |   │          │  │Tiles     │  │Timer     │  │Gate      │           |
 * |   │[TRIP]    │  │          │  │00:04:32  │  │Required  │           |
 * |   │          │  │● Service │  │          │  │L3+       │           |
 * |   └──────────┘  │● Network │  └──────────┘  └──────────┘           |
 * |                 │● Compute  │                                         |
 * |                 └──────────┘                                         |
 * |                                                                      |
 * |   ┌──────────────────────────────────────────────────────────┐     |  CONTROLS
 * |   │ Override Controls                                        │     |
 * |   │ [Acknowledge]  [Initiate Override]  [Abort]  [Purge]    │     |
 * |   └──────────────────────────────────────────────────────────┘     |
 * |                                                                      |
 * +--------------------------------------------------------------------+
 * ```
 */

import React, { useState, useEffect } from 'react';
import type { LayoutBaseProps, TorafirmaTheme } from './types';
import { buildThemeCSS, THEME_TOKENS } from './types';
import { useLayout } from './useLayout';

export interface EmergencyLayoutProps extends LayoutBaseProps {
  /** Emergency type / severity label */
  emergencyType?: string;
  /** Alert banner content */
  alertBanner?: React.ReactNode;
  /** Emergency breaker control (trip/reset) */
  emergencyBreaker?: React.ReactNode;
  /** Status tile grid showing system health */
  statusTiles?: React.ReactNode;
  /** Countdown timer display (e.g., auto-shutdown) */
  countdownTimer?: React.ReactNode;
  /** Countdown target in seconds (0 = no countdown) */
  countdownSeconds?: number;
  /** Authority gate / required authority level */
  authorityGate?: React.ReactNode;
  /** Override control actions */
  overrideControls?: React.ReactNode;
  /** On countdown reaches zero */
  onCountdownExpire?: () => void;
  /** On acknowledge */
  onAcknowledge?: () => void;
  /** On initiate override */
  onOverride?: () => void;
  /** On abort */
  onAbort?: () => void;
}

function useEmergencyStyles(theme: TorafirmaTheme): React.CSSProperties {
  const t = THEME_TOKENS[theme];
  return {
    ...buildThemeCSS(theme),
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    background: t.background,
    color: t.textPrimary,
    fontFamily: 'Inter, "IBM Plex Sans", system-ui, sans-serif',
    fontSize: 13,
  } as React.CSSProperties;
}

export const EmergencyLayout: React.FC<EmergencyLayoutProps> = ({
  theme: propTheme,
  className,
  style,
  emergencyType = 'SYSTEM EMERGENCY',
  alertBanner,
  emergencyBreaker,
  statusTiles,
  countdownTimer,
  countdownSeconds = 0,
  authorityGate,
  overrideControls,
  onCountdownExpire,
  onAcknowledge,
  onOverride,
  onAbort,
  testId,
}) => {
  const { state } = useLayout();
  const theme = propTheme ?? state.theme;
  const t = THEME_TOKENS[theme];
  const [remaining, setRemaining] = useState(countdownSeconds);
  const [acknowledged, setAcknowledged] = useState(false);

  // Countdown timer logic
  useEffect(() => {
    if (countdownSeconds <= 0) return;
    setRemaining(countdownSeconds);
    const interval = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onCountdownExpire?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [countdownSeconds, onCountdownExpire]);

  const baseStyles = useEmergencyStyles(theme);

  const alertStyle: React.CSSProperties = {
    padding: '12px 24px',
    background: t.dangerColor,
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: '0.06em',
    textTransform: 'uppercase' as const,
    textAlign: 'center',
    animation: 'emergency-pulse 2s infinite',
    zIndex: 100,
  };

  const tilesGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: 16,
    padding: 24,
    flex: 1,
    overflow: 'auto',
    alignContent: 'start',
  };

  const tileStyle: React.CSSProperties = {
    background: t.panelBg,
    border: `1px solid ${t.borderColor}`,
    borderRadius: 2,
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    minHeight: 160,
  };

  const controlsStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    padding: '20px 24px',
    background: t.raisedPanelBg,
    borderTop: `2px solid ${t.dangerColor}`,
  };

  const formatTime = (seconds: number): string => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div
      className={`tf-layout tf-emergency ${className ?? ''}`}
      data-testid={testId}
      data-layout="emergency"
      data-theme={theme}
      data-emergency-type={emergencyType}
      style={{ ...baseStyles, ...style }}
    >
      {/* Alert Banner */}
      <div style={alertStyle} data-panel="alert">
        {alertBanner ?? (
          <span>
            {'//'} EMERGENCY: {emergencyType} {'//'} MANUAL OVERRIDE REQUIRED
          </span>
        )}
      </div>

      {/* Status Tiles Grid */}
      <div style={tilesGridStyle} data-panel="tiles">
        {/* Emergency Breaker Tile */}
        <div style={tileStyle} data-tile="breaker">
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase' as const,
              color: t.dangerColor,
            }}
          >
            Circuit Breaker
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {emergencyBreaker ?? (
              <button
                onClick={onOverride}
                style={{
                  padding: '12px 24px',
                  background: t.dangerColor,
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: 2,
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase' as const,
                  cursor: 'pointer',
                }}
              >
                Trip Breaker
              </button>
            )}
          </div>
        </div>

        {/* Status Tiles */}
        <div style={tileStyle} data-tile="status">
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase' as const,
              color: t.textMuted,
            }}
          >
            System Status
          </div>
          <div style={{ flex: 1, overflow: 'auto' }}>
            {statusTiles}
          </div>
        </div>

        {/* Countdown Timer Tile */}
        <div style={tileStyle} data-tile="countdown">
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase' as const,
              color: countdownSeconds > 0 ? t.warningColor : t.textMuted,
            }}
          >
            {countdownSeconds > 0 ? 'Auto-Action Timer' : 'No Active Timer'}
          </div>
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: '"JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace',
              fontSize: 36,
              fontWeight: 700,
              color: remaining < 60 ? t.dangerColor : t.textPrimary,
              letterSpacing: '0.04em',
            }}
          >
            {countdownTimer ?? formatTime(remaining)}
          </div>
        </div>

        {/* Authority Gate Tile */}
        <div style={tileStyle} data-tile="authority">
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase' as const,
              color: '#D6A84F',
            }}
          >
            Authority Required
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {authorityGate ?? (
              <div
                style={{
                  textAlign: 'center',
                  fontSize: 13,
                  color: t.textMuted,
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 8 }}>&#128274;</div>
                <div>AUTH_5_OVERRIDE Required</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Override Controls */}
      <div style={controlsStyle} data-panel="controls">
        {overrideControls ?? (
          <>
            <button
              onClick={() => {
                setAcknowledged(true);
                onAcknowledge?.();
              }}
              disabled={acknowledged}
              style={{
                padding: '10px 20px',
                background: acknowledged ? t.borderColor : t.panelBg,
                color: acknowledged ? t.textMuted : t.textPrimary,
                border: `1px solid ${acknowledged ? t.borderColor : t.textMuted}`,
                borderRadius: 2,
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '0.04em',
                textTransform: 'uppercase' as const,
                cursor: acknowledged ? 'not-allowed' : 'pointer',
              }}
            >
              {acknowledged ? 'Acknowledged' : 'Acknowledge'}
            </button>
            <button
              onClick={onOverride}
              style={{
                padding: '10px 20px',
                background: t.dangerColor,
                color: '#FFFFFF',
                border: 'none',
                borderRadius: 2,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.04em',
                textTransform: 'uppercase' as const,
                cursor: 'pointer',
              }}
            >
              Initiate Override
            </button>
            <button
              onClick={onAbort}
              style={{
                padding: '10px 20px',
                background: t.panelBg,
                color: t.textPrimary,
                border: `1px solid ${t.warningColor}`,
                borderRadius: 2,
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '0.04em',
                textTransform: 'uppercase' as const,
                cursor: 'pointer',
              }}
            >
              Abort
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// Theme Variants
export const EmergencyDark: React.FC<EmergencyLayoutProps> = (props) => (
  <EmergencyLayout {...props} theme="command-dark" />
);
EmergencyDark.displayName = 'EmergencyDark';

export const EmergencyGreen: React.FC<EmergencyLayoutProps> = (props) => (
  <EmergencyLayout {...props} theme="field-green" />
);
EmergencyGreen.displayName = 'EmergencyGreen';

export const EmergencyBlue: React.FC<EmergencyLayoutProps> = (props) => (
  <EmergencyLayout {...props} theme="deep-blue" />
);
EmergencyBlue.displayName = 'EmergencyBlue';

export const EmergencyForge: React.FC<EmergencyLayoutProps> = (props) => (
  <EmergencyLayout {...props} theme="forge" />
);
EmergencyForge.displayName = 'EmergencyForge';

export const EmergencyRedline: React.FC<EmergencyLayoutProps> = (props) => (
  <EmergencyLayout {...props} theme="redline" />
);
EmergencyRedline.displayName = 'EmergencyRedline';

export default EmergencyLayout;
