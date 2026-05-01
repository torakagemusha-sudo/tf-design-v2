/**
 * @fileoverview OnboardingLayout — First-Time User Onboarding
 *
 * Guided onboarding experience for new operators. Variants for welcome
 * screens, interactive tutorials, and feature discovery overlays.
 *
 * ```
 * +--------------------------------------------------------------------+
 * | [Logo]                                    [Skip]  [Step X of N]    |  TOP
 * +--------------------------------------------------------------------+
 * |                                                                    |  MAIN
 * |                                                                    |
 * |              [ Visual / Illustration / Tutorial Card ]             |
 * |                                                                    |
 * |              HEADING                                               |
 * |              Description of this step in the                       |
 * |              onboarding process.                                   |
 * |                                                                    |
 * |              [ Previous ]  [  Next  ]  [ Get Started ]             |
 * |                                                                    |
 * +--------------------------------------------------------------------+
 * ```
 */

import React, { useState, useCallback } from 'react';
import type { LayoutBaseProps, TorafirmaTheme } from './types';
import { THEME_TOKENS } from './types';
import { useLayout } from './useLayout';

export type OnboardingVariant = 'welcome' | 'tutorial' | 'featurediscovery';

export interface OnboardingStep {
  id: string;
  heading: string;
  description: string;
  visual?: React.ReactNode;
}

export interface OnboardingLayoutProps extends LayoutBaseProps {
  variant?: OnboardingVariant;
  /** Onboarding steps (for tutorial/discovery) */
  steps?: OnboardingStep[];
  /** Welcome screen content */
  welcomeContent?: React.ReactNode;
  /** On completion callback */
  onComplete?: () => void;
  /** On skip callback */
  onSkip?: () => void;
  /** Logo element */
  logo?: React.ReactNode;
  /** Custom footer */
  footer?: React.ReactNode;
}

export const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({
  theme: propTheme,
  variant = 'welcome',
  steps = [],
  welcomeContent,
  onComplete,
  onSkip,
  logo,
  footer,
  className,
  style,
  testId,
}) => {
  const { state } = useLayout();
  const theme = propTheme ?? state.theme;
  const t = THEME_TOKENS[theme];
  const [currentStep, setCurrentStep] = useState(0);

  const goNext = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((p) => p + 1);
    } else {
      onComplete?.();
    }
  }, [currentStep, steps.length, onComplete]);

  const goPrev = useCallback(() => {
    if (currentStep > 0) setCurrentStep((p) => p - 1);
  }, [currentStep]);

  const isLastStep = currentStep >= steps.length - 1;
  const activeStep = steps[currentStep];

  const containerStyle: React.CSSProperties = {
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: t.background,
    color: t.textPrimary,
    fontFamily: 'Inter, "IBM Plex Sans", system-ui, sans-serif',
    fontSize: 14,
    overflow: 'hidden',
    ...style,
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 24px',
    borderBottom: `1px solid ${t.borderColor}`,
  };

  const mainStyle: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 48,
    gap: 24,
    overflow: 'auto',
  };

  const buttonStyle = (isPrimary = false): React.CSSProperties => ({
    padding: '10px 24px',
    background: isPrimary ? t.accentColor : t.panelBg,
    color: isPrimary ? t.background : t.textPrimary,
    border: isPrimary ? 'none' : `1px solid ${t.borderColor}`,
    borderRadius: 2,
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: '0.04em',
    textTransform: 'uppercase' as const,
    cursor: 'pointer',
  });

  const dotStyle = (isActive: boolean): React.CSSProperties => ({
    width: 8,
    height: 8,
    borderRadius: '50%',
    background: isActive ? t.accentColor : t.borderColor,
    transition: 'background 0.2s ease',
  });

  return (
    <div
      className={`tf-layout tf-onboarding tf-onboarding--${variant} ${className ?? ''}`}
      data-testid={testId}
      data-layout="onboarding"
      data-variant={variant}
      data-theme={theme}
      style={containerStyle}
    >
      {/* Header */}
      <div style={headerStyle} data-panel="header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {logo ?? (
            <span
              style={{
                fontFamily: 'Rajdhani, Oxanium, sans-serif',
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: '0.08em',
                color: t.accentColor,
                textTransform: 'uppercase' as const,
              }}
            >
              Torafirma
            </span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {steps.length > 0 && (
            <span
              style={{
                fontSize: 11,
                color: t.textMuted,
                letterSpacing: '0.04em',
                textTransform: 'uppercase' as const,
              }}
            >
              Step {currentStep + 1} of {steps.length}
            </span>
          )}
          {onSkip && (
            <button
              onClick={onSkip}
              style={{
                background: 'transparent',
                border: 'none',
                color: t.textMuted,
                fontSize: 12,
                cursor: 'pointer',
                letterSpacing: '0.04em',
                textTransform: 'uppercase' as const,
              }}
            >
              Skip
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div style={mainStyle} data-panel="main">
        {variant === 'welcome' && welcomeContent ? (
          welcomeContent
        ) : activeStep ? (
          <>
            {/* Visual */}
            {activeStep.visual && (
              <div
                style={{
                  width: '100%',
                  maxWidth: 480,
                  minHeight: 200,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: t.panelBg,
                  border: `1px solid ${t.borderColor}`,
                  borderRadius: 2,
                  padding: 24,
                }}
                data-element="visual"
              >
                {activeStep.visual}
              </div>
            )}

            {/* Step Indicators */}
            {steps.length > 1 && (
              <div style={{ display: 'flex', gap: 8 }} data-element="step-dots">
                {steps.map((_, i) => (
                  <div key={i} style={dotStyle(i === currentStep)} />
                ))}
              </div>
            )}

            {/* Text */}
            <div
              style={{
                textAlign: 'center',
                maxWidth: 480,
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
              data-element="text"
            >
              <h2
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase' as const,
                  color: t.textPrimary,
                  margin: 0,
                }}
              >
                {activeStep.heading}
              </h2>
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: t.textMuted,
                  margin: 0,
                }}
              >
                {activeStep.description}
              </p>
            </div>

            {/* Navigation */}
            <div
              style={{ display: 'flex', gap: 12, marginTop: 8 }}
              data-element="navigation"
            >
              {currentStep > 0 && (
                <button onClick={goPrev} style={buttonStyle(false)}>
                  Previous
                </button>
              )}
              <button onClick={goNext} style={buttonStyle(true)}>
                {isLastStep ? 'Get Started' : 'Next'}
              </button>
            </div>
          </>
        ) : (
          <div style={{ color: t.textMuted }}>No onboarding content configured.</div>
        )}
      </div>

      {/* Footer */}
      {footer && (
        <div
          style={{
            padding: '12px 24px',
            borderTop: `1px solid ${t.borderColor}`,
            textAlign: 'center',
            fontSize: 11,
            color: t.textMuted,
          }}
          data-panel="footer"
        >
          {footer}
        </div>
      )}
    </div>
  );
};

// Variant Exports
export const WelcomeLayout: React.FC<Omit<OnboardingLayoutProps, 'variant'>> = (props) => (
  <OnboardingLayout {...props} variant="welcome" />
);
WelcomeLayout.displayName = 'WelcomeLayout';

export const TutorialLayout: React.FC<Omit<OnboardingLayoutProps, 'variant'>> = (props) => (
  <OnboardingLayout {...props} variant="tutorial" />
);
TutorialLayout.displayName = 'TutorialLayout';

export const FeatureDiscoveryLayout: React.FC<Omit<OnboardingLayoutProps, 'variant'>> = (props) => (
  <OnboardingLayout {...props} variant="featurediscovery" />
);
FeatureDiscoveryLayout.displayName = 'FeatureDiscoveryLayout';

export default OnboardingLayout;
