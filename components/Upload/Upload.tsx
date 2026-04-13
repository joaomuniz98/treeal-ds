import React, { useRef, useState } from 'react';
import styles from './Upload.module.css';

// ─── Types ────────────────────────────────────────────────────────────────────

export type UploadSize = 'MD' | 'LG';
export type UploadType = 'single' | 'multiple';
export type UploadStatus = 'default' | 'active';
export type UploadFileState = 'loading' | 'loaded' | 'error';
export type UploadIndicator = 'loader' | 'progress-bar';

export interface UploadFile {
  id: string;
  name: string;
  size: string;
  /** 0–100 */
  progress: number;
  state: UploadFileState;
  /** 'loader' shows spinner · 'progress-bar' shows progress (LG only) */
  indicator?: UploadIndicator;
}

export interface UploadProps {
  size?: UploadSize;
  type?: UploadType;
  /** 'default' = drop area only · 'active' = files listed */
  status?: UploadStatus;
  files?: UploadFile[];
  onDrop?: (files: File[]) => void;
  /** Called with files rejected due to maxSize */
  onSizeError?: (files: File[]) => void;
  onRemove?: (id: string) => void;
  onEdit?: (id: string) => void;
  onPreview?: (id: string) => void;
  /** Native accept attribute, e.g. ".pdf,.png,.jpg" */
  accept?: string;
  /** Max file size in bytes — files exceeding this are rejected and passed to onSizeError */
  maxSize?: number;
  /** Override the subtitle below the browse link. Derived from accept/maxSize when omitted. */
  subtitle?: string;
  className?: string;
}

// ─── SVG icons (inline, no external dependency) ──────────────────────────────

const IconFile = () => (
  <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
    <defs>
      <linearGradient id="fileGrad" x1="0%" y1="100%" x2="100%" y2="0%">
        {/* Figma: linear-gradient(63.88deg, #2970FF 0.2%, #0040C1 99.99%) */}
        <stop offset="0%" stopColor="#2970FF" />
        <stop offset="100%" stopColor="#0040C1" />
      </linearGradient>
    </defs>
    <path
      fill="url(#fileGrad)"
      d="M2 0h5.5L10 2.5V12H2V0zm5 0v3h3L7 0zM3 5h6v1H3V5zm0 2h6v1H3V7zm0 2h4v1H3V9z"
    />
  </svg>
);

const IconPen = () => (
  <svg viewBox="0 0 12 12" width="12" height="12" fill="currentColor" aria-hidden="true">
    <path d="M8.707.293a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414L9.414 5.1 6.9 2.586 8.707.293zM0 9.5V12h2.5l7-7L7 2.5l-7 7zM1.5 10.5v-.793l5.5-5.5.793.793-5.5 5.5H1.5z" />
  </svg>
);

const IconEye = () => (
  <svg viewBox="0 0 12 12" width="12" height="12" fill="currentColor" aria-hidden="true">
    <path d="M6 2C3.27 2 1 4 1 6s2.27 4 5 4 5-2 5-4-2.27-4-5-4zm0 7a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0-5a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
  </svg>
);

const IconTrash = () => (
  <svg viewBox="0 0 12 12" width="12" height="12" fill="currentColor" aria-hidden="true">
    <path d="M4 1V0h4v1h3v1H1V1h3zM2 3h8l-.8 8H2.8L2 3zm2 1v6h1V4H4zm2 0v6h1V4H6z" />
  </svg>
);

// SVG illustration for MD drop zone (32×32 stacked files)
const DropIconMd = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
    {/* back-right file */}
    <rect x="18" y="10" width="10" height="13" rx="1.5" fill="#DBE8FF" stroke="#B2C9FF" strokeWidth="0.5"
      transform="rotate(12 18 10)" />
    {/* back-left file */}
    <rect x="4" y="10" width="10" height="13" rx="1.5" fill="#DBE8FF" stroke="#B2C9FF" strokeWidth="0.5"
      transform="rotate(-12 4 10)" />
    {/* center file */}
    <rect x="10" y="7" width="12" height="16" rx="1.5" fill="#FFFFFF" stroke="#B2C9FF" strokeWidth="1" />
    <path d="M13 12h6M13 15h6M13 18h4" stroke="#B2C9FF" strokeWidth="1" strokeLinecap="round" />
    {/* upload arrow */}
    <circle cx="23" cy="23" r="5" fill="#2970FF" />
    <path d="M23 26v-6M20.5 22.5L23 20l2.5 2.5" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// SVG illustration for LG drop zone (96×64 stacked files)
const DropIconLg = () => (
  <svg width="96" height="64" viewBox="0 0 96 64" fill="none" aria-hidden="true">
    {/* right file — rotated 15deg */}
    <g transform="rotate(15 70 35)">
      <rect x="55" y="18" width="28" height="36" rx="3" fill="#DBE8FF" stroke="#B2C9FF" strokeWidth="1" />
      <path d="M61 28h16M61 34h16M61 40h10" stroke="#B2C9FF" strokeWidth="1.5" strokeLinecap="round" />
    </g>
    {/* left file — rotated -15deg */}
    <g transform="rotate(-15 26 35)">
      <rect x="13" y="18" width="28" height="36" rx="3" fill="#DBE8FF" stroke="#B2C9FF" strokeWidth="1" />
      <path d="M19 28h16M19 34h16M19 40h10" stroke="#B2C9FF" strokeWidth="1.5" strokeLinecap="round" />
    </g>
    {/* center file */}
    <rect x="30" y="8" width="36" height="48" rx="3" fill="#FFFFFF" stroke="#B2C9FF" strokeWidth="1.5" />
    <path d="M38 22h20M38 30h20M38 38h14" stroke="#B2C9FF" strokeWidth="1.5" strokeLinecap="round" />
    {/* upload arrow overlay */}
    <circle cx="76" cy="50" r="10" fill="#2970FF" />
    <path d="M76 55v-10M71 48l5-5 5 5" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─── Sub-components ───────────────────────────────────────────────────────────

interface UploadItemProps {
  file: UploadFile;
  size: UploadSize;
  onEdit?: (id: string) => void;
  onPreview?: (id: string) => void;
  onRemove?: (id: string) => void;
}

function UploadItem({ file, size, onEdit, onPreview, onRemove }: UploadItemProps) {
  const isLoading = file.state === 'loading' || file.indicator === 'loader';
  const showProgress = size === 'LG' && file.indicator !== 'loader';

  return (
    <div
      className={[
        styles.fileItem,
        size === 'LG' ? styles.fileItemLg : styles.fileItemMd,
      ].join(' ')}
    >
      {/* Badge */}
      <div className={styles.fileBadge}>
        <IconFile />
      </div>

      {/* Content */}
      <div className={styles.fileContent}>
        <div className={styles.fileHeader}>
          {/* Name + size */}
          <div className={styles.fileTexts}>
            <p className={styles.fileName}>{file.name}</p>
            <p className={styles.fileSize}>{file.size}</p>
          </div>

          {/* Actions or spinner */}
          {isLoading ? (
            <div className={styles.spinner} role="status" aria-label="Uploading…" />
          ) : (
            <div className={styles.actions}>
              <button
                className={styles.actionBtn}
                onClick={() => onEdit?.(file.id)}
                aria-label={`Edit ${file.name}`}
                type="button"
              >
                <IconPen />
              </button>
              <button
                className={styles.actionBtn}
                onClick={() => onPreview?.(file.id)}
                aria-label={`Preview ${file.name}`}
                type="button"
              >
                <IconEye />
              </button>
              <button
                className={styles.actionBtn}
                onClick={() => onRemove?.(file.id)}
                aria-label={`Remove ${file.name}`}
                type="button"
              >
                <IconTrash />
              </button>
            </div>
          )}
        </div>

        {/* Progress bar — LG only, not during loader */}
        {showProgress && (
          <div className={styles.progressRow}>
            <div className={styles.progressTrack}>
              <div
                className={styles.progressFill}
                style={{ width: `${Math.min(100, Math.max(0, file.progress))}%` }}
                role="progressbar"
                aria-valuenow={file.progress}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
            <p className={styles.progressLabel}>{file.progress}%</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Subtitle derivation ──────────────────────────────────────────────────────

function deriveSubtitle(accept?: string, maxSize?: number): string | null {
  const parts: string[] = [];

  if (accept) {
    const types = accept
      .split(',')
      .map((s) => s.trim().replace(/^\./, '').toUpperCase())
      .filter(Boolean);
    if (types.length) parts.push(types.join(', '));
  }

  if (maxSize != null) {
    const mb = maxSize / (1024 * 1024);
    const label =
      mb >= 1
        ? `${mb % 1 === 0 ? mb.toFixed(0) : mb.toFixed(1)} MB`
        : `${Math.round(maxSize / 1024)} KB`;
    parts.push(`Max ${label}`);
  }

  return parts.length ? parts.join(' – ') : null;
}

// ─── Main component ───────────────────────────────────────────────────────────

export function Upload({
  size = 'LG',
  type = 'multiple',
  status = 'default',
  files = [],
  onDrop,
  onSizeError,
  onRemove,
  onEdit,
  onPreview,
  accept,
  maxSize,
  subtitle,
  className,
}: UploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const filterFiles = (incoming: File[]) => {
    if (!maxSize) return { valid: incoming, rejected: [] as File[] };
    const valid: File[] = [];
    const rejected: File[] = [];
    for (const f of incoming) {
      (f.size <= maxSize ? valid : rejected).push(f);
    }
    return { valid, rejected };
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const { valid, rejected } = filterFiles(Array.from(e.dataTransfer.files));
    if (valid.length) onDrop?.(valid);
    if (rejected.length) onSizeError?.(rejected);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { valid, rejected } = filterFiles(Array.from(e.target.files ?? []));
    if (valid.length) onDrop?.(valid);
    if (rejected.length) onSizeError?.(rejected);
    // reset so same file can be re-selected
    e.target.value = '';
  };

  const openFilePicker = () => inputRef.current?.click();

  // LG single active / MD single active: hide drop zone when a file is loaded
  const hideDrop = type === 'single' && status === 'active' && files.length > 0;

  const dropzoneClass = [
    styles.dropzone,
    size === 'MD' ? styles.dropzoneMd : styles.dropzoneLg,
    dragging ? styles.dropzoneDragging : '',
  ]
    .filter(Boolean)
    .join(' ');

  const titleText =
    type === 'multiple' ? 'Drop your files here, or' : 'Drop your file here, or';

  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(' ')}>
      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        multiple={type === 'multiple'}
        accept={accept}
        onChange={handleInputChange}
        style={{ display: 'none' }}
        aria-hidden="true"
        tabIndex={-1}
      />

      {/* Drop zone */}
      {!hideDrop && (
        <div
          className={dropzoneClass}
          onClick={openFilePicker}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          role="button"
          tabIndex={0}
          aria-label={`${titleText} browse`}
          onKeyDown={(e) => {
            if (e.key === ' ' || e.key === 'Enter') openFilePicker();
          }}
        >
          {/* Icon */}
          {size === 'MD' ? (
            <div className={styles.dropzoneIconMd}>
              <DropIconMd />
            </div>
          ) : (
            <div className={styles.dropzoneIconLg}>
              <DropIconLg />
            </div>
          )}

          {/* Text content */}
          <div className={styles.dropzoneContent}>
            <div className={styles.dropzoneTitleRow}>
              <p className={styles.dropzoneTitle}>{titleText}</p>
              <span className={styles.dropzoneBrowse} aria-hidden="true">
                browse
              </span>
            </div>
            {(() => {
              const sub = subtitle ?? deriveSubtitle(accept, maxSize);
              return sub ? (
                <p className={styles.dropzoneSubtitle}>{sub}</p>
              ) : null;
            })()}
          </div>
        </div>
      )}

      {/* File list */}
      {status === 'active' && files.length > 0 && (
        <div className={styles.fileList}>
          {files.map((file) => (
            <UploadItem
              key={file.id}
              file={file}
              size={size}
              onEdit={onEdit}
              onPreview={onPreview}
              onRemove={onRemove}
            />
          ))}
        </div>
      )}
    </div>
  );
}
