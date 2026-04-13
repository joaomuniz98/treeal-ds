import React from 'react';
import styles from './Steps.module.css';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface StepItem {
  label: string;
  description?: string;
}

export interface StepsProps {
  steps: StepItem[];
  /** 0-based index of the currently active step */
  current: number;
  /** Compact dot version — for mobile or tight spaces */
  minified?: boolean;
  /** Switch to vertical layout on small screens (≤600px). Default: true */
  responsive?: boolean;
  className?: string;
}

type StepState = 'Default' | 'Active' | 'Complete';
type StepType = 'Start' | 'Step' | 'End';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getState(index: number, current: number): StepState {
  if (index < current) return 'Complete';
  if (index === current) return 'Active';
  return 'Default';
}

function getType(index: number, total: number): StepType {
  if (index === 0) return 'Start';
  if (index === total - 1) return 'End';
  return 'Step';
}

// ─── Double-check icon (tabler:checks) — inline SVG ──────────────────────────

function IconChecks() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* left check */}
      <polyline points="2,12.5 6,16.5 13,9.5" />
      {/* right check (shifted) */}
      <polyline points="9,12.5 13,16.5 21,9.5" />
    </svg>
  );
}

// ─── Minified (dots) version ──────────────────────────────────────────────────

function MinifiedSteps({ steps, current }: Pick<StepsProps, 'steps' | 'current'>) {
  return (
    <div className={styles.minified} role="list" aria-label="Steps">
      {steps.map((step, i) => {
        const state = getState(i, current);
        const isLast = i === steps.length - 1;

        const dotClass = [
          styles.minDot,
          state === 'Default' ? styles.minDefault : '',
          state === 'Active' ? styles.minActive : '',
          state === 'Complete' ? styles.minComplete : '',
        ]
          .filter(Boolean)
          .join(' ');

        // Connector color: complete if the step TO THE LEFT is complete
        const connectorClass = [
          styles.minConnector,
          state === 'Complete' ? styles.minConnectorComplete : styles.minConnectorDefault,
        ].join(' ');

        return (
          <React.Fragment key={i}>
            <div
              role="listitem"
              className={dotClass}
              aria-label={`Step ${i + 1}: ${step.label}${
                state === 'Active' ? ' (current)' : state === 'Complete' ? ' (completed)' : ''
              }`}
              aria-current={state === 'Active' ? 'step' : undefined}
            />
            {!isLast && <div className={connectorClass} aria-hidden="true" />}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ─── Full Steps ───────────────────────────────────────────────────────────────

export function Steps({ steps, current, minified = false, responsive = true, className }: StepsProps) {
  const wrapperClass = [
    styles.steps,
    responsive ? styles.stepsResponsive : '',
    className,
  ].filter(Boolean).join(' ');

  if (minified) {
    return (
      <div className={wrapperClass}>
        <MinifiedSteps steps={steps} current={current} />
      </div>
    );
  }

  const total = steps.length;

  return (
    <nav
      className={wrapperClass}
      aria-label="Steps"
    >
      {steps.map((step, i) => {
        const state = getState(i, current);
        const type = getType(i, total);
        const isLight = state === 'Active' || state === 'Complete';

        /*
         * z-index stacking: first item (Start) is highest.
         * Its arrow paints on top of the next item's notch,
         * creating the connected-chevron effect.
         */
        const zIndex = total - i;

        const itemClass = [
          styles.item,
          styles[`type${type}`],
          styles[`state${state}`],
        ].join(' ');

        const textClass = isLight ? styles.textLight : styles.textDark;

        return (
          <div
            key={i}
            className={itemClass}
            style={{ zIndex }}
            role="listitem"
            aria-current={state === 'Active' ? 'step' : undefined}
            aria-label={`Step ${i + 1} of ${total}: ${step.label}${
              state === 'Active' ? ' (current)' : state === 'Complete' ? ' (completed)' : ''
            }`}
          >
            {/* Label */}
            <span className={[styles.label, textClass].join(' ')}>
              {step.label}
            </span>
            {step.description && (
              <span className={[styles.stepDescription, textClass].join(' ')}>
                {step.description}
              </span>
            )}

            {/* Number (Default / Active) or check icon (Complete) */}
            {state === 'Complete' ? (
              <span className={[styles.checkIcon, textClass].join(' ')}>
                <IconChecks />
              </span>
            ) : (
              <span className={[styles.num, textClass].join(' ')}>
                {String(i + 1).padStart(2, '0')}
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}
