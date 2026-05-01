import React from 'react';
import { CommandDescriptor, TorafirmaComponentBaseProps } from '../../types';

/**
 * A command template definition.
 */
export interface CommandTemplate {
  id: string;
  label: string;
  description?: string;
  commandClass: string;
  category?: string;
  defaultParams?: Record<string, unknown>;
}

/**
 * Props for the CommandTemplateSelector component.
 * Pick from command templates.
 */
export interface CommandTemplateSelectorProps extends TorafirmaComponentBaseProps {
  /** Array of available templates */
  templates: CommandTemplate[];
  /** Callback fired when a template is selected */
  onSelect: (template: CommandTemplate) => void;
}

/**
 * CommandTemplateSelector — pick from command templates.
 *
 * Displays a browsable list of pre-configured command templates
 * organized by category. Each template shows its command class,
 * label, and description for operator selection.
 *
 * @example
 * ```tsx
 * <CommandTemplateSelector
 *   templates={[
 *     { id: 'tpl1', label: 'Standard Deploy', description: 'Deploy to production with validation', commandClass: 'deploy', category: 'Deployment' },
 *   ]}
 *   onSelect={(tpl) => console.log(tpl.label)}
 * />
 * ```
 */
const CommandTemplateSelector: React.FC<CommandTemplateSelectorProps> = ({
  templates,
  onSelect,
  className = '',
  'data-testid': testId,
  ...rest
}) => {
  const byCategory = templates.reduce<Record<string, CommandTemplate[]>>((acc, tpl) => {
    const cat = tpl.category || 'General';
    (acc[cat] = acc[cat] || []).push(tpl);
    return acc;
  }, {});

  return (
    <div className={`tf-command-template-selector ${className}`} data-testid={testId} {...rest}>
      <div className="tf-command-template-selector__header">
        <span className="tf-command-template-selector__title">Command Templates</span>
      </div>
      {Object.entries(byCategory).map(([category, tpls]) => (
        <div key={category} className="tf-command-template-selector__category">
          <span className="tf-command-template-selector__category-label">{category}</span>
          <ul className="tf-command-template-selector__list">
            {tpls.map((tpl) => (
              <li key={tpl.id} className="tf-command-template-selector__item">
                <button
                  type="button"
                  className={`tf-command-template-selector__button tf-command-template-selector__button--${tpl.commandClass}`}
                  onClick={() => onSelect(tpl)}
                >
                  <span className="tf-command-template-selector__class">{tpl.commandClass.toUpperCase()}</span>
                  <span className="tf-command-template-selector__label">{tpl.label}</span>
                  {tpl.description && (
                    <span className="tf-command-template-selector__description">{tpl.description}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default CommandTemplateSelector;
