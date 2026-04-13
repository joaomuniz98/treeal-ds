import React from 'react';
import styles from './Table.module.css';

// ─── TableBadge ──────────────────────────────────────────────────────────────

export type TableBadgeVariant = 'success' | 'danger' | 'neutral';

export interface TableBadgeProps {
  children: React.ReactNode;
  variant?: TableBadgeVariant;
}

export function TableBadge({ children, variant = 'neutral' }: TableBadgeProps) {
  return (
    <span className={[styles.badge, styles[`badge_${variant}`]].join(' ')}>
      {children}
    </span>
  );
}

// ─── Table ───────────────────────────────────────────────────────────────────

export interface TableColumn<T> {
  /** Unique key for the column — used as default accessor on the row object. */
  key: string;
  /** Header label text. */
  header: string;
  /**
   * Fixed pixel width for the column.
   * Omit on the column that should grow to fill remaining space.
   */
  width?: number;
  /** Align cell content to the right. */
  align?: 'right';
  /** Custom cell renderer. Falls back to `row[key]` when omitted. */
  render?: (row: T, index: number) => React.ReactNode;
}

export interface TableProps<T> {
  columns: TableColumn<T>[];
  rows: T[];
  /** Returns a stable key for each row. Defaults to the row index. */
  getRowKey?: (row: T, index: number) => string | number;
  /** Message shown when `rows` is empty. */
  emptyText?: string;
  className?: string;
}

export function Table<T extends Record<string, unknown>>({
  columns,
  rows,
  getRowKey,
  emptyText = 'Nenhum resultado encontrado.',
  className,
}: TableProps<T>) {
  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(' ')}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.headerRow}>
            {columns.map((col) => (
              <th
                key={col.key}
                className={[styles.th, col.align === 'right' ? styles.alignRight : '']
                  .filter(Boolean)
                  .join(' ')}
                style={col.width ? { width: col.width } : undefined}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className={styles.empty}>
                {emptyText}
              </td>
            </tr>
          ) : (
            rows.map((row, rowIndex) => (
              <tr
                key={getRowKey ? getRowKey(row, rowIndex) : rowIndex}
                className={styles.row}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={[styles.td, col.align === 'right' ? styles.alignRight : '']
                      .filter(Boolean)
                      .join(' ')}
                  >
                    {col.render
                      ? col.render(row, rowIndex)
                      : (row[col.key] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
