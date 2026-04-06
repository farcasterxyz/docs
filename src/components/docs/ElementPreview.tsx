"use client";

import React, { useState } from "react";
import {
  Star,
  Zap,
  Heart,
  ChevronRight,
  ArrowRight,
  Check,
  Share,
  Image as ImageIcon,
  Play,
} from "lucide-react";

const ACCENT = "#8B5CF6";
const ACCENT_BG = "rgba(139, 92, 246, 0.12)";

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

function resolveColor(color?: string): string {
  if (!color || color === "accent") return ACCENT;
  return PALETTE[color] ?? ACCENT;
}

function Card({ children }: { children: React.ReactNode }) {
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
      {children}
    </div>
  );
}

function BadgePreview({
  label = "New",
  variant = "default",
  color,
}: {
  label?: string;
  variant?: "default" | "outline";
  color?: string;
}) {
  const c = resolveColor(color);
  const isOutline = variant === "outline";
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "2px 8px",
        borderRadius: 99,
        fontSize: 12,
        fontWeight: 600,
        lineHeight: "18px",
        border: isOutline ? `1px solid ${c}` : "1px solid transparent",
        background: isOutline ? "transparent" : `${c}20`,
        color: c,
      }}
    >
      {label}
    </span>
  );
}

function ButtonPreview({
  label = "Button",
  variant = "secondary",
  icon,
  accent = ACCENT,
}: {
  label?: string;
  variant?: "primary" | "secondary";
  icon?: string;
  accent?: string;
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

function TextPreview({
  content = "Hello world",
  size = "md",
  weight = "normal",
  align = "left",
}: {
  content?: string;
  size?: "md" | "sm";
  weight?: "bold" | "normal";
  align?: "left" | "center" | "right";
}) {
  return (
    <div
      style={{
        fontSize: size === "sm" ? 13 : 15,
        fontWeight: weight === "bold" ? 700 : 400,
        textAlign: align,
        color: size === "sm" ? "var(--text-muted)" : "var(--text-primary)",
      }}
    >
      {content}
    </div>
  );
}

function InputPreview({
  label,
  placeholder = "Type here...",
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
        placeholder={placeholder}
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

function SliderPreview({
  label,
  min = 0,
  max = 100,
  defaultValue,
}: {
  label?: string;
  min?: number;
  max?: number;
  defaultValue?: number;
}) {
  const val = defaultValue ?? Math.round((min + max) / 2);
  const pct = ((val - min) / (max - min)) * 100;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {label && (
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--text-secondary)" }}>
          <span style={{ fontWeight: 500 }}>{label}</span>
          <span>{val}</span>
        </div>
      )}
      <div
        style={{
          position: "relative",
          height: 6,
          borderRadius: 3,
          background: "var(--border)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            width: `${pct}%`,
            borderRadius: 3,
            background: ACCENT,
          }}
        />
      </div>
    </div>
  );
}

function SwitchPreview({
  label,
  defaultChecked = false,
}: {
  label?: string;
  defaultChecked?: boolean;
}) {
  const [on, setOn] = useState(defaultChecked);
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      {label && <span style={{ fontSize: 14, color: "var(--text-primary)" }}>{label}</span>}
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label={label ?? "Toggle"}
        onClick={() => setOn(!on)}
        style={{
          width: 42,
          height: 24,
          borderRadius: 12,
          border: "none",
          background: on ? ACCENT : "var(--border)",
          cursor: "pointer",
          position: "relative",
          transition: "background 0.15s",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 2,
            left: on ? 20 : 2,
            width: 20,
            height: 20,
            borderRadius: 10,
            background: "#fff",
            transition: "left 0.15s",
            boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
          }}
        />
      </button>
    </div>
  );
}

function ToggleGroupPreview({
  options = ["Option A", "Option B"],
  defaultValue,
}: {
  options?: string[];
  defaultValue?: string;
}) {
  const [selected, setSelected] = useState<string | null>(defaultValue ?? null);
  return (
    <div style={{ display: "flex", gap: 8 }}>
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
              border: `1.5px solid ${active ? ACCENT : "var(--border)"}`,
              background: active ? ACCENT_BG : "var(--input-bg, transparent)",
              color: active ? ACCENT : "var(--text-primary)",
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

function ProgressPreview({
  value = 65,
  max = 100,
  label,
}: {
  value?: number;
  max?: number;
  label?: string;
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
            background: ACCENT,
            transition: "width 0.3s",
          }}
        />
      </div>
    </div>
  );
}

function SeparatorPreview() {
  return (
    <hr
      style={{
        border: "none",
        borderTop: "1px solid var(--border)",
        margin: "4px 0",
      }}
    />
  );
}

function IconPreview() {
  const icons = [
    { Icon: ArrowRight, name: "arrow-right" },
    { Icon: Check, name: "check" },
    { Icon: Heart, name: "heart" },
    { Icon: Star, name: "star" },
    { Icon: Zap, name: "zap" },
    { Icon: Share, name: "share" },
    { Icon: Play, name: "play" },
    { Icon: ChevronRight, name: "chevron-right" },
  ];
  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
      {icons.map(({ Icon, name }) => (
        <div
          key={name}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
          }}
        >
          <Icon size={20} color={ACCENT} />
          <span style={{ fontSize: 10, color: "var(--text-muted)" }}>{name}</span>
        </div>
      ))}
    </div>
  );
}

function ImagePreview({ aspect = "16:9" }: { aspect?: string }) {
  const ratioMap: Record<string, number> = {
    "1:1": 1,
    "16:9": 9 / 16,
    "4:3": 3 / 4,
    "9:16": 16 / 9,
  };
  const ratio = ratioMap[aspect] ?? 9 / 16;
  return (
    <div
      style={{
        width: "100%",
        paddingBottom: `${ratio * 100}%`,
        borderRadius: 8,
        background: "var(--bg-hover)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--text-muted)",
        }}
      >
        <ImageIcon size={32} strokeWidth={1.5} />
      </div>
    </div>
  );
}

function ItemPreview({
  title = "Item title",
  description,
  children,
}: {
  title?: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text-primary)" }}>{title}</div>
        {description && (
          <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 2 }}>{description}</div>
        )}
      </div>
      {children && <div style={{ flexShrink: 0 }}>{children}</div>}
    </div>
  );
}

function ItemGroupPreview() {
  const items = [
    { title: "First place", description: "Alice" },
    { title: "Second place", description: "Bob" },
    { title: "Third place", description: "Charlie" },
  ];
  return (
    <div
      style={{
        border: "1px solid var(--border)",
        borderRadius: 10,
        overflow: "hidden",
      }}
    >
      {items.map((item, i) => (
        <div
          key={item.title}
          style={{
            padding: "10px 14px",
            borderTop: i > 0 ? "1px solid var(--border)" : "none",
          }}
        >
          <ItemPreview title={item.title} description={item.description} />
        </div>
      ))}
    </div>
  );
}

function StackPreview() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div
        style={{
          padding: "8px 12px",
          borderRadius: 6,
          background: "var(--bg-hover)",
          fontSize: 13,
          color: "var(--text-muted)",
          textAlign: "center",
        }}
      >
        Child 1
      </div>
      <div
        style={{
          padding: "8px 12px",
          borderRadius: 6,
          background: "var(--bg-hover)",
          fontSize: 13,
          color: "var(--text-muted)",
          textAlign: "center",
        }}
      >
        Child 2
      </div>
      <div
        style={{
          padding: "8px 12px",
          borderRadius: 6,
          background: "var(--bg-hover)",
          fontSize: 13,
          color: "var(--text-muted)",
          textAlign: "center",
        }}
      >
        Child 3
      </div>
    </div>
  );
}

type ElementType =
  | "badge"
  | "button"
  | "icon"
  | "image"
  | "item"
  | "item_group"
  | "progress"
  | "separator"
  | "stack"
  | "text"
  | "input"
  | "slider"
  | "switch"
  | "toggle_group";

export default function ElementPreview({
  type,
  props = {},
}: {
  type: ElementType;
  props?: Record<string, unknown>;
}) {
  function renderElement() {
    switch (type) {
      case "badge":
        return (
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <BadgePreview label="New" />
            <BadgePreview label="Live" color="green" />
            <BadgePreview label="ERC-20" variant="outline" color="blue" />
          </div>
        );
      case "button":
        return (
          <div style={{ display: "flex", gap: 8 }}>
            <ButtonPreview label="Submit" variant="primary" />
            <ButtonPreview label="Open" variant="secondary" />
          </div>
        );
      case "icon":
        return <IconPreview />;
      case "image":
        return <ImagePreview aspect={props.aspect as string} />;
      case "item":
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <ItemPreview title="Engagement Score" description="Based on 24h activity">
              <BadgePreview label="92" color="green" />
            </ItemPreview>
            <ItemPreview title="Settings">
              <ChevronRight size={16} color="var(--text-muted)" />
            </ItemPreview>
          </div>
        );
      case "item_group":
        return <ItemGroupPreview />;
      case "progress":
        return <ProgressPreview value={65} max={100} label="Upload progress" />;
      case "separator":
        return (
          <div>
            <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 6 }}>Section A</div>
            <SeparatorPreview />
            <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 6 }}>Section B</div>
          </div>
        );
      case "stack":
        return <StackPreview />;
      case "text":
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <TextPreview content="Welcome to Snaps" weight="bold" />
            <TextPreview content="Last updated 2 hours ago" size="sm" />
          </div>
        );
      case "input":
        return <InputPreview label="Email" placeholder="you@example.com" />;
      case "slider":
        return <SliderPreview label="Rating (1-10)" min={1} max={10} defaultValue={7} />;
      case "switch":
        return <SwitchPreview label="Enable notifications" />;
      case "toggle_group":
        return <ToggleGroupPreview options={["Free", "Pro", "Team"]} />;
      default:
        return null;
    }
  }

  return <Card>{renderElement()}</Card>;
}

// Also export sub-components for flexible composition
export {
  BadgePreview,
  ButtonPreview,
  TextPreview,
  InputPreview,
  SliderPreview,
  SwitchPreview,
  ToggleGroupPreview,
  ProgressPreview,
  SeparatorPreview,
  IconPreview,
  ImagePreview,
  ItemPreview,
  ItemGroupPreview,
  StackPreview,
  Card,
};
