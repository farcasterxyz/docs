"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

const COLORS = [
  "#8B5CF6",
  "#EC4899",
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#06B6D4",
  "#F97316",
];

type Piece = {
  id: number;
  left: number;
  delay: number;
  duration: number;
  color: string;
  size: number;
  rotation: number;
  shape: "rect" | "circle";
  variant: number;
};

function makePieces(): Piece[] {
  return Array.from({ length: 60 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.8,
    duration: 2 + Math.random() * 1.5,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    size: 5 + Math.random() * 7,
    rotation: Math.random() * 360,
    shape: Math.random() > 0.5 ? "rect" : "circle",
    variant: i % 3,
  }));
}

export default function ConfettiDemo() {
  const [playing, setPlaying] = useState(true);
  const [pieces, setPieces] = useState<Piece[]>(() => makePieces());

  const replay = useCallback(() => {
    setPlaying(false);
    setPieces(makePieces());
    requestAnimationFrame(() => setPlaying(true));
  }, []);

  // Auto-play on mount
  useEffect(() => {
    setPlaying(true);
  }, []);

  return (
    <div
      style={{
        border: "1px solid var(--border)",
        borderRadius: 14,
        background: "var(--bg-surface)",
        overflow: "hidden",
        margin: "12px 0 16px",
        maxWidth: 380,
      }}
    >
      <div
        style={{
          position: "relative",
          padding: "24px 20px",
          minHeight: 160,
          overflow: "hidden",
        }}
      >
        {/* Confetti overlay */}
        {playing && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              overflow: "hidden",
              pointerEvents: "none",
              zIndex: 2,
            }}
          >
            {pieces.map((p) => (
              <div
                key={p.id}
                style={{
                  position: "absolute",
                  left: `${p.left}%`,
                  top: -10,
                  width: p.size,
                  height: p.shape === "circle" ? p.size : p.size * 0.5,
                  backgroundColor: p.color,
                  borderRadius: p.shape === "circle" ? "50%" : 2,
                  transform: `rotate(${p.rotation}deg)`,
                  animation: `confetti-demo-${p.variant} ${p.duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${p.delay}s forwards`,
                  opacity: 0,
                }}
              />
            ))}
          </div>
        )}

        {/* Snap content */}
        <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <div style={{ fontSize: 22, fontWeight: 700 }}>You won!</div>
          <div
            style={{
              fontSize: 15,
              color: "var(--text-secondary)",
              marginTop: 4,
            }}
          >
            Congratulations on completing the challenge!
          </div>
        </div>
      </div>

      <div
        style={{
          padding: "8px 20px 12px",
          borderTop: "1px solid var(--border)",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button
          type="button"
          onClick={replay}
          style={{
            padding: "6px 16px",
            borderRadius: 8,
            border: "1px solid var(--border)",
            background: "var(--bg-primary)",
            color: "var(--text-muted)",
            fontSize: 12,
            cursor: "pointer",
          }}
        >
          Replay confetti
        </button>
      </div>

      <style>{`
        @keyframes confetti-demo-0 {
          0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 1; }
          50% { opacity: 1; }
          100% { transform: translateY(200px) translateX(30px) rotate(540deg); opacity: 0; }
        }
        @keyframes confetti-demo-1 {
          0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 1; }
          50% { opacity: 1; }
          100% { transform: translateY(180px) translateX(-40px) rotate(720deg); opacity: 0; }
        }
        @keyframes confetti-demo-2 {
          0% { transform: translateY(0) translateX(0) rotate(0deg) scale(1); opacity: 1; }
          30% { opacity: 1; transform: translateY(60px) translateX(15px) rotate(200deg) scale(1.1); }
          100% { transform: translateY(200px) translateX(-20px) rotate(900deg) scale(0.6); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
