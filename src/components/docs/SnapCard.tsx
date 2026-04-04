"use client";

export default function SnapCard({
  children,
  valid = true,
}: {
  children: React.ReactNode;
  valid?: boolean;
}) {
  return (
    <div
      style={{
        border: `1px solid ${valid ? "var(--border)" : "var(--log-error-border)"}`,
        borderRadius: 14,
        background: "var(--bg-surface)",
        padding: "16px 20px",
        margin: "12px 0 16px",
        maxWidth: 380,
      }}
    >
      {children}
      {!valid && (
        <div
          style={{
            marginTop: 12,
            padding: "6px 10px",
            borderRadius: 6,
            background: "var(--log-error-bg)",
            color: "var(--log-error-color)",
            fontSize: 11,
            fontWeight: 600,
          }}
        >
          VALIDATION ERROR
        </div>
      )}
    </div>
  );
}
