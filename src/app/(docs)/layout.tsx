import type { ReactNode } from "react";

export default function DocsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="main-content">
      <article className="docs-content">{children}</article>
    </main>
  );
}
