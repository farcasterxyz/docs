import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  outputFileTracingIncludes: {
    "/snap/llms.txt": ["./src/app/(docs)/snap/**/page.mdx"],
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
  },
});

export default withMDX(nextConfig);
