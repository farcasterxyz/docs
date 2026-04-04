import { readFileSync } from "fs";
import { join } from "path";
import { SECTIONS, type SidebarItem } from "./nav-config";

const DOCS_DIR = join(process.cwd(), "src/app/(docs)");

function sanitizeDocMarkdown(content: string): string {
  const cleanedLines: string[] = [];
  let inCodeFence = false;

  for (const line of content.split("\n")) {
    if (line.trimStart().startsWith("```")) {
      inCodeFence = !inCodeFence;
      cleanedLines.push(line);
      continue;
    }

    if (inCodeFence) {
      cleanedLines.push(line);
      continue;
    }

    // Replace interactive components with placeholder
    const withoutComponents = line.replace(
      /<([A-Z][A-Za-z0-9]*)[^>]*\/>/g,
      "[Interactive preview on docs site]"
    );
    // Strip palette grid divs
    const withoutPalette = withoutComponents.replace(
      /<div className="palette-grid">[\s\S]*?<\/div>/g,
      "[See color palette table on docs site]"
    );
    // Strip remaining HTML/JSX tags
    const withoutHtml = withoutPalette.replace(
      /<\/?([A-Za-z][A-Za-z0-9-]*)(\s[^>]*)?>/g,
      ""
    );

    cleanedLines.push(withoutHtml.trimEnd());
  }

  return cleanedLines
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function getAllSnapDocsMarkdown(): string {
  const snapSection = SECTIONS.find((s) => s.pathPrefix === "/snap");
  if (!snapSection) return "";

  const sections: string[] = [
    "# Farcaster Snap Documentation",
    "",
    "> This file aggregates all Farcaster Snap documentation for LLM consumption.",
    "> Source: https://docs.farcaster.xyz/snap",
    "",
  ];

  // Collect all page links from the sidebar
  function collectLinks(
    items: SidebarItem[]
  ): { text: string; link: string }[] {
    const links: { text: string; link: string }[] = [];
    for (const item of items) {
      if ("link" in item && !item.link.startsWith("http")) {
        links.push({ text: item.text, link: item.link });
      }
      if ("items" in item) {
        links.push(...collectLinks(item.items));
      }
    }
    return links;
  }

  const pages = collectLinks(snapSection.sidebar);

  for (const page of pages) {
    try {
      // /snap/building → snap/building/page.mdx
      const relativePath =
        page.link === "/snap/" || page.link === "/snap"
          ? "snap/page.mdx"
          : `snap/${page.link.replace("/snap/", "")}/page.mdx`;
      const content = readFileSync(join(DOCS_DIR, relativePath), "utf-8");
      sections.push(`---\n\n## ${page.text}\n\n${sanitizeDocMarkdown(content)}\n`);
    } catch {
      // Skip missing files
    }
  }

  return sections.join("\n");
}
