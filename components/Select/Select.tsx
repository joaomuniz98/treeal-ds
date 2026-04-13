import React, { useId } from 'react';
import styles from './Select.module.css';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SelectOption {
  value: string;
  label: string;
}

export type SelectState = 'Default' | 'Disabled' | 'Error';

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange' | 'size'> {
  /** Options to render */
  options: SelectOption[];
  /** Placeholder shown when no value is selected */
  placeholder?: string;
  /** Label rendered above the field */
  label?: string;
  /** Helper or error message rendered below the field */
  message?: string;
  /** Visual/interaction state */
  state?: SelectState;
  onChange?: (value: string) => void;
  /** className applied to the outer wrapper div */
  wrapperClassName?: string;
}

// ─── Chevron icon ─────────────────────────────────────────────────────────────

function IconChevron() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Select({
  options,
  value,
  placeholder = 'Selecione',
  label,
  message,
  state = 'Default',
  onChange,
  id: idProp,
  className,
  wrapperClassName,
  ...rest
}: SelectProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;

  const isDisabled = state === 'Disabled';
  const isError = state === 'Error';

  const fieldClass = [
    styles.field,
    isError ? styles.error : '',
  ]
    .filter(Boolean)
    .join(' ');

  const selectClass = [
    styles.select,
    !value ? styles.placeholder : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={[styles.wrapper, wrapperClassName].filter(Boolean).join(' ')}>
      {label && (
        <label
          htmlFor={id}
          className={[styles.label, isDisabled ? styles.labelDisabled : '']
            .filter(Boolean)
            .join(' ')}
        >
          {label}
        </label>
      )}

      <div className={fieldClass}>
        <select
          {...rest}
          id={id}
          className={selectClass}
          value={value ?? ''}
          disabled={isDisabled}
          aria-invalid={isError}
          aria-describedby={message ? `${id}-message` : undefined}
          onChange={(e) => onChange?.(e.target.value)}
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className={styles.chevron}>
          <IconChevron />
        </span>
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
