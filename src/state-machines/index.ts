/**
 * @fileoverview index.ts — Torafirma Design System State Machines
 *
 * Barrel export for all state machine modules in the Torafirma design system.
 * Import from this module to access the complete state machine layer.
 *
 * @example
 * ```ts
 * // Import everything
 * import {
 *   createMachine,
 *   useMachine,
 *   componentStateMachineDefinition,
 *   createComponentMachine,
 * } from '@torafirma/state-machines';
 *
 * // Use in a React component
 * const MyComponent = () => {
 *   const { state, send, can } = useMachine(componentStateMachineDefinition, {
 *     context: { authority: 'AUTH_3_EXECUTE' },
 *   });
 *   return <StatusBadge state={state} />;
 * };
 * ```
 *
 * @module torafirma/state-machines
 * @version 2.0.0
 */

// ───────────────────────────────────────────────────────────────────────────────
// Core Types
// ───────────────────────────────────────────────────────────────────────────────

export {
  /** Core type: State identifier primitive */
  type State,
  /** Core type: Event identifier primitive */
  type Event,
  /** Core type: Machine context shape */
  type MachineContext,
  /** Core type: Guard function signature */
  type GuardFunction,
  /** Core type: Action function signature */
  type ActionFunction,
  /** Core type: State entry/exit actions */
  type StateAction,
  /** Core type: Single transition definition */
  type Transition,
  /** Core type: Complete machine definition */
  type StateMachineDefinition,
  /** Core type: Transition attempt result */
  type TransitionResult,
  /** Core type: Live machine instance */
  type StateMachineInstance,
  /** Core type: Factory options */
  type CreateMachineOptions,
  /** Core type: React hook return */
  type UseMachineReturn,
  /** Core type: Transition lookup table */
  type TransitionTable,
  /** Core type: Valid events helper */
  type ValidEventsForState,
  /** Core type: Serializable snapshot */
  type MachineSnapshot,
} from './types';

// ───────────────────────────────────────────────────────────────────────────────
// Factory & Hook
// ───────────────────────────────────────────────────────────────────────────────

export {
  /** Factory: Create a runnable state machine instance */
  createMachine,
  /** Utility: Serialize machine to snapshot */
  serializeSnapshot,
  /** Utility: Hydrate machine from snapshot */
  hydrateMachine,
  /** Utility: Validate a machine definition */
  validateDefinition,
} from './createMachine';

export {
  /** React hook: Use a state machine in a component */
  useMachine,
  /** React hook: Subscribe to a derived slice */
  useMachineSelector,
  /** React hook: Use only send function (no re-renders) */
  useMachineSend,
} from './useMachine';

// ───────────────────────────────────────────────────────────────────────────────
// Machine 1: Component State Machine (17 states)
// ───────────────────────────────────────────────────────────────────────────────

export {
  /** Definition: Component state machine (17 states) */
  componentStateMachineDefinition,
  /** Factory: Create component machine */
  createComponentMachine,
  /** Type: Component state union */
  type ComponentState,
  /** Type: Component event union */
  type ComponentEvent,
  /** Type: Component context */
  type ComponentContext,
} from './componentStateMachine';

// ───────────────────────────────────────────────────────────────────────────────
// Machine 2: Command Lifecycle Machine (10 states)
// ───────────────────────────────────────────────────────────────────────────────

export {
  /** Definition: Command lifecycle machine (10 states) */
  commandLifecycleMachineDefinition,
  /** Factory: Create command lifecycle machine */
  createCommandLifecycleMachine,
  /** Type: Command state union */
  type CommandState,
  /** Type: Command event union */
  type CommandEvent,
  /** Type: Command context */
  type CommandContext,
} from './commandLifecycleMachine';

// ───────────────────────────────────────────────────────────────────────────────
// Machine 3: Authority Lifecycle Machine (12 states)
// ───────────────────────────────────────────────────────────────────────────────

export {
  /** Definition: Authority lifecycle machine (12 states) */
  authorityLifecycleMachineDefinition,
  /** Factory: Create authority lifecycle machine */
  createAuthorityLifecycleMachine,
  /** Type: Authority state union */
  type AuthorityState,
  /** Type: Authority event union */
  type AuthorityEvent,
  /** Type: Authority context */
  type AuthorityContext,
} from './authorityLifecycleMachine';

// ───────────────────────────────────────────────────────────────────────────────
// Machine 4: Validation Pipeline Machine (8 states)
// ───────────────────────────────────────────────────────────────────────────────

export {
  /** Definition: Validation pipeline machine (8 states) */
  validationPipelineMachineDefinition,
  /** Factory: Create validation pipeline machine */
  createValidationPipelineMachine,
  /** Type: Validation state union */
  type ValidationState,
  /** Type: Validation event union */
  type ValidationEvent,
  /** Type: Validation context */
  type ValidationContext,
} from './validationPipelineMachine';

// ───────────────────────────────────────────────────────────────────────────────
// Machine 5: AI Proposal Machine (8 states)
// ───────────────────────────────────────────────────────────────────────────────

export {
  /** Definition: AI proposal lifecycle machine (8 states) */
  aiProposalMachineDefinition,
  /** Factory: Create AI proposal machine */
  createAIProposalMachine,
  /** Type: AI proposal state union */
  type AIProposalState,
  /** Type: AI proposal event union */
  type AIProposalEvent,
  /** Type: AI proposal context */
  type AIProposalContext,
} from './aiProposalMachine';

// ───────────────────────────────────────────────────────────────────────────────
// Machine 6: Runtime Connection Machine (9 states)
// ───────────────────────────────────────────────────────────────────────────────

export {
  /** Definition: Runtime connection machine (9 states) */
  runtimeConnectionMachineDefinition,
  /** Factory: Create runtime connection machine */
  createRuntimeConnectionMachine,
  /** Type: Runtime connection state union */
  type RuntimeConnectionState,
  /** Type: Runtime connection event union */
  type RuntimeConnectionEvent,
  /** Type: Runtime connection context */
  type RuntimeConnectionContext,
} from './runtimeConnectionMachine';

// ───────────────────────────────────────────────────────────────────────────────
// Machine 7: Trace/Audit Pipeline Machine (8 states)
// ───────────────────────────────────────────────────────────────────────────────

export {
  /** Definition: Trace/audit pipeline machine (8 states) */
  traceAuditMachineDefinition,
  /** Factory: Create trace/audit pipeline machine */
  createTraceAuditMachine,
  /** Type: Trace/audit state union */
  type TraceAuditState,
  /** Type: Trace/audit event union */
  type TraceAuditEvent,
  /** Type: Trace/audit context */
  type TraceAuditContext,
} from './traceAuditMachine';

// ───────────────────────────────────────────────────────────────────────────────
// Machine 8: Theme Transition Machine (4 states)
// ───────────────────────────────────────────────────────────────────────────────

export {
  /** Definition: Theme transition machine (4 states) */
  themeTransitionMachineDefinition,
  /** Factory: Create theme transition machine */
  createThemeTransitionMachine,
  /** Type: Theme transition state union */
  type ThemeTransitionState,
  /** Type: Theme transition event union */
  type ThemeTransitionEvent,
  /** Type: Theme transition context */
  type ThemeTransitionContext,
} from './themeTransitionMachine';

// ───────────────────────────────────────────────────────────────────────────────
// Machine 9: Deployment Machine (9 states)
// ───────────────────────────────────────────────────────────────────────────────

export {
  /** Definition: Deployment lifecycle machine (9 states) */
  deploymentMachineDefinition,
  /** Factory: Create deployment machine */
  createDeploymentMachine,
  /** Type: Deployment state union */
  type DeploymentState,
  /** Type: Deployment event union */
  type DeploymentEvent,
  /** Type: Deployment context */
  type DeploymentContext,
} from './deploymentMachine';

// ───────────────────────────────────────────────────────────────────────────────
// Machine 10: Approval Workflow Machine (9 states)
// ───────────────────────────────────────────────────────────────────────────────

export {
  /** Definition: Approval workflow machine (9 states) */
  approvalWorkflowMachineDefinition,
  /** Factory: Create approval workflow machine */
  createApprovalWorkflowMachine,
  /** Type: Approval workflow state union */
  type ApprovalWorkflowState,
  /** Type: Approval workflow event union */
  type ApprovalWorkflowEvent,
  /** Type: Approval workflow context */
  type ApprovalWorkflowContext,
} from './approvalWorkflowMachine';

// ───────────────────────────────────────────────────────────────────────────────
// Machine 11: Emergency Break Machine (7 states)
// ───────────────────────────────────────────────────────────────────────────────

export {
  /** Definition: Emergency break machine (7 states) */
  emergencyBreakMachineDefinition,
  /** Factory: Create emergency break machine */
  createEmergencyBreakMachine,
  /** Type: Emergency break state union */
  type EmergencyBreakState,
  /** Type: Emergency break event union */
  type EmergencyBreakEvent,
  /** Type: Emergency break context */
  type EmergencyBreakContext,
} from './emergencyBreakMachine';

// ───────────────────────────────────────────────────────────────────────────────
// Machine 12: Data Sync Machine (7 states)
// ───────────────────────────────────────────────────────────────────────────────

export {
  /** Definition: Data sync machine (7 states) */
  dataSyncMachineDefinition,
  /** Factory: Create data sync machine */
  createDataSyncMachine,
  /** Type: Data sync state union */
  type DataSyncState,
  /** Type: Data sync event union */
  type DataSyncEvent,
  /** Type: Data sync context */
  type DataSyncContext,
} from './dataSyncMachine';

// ───────────────────────────────────────────────────────────────────────────────
// Machine 13: Graph Edit Machine (10 states)
// ───────────────────────────────────────────────────────────────────────────────

export {
  /** Definition: Graph editing machine (10 states) */
  graphEditMachineDefinition,
  /** Factory: Create graph editing machine */
  createGraphEditMachine,
  /** Type: Graph edit state union */
  type GraphEditState,
  /** Type: Graph edit event union */
  type GraphEditEvent,
  /** Type: Graph edit context */
  type GraphEditContext,
} from './graphEditMachine';

// ───────────────────────────────────────────────────────────────────────────────
// Machine 14: Session Machine (8 states)
// ───────────────────────────────────────────────────────────────────────────────

export {
  /** Definition: User session machine (8 states) */
  sessionMachineDefinition,
  /** Factory: Create user session machine */
  createSessionMachine,
  /** Type: Session state union */
  type SessionState,
  /** Type: Session event union */
  type SessionEvent,
  /** Type: Session context */
  type SessionContext,
} from './sessionMachine';

// ───────────────────────────────────────────────────────────────────────────────
// Machine 15: Interlock Machine (7 states)
// ───────────────────────────────────────────────────────────────────────────────

export {
  /** Definition: Interlock system machine (7 states) */
  interlockMachineDefinition,
  /** Factory: Create interlock machine */
  createInterlockMachine,
  /** Type: Interlock state union */
  type InterlockState,
  /** Type: Interlock event union */
  type InterlockEvent,
  /** Type: Interlock context */
  type InterlockContext,
} from './interlockMachine';

// ───────────────────────────────────────────────────────────────────────────────
// Machine 16: Bulk Operation Machine (9 states)
// ───────────────────────────────────────────────────────────────────────────────

export {
  /** Definition: Bulk operation machine (9 states) */
  bulkOperationMachineDefinition,
  /** Factory: Create bulk operation machine */
  createBulkOperationMachine,
  /** Type: Bulk operation state union */
  type BulkOperationState,
  /** Type: Bulk operation event union */
  type BulkOperationEvent,
  /** Type: Bulk operation context */
  type BulkOperationContext,
} from './bulkOperationMachine';

// ───────────────────────────────────────────────────────────────────────────────
// Machine 17: Modal Dialog Machine (8 states)
// ───────────────────────────────────────────────────────────────────────────────

export {
  /** Definition: Modal dialog lifecycle machine (8 states) */
  modalDialogMachineDefinition,
  /** Factory: Create modal dialog machine */
  createModalDialogMachine,
  /** Type: Modal dialog state union */
  type ModalDialogState,
  /** Type: Modal dialog event union */
  type ModalDialogEvent,
  /** Type: Modal dialog context */
  type ModalDialogContext,
} from './modalDialogMachine';
