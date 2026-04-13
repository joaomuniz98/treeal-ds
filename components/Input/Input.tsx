import React, { useId, useRef, useState } from 'react';
import styles from './Input.module.css';

export type InputState    = 'Default' | 'Hover' | 'Active' | 'Disabled' | 'Error';
export type InputType     = 'text' | 'email' | 'password' | 'search' | 'date';
export type InputSize     = 'sm' | 'md';

// ─── Built-in SVG icons ───────────────────────────────────────────────────────

function IconEmail() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IconSearch() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
      <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
    </svg>
  );
}

function IconCalendar() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IconLock() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="5" y="11" width="14" height="11" rx="2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IconEye() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.75"/>
    </svg>
  );
}

function IconEyeOff() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M1 1l22 22" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
    </svg>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type' | 'size'> {
  /** Visual/interaction state. Defaults to 'Default'. */
  state?: InputState;
  /** Size variant. sm = 36px height, md = 48px height. Defaults to 'md'. */
  size?: InputSize;
  /**
   * Semantic input type. Sets the correct HTML type and auto-adds icons.
   * - email    → envelope icon left
   * - password → lock icon left + show/hide toggle right
   * - search   → search icon left + green search button right
   * - date     → calendar icon right
   */
  inputType?: InputType;
  /** Label text rendered above the field. */
  label?: string;
  placeholder?: string;
  /** Helper or error message rendered below the field. */
  message?: string;
  /** Info icon rendered beside the label. */
  iconLabel?: React.ReactNode;
  /** Icon rendered inside the field, left side (24×24 slot). */
  iconLeft?: React.ReactNode;
  /** Icon rendered inside the field, right side (24×24 slot). */
  iconRight?: React.ReactNode;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Called when search button is clicked (only for inputType="search") */
  onSearch?: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Input({
  state = 'Default',
  size = 'md',
  inputType = 'text',
  label,
  placeholder,
  message,
  iconLabel,
  iconLeft,
  iconRight,
  value,
  onChange,
  onSearch,
  id: idProp,
  className,
  ...props
}: InputProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isDisabled = state === 'Disabled';
  const isError    = state === 'Error';

  // ── Resolve HTML type ──────────────────────────────────────────────────────
  const htmlType = inputType === 'password'
    ? (showPassword ? 'text' : 'password')
    : inputType === 'search'
    ? 'text'
    : inputType;

  // ── Resolve built-in icons ─────────────────────────────────────────────────
  const resolvedIconLeft: React.ReactNode =
    iconLeft ??
    (inputType === 'email'    ? <IconEmail />    :
     inputType === 'password' ? <IconLock />     :
     undefined);

  const resolvedIconRight: React.ReactNode =
    iconRight ??
    (inputType === 'password'
      ? (
        <button
          type="button"
          className={styles.toggleBtn}
          onClick={() => setShowPassword((v) => !v)}
          aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
          tabIndex={-1}
        >
          {showPassword ? <IconEye /> : <IconEyeOff />}
        </button>
      )
      : inputType === 'date'
      ? (
        <button
          type="button"
          className={styles.toggleBtn}
          onClick={() => inputRef.current?.showPicker?.()}
          aria-label="Abrir calendário"
          tabIndex={-1}
        >
          <IconCalendar />
        </button>
      )
      : inputType === 'search'
      ? (
        <button
          type="button"
          className={styles.searchBtn}
          onClick={onSearch}
          aria-label="Buscar"
          tabIndex={-1}
        >
          <IconSearch />
        </button>
      )
      : undefined);

  const fieldClass = [
    styles.field,
    size === 'sm' ? styles.fieldSm : styles.fieldMd,
    state === 'Hover'  ? styles.hover   : '',
    state === 'Active' ? styles.active  : '',
    isDisabled         ? styles.disabled : '',
    isError            ? styles.error   : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.wrapper}>
      {label && (
        <div className={styles.labelRow}>
          <label
            htmlFor={id}
            className={[styles.label, isDisabled ? styles.labelDisabled : '']
              .filter(Boolean)
              .join(' ')}
          >
            {label}
          </label>
          {iconLabel && (
            <span className={styles.labelIcon} aria-hidden="true">
              {iconLabel}
            </span>
          )}
        </div>
      )}

      <div className={fieldClass}>
        {resolvedIconLeft && (
          <span className={styles.icon} aria-hidden="true">
            {resolvedIconLeft}
          </span>
        )}
        <input
          ref={inputRef}
          id={id}
          type={htmlType}
          className={styles.input}
          placeholder={placeholder}
          disabled={isDisabled}
          value={value}
          onChange={onChange}
          aria-invalid={isError}
          aria-describedby={message ? `${id}-message` : undefined}
          {...props}
        />
        {resolvedIconRight && (
          <span className={[styles.icon, inputType === 'search' || inputType === 'password' ? styles.iconAction : ''].filter(Boolean).join(' ')}>
            {resolvedIconRight}
          </span>
        )}
      </div>

      {message && (
        <p
          id={`${id}-message`}
          className={[styles.message, isError ? styles.messageError : '']
            .filter(Boolean)
            .join(' ')}
        >
          {message}
        </p>
      )}
    </div>
  );
}
