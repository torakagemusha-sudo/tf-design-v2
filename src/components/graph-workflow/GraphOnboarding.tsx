/**
 * @fileoverview GraphOnboarding — First-time tutorial overlay for new users.
 * Step-by-step guided tour of the graph editor features.
 */

import React, { useState } from 'react';
import type { GraphComponentProps } from './types';

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  targetSelector?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export interface GraphOnboardingProps extends GraphComponentProps {
  /** Onboarding steps */
  steps: OnboardingStep[];
  /** Whether the onboarding is active */
  active?: boolean;
  /** Callback when onboarding is completed */
  onComplete: () => void;
  /** Callback when onboarding is skipped */
  onSkip?: () => void;
  /** Callback when a step is reached */
  onStepChange?: (stepIndex: number) => void;
}

/**
 * GraphOnboarding — First-time tutorial.
 *
 * A guided tour overlay that walks new users through the graph
 * editor features step by step. Each step highlights a specific
 * UI element with an explanatory tooltip.
 *
 * @example
 * <GraphOnboarding
 *   steps={[
 *     { id: '1', title: 'Welcome', description: 'This is the graph canvas where you build workflows.' },
 *     { id: '2', title: 'Node Palette', description: 'Drag nodes from here onto the canvas.', targetSelector: '.node-palette' },
 *   ]}
 *   active={showOnboarding}
 *   onComplete={() => setShowOnboarding(false)}
 * />
 */
export const GraphOnboarding: React.FC<GraphOnboardingProps> = ({
  className = '',
  style,
  steps,
  active = true,
  onComplete,
  onSkip,
  onStepChange,
  ...rest
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!active || steps.length === 0) return null;

  const step = steps[currentStep];
  const isFirst = currentStep === 0;
  const isLast = currentStep === steps.length - 1;

  const goNext = () => {
    if (isLast) {
      onComplete();
    } else {
      const next = currentStep + 1;
      setCurrentStep(next);
      onStepChange?.(next);
    }
  };

  const goPrev = () => {
    if (!isFirst) {
      const prev = currentStep - 1;
      setCurrentStep(prev);
      onStepChange?.(prev);
    }
  };

  return (
    <div
      className={`tf-graph-onboarding ${className}`}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 500,
        ...style,
      }}
      {...rest}
    >
      {/* Dark overlay */}
      <div
        className="tf-graph-onboarding__backdrop"
        style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(11, 15, 25, 0.75)' }}
      />

      {/* Tooltip card */}
      <div
        className="tf-graph-onboarding__card"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 360,
          padding: 24,
          backgroundColor: 'rgba(16, 22, 36, 0.98)',
          border: '1px solid #2a3a4e',
          borderRadius: 8,
          textAlign: 'center',
        }}
      >
        {/* Step indicator */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 16 }}>
          {steps.map((_, idx) => (
            <div
              key={idx}
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: idx === currentStep ? '#4a6fa5' : idx < currentStep ? '#2a4a6f' : '#1a2332',
                border: `1px solid ${idx === currentStep ? '#6b8cbc' : '#2a3a4e'}`,
              }}
            />
          ))}
        </div>

        <div
          className="tf-graph-onboarding__step-number"
          style={{ fontSize: 10, color: '#6b7f9e', marginBottom: 8, textTransform: 'uppercase' }}
        >
          Step {currentStep + 1} of {steps.length}
        </div>

        <h3 style={{ margin: '0 0 10px', fontSize: 18, color: '#c8d6e5' }}>{step.title}</h3>

        <p style={{ margin: '0 0 24px', fontSize: 13, color: '#8b9db8', lineHeight: 1.5 }}>
          {step.description}
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
          {!isFirst && (
            <button
              className="tf-graph-onboarding__prev"
              onClick={goPrev}
              type="button"
              style={{
                padding: '6px 16px',
                backgroundColor: 'transparent',
                border: '1px solid #2a3a4e',
                borderRadius: 4,
                color: '#8b9db8',
                cursor: 'pointer',
                fontSize: 12,
              }}
            >
              Previous
            </button>
          )}

          <button
            className="tf-graph-onboarding__next"
            onClick={goNext}
            type="button"
            style={{
              padding: '6px 16px',
              backgroundColor: '#2a4a6f',
              border: '1px solid #4a6fa5',
              borderRadius: 4,
              color: '#c8d6e5',
              cursor: 'pointer',
              fontSize: 12,
            }}
          >
            {isLast ? 'Get Started' : 'Next'}
          </button>
        </div>

        {onSkip && (
          <button
            className="tf-graph-onboarding__skip"
            onClick={onSkip}
            type="button"
            style={{
              marginTop: 12,
              background: 'none',
              border: 'none',
              color: '#6b7f9e',
              cursor: 'pointer',
              fontSize: 11,
              textDecoration: 'underline',
            }}
          >
            Skip tutorial
          </button>
        )}
      </div>
    </div>
  );
};

GraphOnboarding.displayName = 'GraphOnboarding';
export default GraphOnboarding;
