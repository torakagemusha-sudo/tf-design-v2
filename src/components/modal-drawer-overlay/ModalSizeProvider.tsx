import React, { createContext, useContext, useMemo } from 'react';

/**
 * ModalSizeProvider — provides size context to nested modal components.
 * All child modals inherit the declared size variant unless overridden.
 *
 * @example
 * ```tsx
 * <ModalSizeProvider size="lg">
 *   <Modal isOpen onClose={close}>
 *     ...inherits lg size
 *   </Modal>
 * </ModalSizeProvider>
 * ```
 */
export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ModalSizeContextValue {
  /** The current modal size variant. */
  size: ModalSize;
  /** Width in pixels or CSS string, if explicitly set. */
  width?: number | string;
}

export interface ModalSizeProviderProps {
  /** Size variant to provide to descendants. */
  size?: ModalSize;
  /** Explicit width override. */
  width?: number | string;
  /** Child components that consume the size context. */
  children: React.ReactNode;
}

const ModalSizeContext = createContext<ModalSizeContextValue>({ size: 'md' });

export const useModalSize = (): ModalSizeContextValue => {
  const context = useContext(ModalSizeContext);
  if (!context) {
    return { size: 'md' };
  }
  return context;
};

export const ModalSizeProvider: React.FC<ModalSizeProviderProps> = ({
  size = 'md',
  width,
  children,
}) => {
  const value = useMemo<ModalSizeContextValue>(() => ({ size, width }), [size, width]);

  return (
    <ModalSizeContext.Provider value={value}>
      <div className="tf-modal-size-provider" data-size={size} data-testid="modal-size-provider">
        {children}
      </div>
    </ModalSizeContext.Provider>
  );
};

export default ModalSizeProvider;
