import React from 'react';
import styles from './Pagination.module.css';

// ─── Types ────────────────────────────────────────────────────────────────────

export type PaginationSize = 'xs' | 'md' | 'lg';

export interface PaginationProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  sizes?: PaginationSize;
  currentPage?: number;
  totalPages?: number;
  /** Show previous / next chevron buttons */
  withControls?: boolean;
  /** Show first / last double-chevron buttons */
  withEdges?: boolean;
  onChange?: (page: number) => void;
}

// ─── Icon size lookup (xs=12, md=20, lg=24 — from Figma) ─────────────────────

const ICON_SIZE: Record<PaginationSize, number> = { xs: 12, md: 20, lg: 24 };

// ─── SVG icons (inline, no external dependency) ──────────────────────────────

const IconDots = ({ s }: { s: number }) => (
  <svg width={s} height={s} viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
    {/* System/Dots — 3 horizontal dots */}
    <circle cx="2"  cy="6" r="1.25" />
    <circle cx="6"  cy="6" r="1.25" />
    <circle cx="10" cy="6" r="1.25" />
  </svg>
);

const IconChevronLeft = ({ s }: { s: number }) => (
  // Arrows/Chevron Left — single chevron «
  <svg width={s} height={s} viewBox="0 0 12 12" fill="none" stroke="currentColor"
    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="7.5,2 4,6 7.5,10" />
  </svg>
);

const IconChevronRight = ({ s }: { s: number }) => (
  // Arrows/Chevron Right — single chevron »
  <svg width={s} height={s} viewBox="0 0 12 12" fill="none" stroke="currentColor"
    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="4.5,2 8,6 4.5,10" />
  </svg>
);

const IconChevronsLeft = ({ s }: { s: number }) => (
  // Arrows/Chevrons Left — double chevron «
  <svg width={s} height={s} viewBox="0 0 12 12" fill="none" stroke="currentColor"
    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="6.5,2 3,6 6.5,10" />
    <polyline points="9.5,2 6,6 9.5,10" />
  </svg>
);

const IconChevronsRight = ({ s }: { s: number }) => (
  // Arrows/Chevrons Right — double chevron »
  <svg width={s} height={s} viewBox="0 0 12 12" fill="none" stroke="currentColor"
    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="2.5,2 6,6 2.5,10" />
    <polyline points="5.5,2 9,6 5.5,10" />
  </svg>
);

// ─── Page range algorithm ─────────────────────────────────────────────────────
// Produces an array like: [1, 2, 3, 4, 5, '…', 10]
// or: [1, '…', 4, 5, 6, '…', 10]
// Matches the Figma design: first 5 visible, dots, last page

type PageItem = number | '…';

function buildRange(current: number, total: number): PageItem[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  // Near the start — show first 5, dots, last
  if (current <= 4) {
    return [1, 2, 3, 4, 5, '…', total];
  }

  // Near the end — show first, dots, last 5
  if (current >= total - 3) {
    return [1, '…', total - 4, total - 3, total - 2, total - 1, total];
  }

  // Middle — first, dots, (current-1), current, (current+1), dots, last
  return [1, '…', current - 1, current, current + 1, '…', total];
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Pagination({
  sizes = 'xs',
  currentPage = 1,
  totalPages = 10,
  withControls = false,
  withEdges = false,
  onChange,
  className,
  ...rest
}: PaginationProps) {
  const iconSize = ICON_SIZE[sizes];
  const pages = buildRange(currentPage, totalPages);

  const go = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onChange?.(page);
  };

  const itemClass = (extra: string) =>
    [styles.item, styles[sizes], extra].filter(Boolean).join(' ');

  return (
    <nav
      {...rest}
      role="navigation"
      aria-label="Pagination"
      className={[styles.pagination, className].filter(Boolean).join(' ')}
    >
      {/* First page button («) */}
      {withEdges && (
        <button
          className={itemClass(styles.control)}
          onClick={() => go(1)}
          disabled={currentPage === 1}
          aria-label="First page"
          type="button"
        >
          <IconChevronsLeft s={iconSize} />
        </button>
      )}

      {/* Previous button (‹) */}
      {withControls && (
        <button
          className={itemClass(styles.control)}
          onClick={() => go(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
          type="button"
        >
          <IconChevronLeft s={iconSize} />
        </button>
      )}

      {/* Page numbers + dots */}
      {pages.map((page, i) =>
        page === '…' ? (
          <span
            key={`dots-${i}`}
            className={itemClass(styles.dots)}
            aria-hidden="true"
          >
            <IconDots s={iconSize} />
          </span>
        ) : (
          <button
            key={page}
            className={itemClass(page === currentPage ? styles.active : styles.inactive)}
            onClick={() => go(page)}
            aria-label={`Page ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
            type="button"
          >
            {page}
          </button>
        )
      )}

      {/* Next button (›) */}
      {withControls && (
        <button
          className={itemClass(styles.control)}
          onClick={() => go(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
          type="button"
        >
          <IconChevronRight s={iconSize} />
        </button>
      )}

      {/* Last page button (») */}
      {withEdges && (
        <button
          className={itemClass(styles.control)}
          onClick={() => go(totalPages)}
          disabled={currentPage === totalPages}
          aria-label="Last page"
          type="button"
        >
          <IconChevronsRight s={iconSize} />
        </button>
      )}
    </nav>
  );
}
