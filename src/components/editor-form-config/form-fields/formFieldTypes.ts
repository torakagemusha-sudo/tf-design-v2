import type { BaseComponentProps } from '../types';

/** Shared props for the generic `FormField` wrapper and typed field shortcuts. */
export interface FormFieldProps extends BaseComponentProps {
  name: string;
  label?: string;
  type: string;
  value?: unknown;
  onChange: (name: string, value: unknown) => void;
  placeholder?: string;
  description?: string;
  error?: string;
  required?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  size?: 'sm' | 'md' | 'lg';
  width?: 'full' | 'half' | 'third' | 'quarter';
  /** Extra props passed to the underlying input */
  inputProps?: Record<string, unknown>;
}
