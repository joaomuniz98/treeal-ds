import React from 'react';
import styles from './Alert.module.css';

// ─── Types ────────────────────────────────────────────────────────────────────

export type AlertType = 'Default' | 'Info' | 'Success' | 'Warning' | 'Error';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: AlertType;
  title?: string;
  message: string;
  /** Show icon on the left */
  addonLeft?: boolean;
  /** Show close (×) button on the right */
  closeIcon?: boolean;
  /** Show action button */
  actions?: boolean;
  /** Label for the action button (defaults to "Ação") */
  actionLabel?: string;
  onClose?: () => void;
  onAction?: () => void;
}

// ─── Inline SVG icons ─────────────────────────────────────────────────────────

const iconColor: Record<AlertType, string> = {
  Default: '#9490AC',
  Info:    '#2472BA',
  Success: '#2C7D56',
  Warning: '#A36A00',
  Error:   '#DE0000',
};

/** Info-circle icon — Default & Info */
function IconInfo({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="9" fill={color} />
      <path d="M10 9v5" stroke="#fff" strokeWidth="1.75" strokeLinecap="round" />
      <circle cx="10" cy="6.5" r="1" fill="#fff" />
    </svg>
  );
}

/** Check-circle icon — Success */
function IconSuccess({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="9" fill={color} />
      <path d="M6 10.5l3 3 5-5.5" stroke="#fff" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Warning-triangle icon — Warning */
function IconWarning({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 2.5L18 17H2L10 2.5Z" fill={color} />
      <path d="M10 8v4" stroke="#fff" strokeWidth="1.75" strokeLinecap="round" />
      <circle cx="10" cy="14.5" r="1" fill="#fff" />
    </svg>
  );
}

/** X-circle icon — Error */
function IconError({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="9" fill={color} />
      <path d="M7 7l6 6M13 7l-6 6" stroke="#fff" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

/** Close × icon */
function IconClose() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function TypeIcon({ type }: { type: AlertType }) {
  const color = iconColor[type];
  if (type === 'Success') return <IconSuccess color={color} />;
  if (type === 'Warning') return <IconWarning color={color} />;
  if (type === 'Error')   return <IconError color={color} />;
  return <IconInfo color={color} />;
}

// ─── Component ────────────────────────────────────────────────────────────────

const typeStyleMap: Record<AlertType, string> = {
  Default: styles.typeDefault,
  Info:    styles.typeInfo,
  Success: styles.typeSuccess,
  Warning: styles.typeWarning,
  Error:   styles.typeError,
};

const titleStyleMap: Record<AlertType, string> = {
  Default: styles.titleDefault,
  Info:    styles.titleInfo,
  Success: styles.titleSuccess,
  Warning: styles.titleWarning,
  Error:   styles.titleError,
};

const ariaRoleMap: Record<AlertType, string> = {
  Default: 'status',
  Info:    'status',
  Success: 'status',
  Warning: 'alert',
  Error:   'alert',
};

export function Alert({
  type = 'Default',
  title,
  message,
  addonLeft = true,
  closeIcon = true,
  actions = false,
  actionLabel = 'Ação',
  onClose,
  onAction,
  className,
  ...rest
}: AlertProps) {
  const rootClass = [styles.alert, typeStyleMap[type], className]
    .filter(Boolean)
    .join(' ');

  const hasRightSlot = actions || closeIcon;

  return (
    <div
      {...rest}
      role={ariaRoleMap[type]}
      aria-live={type === 'Warning' || type === 'Error' ? 'assertive' : 'polite'}
      className={rootClass}
    >
      {/* Left icon */}
      {addonLeft && (
        <span className={styles.iconSlot}>
          <TypeIcon type={type} />
        </span>
      )}

      {/* Text */}
      <div className={styles.textContent}>
        {title && (
          <p className={[styles.title, titleStyleMap[type]].join(' ')}>
            {title}
          </p>
        )}
        <p className={styles.message}>{message}</p>
      </div>

      {/* Right: action + close */}
      {hasRightSlot && (
        <div className={styles.rightSlot}>
          {actions && (
            <button
              type="button"
              className={styles.actionBtn}
              onClick={onAction}
            >
              {actionLabel}
            </button>
          )}
          {closeIcon && (
            <button
              type="button"
              className={styles.closeBtn}
              onClick={onClose}
              aria-label="Fechar alerta"
            >
              <IconClose />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
