import type { ReactNode } from "react";

export default function SnapLayout({ children }: { children: ReactNode }) {

  return (
    <>
      <a href="/snap/llms.txt" className="docs-llms-link">
        llms.txt
      </a>
      {children}
    </>
  );
}
