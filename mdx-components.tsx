import type { ReactNode, HTMLAttributes } from "react";
import type { MDXComponents } from "mdx/types";
import CodeBlock from "@/components/CodeBlock";
import Callout from "@/components/Callout";
import CodeGroup, { CodeGroupItem } from "@/components/CodeGroup";
import InteractiveGrid from "@/components/docs/InteractiveGrid";
import InteractiveButtonGroup from "@/components/docs/InteractiveButtonGroup";
import ConfettiDemo from "@/components/docs/ConfettiDemo";
import ElementPreview from "@/components/docs/ElementPreview";
import ColorSwatch, { ColorSwatchSingle } from "@/components/docs/ColorSwatch";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function extractText(children: ReactNode): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(extractText).join("");
  if (children && typeof children === "object" && "props" in children) {
    const props = (children as { props?: Record<string, unknown> }).props;
    if (props?.children) {
      return extractText(props.children as ReactNode);
    }
  }
  return "";
}

function Heading({
  level,
  children,
  ...props
}: {
  level: 1 | 2 | 3 | 4;
  children?: ReactNode;
} & HTMLAttributes<HTMLHeadingElement>) {
  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4";
  const text = extractText(children);
  const id = slugify(text);

  return (
    <Tag id={id} {...props}>
      <a href={`#${id}`} className="heading-anchor">
        {children}
      </a>
    </Tag>
  );
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h1: (props) => <Heading level={1} {...props} />,
    h2: (props) => <Heading level={2} {...props} />,
    h3: (props) => <Heading level={3} {...props} />,
    h4: (props) => <Heading level={4} {...props} />,
    pre: (props) => <CodeBlock {...props} />,
    Callout,
    CodeGroup,
    CodeGroupItem,
    InteractiveGrid,
    InteractiveButtonGroup,
    ConfettiDemo,
    ElementPreview,
    ColorSwatch,
    ColorSwatchSingle,
  };
}
