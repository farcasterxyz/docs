"use client";

import React, { useState } from "react";
import { Share } from "lucide-react";

const PALETTE: Record<string, string> = {
  gray: "#8F8F8F",
  blue: "#006BFF",
  red: "#FC0036",
  amber: "#FFAE00",
  green: "#28A948",
  teal: "#00AC96",
  purple: "#8B5CF6",
  pink: "#F32782",
};

function resolveAccent(accent?: string): string {
  if (!accent) return PALETTE.purple;
  return PALETTE[accent] ?? PALETTE.purple;
}

type SnapElement = {
  type: string;
  props: Record<string, unknown>;
  children?: string[];
  on?: Record<string, unknown>;
};

type SnapJson = {
  version?: string;
  theme?: { accent?: string };
  ui: {
    root: string;
    elements: Record<string, SnapElement>;
  };
};

function SnapText({
  content,
  size,
  weight,
  align,
}: {
  content: string;
  size?: string;
  weight?: string;
  align?: string;
}) {
  return (
    <div
      style={{
        fontSize: size === "sm" ? 13 : 15,
        fontWeight: weight === "bold" ? 700 : 400,
        textAlign: (align as "left" | "center" | "right") ?? "left",
        color: size === "sm" ? "var(--text-muted)" : "var(--text-primary)",
      }}
    >
      {content}
    </div>
  );
}

function SnapButton({
  label,
  variant,
  icon,
  accent,
}: {
  label: string;
  variant?: string;
  icon?: string;
  accent: string;
}) {
  const [pressed, setPressed] = useState(false);
  const isPrimary = variant === "primary";
  return (
    <button
      type="button"
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      onPointerCancel={() => setPressed(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        padding: "8px 16px",
        borderRadius: 10,
        border: isPrimary ? "none" : `1.5px solid ${accent}`,
        background: isPrimary ? accent : "transparent",
        color: isPrimary ? "#fff" : accent,
        fontWeight: 600,
        fontSize: 14,
        cursor: "pointer",
        lineHeight: "20px",
        flex: 1,
        transition: "opacity 0.1s, transform 0.1s",
        opacity: pressed ? 0.7 : 1,
        transform: pressed ? "scale(0.97)" : "scale(1)",
      }}
    >
      {icon === "share" && <Share size={14} />}
      {label}
    </button>
  );
}

function SnapInput({
  label,
  placeholder,
}: {
  label?: string;
  placeholder?: string;
}) {
  const id = React.useId();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {label && (
        <label htmlFor={id} style={{ fontSize: 13, fontWeight: 500, color: "var(--text-secondary)" }}>
          {label}
        </label>
      )}
      <input
        id={id}
        placeholder={placeholder ?? ""}
        style={{
          padding: "8px 12px",
          borderRadius: 8,
          border: "1px solid var(--border)",
          background: "var(--input-bg)",
          color: "var(--text-primary)",
          fontSize: 14,
          outline: "none",
          width: "100%",
        }}
      />
    </div>
  );
}

function SnapProgress({
  value,
  max,
  label,
  accent,
}: {
  value: number;
  max: number;
  label?: string;
  accent: string;
}) {
  const pct = (value / max) * 100;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {label && (
        <span style={{ fontSize: 13, fontWeight: 500, color: "var(--text-secondary)" }}>
          {label}
        </span>
      )}
      <div
        style={{
          height: 8,
          borderRadius: 4,
          background: "var(--border)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            borderRadius: 4,
            background: accent,
          }}
        />
      </div>
    </div>
  );
}

function SnapToggleGroup({
  options,
  accent,
  orientation = "horizontal",
}: {
  options: string[];
  accent: string;
  orientation?: string;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <div style={{ display: "flex", gap: 8, flexDirection: orientation === "vertical" ? "column" : "row" }}>
      {options.map((opt) => {
        const active = selected === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => setSelected(active ? null : opt)}
            style={{
              flex: 1,
              padding: "8px 12px",
              borderRadius: 10,
              border: `1.5px solid ${active ? accent : "var(--border)"}`,
              background: active ? `${accent}20` : "transparent",
              color: active ? accent : "var(--text-primary)",
              fontWeight: 600,
              fontSize: 13,
              cursor: "pointer",
              transition: "all 0.1s",
            }}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function SnapBadge({
  label,
  color,
  accent,
}: {
  label: string;
  color?: string;
  accent: string;
}) {
  const c = !color || color === "accent" ? accent : (PALETTE[color] ?? accent);
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "2px 8px",
        borderRadius: 99,
        fontSize: 12,
        fontWeight: 600,
        background: `${c}20`,
        color: c,
      }}
    >
      {label}
    </span>
  );
}

function RenderElement({
  id,
  elements,
  accent,
}: {
  id: string;
  elements: Record<string, SnapElement>;
  accent: string;
}) {
  const el = elements[id];
  if (!el) return null;

  const p = el.props;

  switch (el.type) {
    case "text":
      return (
        <SnapText
          content={p.content as string}
          size={p.size as string}
          weight={p.weight as string}
          align={p.align as string}
        />
      );
    case "button":
      return (
        <SnapButton
          label={p.label as string}
          variant={p.variant as string}
          icon={p.icon as string}
          accent={accent}
        />
      );
    case "input":
      return <SnapInput label={p.label as string} placeholder={p.placeholder as string} />;
    case "progress":
      return (
        <SnapProgress
          value={p.value as number}
          max={p.max as number}
          label={p.label as string}
          accent={accent}
        />
      );
    case "toggle_group":
      return (
        <SnapToggleGroup
          options={p.options as string[]}
          orientation={p.orientation as string}
          accent={accent}
        />
      );
    case "badge":
      return <SnapBadge label={p.label as string} color={p.color as string} accent={accent} />;
    case "stack": {
      const dir = (p.direction as string) ?? "vertical";
      const gap = { none: 0, sm: 6, md: 10, lg: 16 }[(p.gap as string) ?? "md"] ?? 10;
      return (
        <div
          style={{
            display: "flex",
            flexDirection: dir === "horizontal" ? "row" : "column",
            gap,
          }}
        >
          {el.children?.map((childId) => (
            <RenderElement key={childId} id={childId} elements={elements} accent={accent} />
          ))}
        </div>
      );
    }
    default:
      return null;
  }
}

export default function SnapPreview({ snap }: { snap: SnapJson }) {
  const accent = resolveAccent(snap.theme?.accent);
  const rootId = snap.ui.root;
  const elements = snap.ui.elements;

  return (
    <div
      style={{
        border: "1px solid var(--border)",
        borderRadius: 14,
        background: "var(--bg-surface)",
        padding: "16px 20px",
        margin: "12px 0 16px",
        maxWidth: 380,
      }}
    >
      <RenderElement id={rootId} elements={elements} accent={accent} />
    </div>
  );
}
