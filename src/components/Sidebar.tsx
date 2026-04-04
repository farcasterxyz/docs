"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  PanelLeftClose,
  PanelLeftOpen,
  Sun,
  Moon,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import {
  SECTIONS,
  getSectionForPathname,
  isNavLink,
  isNavGroup,
  isLinkActive,
  hasActiveLink,
  type SidebarItem,
  type NavGroup,
} from "@/lib/nav-config";

function getInitialTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem("docs-theme");
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function SidebarGroup({
  group,
  pathname,
  depth,
}: {
  group: NavGroup;
  pathname: string;
  depth: number;
}) {
  const containsActive = hasActiveLink(group.items, pathname);
  const [open, setOpen] = useState(
    containsActive || !group.collapsed
  );

  useEffect(() => {
    if (containsActive && !open) setOpen(true);
  }, [containsActive, open]);

  return (
    <div className="sidebar-group" style={{ paddingLeft: depth > 0 ? 8 : 0 }}>
      <button
        className={`sidebar-group-toggle${open ? " open" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <ChevronRight
          size={12}
          className={`sidebar-chevron${open ? " sidebar-chevron--open" : ""}`}
        />
        <span>{group.text}</span>
      </button>
      {open && (
        <div className="sidebar-group-items">
          {group.items.map((item, i) => (
            <SidebarItemRenderer
              key={i}
              item={item}
              pathname={pathname}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function SidebarItemRenderer({
  item,
  pathname,
  depth,
}: {
  item: SidebarItem;
  pathname: string;
  depth: number;
}) {
  if (isNavLink(item)) {
    const isExternal = item.external || item.link.startsWith("http");
    const active = !isExternal && isLinkActive(pathname, item.link);
    if (isExternal) {
      return (
        <a
          href={item.link}
          className="sidebar-link sidebar-link--external"
          target="_blank"
          rel="noopener noreferrer"
        >
          {item.text}
          <ExternalLink size={11} style={{ marginLeft: 4, opacity: 0.4 }} />
        </a>
      );
    }
    return (
      <Link
        href={item.link}
        className={`sidebar-link${active ? " active" : ""}`}
      >
        {item.text}
      </Link>
    );
  }

  if (isNavGroup(item)) {
    return <SidebarGroup group={item} pathname={pathname} depth={depth} />;
  }

  return null;
}

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const section = getSectionForPathname(pathname);

  useEffect(() => {
    const initial = getInitialTheme();
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("docs-theme", next);
      return next;
    });
  }, []);

  if (!section) return null;

  return (
    <nav className={`sidebar${collapsed ? " sidebar--collapsed" : ""}`}>
      <div className="sidebar-header">
        <Link
          href={section.link}
          style={{ textDecoration: "none", color: "inherit" }}
          className="sidebar-logo"
        >
          {!collapsed && (
            <span className="sidebar-logo-text">{section.text}</span>
          )}
        </Link>
        <button
          className="sidebar-icon-btn"
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <PanelLeftOpen size={16} />
          ) : (
            <PanelLeftClose size={16} />
          )}
        </button>
      </div>

      {!collapsed && (
        <>
          <div className="sidebar-nav">
            {section.sidebar.map((item, i) => {
              if (isNavGroup(item) && !("collapsed" in item)) {
                // Top-level group rendered as a section
                return (
                  <div key={i} className="sidebar-section">
                    <div className="sidebar-section-title">{item.text}</div>
                    {item.items.map((child, j) => (
                      <SidebarItemRenderer
                        key={j}
                        item={child}
                        pathname={pathname}
                        depth={0}
                      />
                    ))}
                  </div>
                );
              }
              // Top-level links
              return (
                <div key={i} className="sidebar-section">
                  <SidebarItemRenderer
                    item={item}
                    pathname={pathname}
                    depth={0}
                  />
                </div>
              );
            })}
          </div>

          <div className="sidebar-footer">
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              aria-label={`Switch to ${
                theme === "light" ? "dark" : "light"
              } mode`}
            >
              {theme === "light" ? <Moon size={14} /> : <Sun size={14} />}
            </button>
          </div>
        </>
      )}
    </nav>
  );
}
