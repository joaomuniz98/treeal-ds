import React, { useEffect, useCallback, useId, useRef } from 'react';
import styles from './Modal.module.css';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ModalAction {
  label: string;
  onClick: () => void;
}

export interface ModalProps {
  isOpen: boolean;
  title: string;
  description?: string;
  children?: React.ReactNode;
  onClose: () => void;
  primaryAction?: ModalAction;
  secondaryAction?: ModalAction;
}

// ─── Focusable elements selector ─────────────────────────────────────────────

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

// ─── Modal ────────────────────────────────────────────────────────────────────

export function Modal({
  isOpen,
  title,
  description,
  children,
  onClose,
  primaryAction,
  secondaryAction,
}: ModalProps) {
  const uid = useId();
  const titleId = `${uid}-title`;
  const descId = `${uid}-desc`;
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape + focus trap on Tab
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return; }

      if (e.key === 'Tab' && modalRef.current) {
        const focusable = Array.from(
          modalRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
        ).filter((el) => !el.closest('[disabled]'));

        if (focusable.length === 0) { e.preventDefault(); return; }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (!isOpen) return;

    document.addEventListener('keydown', handleKeyDown);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Auto-focus first focusable element
    const raf = requestAnimationFrame(() => {
      const first = modalRef.current?.querySelector<HTMLElement>(FOCUSABLE);
      first?.focus();
    });

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prev;
      cancelAnimationFrame(raf);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const hasActions = primaryAction || secondaryAction;

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={modalRef}
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descId : undefined}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Heading */}
        <div className={styles.heading}>
          <p id={titleId} className={styles.title}>
            {title}
          </p>
          {description && (
            <p id={descId} className={styles.description}>
              {description}
            </p>
          )}
        </div>

        {/* Body */}
        {children && (
          <div className={styles.body}>
            {children}
          </div>
        )}

        {/* Actions */}
        {hasActions && (
          <div className={styles.actions}>
            <div className={styles.btns}>
              {secondaryAction && (
                <button
                  type="button"
                  className={styles.btnSecondary}
                  onClick={secondaryAction.onClick}
                >
                  {secondaryAction.label}
                </button>
              )}
              {primaryAction && (
                <button
                  type="button"
                  className={styles.btnPrimary}
                  onClick={primaryAction.onClick}
                >
                  {primaryAction.label}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
