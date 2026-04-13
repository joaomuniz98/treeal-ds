import React, { useState } from 'react';
import styles from './BaseCheckRadio.module.css';

export type CheckRadioType = 'Check' | 'Radio' | 'Toggle';

export interface BaseCheckRadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type' | 'size'> {
  type?: CheckRadioType;
  /** Controlled checked state */
  checked?: boolean;
  /** Uncontrolled initial checked state */
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

export function BaseCheckRadio({
  type = 'Check',
  checked,
  defaultChecked = false,
  onChange,
  disabled,
  className,
  ...rest
}: BaseCheckRadioProps) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setInternalChecked(e.target.checked);
    onChange?.(e.target.checked);
  };

  const inputType = type === 'Radio' ? 'radio' : 'checkbox';
  const inputRole = type === 'Toggle' ? 'switch' : undefined;

  if (type === 'Toggle') {
    return (
      <label
        className={[
          styles.toggleWrapper,
          isChecked ? styles.toggleChecked : '',
          disabled ? styles.toggleDisabled : '',
          className,
        ].filter(Boolean).join(' ')}
      >
        <input
          {...rest}
          type="checkbox"
          role="switch"
          checked={isControlled ? checked : undefined}
          defaultChecked={!isControlled ? defaultChecked : undefined}
          disabled={disabled}
          onChange={handleChange}
          className={styles.nativeInput}
        />
        <span className={styles.toggleTrack} aria-hidden="true" />
      </label>
    );
  }

  if (type === 'Radio') {
    return (
      <label
        className={[
          styles.base,
          isChecked ? styles.radioChecked : styles.radioDefault,
          disabled ? styles.inputDisabled : '',
          className,
        ].filter(Boolean).join(' ')}
      >
        <input
          {...rest}
          type="radio"
          checked={isControlled ? checked : undefined}
          defaultChecked={!isControlled ? defaultChecked : undefined}
          disabled={disabled}
          onChange={handleChange}
          className={styles.nativeInput}
        />
        {isChecked && <span className={styles.radioIcon} aria-hidden="true" />}
      </label>
    );
  }

  // Check
  return (
    <label
      className={[
        styles.base,
        isChecked ? styles.checkChecked : styles.checkDefault,
        disabled ? styles.inputDisabled : '',
        className,
      ].filter(Boolean).join(' ')}
    >
      <input
        {...rest}
        type="checkbox"
        checked={isControlled ? checked : undefined}
        defaultChecked={!isControlled ? defaultChecked : undefined}
        disabled={disabled}
        onChange={handleChange}
        className={styles.nativeInput}
      />
      {isChecked && (
        <svg className={styles.checkIcon} viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M1.5 6L4.5 9.5L10.5 2.5" stroke="#203224" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </label>
  );
}
