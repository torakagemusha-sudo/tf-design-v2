/**
 * @fileoverview PrintLayout — Print-Optimized Layout
 *
 * Layout optimized for printing and PDF export. Variants for full reports,
 * summary views, and detailed pages. Hides interactive elements and
 * optimizes contrast, page breaks, and ink usage.
 *
 * ```
 * +---------------------------------------------------------------+
 * | TORAFIRMA                              Printed: 2024-01-15    |  HEADER
 * +---------------------------------------------------------------+
 * |                                                               |
 * | Section 1                                                     |  CONTENT
 * | =============                                                  |
 * | Content optimized for print...                                |
 * |                                                               |
 * | +-------------------+  +-------------------+                  |
 * | | Data Table        |  | Chart (printable) |                  |
 * | | (dense rows)      |  | (high contrast)   |                  |
 * | +-------------------+  +-------------------+                  |
 * |                                                               |
 * +---------------------------------------------------------------+
 * | Page 1 of 3                                      Confidential |  FOOTER
 * +---------------------------------------------------------------+
 * ```
 */

import React from 'react';
import type { LayoutBaseProps, TorafirmaTheme } from './types';
import { THEME_TOKENS } from './types';
import { useLayout } from './useLayout';

export type PrintVariant = 'report' | 'summary' | 'detail';

export interface PrintLayoutProps extends LayoutBaseProps {
  variant?: PrintVariant;
  /** Document title */
  title?: string;
  /** Report subtitle */
  subtitle?: string;
  /** Organization name */
  organization?: string;
  /** Report date */
  date?: string;
  /** Classification label (e.g., "Confidential") */
  classification?: string;
  /** Header content (logo, branding) */
  headerContent?: React.ReactNode;
  /** Main report content */
  reportContent?: React.ReactNode;
  /** Footer content (page numbers, legal) */
  footerContent?: React.ReactNode;
  /** Table of contents */
  tableOfContents?: React.ReactNode;
  /** Page break sections */
  sections?: { id: string; title: string; content: React.ReactNode }[];
  /** Enable page numbers */
  showPageNumbers?: boolean;
  /** Total page count (for "Page X of Y") */
  totalPages?: number;
  /** Page size: A4, Letter, Legal */
  pageSize?: 'a4' | 'letter' | 'legal';
  /** Orientation */
  orientation?: 'portrait' | 'landscape';
}

const PAGE_DIMENSIONS: Record<string, Record<string, { width: string; height: string }>> = {
  a4: {
    portrait: { width: '210mm', height: '297mm' },
    landscape: { width: '297mm', height: '210mm' },
  },
  letter: {
    portrait: { width: '8.5in', height: '11in' },
    landscape: { width: '11in', height: '8.5in' },
  },
  legal: {
    portrait: { width: '8.5in', height: '14in' },
    landscape: { width: '14in', height: '8.5in' },
  },
};

export const PrintLayout: React.FC<PrintLayoutProps> = ({
  theme: propTheme,
  variant = 'report',
  title,
  subtitle,
  organization = 'Torafirma',
  date,
  classification,
  headerContent,
  reportContent,
  footerContent,
  tableOfContents,
  sections = [],
  showPageNumbers = true,
  totalPages,
  pageSize = 'a4',
  orientation = 'portrait',
  className,
  style,
  children,
  testId,
}) => {
  const { state } = useLayout();
  const theme = propTheme ?? state.theme;
  const t = THEME_TOKENS[theme];
  const dims = PAGE_DIMENSIONS[pageSize]?.[orientation] ?? PAGE_DIMENSIONS.a4.portrait;

  const isPrint = typeof window !== 'undefined' && window.matchMedia('print').matches;

  const pageStyle: React.CSSProperties = {
    width: isPrint ? '100%' : dims.width,
    minHeight: isPrint ? '100%' : dims.height,
    margin: isPrint ? 0 : '0 auto',
    background: '#FFFFFF',
    color: '#000000',
    fontFamily: 'Inter, "IBM Plex Sans", system-ui, sans-serif',
    fontSize: 10,
    lineHeight: 1.5,
    padding: isPrint ? 0 : '12mm',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    breakAfter: 'page',
    ...style,
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingBottom: 12,
    borderBottom: '2px solid #000000',
    marginBottom: 16,
  };

  const titleStyle: React.CSSProperties = {
    fontSize: variant === 'summary' ? 14 : 18,
    fontWeight: 700,
    letterSpacing: '0.02em',
    textTransform: 'uppercase' as const,
    margin: 0,
    color: '#000000',
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: 11,
    color: '#444444',
    margin: '4px 0 0 0',
  };

  const metaStyle: React.CSSProperties = {
    fontSize: 9,
    textAlign: 'right',
    color: '#666666',
    fontFamily: '"JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace',
  };

  const contentStyle: React.CSSProperties = {
    flex: 1,
    overflow: 'visible',
  };

  const footerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTop: '1px solid #CCCCCC',
    marginTop: 16,
    fontSize: 8,
    color: '#888888',
  };

  const sectionStyle: React.CSSProperties = {
    breakInside: 'avoid',
    marginBottom: 16,
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: '0.04em',
    textTransform: 'uppercase' as const,
    borderBottom: '1px solid #CCCCCC',
    paddingBottom: 4,
    marginBottom: 8,
    color: '#000000',
  };

  const tocStyle: React.CSSProperties = {
    background: '#F5F5F5',
    border: '1px solid #DDDDDD',
    padding: 12,
    marginBottom: 16,
    breakInside: 'avoid',
  };

  return (
    <div
      className={`tf-layout tf-print tf-print--${variant} ${className ?? ''}`}
      data-testid={testId}
      data-layout="print"
      data-variant={variant}
      data-theme={theme}
      style={{
        background: isPrint ? 'transparent' : '#E0E0E0',
        padding: isPrint ? 0 : '20px',
        minHeight: '100vh',
      }}
    >
      <div
        className="tf-print-page"
        style={pageStyle}
        data-pagesize={pageSize}
        data-orientation={orientation}
      >
        {/* Header */}
        <div style={headerStyle} data-panel="header">
          <div>
            {headerContent ?? (
              <>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase' as const,
                    color: '#000000',
                    marginBottom: 4,
                  }}
                >
                  {organization}
                </div>
                <div style={titleStyle}>{title}</div>
                {subtitle && <div style={subtitleStyle}>{subtitle}</div>}
              </>
            )}
          </div>
          <div style={metaStyle}>
            {date && <div>{date}</div>}
            {classification && (
              <div
                style={{
                  fontWeight: 700,
                  color: '#CC0000',
                  marginTop: 4,
                }}
              >
                {classification}
              </div>
            )}
          </div>
        </div>

        {/* Table of Contents */}
        {variant === 'report' && tableOfContents && (
          <div style={tocStyle} data-panel="toc">
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase' as const,
                marginBottom: 8,
              }}
            >
              Contents
            </div>
            {tableOfContents}
          </div>
        )}

        {/* Content */}
        <div style={contentStyle} data-panel="content">
          {reportContent ?? children}

          {/* Sections with page breaks */}
          {sections.map((section) => (
            <div key={section.id} style={sectionStyle} data-section={section.id}>
              <div style={sectionTitleStyle}>{section.title}</div>
              {section.content}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={footerStyle} data-panel="footer">
          {footerContent ?? (
            <>
              <span>
                {organization} &mdash; {title}
              </span>
              {showPageNumbers && (
                <span>
                  Page <span className="pageNumber" />{' '}
                  {totalPages && `of ${totalPages}`}
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Variant Exports
export const PrintReport: React.FC<Omit<PrintLayoutProps, 'variant'>> = (props) => (
  <PrintLayout {...props} variant="report" />
);
PrintReport.displayName = 'PrintReport';

export const PrintSummary: React.FC<Omit<PrintLayoutProps, 'variant'>> = (props) => (
  <PrintLayout {...props} variant="summary" />
);
PrintSummary.displayName = 'PrintSummary';

export const PrintDetail: React.FC<Omit<PrintLayoutProps, 'variant'>> = (props) => (
  <PrintLayout {...props} variant="detail" />
);
PrintDetail.displayName = 'PrintDetail';

export default PrintLayout;
