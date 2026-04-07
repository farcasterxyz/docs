import { getAllSnapDocsMarkdown } from "@/lib/snap-markdown";

export async function GET() {
  return new Response(getAllSnapDocsMarkdown(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
