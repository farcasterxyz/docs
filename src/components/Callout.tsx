import { Info, AlertTriangle, Lightbulb, AlertCircle } from "lucide-react";

const CALLOUT_STYLES: Record<
  string,
  { icon: React.ReactNode; borderColor: string; bg: string; titleColor: string }
> = {
  info: {
    icon: <Info size={16} />,
    borderColor: "#3b82f6",
    bg: "var(--callout-info-bg, rgba(59, 130, 246, 0.08))",
    titleColor: "#3b82f6",
  },
  tip: {
    icon: <Lightbulb size={16} />,
    borderColor: "var(--accent)",
    bg: "var(--callout-tip-bg, rgba(124, 58, 237, 0.08))",
    titleColor: "var(--accent)",
  },
  warning: {
    icon: <AlertTriangle size={16} />,
    borderColor: "#f59e0b",
    bg: "var(--callout-warning-bg, rgba(245, 158, 11, 0.08))",
    titleColor: "#f59e0b",
  },
  danger: {
    icon: <AlertCircle size={16} />,
    borderColor: "#ef4444",
    bg: "var(--callout-danger-bg, rgba(239, 68, 68, 0.08))",
    titleColor: "#ef4444",
  },
};

export default function Callout({
  type = "info",
  title,
  children,
}: {
  type?: "info" | "tip" | "warning" | "danger";
  title?: string;
  children: React.ReactNode;
}) {
  const style = CALLOUT_STYLES[type] || CALLOUT_STYLES.info;

  return (
    <div
      className="callout"
      style={{
        borderLeft: `3px solid ${style.borderColor}`,
        background: style.bg,
        borderRadius: "0 8px 8px 0",
        padding: "12px 16px",
        margin: "16px 0",
      }}
    >
      {title && (
        <div
          className="callout-title"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontWeight: 600,
            fontSize: 14,
            color: style.titleColor,
            marginBottom: 6,
          }}
        >
          {style.icon}
          {title}
        </div>
      )}
      <div className="callout-content" style={{ fontSize: 14 }}>
        {children}
      </div>
    </div>
  );
}
