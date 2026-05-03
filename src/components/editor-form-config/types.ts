/**
 * @fileoverview Shared types for the Torafirma Editor, Form & Configuration components.
 * @module editor-form-config/types
 */

import type { ReactNode, CSSProperties, ChangeEvent, FocusEvent, KeyboardEvent, MouseEvent, RefObject } from "react";

/** Base props extended by all editor-form-config components */
export interface BaseComponentProps {
  /** Additional CSS class names */
  className?: string;
  /** Inline styles */
  style?: CSSProperties;
  /** Data attribute for testing */
  "data-testid"?: string;
  /** Unique identifier */
  id?: string;
}

/** Property definition for PropertyPanel */
export interface PropertyDefinition {
  key: string;
  label: string;
  type: "text" | "number" | "boolean" | "select" | "multiselect" | "color" | "date" | "json" | "code" | "url" | "email" | "file" | "reference" | "expression";
  value: unknown;
  defaultValue?: unknown;
  options?: Array<{ label: string; value: unknown }>;
  description?: string;
  placeholder?: string;
  required?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  validation?: ValidationRule[];
  section?: string;
  order?: number;
  visible?: boolean;
}

/** Validation rule for properties and form fields */
export interface ValidationRule {
  type: "required" | "min" | "max" | "minLength" | "maxLength" | "pattern" | "email" | "url" | "custom" | "unique";
  value?: unknown;
  message?: string;
  validator?: (value: unknown) => boolean | string;
}

/** Schema node for visual schema editor */
export interface SchemaNodeData {
  id: string;
  type: "entity" | "attribute" | "relation" | "index" | "validation" | "trigger";
  label: string;
  properties: Record<string, unknown>;
  position: { x: number; y: number };
  expanded?: boolean;
  selected?: boolean;
  disabled?: boolean;
  icon?: string;
  color?: string;
}

/** Schema edge connecting nodes */
export interface SchemaEdgeData {
  id: string;
  source: string;
  target: string;
  type: "oneToOne" | "oneToMany" | "manyToOne" | "manyToMany" | "inheritance" | "dependency";
  label?: string;
  selected?: boolean;
}

/** Code pane model / document */
export interface CodeDocument {
  id: string;
  filename: string;
  language: string;
  content: string;
  version: number;
  modified: boolean;
  readonly?: boolean;
}

/** JSON editor view mode */
export type JsonViewMode = "tree" | "text" | "split";

/** Patch/hunk operation type */
export type PatchOperation = "add" | "remove" | "modify" | "rename" | "move";

/** Single patch hunk */
export interface PatchHunk {
  id: string;
  oldStart: number;
  oldLines: number;
  newStart: number;
  newLines: number;
  lines: PatchLine[];
  header?: string;
  accepted?: boolean;
}

/** Single line in a patch hunk */
export interface PatchLine {
  type: "context" | "add" | "remove";
  content: string;
  lineNumber: number;
  newLineNumber?: number;
}

/** Form field option for selects */
export interface FieldOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  icon?: string;
  description?: string;
}

/** Form field configuration */
export interface FormFieldConfig {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  defaultValue?: unknown;
  options?: FieldOption[];
  validation?: ValidationRule[];
  dependencies?: string[];
  conditions?: FieldCondition[];
  width?: "full" | "half" | "third" | "quarter";
  size?: "sm" | "md" | "lg";
  autoComplete?: string;
}

/** Conditional field visibility rule */
export interface FieldCondition {
  field: string;
  operator: "equals" | "notEquals" | "contains" | "gt" | "lt" | "exists" | "empty";
  value?: unknown;
}

/** Form step for multi-step forms */
export interface FormStepConfig {
  id: string;
  label: string;
  description?: string;
  fields: string[];
  validation?: "none" | "loose" | "strict";
  optional?: boolean;
}

/** Config version entry */
export interface ConfigVersion {
  id: string;
  label: string;
  timestamp: number;
  author: string;
  changelog?: string;
  current?: boolean;
}

/** Field dependency node */
export interface DependencyNode {
  id: string;
  label: string;
  type: "field" | "group" | "external";
  dependencies: string[];
}

/** Autocomplete suggestion */
export interface AutocompleteSuggestion {
  label: string;
  value: string;
  description?: string;
  category?: string;
  icon?: string;
}

/** Currency definition */
export interface CurrencyConfig {
  code: string;
  symbol: string;
  decimals: number;
  locale: string;
}

/** Duration segment */
export interface DurationValue {
  years?: number;
  months?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

/** File upload item */
export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  url?: string;
  error?: string;
}

/** Template gallery item */
export interface ConfigTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  thumbnail?: string;
  config: Record<string, unknown>;
  tags: string[];
}

/** Secret entry */
export interface SecretEntry {
  id: string;
  name: string;
  value: string;
  masked: boolean;
  lastRotated?: number;
  expiresAt?: number;
}

/** Props for the schema property editor dialog (see `core/SchemaPropertyEditor.tsx`). */
export type { SchemaPropertyEditorProps } from './core/SchemaPropertyEditor';
