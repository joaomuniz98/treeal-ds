import React from 'react';
import styles from './Header.module.css';

// ─── Types ────────────────────────────────────────────────────────────────────

export type HeaderVariant = 'Default' | 'Mobile' | 'MobileOpen';

export interface HeaderProps {
  variant?: HeaderVariant;
  /** Page / section title shown on the left */
  pageTitle?: string;
  /** Workspace display name (e.g. "Best Buy Eletronics") */
  workspaceName?: string;
  /** Workspace account label (defaults to "Conta Atual") */
  workspaceAccount?: string;
  /** Logged-in user display name */
  userName?: string;
  /** Logged-in user role / subtitle */
  userRole?: string;
  /** Avatar image URL — falls back to initials */
  userAvatar?: string;
  /** Called when the Mobile hamburger "Menu" button is clicked */
  onMenuToggle?: () => void;
  /** Called when the bell notification button is clicked */
  onNotifications?: () => void;
  /** Primary CTA in MobileOpen expanded panel */
  primaryAction?: { label: string; onClick: () => void };
  className?: string;
}

// ─── Inline SVG icons ─────────────────────────────────────────────────────────

function IconBell() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function IconMenu() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <line x1="4" y1="6"  x2="20" y2="6" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  );
}

function IconChevronDown() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function WorkspaceSwitcher({
  workspaceName = 'Workspace',
  workspaceAccount = 'Conta Atual',
  fullWidth = false,
}: {
  workspaceName?: string;
  workspaceAccount?: string;
  fullWidth?: boolean;
}) {
  return (
    <button
      type="button"
      className={[styles.workspace, fullWidth ? styles.workspaceFull : ''].filter(Boolean).join(' ')}
      aria-label={`Trocar workspace: ${workspaceName}`}
    >
      <div className={styles.workspaceLeft}>
        <span className={styles.statusDot} aria-hidden="true" />
        <div className={styles.workspaceCol}>
          <p className={styles.workspaceAccount}>{workspaceAccount}</p>
          <p className={styles.workspaceName}>{workspaceName}</p>
        </div>
      </div>
      <span className={styles.workspaceArrow}>
        <IconChevronDown />
      </span>
    </button>
  );
}

function UserInfo({
  userName,
  userRole,
  userAvatar,
}: {
  userName?: string;
  userRole?: string;
  userAvatar?: string;
}) {
  const initials = userName
    ? userName
        .split(' ')
        .slice(0, 2)
        .map((w) => w[0])
        .join('')
        .toUpperCase()
    : '?';

  return (
    <div className={styles.navUser}>
      <div className={styles.avatar}>
        {userAvatar ? (
          <img
            src={userAvatar}
            alt={userName ?? 'Avatar'}
            className={styles.avatarImg}
          />
        ) : (
          <span className={styles.avatarInitials}>{initials}</span>
        )}
      </div>
      {(userName || userRole) && (
        <div className={styles.userText}>
          {userName && <p className={styles.userName}>{userName}</p>}
          {userRole  && <p className={styles.userRole}>{userRole}</p>}
        </div>
      )}
    </div>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────

export function Header({
  variant = 'Default',
  pageTitle = 'Portal de Gestão',
  workspaceName,
  workspaceAccount,
  userName,
  userRole,
  userAvatar,
  onMenuToggle,
  onNotifications,
  primaryAction,
  className,
}: HeaderProps) {
  const isDefault    = variant === 'Default';
  const isMobile     = variant === 'Mobile';
  const isMobileOpen = variant === 'MobileOpen';

  const rootClass = [
    styles.header,
    isDefault    ? styles.variantDefault    : '',
    isMobile     ? styles.variantMobile     : '',
    isMobileOpen ? styles.variantMobileOpen : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <header className={rootClass}>
      {/* Page title — Default + Mobile only */}
      {!isMobileOpen && (
        <h1
          className={[
            styles.pageTitle,
            isDefault ? styles.pageTitleDesktop : styles.pageTitleMobile,
          ].join(' ')}
        >
          {pageTitle}
        </h1>
      )}

      {/* ── Default actions ─────────────────────────────────────────────── */}
      {isDefault && (
        <div className={styles.actions}>
          <WorkspaceSwitcher
            workspaceName={workspaceName}
            workspaceAccount={workspaceAccount}
          />
          <button
            type="button"
            className={styles.bellBtn}
            onClick={onNotifications}
            aria-label="Notificações"
          >
            <IconBell />
          </button>
          <UserInfo
            userName={userName}
            userRole={userRole}
            userAvatar={userAvatar}
          />
        </div>
      )}

      {/* ── Mobile actions ──────────────────────────────────────────────── */}
      {isMobile && (
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.bellBtn}
            onClick={onNotifications}
            aria-label="Notificações"
          >
            <IconBell />
          </button>
          <button
            type="button"
            className={styles.menuBtn}
            onClick={onMenuToggle}
            aria-label="Abrir menu"
            aria-expanded={false}
          >
            <span className={styles.menuIcon}>
              <IconMenu />
            </span>
            Menu
          </button>
        </div>
      )}

      {/* ── MobileOpen expanded panel ────────────────────────────────────── */}
      {isMobileOpen && (
        <div className={[styles.actions, styles.actionsMobileOpen].join(' ')}>
          {/* CTA */}
          {primaryAction && (
            <button
              type="button"
              className={styles.ctaBtn}
              onClick={primaryAction.onClick}
            >
              {primaryAction.label}
            </button>
          )}

          {/* Workspace + User */}
          <div className={styles.mainActions}>
            <WorkspaceSwitcher
              workspaceName={workspaceName}
              workspaceAccount={workspaceAccount}
              fullWidth
            />
            <UserInfo
              userName={userName}
              userRole={userRole}
              userAvatar={userAvatar}
            />
          </div>
        </div>
      )}
    </header>
  );
}
