"use client";

import { useEffect, useRef, useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CodeBlock(props: React.HTMLAttributes<HTMLPreElement>) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    const text = preRef.current?.textContent ?? "";
    if (!text) return;

    let success = false;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        success = true;
      }
    } catch {
      // Fallback below
    }

    if (!success) {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        success = true;
      } finally {
        document.body.removeChild(textarea);
      }
    }

    if (!success) return;

    setCopied(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setCopied(false);
      timeoutRef.current = null;
    }, 1500);
  };

  return (
    <div className="code-block-wrapper">
      <button
        type="button"
        className="code-copy-btn"
        onClick={handleCopy}
        title="Copy to clipboard"
        aria-label="Copy code to clipboard"
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>
      <pre ref={preRef} {...props} />
    </div>
  );
}
