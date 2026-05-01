import React from 'react';
import { CommandDescriptor, TorafirmaComponentBaseProps } from '../../types';

/**
 * Props for the ActionPreviewPane component.
 * Side pane previewing action effects.
 */
export interface ActionPreviewPaneProps extends TorafirmaComponentBaseProps {
  /** The action to preview */
  action: CommandDescriptor;
  /** Preview content showing the expected effect */
  preview: React.ReactNode;
  /** Callback fired when the action is applied */
  onApply: (action: CommandDescriptor) => void;
  /** Callback fired when the preview is dismissed */
  onDismiss?: () => void;
}

/**
 * ActionPreviewPane — side pane previewing action effects.
 *
 * Displays a side panel showing a preview of what will happen
 * when an action is applied. Includes the action details and
 * a preview visualization. Provides Apply and Dismiss actions
 * for the operator to confirm or cancel.
 *
 * @example
 * ```tsx
 * <ActionPreviewPane
 *   action={{ id: 'deploy', label: 'Deploy', operation: 'deploy', commandClass: 'deploy', state: 'staged' }}
 *   preview={<div>3 nodes will be updated</div>}
 *   onApply={(action) => console.log('Applied', action.label)}
 *   onDismiss={() => console.log('Dismissed')}
 * />
 * ```
 */
const ActionPreviewPane: React.FC<ActionPreviewPaneProps> = ({
  action,
  preview,
  onApply,
  onDismiss,
  className = '',
  'data-testid': testId,
  ...rest
}) => {
  return (
    <div
      className={`tf-action-preview-pane ${className}`}
      role="complementary"
      aria-label="Action preview"
      data-testid={testId}
      {...rest}
    >
      <div className="tf-action-preview-pane__header">
        <span className={`tf-action-preview-pane__class-badge tf-action-preview-pane__class-badge--${action.commandClass}`}>
          {action.commandClass.toUpperCase()}
        </span>
        <span className="tf-action-preview-pane__title">{action.label}</span>
        {onDismiss && (
          <button
            type="button"
            className="tf-action-preview-pane__dismiss"
            onClick={onDismiss}
            aria-label="Dismiss preview"
          >
            &#10005;
          </button>
        )}
      </div>
      <div className="tf-action-preview-pane__body">
        {action.description && (
          <p className="tf-action-preview-pane__description">{action.description}</p>
        )}
        {action.target && (
          <div className="tf-action-preview-pane__target">
            <span className="tf-action-preview-pane__target-label">Target:</span>
            <span className="tf-action-preview-pane__target-value">{action.target}</span>
          </div>
        )}
        <div className="tf-action-preview-pane__preview">
          <span className="tf-action-preview-pane__preview-label">Preview</span>
          <div className="tf-action-preview-pane__preview-content">{preview}</div>
        </div>
      </div>
      <div className="tf-action-preview-pane__footer">
        <button
          type="button"
          className="tf-action-preview-pane__apply"
          onClick={() => onApply(action)}
        >
          Apply {action.label}
        </button>
      </div>
    </div>
  );
};

export default ActionPreviewPane;
