/**
 * ============================================================
 * Torafirma Design System — State, Status & Telemetry Components
 * ============================================================
 *
 * Complete component family for displaying system state, operational
 * status, health indicators, progress displays, telemetry readouts,
 * governance markers, and infrastructure metrics.
 *
 * Volume: 03.2 — State, Status & Telemetry Components
 * ============================================================
 */

// ---------------------------------------------------------------------------
// Core State & Status Components
// ---------------------------------------------------------------------------

export { StateBadge } from './StateBadge';
export type { StateBadgeProps } from './StateBadge';

export { StateBadgeGroup } from './StateBadgeGroup';
export type { StateBadgeGroupProps } from './StateBadgeGroup';

export { AuthorityBadge } from './AuthorityBadge';
export type { AuthorityBadgeProps } from './AuthorityBadge';

export { AuthorityBadgeCompact } from './AuthorityBadgeCompact';
export type { AuthorityBadgeCompactProps } from './AuthorityBadgeCompact';

export { AuthorityEscalator } from './AuthorityEscalator';
export type { AuthorityEscalatorProps } from './AuthorityEscalator';

export { RuntimeStatus } from './RuntimeStatus';
export type { RuntimeStatusProps, RuntimeConnectionState } from './RuntimeStatus';

export { RuntimeStatusCompact } from './RuntimeStatusCompact';
export type { RuntimeStatusCompactProps } from './RuntimeStatusCompact';

export { HealthIndicator } from './HealthIndicator';
export type { HealthIndicatorProps, HealthLevel } from './HealthIndicator';

export { HealthBar } from './HealthBar';
export type { HealthBarProps } from './HealthBar';

export { HealthScore } from './HealthScore';
export type { HealthScoreProps } from './HealthScore';

// ---------------------------------------------------------------------------
// Progress Components
// ---------------------------------------------------------------------------

export { ProgressIndicator } from './ProgressIndicator';
export type { ProgressIndicatorProps } from './ProgressIndicator';

export { ProgressRing } from './ProgressRing';
export type { ProgressRingProps } from './ProgressRing';

export { ProgressStepper } from './ProgressStepper';
export type { ProgressStepperProps, ProgressStep } from './ProgressStepper';

export { ProgressSegmented } from './ProgressSegmented';
export type { ProgressSegmentedProps } from './ProgressSegmented';

// ---------------------------------------------------------------------------
// Telemetry Components
// ---------------------------------------------------------------------------

export { TelemetryStrip } from './TelemetryStrip';
export type { TelemetryStripProps, TelemetryItem } from './TelemetryStrip';

export { TelemetryStripVertical } from './TelemetryStripVertical';
export type { TelemetryStripVerticalProps } from './TelemetryStripVertical';

export { TelemetryValue } from './TelemetryValue';
export type { TelemetryValueProps } from './TelemetryValue';

export { TelemetryDelta } from './TelemetryDelta';
export type { TelemetryDeltaProps } from './TelemetryDelta';

export { TelemetrySparkline } from './TelemetrySparkline';
export type { TelemetrySparklineProps } from './TelemetrySparkline';

export { TelemetryGauge } from './TelemetryGauge';
export type { TelemetryGaugeProps } from './TelemetryGauge';

// ---------------------------------------------------------------------------
// Regime Components
// ---------------------------------------------------------------------------

export { RegimeIndicator } from './RegimeIndicator';
export type { RegimeIndicatorProps, RegimeType } from './RegimeIndicator';

export { RegimeBadge } from './RegimeBadge';
export type { RegimeBadgeProps } from './RegimeBadge';

export { RegimeTimeline } from './RegimeTimeline';
export type { RegimeTimelineProps, RegimeEntry } from './RegimeTimeline';

// ---------------------------------------------------------------------------
// Lock & Dirty State Components
// ---------------------------------------------------------------------------

export { LockIndicator } from './LockIndicator';
export type { LockIndicatorProps } from './LockIndicator';

export { LockStatusPanel } from './LockStatusPanel';
export type { LockStatusPanelProps } from './LockStatusPanel';

export { DirtyIndicator } from './DirtyIndicator';
export type { DirtyIndicatorProps } from './DirtyIndicator';

export { DirtyBadge } from './DirtyBadge';
export type { DirtyBadgeProps } from './DirtyBadge';

// ---------------------------------------------------------------------------
// Sync & Connection Components
// ---------------------------------------------------------------------------

export { SyncStatus } from './SyncStatus';
export type { SyncStatusProps, SyncState } from './SyncStatus';

export { SyncIndicator } from './SyncIndicator';
export type { SyncIndicatorProps } from './SyncIndicator';

export { ConnectionStatus } from './ConnectionStatus';
export type { ConnectionStatusProps, ConnectionQuality } from './ConnectionStatus';

export { ConnectionQualityBar } from './ConnectionQualityBar';
export type { ConnectionQualityBarProps } from './ConnectionQualityBar';

// ---------------------------------------------------------------------------
// Signature & Simulation Components
// ---------------------------------------------------------------------------

export { SignedIndicator } from './SignedIndicator';
export type { SignedIndicatorProps, SignatureState } from './SignedIndicator';

export { SignedBadge } from './SignedBadge';
export type { SignedBadgeProps } from './SignedBadge';

export { SimulatedIndicator } from './SimulatedIndicator';
export type { SimulatedIndicatorProps } from './SimulatedIndicator';

export { SimulatedBanner } from './SimulatedBanner';
export type { SimulatedBannerProps } from './SimulatedBanner';

// ---------------------------------------------------------------------------
// Validation Components
// ---------------------------------------------------------------------------

export { ValidationStatus } from './ValidationStatus';
export type { ValidationStatusProps } from './ValidationStatus';

export { ValidationBadge } from './ValidationBadge';
export type { ValidationBadgeProps } from './ValidationBadge';

export { ValidationSummary } from './ValidationSummary';
export type { ValidationSummaryProps } from './ValidationSummary';

// ---------------------------------------------------------------------------
// Deploy & Commit Components
// ---------------------------------------------------------------------------

export { DeployStatus } from './DeployStatus';
export type { DeployStatusProps, DeployState } from './DeployStatus';

export { DeployProgress } from './DeployProgress';
export type { DeployProgressProps, DeployStep } from './DeployProgress';

export { CommitStatus } from './CommitStatus';
export type { CommitStatusProps, CommitState } from './CommitStatus';

export { CommitChain } from './CommitChain';
export type { CommitChainProps, CommitLink } from './CommitChain';

// ---------------------------------------------------------------------------
// Fault & Recovery Components
// ---------------------------------------------------------------------------

export { FaultIndicator } from './FaultIndicator';
export type { FaultIndicatorProps, FaultSeverity } from './FaultIndicator';

export { FaultSeverityBadge } from './FaultSeverityBadge';
export type { FaultSeverityBadgeProps } from './FaultSeverityBadge';

export { DegradedModeBanner } from './DegradedModeBanner';
export type { DegradedModeBannerProps } from './DegradedModeBanner';

export { RecoveryStatus } from './RecoveryStatus';
export type { RecoveryStatusProps, RecoveryState } from './RecoveryStatus';

// ---------------------------------------------------------------------------
// Backup & Audit Components
// ---------------------------------------------------------------------------

export { BackupStatus } from './BackupStatus';
export type { BackupStatusProps, BackupState } from './BackupStatus';

export { AuditStatus } from './AuditStatus';
export type { AuditStatusProps, AuditState } from './AuditStatus';

export { AuditTrailBadge } from './AuditTrailBadge';
export type { AuditTrailBadgeProps } from './AuditTrailBadge';

// ---------------------------------------------------------------------------
// Session & Version Components
// ---------------------------------------------------------------------------

export { SessionStatus } from './SessionStatus';
export type { SessionStatusProps } from './SessionStatus';

export { SessionTimeoutWarning } from './SessionTimeoutWarning';
export type { SessionTimeoutWarningProps } from './SessionTimeoutWarning';

export { VersionStatus } from './VersionStatus';
export type { VersionStatusProps } from './VersionStatus';

export { BuildStatus } from './BuildStatus';
export type { BuildStatusProps, BuildState } from './BuildStatus';

// ---------------------------------------------------------------------------
// Environment & Feature Flag Components
// ---------------------------------------------------------------------------

export { EnvironmentBadge } from './EnvironmentBadge';
export type { EnvironmentBadgeProps, DeployEnvironment } from './EnvironmentBadge';

export { FeatureFlagStatus } from './FeatureFlagStatus';
export type { FeatureFlagStatusProps, FeatureFlagState } from './FeatureFlagStatus';

// ---------------------------------------------------------------------------
// Circuit & Load Components
// ---------------------------------------------------------------------------

export { CircuitStatus } from './CircuitStatus';
export type { CircuitStatusProps, CircuitBreakerState } from './CircuitStatus';

export { LoadIndicator } from './LoadIndicator';
export type { LoadIndicatorProps } from './LoadIndicator';

export { LoadBar } from './LoadBar';
export type { LoadBarProps } from './LoadBar';

// ---------------------------------------------------------------------------
// Resource Usage Components
// ---------------------------------------------------------------------------

export { MemoryUsage } from './MemoryUsage';
export type { MemoryUsageProps } from './MemoryUsage';

export { CpuUsage } from './CpuUsage';
export type { CpuUsageProps } from './CpuUsage';

export { DiskUsage } from './DiskUsage';
export type { DiskUsageProps } from './DiskUsage';

export { NetworkUsage } from './NetworkUsage';
export type { NetworkUsageProps } from './NetworkUsage';

// ---------------------------------------------------------------------------
// Performance Metric Components
// ---------------------------------------------------------------------------

export { ThroughputIndicator } from './ThroughputIndicator';
export type { ThroughputIndicatorProps } from './ThroughputIndicator';

export { LatencyIndicator } from './LatencyIndicator';
export type { LatencyIndicatorProps } from './LatencyIndicator';

export { ErrorRateIndicator } from './ErrorRateIndicator';
export type { ErrorRateIndicatorProps } from './ErrorRateIndicator';

export { UptimeCounter } from './UptimeCounter';
export type { UptimeCounterProps } from './UptimeCounter';

// ---------------------------------------------------------------------------
// Incident & Maintenance Components
// ---------------------------------------------------------------------------

export { IncidentBadge } from './IncidentBadge';
export type { IncidentBadgeProps } from './IncidentBadge';

export { IncidentSeverityBanner } from './IncidentSeverityBanner';
export type { IncidentSeverityBannerProps } from './IncidentSeverityBanner';

export { MaintenanceWindowBadge } from './MaintenanceWindowBadge';
export type { MaintenanceWindowBadgeProps, MaintenanceState } from './MaintenanceWindowBadge';

// ---------------------------------------------------------------------------
// Dependency & Service Mesh Components
// ---------------------------------------------------------------------------

export { DependencyStatus } from './DependencyStatus';
export type { DependencyStatusProps, Dependency } from './DependencyStatus';

export { ServiceMeshStatus } from './ServiceMeshStatus';
export type { ServiceMeshStatusProps } from './ServiceMeshStatus';

export { ClusterStatus } from './ClusterStatus';
export type { ClusterStatusProps } from './ClusterStatus';

// ---------------------------------------------------------------------------
// Container & Orchestration Components
// ---------------------------------------------------------------------------

export { PodStatus } from './PodStatus';
export type { PodStatusProps, PodPhase } from './PodStatus';

export { NodeStatus } from './NodeStatus';
export type { NodeStatusProps } from './NodeStatus';

// ---------------------------------------------------------------------------
// Queue & Thread Pool Components
// ---------------------------------------------------------------------------

export { QueueDepthIndicator } from './QueueDepthIndicator';
export type { QueueDepthIndicatorProps } from './QueueDepthIndicator';

export { ThreadPoolStatus } from './ThreadPoolStatus';
export type { ThreadPoolStatusProps } from './ThreadPoolStatus';

// ---------------------------------------------------------------------------
// JVM / Runtime Components
// ---------------------------------------------------------------------------

export { GarbageCollectionIndicator } from './GarbageCollectionIndicator';
export type { GarbageCollectionIndicatorProps } from './GarbageCollectionIndicator';

export { CacheHitRate } from './CacheHitRate';
export type { CacheHitRateProps } from './CacheHitRate';

// ---------------------------------------------------------------------------
// Database & Rate Limit Components
// ---------------------------------------------------------------------------

export { DatabaseConnectionPool } from './DatabaseConnectionPool';
export type { DatabaseConnectionPoolProps } from './DatabaseConnectionPool';

export { RateLimitStatus } from './RateLimitStatus';
export type { RateLimitStatusProps } from './RateLimitStatus';

// ---------------------------------------------------------------------------
// Quota & License Components
// ---------------------------------------------------------------------------

export { QuotaUsage } from './QuotaUsage';
export type { QuotaUsageProps, QuotaResource } from './QuotaUsage';

export { LicenseStatus } from './LicenseStatus';
export type { LicenseStatusProps, LicenseState } from './LicenseStatus';

// ---------------------------------------------------------------------------
// Security & Compliance Components
// ---------------------------------------------------------------------------

export { SecurityPostureBadge } from './SecurityPostureBadge';
export type { SecurityPostureBadgeProps, SecurityPosture } from './SecurityPostureBadge';

export { ComplianceBadge } from './ComplianceBadge';
export type { ComplianceBadgeProps, ComplianceState } from './ComplianceBadge';

// ---------------------------------------------------------------------------
// Data Quality Components
// ---------------------------------------------------------------------------

export { DataFreshnessIndicator } from './DataFreshnessIndicator';
export type { DataFreshnessIndicatorProps } from './DataFreshnessIndicator';

export { ReplicationLagIndicator } from './ReplicationLagIndicator';
export type { ReplicationLagIndicatorProps } from './ReplicationLagIndicator';

export { BackupIntegrityBadge } from './BackupIntegrityBadge';
export type { BackupIntegrityBadgeProps, BackupIntegrityState } from './BackupIntegrityBadge';

// ---------------------------------------------------------------------------
// Encryption & Certificate Components
// ---------------------------------------------------------------------------

export { EncryptionStatus } from './EncryptionStatus';
export type { EncryptionStatusProps, EncryptionState } from './EncryptionStatus';

export { CertificateExpiry } from './CertificateExpiry';
export type { CertificateExpiryProps } from './CertificateExpiry';

// ---------------------------------------------------------------------------
// Vulnerability Components
// ---------------------------------------------------------------------------

export { VulnerabilityBadge } from './VulnerabilityBadge';
export type { VulnerabilityBadgeProps } from './VulnerabilityBadge';
