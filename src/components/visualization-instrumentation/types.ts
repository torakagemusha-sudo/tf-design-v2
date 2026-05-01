/**
 * Central types module for Torafirma Visualization & Instrumentation components
 * @module visualization-instrumentation/types
 */

/** Data point in a time-series */
export interface DataPoint {
  x: number;
  y: number;
  timestamp: number;
  value: number;
}

/** Time range specification */
export interface TimeRange {
  start: number;
  end: number;
}

/** Telemetry series data */
export interface TelemetrySeries {
  id: string;
  label: string;
  color: string;
  data: DataPoint[];
  units?: string;
  maxValue: number;
}

/** Legend series entry */
export interface LegendSeries {
  id: string;
  label: string;
  color: string;
  visible?: boolean;
  units?: string;
}

/** Tooltip series entry */
export interface TooltipSeries {
  id: string;
  label: string;
  color: string;
  value: number;
  units?: string;
}

/** Western Electric rule definition */
export interface WesternElectricRule {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

/** Regime state */
export interface RegimeState {
  type: string;
  label: string;
  since?: number;
  confidence?: number;
  metadata?: Record<string, unknown>;
}

/** Regime period */
export interface RegimePeriod {
  type: string;
  label: string;
  start: number;
  end: number;
}

/** Heat map cell data */
export interface HeatCell {
  value: number;
  row: number;
  col: number;
  metadata?: Record<string, unknown>;
}

/** Geographic point */
export interface GeoPoint {
  lat: number;
  lng: number;
  x?: number;
  y?: number;
}

/** Weighted geographic point */
export interface WeightedGeoPoint {
  x: number;
  y: number;
  weight: number;
  lat?: number;
  lng?: number;
}

/** Map marker data */
export interface MapMarkerData {
  id: string;
  position: GeoPoint & { x: number; y: number };
  label?: string;
  status?: 'normal' | 'warning' | 'critical' | 'info';
  popup?: React.ReactNode;
}

/** Map layer definition */
export interface MapLayer {
  id: string;
  type: string;
  content: React.ReactNode;
}

/** Map legend item */
export interface MapLegendItem {
  label: string;
  color: string;
  symbol?: string;
}

/** Sparkline item for strip */
export interface SparklineItem {
  label: string;
  data: number[];
  currentValue: number;
  color?: string;
}

/** Gauge zone definition */
export interface GaugeZone {
  start: number;
  end: number;
  color: string;
  label?: string;
}

/** Bar data point */
export interface BarDataPoint {
  label: string;
  value: number;
  color?: string;
  category?: string;
}

/** Bar series for grouped/stacked */
export interface BarSeries {
  label: string;
  data: number[];
  color?: string;
}

/** Line data point */
export interface LineDataPoint {
  x: number;
  y: number;
  label?: string;
}

/** Area data point */
export interface AreaDataPoint {
  x: number;
  y: number;
}

/** Area series */
export interface AreaSeries {
  label: string;
  data: number[];
  color?: string;
}

/** Pie slice */
export interface PieSlice {
  label: string;
  value: number;
  color: string;
  id?: string;
}

/** Scatter point */
export interface ScatterPoint {
  x: number;
  y: number;
  color?: string;
  size?: number;
  label?: string;
}

/** Histogram bin */
export interface HistogramBin {
  min: number;
  max: number;
  count: number;
  density?: number;
  label?: string;
  color?: string;
}

/** Box plot data */
export interface BoxPlotData {
  label: string;
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
  whiskerMin: number;
  whiskerMax: number;
  outliers?: number[];
  color?: string;
}

/** Violin data */
export interface ViolinData {
  label: string;
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
  color?: string;
}

/** Radar axis */
export interface RadarAxis {
  label: string;
  max: number;
}

/** Radar series */
export interface RadarSeries {
  label: string;
  values: number[];
  color?: string;
}

/** Sankey node */
export interface SankeyNodeData {
  id: string;
  label: string;
  x: number;
  y: number;
  height: number;
  color?: string;
  value?: number;
}

/** Sankey link */
export interface SankeyLinkData {
  source: string;
  target: string;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  value: number;
  color?: string;
}

/** Treemap node */
export interface TreemapNode {
  label: string;
  value: number;
  color?: string;
  children?: TreemapNode[];
}

/** Sunburst node */
export interface SunburstNode {
  label: string;
  value: number;
  depth: number;
  startAngle: number;
  endAngle: number;
  color?: string;
  children?: SunburstNode[];
}

/** Funnel stage */
export interface FunnelStage {
  label: string;
  value: number;
  color?: string;
}

/** Waterfall bar */
export interface WaterfallBar {
  label: string;
  value: number;
  color?: string;
}

/** Bullet range */
export interface BulletRange {
  min: number;
  max: number;
  qualitative: 'poor' | 'satisfactory' | 'good';
}

/** Pareto item */
export interface ParetoItem {
  label: string;
  value: number;
  color?: string;
}
