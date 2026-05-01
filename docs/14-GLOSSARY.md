# 14 — Glossary of Torafirma Terms

> Comprehensive glossary of terms, acronyms, and concepts used throughout the Torafirma Design System.

---

## A

**Action Model**
The set of actions available to an operator at any given time. Part of the four-question interface model.

**Action Surface**
The visible controls that allow an operator to take action. Must always show the current state and required authority.

**Active State**
A component or system state where an operation is in progress. Examples: `RUNNING`, `VALIDATING`, `EXECUTING`. Visual treatment includes pulsing indicators.

**AI-Assisted Studio**
The component family (03.8) that provides interfaces for AI-assisted editing, including intent input, proposal management, and diff viewing.

**Anti-Pattern**
A design pattern that violates Torafirma principles. Examples: pill-shaped containers, decorative gradients, hidden state indicators.

**AppShell**
The root layout component that contains all zones of a Torafirma product (top bar, nav rail, workspace, inspector, trace console, status footer).

**Approval Chain**
A multi-party approval workflow where multiple authorities must approve an action before it can proceed.

**Audit Event**
An immutable, append-only record of a significant action. Includes actor, authority, operation, target, timestamp, and result.

**Audit Trail**
The complete history of audit events for a system or object. Used for compliance and investigation.

**Authority**
The level of permission an operator has in the system. Ranges from AUTH_0 (Observe) to AUTH_6 (Root).

**Authority Escalation**
The process of requesting a temporary increase in authority level to perform a specific action.

**Authority Gate**
A wrapper component that conditionally renders content based on the operator's current authority level.

**Authority Level**
One of seven permission levels: Observe, Draft, Stage, Execute, Commit, Override, Root.

**Authority Model**
The system that governs which actions an operator can perform based on their role and permissions.

## B

**Base Neutrals**
The foundational grayscale color tokens: black, void, charcoal, graphite, panel, panel-raised, panel-inset.

**Blocked State**
A component or system state where action is prevented by policy, validation failure, insufficient authority, or dependency issues.

**Border Radius**
The roundness of component corners. Torafirma uses minimal rounding (0-8px) with hard edges preferred.

**Bottom Trace Console**
The bottom panel of the product shell that displays real-time trace events.

**Breaker**
An emergency stop control that can halt operations immediately. Must be always visible and never buried under other UI layers.

**Bulk Operation**
An operation performed on multiple items simultaneously, with validation, progress tracking, and partial failure handling.

**Button Grammar**
The convention that button labels must be verb-object commands ("Run workflow", not "Submit").

## C

**Canonical Product Shell**
The standard six-zone layout shared by all Torafirma products: top command bar, left nav rail, primary workspace, right inspector, bottom trace console, status footer.

**Canonical States**
The 17 standardized states used across all Torafirma components: IDLE, READY, DIRTY, VALIDATING, VALID, WARNING, BLOCKED, STAGED, RUNNING, COMPLETE, DEGRADED, FAULTED, LOCKED, SIMULATED, COMMITTED, DEPLOYED, DISCONNECTED.

**Canonical Themes**
The five built-in themes: Command Dark, Field Green, Deep Blue, Forge Graphite, Redline.

**Circuit Breaker**
A pattern that stops operations when failure thresholds are exceeded. Prevents cascade failures.

**Command Button**
The primary action initiator component. Every button is a command with a state model, authority requirement, and trace support.

**Command Class**
The category of a command (execute, validate, stage, abort, etc.). Determines visual treatment and authority requirements.

**Command Cockpit**
A layout template for live state control and runtime supervision.

**Command Descriptor**
The structured object that defines a command, including ID, label, operation, class, target, state, and authority requirements.

**Command Grammar**
The formal system for labeling actions using verb-object structure.

**Command Palette**
A keyboard-driven command search and execution interface. Triggered by Cmd/Ctrl+K.

**Command Surface**
The visual interface layer that presents available actions to the operator.

**Component Density**
The level of visual density: compact (cockpit), standard (studio), field (mobile).

**Component Family**
One of 12 operational groups that organize Torafirma components by function.

**Confirm Modal**
A modal dialog that requires explicit confirmation before executing a consequential action.

**Consequential Action**
An action that changes durable state, runtime state, external systems, or is destructive. Requires confirmation and produces audit events.

**Controlled Force**
One of the three core Torafirma principles. The interface should feel like a controlled, precise tool.

## D

**Data Table**
The primary component for displaying structured data. Supports sorting, filtering, selection, and pagination.

**Density**
The amount of information per unit area in the interface. Torafirma accepts high density when structure is strong.

**Design Axioms**
The five foundational principles: State Before Ornament, Density Is Acceptable, Every Action Has Authority, Fail Closed Visually, Sharp Lines Hard Edges.

**Design Tokens**
Canonical constants (colors, typography, spacing, etc.) that prevent drift between products.

**Destructive Action**
An action that permanently deletes or damages data. Requires typed confirmation.

**Dirty State**
A state where local changes exist but have not been staged or committed.

**Disconnected State**
A state where the runtime or service is unavailable.

**Draft State**
A state where uncommitted artifacts exist. Requires AUTH_1_DRAFT authority.

**Draft Staging Band**
A component that shows draft changes and provides staging controls.

## E

**Effects Library**
The system of glow, pulse, and animation effects. Used sparingly and only for semantic state indication.

**Emergency Break**
A pattern for immediately halting operations. Includes confirmation, authority check, and audit logging.

**Emergency Breaker**
A large, always-accessible component for emergency stop control.

**Enforcer**
An automated tool that validates interface compliance with design system rules.

## F

**Fail Closed**
The principle that when the system is uncertain, it should visually contract authority and prevent dangerous actions.

**Faulted State**
A state where an operation or subsystem has failed. Visual treatment: red border, error details.

**Field Green**
The theme for tactical/mission operations. Dark green background with green accent.

**Focus Trap**
A pattern that keeps keyboard focus within a modal or drawer until it is closed.

**Forge Graphite**
The theme for engineering and IDE-like tools. Graphite background with amber accent.

**Four Questions**
The four questions every Torafirma interface must answer: What system? What state? What actions? What consequences?

## G

**Governed Execution**
One of the three core Torafirma principles. Actions are gated by authority, policy, and state.

**Governance & Authority**
The component family (03.7) for policy enforcement, authority gating, and audit.

**Governance Banner**
A top-of-page banner showing governance alerts.

**Governance Bypass**
Skipping policy or authority checks. Always logged to audit trail.

**Graph Canvas**
The main graph editor component with zoom, pan, and node placement.

**Graph Edge**
A connection line between two node ports in a graph.

**Graph Native**
The principle that Torafirma systems are fundamentally graph-based, with nodes, edges, and ports.

**Graph Node**
A visual element on the graph canvas representing a computational element.

**Graph & Workflow**
The component family (03.5) for graph-native computation, visual node editors, and workflow canvases.

**Grid Line**
The color token for grid overlays: `#1C2A33`.

**Guard Condition**
A condition that must be true for a state machine transition to occur.

## H

**Hard Edges**
The visual principle that Torafirma interfaces prefer engineered geometry with sharp lines and precise seams.

**Health Indicator**
A component showing system/component health status.

## I

**Intent Input**
A component for entering natural language operational commands for AI-assisted editing.

**Interlock**
A safety mechanism that prevents certain actions unless conditions are met.

**Invalid Shortcuts**
Prohibited state transitions that bypass validation or staging.

## L

**Layout Template**
One of 20 canonical full-screen arrangements for different product archetypes.

**Left Nav Rail**
The icon-based left navigation component of the product shell.

**Live Region**
An ARIA region that announces dynamic content changes to screen readers.

**Locked State**
A state where an object is protected by authority, ownership, or policy.

## M

**Metric Card**
A component displaying a single metric with label, value, unit, and trend.

**Mobile Scaffold**
A layout template optimized for touch-based mobile devices.

**Motion Tokens**
Duration and easing values for animations. Torafirma uses sharp, precise motion (no spring/bounce).

## N

**Node Palette**
A draggable palette of available node types for graph editing.

**Node Port**
A connection point on a graph node for data flow.

## O

**Operational Clarity**
One of the three core Torafirma principles. The interface must make system state and available actions immediately clear.

**Operational Instrument**
The metaphor that Torafirma products should feel like engineering command decks or tactical operations terminals.

**Operational Regime**
The current mode of system operation (normal, degraded, emergency, etc.).

**Override**
Bypassing normal gates with reason and audit trail logging. Requires AUTH_5_OVERRIDE.

## P

**Panel**
The primary content container component with border and background.

**Policy Enforcement**
The system that checks actions against defined rules before allowing execution.

**Preferred Transition Path**
The canonical sequence of states for operations: IDLE -> DIRTY -> VALIDATING -> VALID -> STAGED -> RUNNING -> COMPLETE -> COMMITTED -> DEPLOYED.

**Prime Directive**
The four-question model that every interface must answer.

**Primary Workspace**
The main content area of the product shell.

**Progress Tracker**
A multi-step progress indicator with state per step.

**Property Inspector**
A side panel for editing properties of a selected object.

**Pulse**
An animation effect used for live data indicators and warning/fault escalation.

**Purple (Model/AI)**
The color family for AI and model-related elements.

## R

**Real-Time Monitoring**
A pattern for displaying live system metrics with state indicators and alerting.

**Redline**
The theme for threat response and incident handling. Dark red background with red accent.

**Right Inspector**
The right-side property inspector panel of the product shell.

**Runtime**
The execution environment where workflows and processes run.

**Runtime Lifecycle**
The state machine governing runtime connection state.

**Runtime Trace**
A layout template for inspecting execution, debugging, and auditing.

## S

**Semantic Color**
Color usage where each color has a specific operational meaning (green=go, red=stop, etc.).

**Semantic Variant**
One of nine visual variants that map to operational intent (run, stop, review, inspect, etc.).

**Severity Level**
The importance of a design rule violation: error (block build), warning (build warning), info (log only).

**Shadow Token**
Elevation values for component layering. Torafirma uses restrained shadows.

**Sharp Lines**
The visual principle of preferring hard edges and precise seams over rounded, organic shapes.

**Signal Light**
A two-color indicator mimicking physical signal lights for binary state display.

**Staging**
The process of preparing validated changes for execution. Requires AUTH_2_STAGE.

**Staging Machine**
The state machine that governs the staging process.

**State Badge**
A component displaying the current state of an object or system.

**State Before Ornament**
The first design axiom: system state must be visible before beautification.

**State Machine**
A computational model that governs component behavior through explicit states and transitions.

**State Model**
The set of possible states and transitions for a system or component.

**State Visibility**
The principle that system state must always be visible near action surfaces.

**Status Footer**
The bottom status bar of the product shell showing runtime, state, authority, and trace.

**Steel Scale**
The 11-token grayscale color system ranging from steel-950 to white.

**Stream Event**
A real-time event in the trace console or event stream.

**Subgraph**
A graph node that represents a nested graph structure.

## T

**Telemetry Strip**
A row of live telemetry values showing current system metrics.

**Terminal Signal Light**
A two-color signal indicator component for binary state display.

**Theme**
A set of CSS custom properties that define the visual appearance of a Torafirma product.

**Three-Pane Layout**
A layout with left navigation, center content, and right inspector.

**Token**
A canonical constant that defines a design system value (color, size, duration, etc.).

**Top Command Bar**
The top bar of the product shell showing product name, workspace, state, and authority.

**Torafirma Component State**
The 17 standardized states used across all components.

**Trace Console**
The bottom panel that displays real-time trace events.

**Trace Event**
A structured record of an action, including actor, authority, operation, target, and result.

**Trace ID**
A unique identifier linking a trace event to related events in the system.

**Trace Pipeline**
The system that captures, stores, and displays trace events.

**Transition**
A movement from one state to another in a state machine.

## V

**Validation**
The process of checking changes for correctness before staging.

**Validation Machine**
The state machine that governs validation operations.

## W

**Warning State**
A state where conditions are admissible but require operator attention.

**Workflow**
A directed graph of computational steps that can be executed.

**Workflow Canvas**
A layout area for editing and viewing workflow diagrams.

**Workflow Execution Machine**
The state machine that governs workflow lifecycle from draft to completion.
