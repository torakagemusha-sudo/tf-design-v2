// =============================================================================
// Torafirma Design System — Modal, Drawer & Overlay Components
// =============================================================================
// A complete family of overlay components following the Torafirma grammar:
// governed, authority-aware, state-rich. Dark theme, panel-steel surfaces.
// =============================================================================

// ---------------------------------------------------------------------------
// Core Modal
// ---------------------------------------------------------------------------
export { Modal } from './Modal';
export type { ModalProps } from './Modal';

export { ModalOverlay } from './ModalOverlay';
export type { ModalOverlayProps } from './ModalOverlay';

export { ModalContainer } from './ModalContainer';
export type { ModalContainerProps } from './ModalContainer';

export { ModalHeader } from './ModalHeader';
export type { ModalHeaderProps } from './ModalHeader';

export { ModalTitle } from './ModalTitle';
export type { ModalTitleProps } from './ModalTitle';

export { ModalCloseButton } from './ModalCloseButton';
export type { ModalCloseButtonProps } from './ModalCloseButton';

export { ModalBody } from './ModalBody';
export type { ModalBodyProps } from './ModalBody';

export { ModalFooter } from './ModalFooter';
export type { ModalFooterProps } from './ModalFooter';

export { ModalActions } from './ModalActions';
export type { ModalActionsProps } from './ModalActions';

export { ModalSizeProvider, useModalSize } from './ModalSizeProvider';
export type {
  ModalSize,
  ModalSizeContextValue,
  ModalSizeProviderProps,
} from './ModalSizeProvider';

// ---------------------------------------------------------------------------
// Inspect Modal
// ---------------------------------------------------------------------------
export { InspectModal } from './InspectModal';
export type { InspectModalProps } from './InspectModal';

export { InspectModalHeader } from './InspectModalHeader';
export type { InspectModalHeaderProps } from './InspectModalHeader';

export { InspectModalContent } from './InspectModalContent';
export type {
  InspectField,
  InspectModalContentProps,
} from './InspectModalContent';

export { InspectModalMetadata } from './InspectModalMetadata';
export type {
  MetadataEntry,
  InspectModalMetadataProps,
} from './InspectModalMetadata';

// ---------------------------------------------------------------------------
// Confirm Modal
// ---------------------------------------------------------------------------
export { ConfirmModal } from './ConfirmModal';
export type { ConfirmModalProps } from './ConfirmModal';

export { ConfirmModalHeader } from './ConfirmModalHeader';
export type { ConfirmModalHeaderProps } from './ConfirmModalHeader';

export { ConfirmModalMessage } from './ConfirmModalMessage';
export type { ConfirmModalMessageProps } from './ConfirmModalMessage';

export { ConfirmModalActions } from './ConfirmModalActions';
export type { ConfirmModalActionsProps } from './ConfirmModalActions';

// ---------------------------------------------------------------------------
// Destructive Modal
// ---------------------------------------------------------------------------
export { DestructiveModal } from './DestructiveModal';
export type { DestructiveModalProps } from './DestructiveModal';

export { DestructiveModalWarning } from './DestructiveModalWarning';
export type { DestructiveModalWarningProps } from './DestructiveModalWarning';

export { DestructiveModalConfirm } from './DestructiveModalConfirm';
export type { DestructiveModalConfirmProps } from './DestructiveModalConfirm';

// ---------------------------------------------------------------------------
// Authority Modal
// ---------------------------------------------------------------------------
export { AuthorityModal } from './AuthorityModal';
export type {
  AuthorityCredentials,
  AuthorityModalProps,
} from './AuthorityModal';

export { AuthorityModalHeader } from './AuthorityModalHeader';
export type { AuthorityModalHeaderProps } from './AuthorityModalHeader';

export { AuthorityModalForm } from './AuthorityModalForm';
export type { AuthorityModalFormProps } from './AuthorityModalForm';

export { AuthorityModalAudit } from './AuthorityModalAudit';
export type {
  AuditEntry,
  AuthorityModalAuditProps,
} from './AuthorityModalAudit';

// ---------------------------------------------------------------------------
// Fault Modal
// ---------------------------------------------------------------------------
export { FaultModal } from './FaultModal';
export type {
  FaultError,
  RecoveryOption,
  FaultModalProps,
} from './FaultModal';

export { FaultModalError } from './FaultModalError';
export type { FaultModalErrorProps } from './FaultModalError';

export { FaultModalStackTrace } from './FaultModalStackTrace';
export type { FaultModalStackTraceProps } from './FaultModalStackTrace';

export { FaultModalRecovery } from './FaultModalRecovery';
export type { FaultModalRecoveryProps } from './FaultModalRecovery';

// ---------------------------------------------------------------------------
// Info Modal
// ---------------------------------------------------------------------------
export { InfoModal } from './InfoModal';
export type { InfoModalProps } from './InfoModal';

export { InfoModalIcon } from './InfoModalIcon';
export type { InfoModalIconProps } from './InfoModalIcon';

export { InfoModalContent } from './InfoModalContent';
export type { InfoModalContentProps } from './InfoModalContent';

// ---------------------------------------------------------------------------
// Warning Modal
// ---------------------------------------------------------------------------
export { WarningModal } from './WarningModal';
export type { WarningModalProps } from './WarningModal';

export { WarningModalIcon } from './WarningModalIcon';
export type { WarningModalIconProps } from './WarningModalIcon';

// ---------------------------------------------------------------------------
// Success Modal
// ---------------------------------------------------------------------------
export { SuccessModal } from './SuccessModal';
export type { SuccessModalProps } from './SuccessModal';

export { SuccessModalIcon } from './SuccessModalIcon';
export type { SuccessModalIconProps } from './SuccessModalIcon';

// ---------------------------------------------------------------------------
// Loading Modal
// ---------------------------------------------------------------------------
export { LoadingModal } from './LoadingModal';
export type { LoadingModalProps } from './LoadingModal';

export { LoadingModalSpinner } from './LoadingModalSpinner';
export type { LoadingModalSpinnerProps } from './LoadingModalSpinner';

export { LoadingModalProgress } from './LoadingModalProgress';
export type { LoadingModalProgressProps } from './LoadingModalProgress';

export { LoadingModalMessage } from './LoadingModalMessage';
export type { LoadingModalMessageProps } from './LoadingModalMessage';

// ---------------------------------------------------------------------------
// Multi-Step Modal (Wizard)
// ---------------------------------------------------------------------------
export { MultiStepModal, useMultiStep } from './MultiStepModal';
export type {
  MultiStepContextValue,
  MultiStepModalProps,
} from './MultiStepModal';

export { MultiStepModalHeader } from './MultiStepModalHeader';
export type { MultiStepModalHeaderProps } from './MultiStepModalHeader';

export { MultiStepModalSteps } from './MultiStepModalSteps';
export type { MultiStepModalStepsProps } from './MultiStepModalSteps';

export { MultiStepModalBody } from './MultiStepModalBody';
export type { MultiStepModalBodyProps } from './MultiStepModalBody';

export { MultiStepModalFooter } from './MultiStepModalFooter';
export type { MultiStepModalFooterProps } from './MultiStepModalFooter';

// ---------------------------------------------------------------------------
// Drawer
// ---------------------------------------------------------------------------
export { Drawer } from './Drawer';
export type { DrawerProps } from './Drawer';

export { DrawerOverlay } from './DrawerOverlay';
export type { DrawerOverlayProps } from './DrawerOverlay';

export { DrawerContainer } from './DrawerContainer';
export type { DrawerContainerProps } from './DrawerContainer';

export { DrawerHeader } from './DrawerHeader';
export type { DrawerHeaderProps } from './DrawerHeader';

export { DrawerBody } from './DrawerBody';
export type { DrawerBodyProps } from './DrawerBody';

export { DrawerFooter } from './DrawerFooter';
export type { DrawerFooterProps } from './DrawerFooter';

export { DrawerResizer } from './DrawerResizer';
export type { DrawerResizerProps } from './DrawerResizer';

export { DrawerLeft } from './DrawerLeft';
export type { DrawerLeftProps } from './DrawerLeft';

export { DrawerRight } from './DrawerRight';
export type { DrawerRightProps } from './DrawerRight';

export { DrawerTop } from './DrawerTop';
export type { DrawerTopProps } from './DrawerTop';

export { DrawerBottom } from './DrawerBottom';
export type { DrawerBottomProps } from './DrawerBottom';

// ---------------------------------------------------------------------------
// Popover
// ---------------------------------------------------------------------------
export { Popover } from './Popover';
export type { PopoverProps } from './Popover';

export { PopoverTrigger } from './PopoverTrigger';
export type { PopoverTriggerProps } from './PopoverTrigger';

export { PopoverContent } from './PopoverContent';
export type { PopoverContentProps } from './PopoverContent';

export { PopoverHeader } from './PopoverHeader';
export type { PopoverHeaderProps } from './PopoverHeader';

export { PopoverBody } from './PopoverBody';
export type { PopoverBodyProps } from './PopoverBody';

// ---------------------------------------------------------------------------
// Tooltip
// ---------------------------------------------------------------------------
export { Tooltip } from './Tooltip';
export type { TooltipProps } from './Tooltip';

export { TooltipTrigger } from './TooltipTrigger';
export type { TooltipTriggerProps } from './TooltipTrigger';

export { TooltipContent } from './TooltipContent';
export type { TooltipContentProps } from './TooltipContent';

export { TooltipArrow } from './TooltipArrow';
export type { TooltipArrowProps } from './TooltipArrow';

// ---------------------------------------------------------------------------
// Toast
// ---------------------------------------------------------------------------
export { Toast } from './Toast';
export type { ToastProps } from './Toast';

export { ToastContainer } from './ToastContainer';
export type { ToastPosition, ToastContainerProps } from './ToastContainer';

export { ToastItem } from './ToastItem';
export type { ToastItemProps } from './ToastItem';

export { ToastIcon } from './ToastIcon';
export type { ToastIconProps } from './ToastIcon';

export { ToastProgress } from './ToastProgress';
export type { ToastProgressProps } from './ToastProgress';

export { ToastCloseButton } from './ToastCloseButton';
export type { ToastCloseButtonProps } from './ToastCloseButton';

// ---------------------------------------------------------------------------
// Alert Banner
// ---------------------------------------------------------------------------
export { AlertBanner } from './AlertBanner';
export type { AlertBannerProps } from './AlertBanner';

export { AlertBannerIcon } from './AlertBannerIcon';
export type { AlertBannerIconProps } from './AlertBannerIcon';

export { AlertBannerMessage } from './AlertBannerMessage';
export type { AlertBannerMessageProps } from './AlertBannerMessage';

export { AlertBannerActions } from './AlertBannerActions';
export type {
  AlertBannerAction,
  AlertBannerActionsProps,
} from './AlertBannerActions';

export { AlertBannerClose } from './AlertBannerClose';
export type { AlertBannerCloseProps } from './AlertBannerClose';

// ---------------------------------------------------------------------------
// Command Palette Overlay
// ---------------------------------------------------------------------------
export { CommandOverlay } from './CommandOverlay';
export type {
  CommandResult,
  CommandOverlayProps,
} from './CommandOverlay';

export { CommandOverlayInput } from './CommandOverlayInput';
export type { CommandOverlayInputProps } from './CommandOverlayInput';

export { CommandOverlayResults } from './CommandOverlayResults';
export type {
  CommandItem,
  CommandOverlayResultsProps,
} from './CommandOverlayResults';

// ---------------------------------------------------------------------------
// Utility Components
// ---------------------------------------------------------------------------
export { Backdrop } from './Backdrop';
export type { BackdropProps } from './Backdrop';

export { FocusTrap } from './FocusTrap';
export type { FocusTrapProps } from './FocusTrap';

export { ScrollLock } from './ScrollLock';
export type { ScrollLockProps } from './ScrollLock';

export { Portal } from './Portal';
export type { PortalProps } from './Portal';

export { PositionedOverlay } from './PositionedOverlay';
export type { PositionedOverlayProps } from './PositionedOverlay';

// ---------------------------------------------------------------------------
// Popover Menu
// ---------------------------------------------------------------------------
export { PopoverMenu } from './PopoverMenu';
export type {
  PopoverMenuItemDef,
  PopoverMenuProps,
} from './PopoverMenu';

export { PopoverMenuItem } from './PopoverMenuItem';
export type { PopoverMenuItemProps } from './PopoverMenuItem';

export { PopoverMenuDivider } from './PopoverMenuDivider';
export type { PopoverMenuDividerProps } from './PopoverMenuDivider';

// ---------------------------------------------------------------------------
// Context Menu Overlay
// ---------------------------------------------------------------------------
export { ContextMenuOverlay } from './ContextMenuOverlay';
export type {
  ContextMenuItemDef,
  ContextMenuOverlayProps,
} from './ContextMenuOverlay';

// ---------------------------------------------------------------------------
// Hover Card
// ---------------------------------------------------------------------------
export { HoverCard } from './HoverCard';
export type { HoverCardProps } from './HoverCard';

export { HoverCardTrigger } from './HoverCardTrigger';
export type { HoverCardTriggerProps } from './HoverCardTrigger';

export { HoverCardContent } from './HoverCardContent';
export type { HoverCardContentProps } from './HoverCardContent';

// ---------------------------------------------------------------------------
// Accessibility Utilities
// ---------------------------------------------------------------------------
export * from './aria';
