"use client";

import { useState } from "react";

const COLORS = ["#22C55E", "#6B7280", "#CA8A04", "#8B5CF6", "#006BFF"];

export default function InteractiveGrid() {
  const [tapped, setTapped] = useState<string | null>(null);

  const cells = [
    { r: 0, c: 0, color: "#22C55E", text: "C" },
    { r: 0, c: 1, color: "#6B7280", text: "R" },
    { r: 0, c: 2, color: "#22C55E", text: "A" },
    { r: 0, c: 3, color: "#CA8A04", text: "N" },
    { r: 0, c: 4, color: "#22C55E", text: "E" },
    { r: 1, c: 0, color: "#8B5CF6", text: "S" },
    { r: 1, c: 1, color: "#22C55E", text: "N" },
    { r: 1, c: 2, color: "#22C55E", text: "A" },
    { r: 1, c: 3, color: "#22C55E", text: "P" },
    { r: 1, c: 4, color: "#006BFF", text: "S" },
  ];

  const filledKeys = new Set(cells.map((c) => `${c.r},${c.c}`));

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 3,
        }}
      >
        {Array.from({ length: 3 * 5 }, (_, i) => {
          const r = Math.floor(i / 5);
          const c = i % 5;
          const key = `${r},${c}`;
          const cell = cells.find((x) => x.r === r && x.c === c);
          const isTapped = tapped === key;

          if (cell) {
            return (
              <div
                key={key}
                style={{
                  background: cell.color,
                  borderRadius: 4,
                  height: 36,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#fff",
                }}
              >
                {cell.text}
              </div>
            );
          }

          return (
            <div
              key={key}
              role="button"
              tabIndex={0}
              onClick={() => setTapped(isTapped ? null : key)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setTapped(isTapped ? null : key);
                }
              }}
              style={{
                background: "transparent",
                border: isTapped
                  ? "2px solid #8B5CF6"
                  : "1px solid var(--border)",
                borderRadius: 4,
                height: 36,
                cursor: "pointer",
                transition: "border-color 0.1s",
              }}
            />
          );
        })}
      </div>
      {tapped && (
        <div
          style={{
            marginTop: 6,
            fontSize: 11,
            color: "var(--text-faint)",
            fontFamily: "monospace",
          }}
        >
          Tapped: row {tapped.split(",")[0]}, col {tapped.split(",")[1]}
        </div>
      )}
    </div>
  );
}
