/**
 * @fileoverview Central types module for the Torafirma Graph & Workflow component family.
 * All graph components import their shared type definitions from this module.
 */

import type { CSSProperties, ReactNode, MouseEvent, KeyboardEvent } from 'react';

// ---------------------------------------------------------------------------
// Geometry & Position
// ---------------------------------------------------------------------------

export interface Point2D {
  x: number;
  y: number;
}

export interface Size2D {
  width: number;
  height: number;
}

export interface Rect2D extends Point2D, Size2D {}

// ---------------------------------------------------------------------------
// Node Types
// ---------------------------------------------------------------------------

export type GraphNodeType =
  | 'default'
  | 'start'
  | 'end'
  | 'decision'
  | 'process'
  | 'data'
  | 'input'
  | 'output'
  | 'timer'
  | 'parallel'
  | 'join'
  | 'subgraph'
  | 'event'
  | 'message'
  | 'error'
  | 'compensate'
  | 'manual'
  | 'service'
  | 'rule'
  | 'script'
  | 'query'
  | 'transform'
  | 'validate'
  | 'notify'
  | 'gateway'
  | 'condition'
  | 'loop'
  | 'batch'
  | 'ml'
  | 'apiCall'
  | 'webhook'
  | 'queue'
  | 'cache'
  | 'database'
  | 'file'
  | 'email'
  | 'sms'
  | 'publish'
  | 'subscribe'
  | 'schedule'
  | 'metric'
  | 'alert';

export type GraphNodeStatus =
  | 'idle'
  | 'pending'
  | 'running'
  | 'completed'
  | 'failed'
  | 'warning'
  | 'skipped'
  | 'disabled';

export interface GraphNodeData {
  id: string;
  type: GraphNodeType;
  label: string;
  position: Point2D;
  size?: Size2D;
  status?: GraphNodeStatus;
  selected?: boolean;
  locked?: boolean;
  collapsed?: boolean;
  data?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  ports?: PortData[];
  style?: CSSProperties;
  className?: string;
  icon?: ReactNode;
  badge?: string;
  tooltip?: string;
  description?: string;
  version?: string;
  author?: string;
  tags?: string[];
  color?: string;
}

// ---------------------------------------------------------------------------
// Edge Types
// ---------------------------------------------------------------------------

export type GraphEdgeType =
  | 'default'
  | 'conditional'
  | 'error'
  | 'parallel'
  | 'merge'
  | 'loop'
  | 'signal'
  | 'message'
  | 'association'
  | 'data'
  | 'control';

export type GraphEdgeStyle = 'solid' | 'dashed' | 'dotted';

export interface EdgeWaypoint {
  id: string;
  position: Point2D;
}

export interface GraphEdgeData {
  id: string;
  type: GraphEdgeType;
  source: string;
  target: string;
  sourcePort?: string;
  targetPort?: string;
  label?: string;
  waypoints?: EdgeWaypoint[];
  selected?: boolean;
  locked?: boolean;
  style?: GraphEdgeStyle;
  animated?: boolean;
  curvature?: number;
  color?: string;
  thickness?: number;
  badge?: string;
  condition?: string;
  metadata?: Record<string, unknown>;
  data?: Record<string, unknown>;
}

// ---------------------------------------------------------------------------
// Port Types
// ---------------------------------------------------------------------------

export type PortType =
  | 'input'
  | 'output'
  | 'bidirectional'
  | 'error'
  | 'condition'
  | 'data';

export type PortPosition = 'top' | 'right' | 'bottom' | 'left';

export interface PortData {
  id: string;
  type: PortType;
  label?: string;
  position: PortPosition;
  maxConnections?: number;
  required?: boolean;
  acceptedTypes?: string[];
  status?: 'idle' | 'connected' | 'error' | 'warning';
  metadata?: Record<string, unknown>;
}

// ---------------------------------------------------------------------------
// Canvas & Viewport
// ---------------------------------------------------------------------------

export interface ViewportState {
  x: number;
  y: number;
  zoom: number;
  rotation?: number;
}

export interface GridConfig {
  enabled: boolean;
  size: number;
  snap: boolean;
  type: 'dot' | 'line' | 'cross';
  color?: string;
  opacity?: number;
}

export interface CanvasConfig {
  width: number;
  height: number;
  grid: GridConfig;
  readonly?: boolean;
  minimap?: boolean;
  snapToGrid?: boolean;
  snapToObjects?: boolean;
  showPorts?: boolean;
  showEdgeLabels?: boolean;
  allowCycles?: boolean;
  multiSelect?: boolean;
  zoomRange?: [number, number];
}

// ---------------------------------------------------------------------------
// Swimlane / Layer Band
// ---------------------------------------------------------------------------

export interface LayerBandData {
  id: string;
  label: string;
  color?: string;
  height?: number;
  collapsed?: boolean;
  locked?: boolean;
  nodeIds?: string[];
  metadata?: Record<string, unknown>;
}

// ---------------------------------------------------------------------------
// Zone
// ---------------------------------------------------------------------------

export interface ZoneData {
  id: string;
  label: string;
  position: Point2D;
  size: Size2D;
  color?: string;
  pattern?: 'solid' | 'striped' | 'dotted';
  locked?: boolean;
  collapsed?: boolean;
  metadata?: Record<string, unknown>;
}

// ---------------------------------------------------------------------------
// Selection & Interaction
// ---------------------------------------------------------------------------

export type ToolType =
  | 'select'
  | 'pan'
  | 'lasso'
  | 'connect'
  | 'delete'
  | 'comment'
  | 'bookmark';

export interface SelectionState {
  nodeIds: string[];
  edgeIds: string[];
  anchor?: Point2D;
}

export interface DragState {
  isDragging: boolean;
  startPosition: Point2D;
  currentPosition: Point2D;
  draggedIds: string[];
}

// ---------------------------------------------------------------------------
// Layout
// ---------------------------------------------------------------------------

export type LayoutAlgorithm =
  | 'hierarchical'
  | 'forceDirected'
  | 'circular'
  | 'grid'
  | 'tree'
  | 'dagre'
  | 'elk'
  | 'manual';

export interface LayoutConfig {
  algorithm: LayoutAlgorithm;
  direction?: 'TB' | 'BT' | 'LR' | 'RL';
  spacing?: number;
  padding?: number;
  animate?: boolean;
  duration?: number;
}

// ---------------------------------------------------------------------------
// History
// ---------------------------------------------------------------------------

export interface HistoryEntry {
  id: string;
  timestamp: number;
  type: 'create' | 'update' | 'delete' | 'move' | 'connect' | 'layout' | 'property';
  description: string;
  nodeIds?: string[];
  edgeIds?: string[];
  undoable?: boolean;
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

export type ValidationSeverity = 'error' | 'warning' | 'info';

export interface ValidationResult {
  id: string;
  severity: ValidationSeverity;
  message: string;
  nodeId?: string;
  edgeId?: string;
  rule?: string;
  autoFixable?: boolean;
}

// ---------------------------------------------------------------------------
// Collaboration
// ---------------------------------------------------------------------------

export interface UserPresence {
  userId: string;
  userName: string;
  userColor: string;
  cursorPosition?: Point2D;
  viewport?: ViewportState;
  selectedIds?: string[];
  lastActive?: number;
}

export interface ConflictEntry {
  id: string;
  type: 'node' | 'edge' | 'property';
  elementId: string;
  localValue: unknown;
  remoteValue: unknown;
  resolved?: boolean;
  resolution?: 'local' | 'remote' | 'merged';
}

// ---------------------------------------------------------------------------
// Playback / Animation
// ---------------------------------------------------------------------------

export type PlaybackState = 'playing' | 'paused' | 'stopped';

export interface PlaybackConfig {
  speed: number;
  loop: boolean;
  state: PlaybackState;
  currentTime: number;
  totalTime: number;
}

// ---------------------------------------------------------------------------
// Snapshot
// ---------------------------------------------------------------------------

export interface GraphSnapshot {
  id: string;
  label: string;
  timestamp: number;
  thumbnail?: string;
  nodeCount: number;
  edgeCount: number;
}

// ---------------------------------------------------------------------------
// Comment / Annotation
// ---------------------------------------------------------------------------

export interface CommentData {
  id: string;
  text: string;
  author: string;
  timestamp: number;
  position: Point2D;
  resolved?: boolean;
  replies?: CommentData[];
  nodeId?: string;
  edgeId?: string;
}

// ---------------------------------------------------------------------------
// Bookmark
// ---------------------------------------------------------------------------

export interface BookmarkData {
  id: string;
  label: string;
  nodeId?: string;
  position?: Point2D;
  viewport?: ViewportState;
  timestamp: number;
  color?: string;
}

// ---------------------------------------------------------------------------
// Template
// ---------------------------------------------------------------------------

export interface GraphTemplate {
  id: string;
  name: string;
  description?: string;
  category: string;
  thumbnail?: string;
  nodeCount: number;
  edgeCount: number;
  tags?: string[];
  metadata?: Record<string, unknown>;
}

// ---------------------------------------------------------------------------
// Stats
// ---------------------------------------------------------------------------

export interface GraphStats {
  nodeCount: number;
  edgeCount: number;
  nodeTypeCounts: Record<string, number>;
  edgeTypeCounts: Record<string, number>;
  validationIssues: number;
  lastModified: number;
  author?: string;
  version?: string;
}

// ---------------------------------------------------------------------------
// Diff
// ---------------------------------------------------------------------------

export type DiffType = 'added' | 'removed' | 'modified' | 'unchanged';

export interface DiffEntry {
  id: string;
  type: 'node' | 'edge';
  elementId: string;
  diffType: DiffType;
  before?: GraphNodeData | GraphEdgeData;
  after?: GraphNodeData | GraphEdgeData;
  propertyChanges?: Array<{ property: string; before: unknown; after: unknown }>;
}

// ---------------------------------------------------------------------------
// Theme & Preferences
// ---------------------------------------------------------------------------

export interface GraphTheme {
  id: string;
  name: string;
  backgroundColor: string;
  gridColor: string;
  nodeColors: Record<GraphNodeType, string>;
  edgeColors: Record<GraphEdgeType, string>;
  portColors: Record<PortType, string>;
  selectionColor: string;
  textColor: string;
  borderColor: string;
}

export interface GraphPreferences {
  themeId: string;
  showGrid: boolean;
  snapToGrid: boolean;
  autoSave: boolean;
  autoSaveInterval: number;
  showMinimap: boolean;
  showPorts: boolean;
  showEdgeLabels: boolean;
  confirmDelete: boolean;
  defaultLayout: LayoutAlgorithm;
}

// ---------------------------------------------------------------------------
// Notification
// ---------------------------------------------------------------------------

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface GraphNotification {
  id: string;
  type: NotificationType;
  message: string;
  timestamp: number;
  duration?: number;
  dismissible?: boolean;
}

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------

export type ExportFormat = 'png' | 'svg' | 'pdf' | 'json';

export interface ExportConfig {
  format: ExportFormat;
  quality?: number;
  scale?: number;
  includeBackground?: boolean;
  cropToContent?: boolean;
  filename?: string;
}

// ---------------------------------------------------------------------------
// Component Props Base
// ---------------------------------------------------------------------------

export interface GraphComponentProps {
  className?: string;
  style?: CSSProperties;
  onClick?: (event: MouseEvent) => void;
  onKeyDown?: (event: KeyboardEvent) => void;
  'data-testid'?: string;
}

export interface GraphNodeComponentProps extends GraphComponentProps {
  node: GraphNodeData;
  selected?: boolean;
  onSelect?: (nodeId: string) => void;
  onDoubleClick?: (nodeId: string) => void;
  onContextMenu?: (nodeId: string, event: MouseEvent) => void;
  onDragStart?: (nodeId: string, position: Point2D) => void;
  onDrag?: (nodeId: string, position: Point2D) => void;
  onDragEnd?: (nodeId: string, position: Point2D) => void;
  onPortClick?: (nodeId: string, portId: string) => void;
  onResize?: (nodeId: string, size: Size2D) => void;
  children?: ReactNode;
}

export interface GraphEdgeComponentProps extends GraphComponentProps {
  edge: GraphEdgeData;
  sourceNode: GraphNodeData;
  targetNode: GraphNodeData;
  selected?: boolean;
  onSelect?: (edgeId: string) => void;
  onDoubleClick?: (edgeId: string) => void;
  onContextMenu?: (edgeId: string, event: MouseEvent) => void;
  onWaypointAdd?: (edgeId: string, position: Point2D) => void;
  onWaypointMove?: (edgeId: string, waypointId: string, position: Point2D) => void;
  onWaypointRemove?: (edgeId: string, waypointId: string) => void;
}

export interface PortComponentProps extends Omit<GraphComponentProps, 'onClick'> {
  port: PortData;
  nodeId: string;
  onClick?: (nodeId: string, portId: string) => void;
  onMouseEnter?: (nodeId: string, portId: string) => void;
  onMouseLeave?: (nodeId: string, portId: string) => void;
  onConnectionStart?: (nodeId: string, portId: string) => void;
  onConnectionEnd?: (nodeId: string, portId: string) => void;
}

export interface CanvasComponentProps extends GraphComponentProps {
  nodes: GraphNodeData[];
  edges: GraphEdgeData[];
  viewport: ViewportState;
  config: CanvasConfig;
  selectedNodes?: string[];
  selectedEdges?: string[];
  tool?: ToolType;
  onViewportChange?: (viewport: ViewportState) => void;
  onNodeSelect?: (nodeIds: string[]) => void;
  onEdgeSelect?: (edgeIds: string[]) => void;
  onNodeMove?: (nodeId: string, position: Point2D) => void;
  onNodeCreate?: (node: GraphNodeData) => void;
  onNodeDelete?: (nodeId: string) => void;
  onEdgeCreate?: (edge: GraphEdgeData) => void;
  onEdgeDelete?: (edgeId: string) => void;
  onContextMenu?: (position: Point2D, elementType: string, elementId?: string) => void;
  children?: ReactNode;
}
