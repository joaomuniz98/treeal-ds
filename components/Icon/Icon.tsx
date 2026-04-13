import React from 'react';

export type IconSize = 20 | 24 | 40 | 48;
export type IconWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700;

export interface IconProps {
  /** Material Symbols icon name, e.g. "search", "home", "arrow_back" */
  name: string;
  /** Icon size in px. Defaults to 24. */
  size?: IconSize;
  /** Stroke weight. Defaults to 400. */
  weight?: IconWeight;
  /** Fill: 0 = outline, 1 = filled. Defaults to 0. */
  fill?: 0 | 1;
  /** Color via CSS currentColor. Apply color on the parent or pass className. */
  className?: string;
  style?: React.CSSProperties;
  'aria-label'?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
}

export function Icon({
  name,
  size = 24,
  weight = 400,
  fill = 0,
  className,
  style,
  'aria-label': ariaLabel,
  'aria-hidden': ariaHidden,
}: IconProps) {
  return (
    <span
      className={['material-symbols-outlined', className].filter(Boolean).join(' ')}
      style={{
        fontSize: size,
        '--icon-fill': fill,
        '--icon-weight': weight,
        '--icon-size': size,
        ...style,
      } as React.CSSProperties}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden ?? (ariaLabel ? undefined : true)}
    >
      {name}
    </span>
  );
}
