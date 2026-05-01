import React, { useState, useCallback, useEffect, useMemo } from 'react';


/**
 * Props for WaterfallConnector component.
 *
 * @public
 */
export interface WaterfallConnectorProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  dashed?: boolean;
  className?: string;
}

/**
 * Connector line between sequential bars in a waterfall chart.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <WaterfallConnector />
 * ```
 */
const WaterfallConnector: React.FC<WaterfallConnectorProps> = ({
  x1, y1, x2, y2, dashed?, className?
}}) => {
  return (
    <line
      x1={x1} y1={y1} x2={x2} y2={y2}
      className={`tf-waterfall-connector ${dashed ? 'tf-waterfall-connector--dashed' : ''} ${className || ''}`}
    />
  );
};

export default WaterfallConnector;
