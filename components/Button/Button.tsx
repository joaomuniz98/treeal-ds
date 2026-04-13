import React from 'react';
import styles from './Button.module.css';

export type ButtonVariant = 'outline' | 'fill' | 'secondary' | 'text';
export type ButtonSize = 'sm' | 'md';

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Visual variant. Defaults to 'outline'. */
  variant?: ButtonVariant;
  /**
   * Size of the button.
   * - sm → min-height 36px (Figma size="36")
   * - md → min-height 48px (Figma size="48")
   * Defaults to 'sm'.
   */
  size?: ButtonSize;
  /** Node rendered before the label. Sized to 24×24 px by the stylesheet. */
  iconLeft?: React.ReactNode;
  /** Node rendered after the label. Sized to 24×24 px by the stylesheet. */
  iconRight?: React.ReactNode;
  children: React.ReactNode;
}

export function Button({
  variant = 'outline',
  size = 'md',
  iconLeft,
  iconRight,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  // When the button is disabled, the disabled visual variant takes over
  const visualVariant = disabled ? 'disabled' : variant;

  const classNames = [
    styles.button,
    styles[size],
    styles[visualVariant],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={classNames}
      disabled={disabled}
      aria-disabled={disabled}
      {...props}
    >
      {iconLeft && <span className={styles.icon}>{iconLeft}</span>}
      <span className={styles.label}>{children}</span>
      {iconRight && <span className={styles.icon}>{iconRight}</span>}
    </button>
  );
}
