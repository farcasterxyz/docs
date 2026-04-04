export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="main-content">
      <article className="docs-content">{children}</article>
    </main>
  );
}
