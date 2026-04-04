"use client";

import { useState } from "react";

export default function InteractiveButtonGroup({
  options = ["Tabs", "Spaces"],
}: {
  options?: string[];
}) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ display: "flex", gap: 8 }}>
      {options.map((opt) => {
        const isSelected = selected === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => setSelected(isSelected ? null : opt)}
            style={{
              flex: 1,
              padding: "10px 12px",
              borderRadius: 10,
              border: `1px solid ${isSelected ? "#8B5CF6" : "var(--border)"}`,
              background: isSelected ? "rgba(139,92,246,0.12)" : "var(--input-bg, #fff)",
              color: isSelected ? "#8B5CF6" : "var(--text-primary)",
              fontWeight: 600,
              fontSize: 14,
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
