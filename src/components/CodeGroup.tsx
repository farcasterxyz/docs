"use client";

import type { ReactNode } from "react";
import { useState, Children, isValidElement } from "react";

export function CodeGroupItem({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return <div data-label={label}>{children}</div>;
}

export default function CodeGroup({
  children,
}: {
  children: ReactNode;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const tabs: { label: string; content: ReactNode }[] = [];
  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.props) {
      const props = child.props as { label?: string; children?: ReactNode };
      tabs.push({
        label: props.label || "Tab",
        content: props.children,
      });
    }
  });

  if (tabs.length === 0) return <>{children}</>;

  return (
    <div className="code-group">
      <div className="code-group-tabs">
        {tabs.map((tab, i) => (
          <button
            key={i}
            type="button"
            className={`code-group-tab${i === activeIndex ? " active" : ""}`}
            onClick={() => setActiveIndex(i)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="code-group-content">{tabs[activeIndex]?.content}</div>
    </div>
  );
}
