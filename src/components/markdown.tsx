import ReactMarkdown, { type Options } from "react-markdown";

import { cn } from "@/lib/utils";

type MarkdownProps = {
  children: string;
} & Omit<Options, "children" | "components">;

const components: Options["components"] = {
  p: ({ node: _node, className, ...props }) => (
    <p className={cn("leading-relaxed not-last:mb-3", className)} {...props} />
  ),
  strong: ({ node: _node, className, ...props }) => (
    <strong className={cn("font-semibold text-foreground", className)} {...props} />
  ),
  em: ({ node: _node, className, ...props }) => (
    <em className={cn("italic", className)} {...props} />
  ),
  a: ({ node: _node, className, ...props }) => (
    <a
      className={cn(
        "text-primary underline underline-offset-4 hover:no-underline",
        className,
      )}
      target="_blank"
      rel="noreferrer noopener"
      {...props}
    />
  ),
  ul: ({ node: _node, className, ...props }) => (
    <ul className={cn("my-2 list-disc pl-5 space-y-1", className)} {...props} />
  ),
  ol: ({ node: _node, className, ...props }) => (
    <ol className={cn("my-2 list-decimal pl-5 space-y-1", className)} {...props} />
  ),
  li: ({ node: _node, className, ...props }) => (
    <li className={cn("leading-relaxed", className)} {...props} />
  ),
  code: ({ node: _node, className, ...props }) => (
    <code
      className={cn(
        "rounded bg-muted px-1 py-0.5",
        className,
      )}
      {...props}
    />
  ),
  pre: ({ node: _node, className, ...props }) => (
    <pre
      className={cn(
        "my-3 overflow-x-auto rounded-md bg-muted p-3",
        className,
      )}
      {...props}
    />
  ),
  blockquote: ({ node: _node, className, ...props }) => (
    <blockquote
      className={cn(
        "my-3 border-l-2 border-border pl-3 text-muted-foreground",
        className,
      )}
      {...props}
    />
  ),
  h1: ({ node: _node, className, ...props }) => (
    <h1 className={cn("mt-4 mb-2 text-xl font-semibold", className)} {...props} />
  ),
  h2: ({ node: _node, className, ...props }) => (
    <h2 className={cn("mt-4 mb-2 text-lg font-semibold", className)} {...props} />
  ),
  h3: ({ node: _node, className, ...props }) => (
    <h3 className={cn("mt-3 mb-2 text-base font-semibold", className)} {...props} />
  ),
  hr: ({ node: _node, className, ...props }) => (
    <hr className={cn("my-4 border-border", className)} {...props} />
  ),
};

export function Markdown({ children, ...rest }: MarkdownProps) {
  return (
      <ReactMarkdown components={components} {...rest}>
        {children}
      </ReactMarkdown>
  );
}
