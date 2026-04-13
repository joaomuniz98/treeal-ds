import React, { useState } from 'react';
import styles from './Nav.module.css';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface NavSubItem {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
  /** Sub-items — renders an expandable accordion below this item */
  children?: NavSubItem[];
}

export interface NavSection {
  title?: string;
  items: NavItem[];
}

export interface NavMobileFooter {
  userName?: string;
  userRole?: string;
  userAvatarUrl?: string;
  userInitials?: string;
  onLogout?: () => void;
  logoutLabel?: string;
}

export interface NavProps {
  /** Visual type of the nav */
  type: 'open' | 'closed' | 'mobile';
  /** Navigation sections with items */
  sections: NavSection[];
  /** Currently active item id */
  activeId?: string;
  /** Called when an item is clicked (receives item.id) */
  onItemClick?: (id: string) => void;
  /** Called when collapse/expand button is clicked (Open/Closed only) */
  onCollapseToggle?: () => void;
  /** Bell icon click handler (Mobile only) */
  onBellClick?: () => void;
  /** Mobile header title (defaults to "Menu") */
  mobileTitle?: string;
  /** Mobile footer data */
  mobileFooter?: NavMobileFooter;
  /** Logo for the Open type (full logo) */
  logo?: React.ReactNode;
  /** Small logo icon shown in Closed + Mobile headers */
  logoIcon?: React.ReactNode;
  /** Controlled set of expanded accordion item ids */
  expandedIds?: string[];
  /** Called when an accordion item is toggled — use with expandedIds for controlled mode */
  onExpandChange?: (ids: string[]) => void;
  className?: string;
}

// ─── Inline SVG icons ─────────────────────────────────────────────────────────

function IconChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M6 12l4-4-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconChevronLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M13 15l-5-5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconChevronRight20() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M7 15l5-5-5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconBell() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function IconMenu() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function IconLogoutArrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 7h6M8.5 4.5L11 7l-2.5 2.5" />
    </svg>
  );
}

function DefaultLogoIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect width="32" height="32" rx="6" fill="#0F6C13" />
      <path d="M8 24 L16 8 L24 24" stroke="#E7DA10" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 19h10" stroke="#E7DA10" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function NavItemOpen({
  item,
  isActive,
  isExpanded,
  activeSubId,
  onClick,
  onSubClick,
}: {
  item: NavItem;
  isActive: boolean;
  isExpanded: boolean;
  activeSubId?: string;
  onClick: () => void;
  onSubClick?: (id: string) => void;
}) {
  const hasChildren = (item.children?.length ?? 0) > 0;
  const highlighted = isActive || isExpanded;

  const itemClass = [
    styles.item,
    styles.itemOpen,
    highlighted ? styles.itemOpenActive : '',
  ].filter(Boolean).join(' ');

  const labelClass = [
    styles.itemLabel,
    highlighted ? styles.itemLabelActive : styles.itemLabelDefault,
  ].join(' ');

  const inner = (
    <>
      <span className={[styles.itemIcon, styles.itemIconDark].join(' ')}>{item.icon}</span>
      <span className={labelClass}>{item.label}</span>
      {hasChildren && (
        <span className={[styles.chevron, isExpanded ? styles.chevronOpen : ''].filter(Boolean).join(' ')}>
          <IconChevronRight />
        </span>
      )}
    </>
  );

  return (
    <div>
      {item.href && !hasChildren ? (
        <a
          href={item.href}
          className={itemClass}
          aria-current={isActive ? 'page' : undefined}
        >
          {inner}
        </a>
      ) : (
        <button
          type="button"
          className={itemClass}
          onClick={onClick}
          aria-current={isActive ? 'page' : undefined}
          aria-expanded={hasChildren ? isExpanded : undefined}
        >
          {inner}
        </button>
      )}
      {hasChildren && (
        <div className={[styles.subItems, isExpanded ? styles.subItemsVisible : ''].filter(Boolean).join(' ')}>
          {item.children!.map((child) => (
            child.href ? (
              <a
                key={child.id}
                href={child.href}
                className={[styles.subItem, child.id === activeSubId ? styles.subItemActive : ''].filter(Boolean).join(' ')}
              >
                {child.label}
              </a>
            ) : (
              <button
                key={child.id}
                type="button"
                className={[styles.subItem, child.id === activeSubId ? styles.subItemActive : ''].filter(Boolean).join(' ')}
                onClick={() => { child.onClick?.(); onSubClick?.(child.id); }}
              >
                {child.label}
              </button>
            )
          ))}
        </div>
      )}
    </div>
  );
}

function NavItemClosed({
  item,
  isActive,
  onClick,
}: {
  item: NavItem;
  isActive: boolean;
  onClick: () => void;
}) {
  const itemClass = [
    styles.item,
    styles.itemClosed,
    isActive ? styles.itemClosedActive : '',
  ]
    .filter(Boolean)
    .join(' ');

  const inner = (
    <span className={[styles.itemIcon, styles.itemIconDark].join(' ')}>
      {item.icon}
    </span>
  );

  if (item.href) {
    return (
      <a
        href={item.href}
        className={itemClass}
        aria-label={item.label}
        aria-current={isActive ? 'page' : undefined}
        title={item.label}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={itemClass}
      onClick={onClick}
      aria-label={item.label}
      aria-current={isActive ? 'page' : undefined}
      title={item.label}
    >
      {inner}
    </button>
  );
}

function NavItemMobile({
  item,
  isActive,
  isExpanded,
  activeSubId,
  onClick,
  onSubClick,
}: {
  item: NavItem;
  isActive: boolean;
  isExpanded: boolean;
  activeSubId?: string;
  onClick: () => void;
  onSubClick?: (id: string) => void;
}) {
  const hasChildren = (item.children?.length ?? 0) > 0;
  const highlighted = isActive || isExpanded;

  const itemClass = [
    styles.item,
    styles.itemMobile,
    highlighted ? styles.itemMobileActive : '',
  ].filter(Boolean).join(' ');

  const labelClass = [
    styles.itemLabel,
    highlighted ? styles.itemLabelActive : styles.itemLabelDefault,
  ].join(' ');

  const mobileInner = (
    <>
      <span className={[styles.itemIcon, styles.itemIconDark].join(' ')}>{item.icon}</span>
      <span className={labelClass}>{item.label}</span>
      {hasChildren && (
        <span className={[styles.chevron, isExpanded ? styles.chevronOpen : ''].filter(Boolean).join(' ')}>
          <IconChevronRight />
        </span>
      )}
    </>
  );

  return (
    <div>
      {item.href && !hasChildren ? (
        <a href={item.href} className={itemClass} aria-current={isActive ? 'page' : undefined}>
          {mobileInner}
        </a>
      ) : (
        <button
          type="button"
          className={itemClass}
          onClick={onClick}
          aria-current={isActive ? 'page' : undefined}
          aria-expanded={hasChildren ? isExpanded : undefined}
        >
          {mobileInner}
        </button>
      )}
      {hasChildren && (
        <div className={[styles.subItems, styles.subItemsMobile, isExpanded ? styles.subItemsVisible : ''].filter(Boolean).join(' ')}>
          {item.children!.map((child) => (
            child.href ? (
              <a
                key={child.id}
                href={child.href}
                className={[styles.subItem, styles.subItemMobile, child.id === activeSubId ? styles.subItemActive : ''].filter(Boolean).join(' ')}
              >
                {child.label}
              </a>
            ) : (
              <button
                key={child.id}
                type="button"
                className={[styles.subItem, styles.subItemMobile, child.id === activeSubId ? styles.subItemActive : ''].filter(Boolean).join(' ')}
                onClick={() => { child.onClick?.(); onSubClick?.(child.id); }}
              >
                {child.label}
              </button>
            )
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function Nav({
  type,
  sections,
  activeId,
  onItemClick,
  onCollapseToggle,
  onBellClick,
  mobileTitle = 'Menu',
  mobileFooter,
  logo,
  logoIcon,
  expandedIds: expandedIdsProp,
  onExpandChange,
  className,
}: NavProps) {
  const resolvedLogoIcon = logoIcon ?? <DefaultLogoIcon />;
  const isControlled = expandedIdsProp !== undefined;
  const [internalExpanded, setInternalExpanded] = useState<Set<string>>(new Set());
  const expandedIds = isControlled ? new Set(expandedIdsProp) : internalExpanded;

  const toggleExpand = (id: string) => {
    const next = new Set(expandedIds);
    next.has(id) ? next.delete(id) : next.add(id);
    if (!isControlled) setInternalExpanded(next);
    onExpandChange?.(Array.from(next));
  };

  const handleItemClick = (item: NavItem) => {
    if (item.children?.length) {
      toggleExpand(item.id);
    } else {
      onItemClick?.(item.id);
    }
  };

  const navClass = [
    styles.nav,
    type === 'open' ? styles.navOpen : '',
    type === 'closed' ? styles.navClosed : '',
    type === 'mobile' ? styles.navMobile : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // ── Open ──────────────────────────────────────────────────────────────────
  if (type === 'open') {
    return (
      <nav className={navClass} aria-label="Main navigation">
        {/* Header */}
        <div className={[styles.header, styles.headerOpen].join(' ')}>
          {logo
            ? <div className={styles.logoFull}>{logo}</div>
            : <div className={styles.logoIcon}>{resolvedLogoIcon}</div>
          }
        </div>

        {/* Links */}
        <div className={[styles.links, styles.linksOpen].join(' ')}>
          {sections.map((section, si) => (
            <div key={si} className={styles.section}>
              {section.title && (
                <p className={styles.sectionTitle}>{section.title}</p>
              )}
              <div className={styles.sectionItems}>
                {section.items.map((item) => (
                  <NavItemOpen
                    key={item.id}
                    item={item}
                    isActive={item.id === activeId}
                    isExpanded={expandedIds.has(item.id)}
                    activeSubId={activeId}
                    onClick={() => handleItemClick(item)}
                    onSubClick={(id) => onItemClick?.(id)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer: collapse */}
        <div className={styles.footer}>
          <button
            type="button"
            className={styles.collapseBtn}
            onClick={onCollapseToggle}
          >
            <span className={styles.collapseBtnIcon}>
              <IconChevronLeft />
            </span>
            Recolher menu
          </button>
        </div>
      </nav>
    );
  }

  // ── Closed ────────────────────────────────────────────────────────────────
  if (type === 'closed') {
    return (
      <nav className={navClass} aria-label="Main navigation">
        {/* Header */}
        <div className={[styles.header, styles.headerClosed].join(' ')}>
          <div className={styles.logoIcon}>{resolvedLogoIcon}</div>
        </div>

        {/* Links */}
        <div className={[styles.links, styles.linksClosed].join(' ')}>
          {sections.map((section, si) => (
            <div key={si} className={styles.section}>
              <div className={styles.sectionItems}>
                {section.items.map((item) => (
                  <NavItemClosed
                    key={item.id}
                    item={item}
                    isActive={item.id === activeId}
                    onClick={() => onItemClick?.(item.id)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer: expand */}
        <div className={styles.footer}>
          <button
            type="button"
            className={[styles.collapseBtn, styles.collapseBtnClosed].join(' ')}
            onClick={onCollapseToggle}
            aria-label="Expand menu"
            title="Expandir menu"
          >
            <span className={styles.collapseBtnIcon}>
              <IconChevronRight20 />
            </span>
          </button>
        </div>
      </nav>
    );
  }

  // ── Mobile ────────────────────────────────────────────────────────────────
  return (
    <nav className={navClass} aria-label="Main navigation">
      {/* Header: logo left | bell + hamburger right */}
      <div className={[styles.header, styles.headerMobile].join(' ')}>
        <div className={styles.logoIcon}>{resolvedLogoIcon}</div>
        <div className={styles.headerActions}>
          <button
            type="button"
            className={styles.bellBtn}
            onClick={onBellClick}
            aria-label="Notificações"
          >
            <IconBell />
          </button>
          <button
            type="button"
            className={styles.menuBtn}
            onClick={onCollapseToggle}
            aria-label="Fechar menu"
          >
            <IconMenu />
            <span className={styles.menuBtnLabel}>{mobileTitle}</span>
          </button>
        </div>
      </div>

      {/* Links */}
      <div className={[styles.links, styles.linksMobile].join(' ')}>
        {sections.map((section, si) => (
          <div key={si} className={styles.section}>
            {section.title && (
              <p className={styles.sectionTitle} style={{ padding: '0 16px 8px' }}>{section.title}</p>
            )}
            <div className={styles.sectionItems}>
              {section.items.map((item) => (
                <NavItemMobile
                  key={item.id}
                  item={item}
                  isActive={item.id === activeId}
                  isExpanded={expandedIds.has(item.id)}
                  activeSubId={activeId}
                  onClick={() => handleItemClick(item)}
                  onSubClick={(id) => onItemClick?.(id)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer: avatar + logout */}
      {mobileFooter && (
        <div className={styles.footerMobile}>
          {(mobileFooter.userName || mobileFooter.userInitials) && (
            <div className={styles.avatarRow}>
              <div className={styles.avatar}>
                {mobileFooter.userAvatarUrl ? (
                  <img
                    src={mobileFooter.userAvatarUrl}
                    alt={mobileFooter.userName ?? ''}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <span className={styles.avatarInitials}>
                    {mobileFooter.userInitials ?? '?'}
                  </span>
                )}
              </div>
              <div className={styles.avatarInfo}>
                {mobileFooter.userName && (
                  <span className={styles.avatarName}>{mobileFooter.userName}</span>
                )}
                {mobileFooter.userRole && (
                  <span className={styles.avatarRole}>{mobileFooter.userRole}</span>
                )}
              </div>
            </div>
          )}

          {mobileFooter.onLogout && (
            <button
              type="button"
              className={styles.logoutBtn}
              onClick={mobileFooter.onLogout}
            >
              {mobileFooter.logoutLabel ?? 'Sair'}
              <span className={styles.logoutCircle}>
                <IconLogoutArrow />
              </span>
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
