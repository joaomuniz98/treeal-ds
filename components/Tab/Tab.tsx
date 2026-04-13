import React from 'react';
import styles from './Tab.module.css';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface TabProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  items: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
}

export interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Must match the TabItem id */
  tabId: string;
  activeId: string;
  children: React.ReactNode;
}

// ─── Tab ──────────────────────────────────────────────────────────────────────

export function Tab({ items, activeId, onChange, className, ...rest }: TabProps) {
  return (
    <div
      {...rest}
      role="tablist"
      className={[styles.tabList, className].filter(Boolean).join(' ')}
    >
      {items.map((item) => {
        const isActive = item.id === activeId;
        const isDisabled = item.disabled ?? false;

        return (
          <button
            key={item.id}
            id={`tab-${item.id}`}
            role="tab"
            aria-selected={isActive}
            aria-controls={`tabpanel-${item.id}`}
            aria-disabled={isDisabled}
            disabled={isDisabled}
            tabIndex={isActive ? 0 : -1}
            className={[
              styles.tab,
              isActive ? styles.active : '',
              isDisabled ? styles.disabled : '',
            ].filter(Boolean).join(' ')}
            onClick={() => !isDisabled && onChange(item.id)}
          >
            {item.icon && (
              <span className={styles.icon} aria-hidden="true">
                {item.icon}
              </span>
            )}
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

// ─── TabPanel ─────────────────────────────────────────────────────────────────

export function TabPanel({ tabId, activeId, children, className, ...rest }: TabPanelProps) {
  if (tabId !== activeId) return null;

  return (
    <div
      {...rest}
      id={`tabpanel-${tabId}`}
      role="tabpanel"
      aria-labelledby={`tab-${tabId}`}
      tabIndex={0}
      className={className}
    >
      {children}
    </div>
  );
}
