"use client";

export default function ColorSwatch({
  light,
  dark,
}: {
  light: string;
  dark: string;
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        gap: 4,
        alignItems: "center",
        verticalAlign: "middle",
      }}
    >
      <span
        title={`Light: ${light}`}
        style={{
          display: "inline-block",
          width: 24,
          height: 24,
          borderRadius: 6,
          background: light,
          border: "1px solid rgba(0,0,0,0.1)",
          verticalAlign: "middle",
          flexShrink: 0,
        }}
      />
      <span
        title={`Dark: ${dark}`}
        style={{
          display: "inline-block",
          width: 24,
          height: 24,
          borderRadius: 6,
          background: dark,
          border: "1px solid rgba(0,0,0,0.1)",
          verticalAlign: "middle",
          flexShrink: 0,
        }}
      />
    </span>
  );
}

export function ColorSwatchSingle({ hex }: { hex: string }) {
  return (
    <span
      title={hex}
      style={{
        display: "inline-block",
        width: 24,
        height: 24,
        borderRadius: 6,
        background: hex,
        border: "1px solid rgba(0,0,0,0.1)",
        verticalAlign: "middle",
      }}
    />
  );
}
