"use client";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';

interface MarkdownRendererProps {
  content: string;
}

// Adjusted custom components for the new dark theme
const customComponents: Components = {
  h1: ({node, ...props}) => <h1 className="text-3xl md:text-4xl font-bold mt-6 mb-4 pb-2 border-b border-primary/50" {...props} />,
  h2: ({node, ...props}) => <h2 className="text-2xl md:text-3xl font-semibold mt-8 mb-4 pb-2 border-b border-border/70" {...props} />,
  h3: ({node, ...props}) => <h3 className="text-xl md:text-2xl font-semibold mt-6 mb-3 text-primary" {...props} />,
  h4: ({node, ...props}) => <h4 className="text-lg md:text-xl font-semibold mt-4 mb-2 text-primary/90" {...props} />,
  p: ({node, ...props}) => <p className="mb-4 leading-relaxed text-foreground/80" {...props} />,
  ul: ({node, ...props}) => <ul className="list-disc list-inside mb-4 pl-5 space-y-1.5 text-foreground/80" {...props} />,
  ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-4 pl-5 space-y-1.5 text-foreground/80" {...props} />,
  li: ({node, ...props}) => <li className="mb-1" {...props} />,
  a: ({node, ...props}) => <a className="text-accent hover:underline hover:text-accent/80" target="_blank" rel="noopener noreferrer" {...props} />,
  blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-accent pl-4 italic my-4 text-muted-foreground" {...props} />,
  code: ({node, inline, className, children, ...props}) => {
    const match = /language-(\w+)/.exec(className || '')
    return !inline && match ? (
      <pre className="bg-muted/70 p-4 rounded-md overflow-x-auto my-4 shadow-md">
        <code className={cn("text-sm", className)} {...props}>{children}</code>
      </pre>
    ) : (
      <code className={cn("bg-muted text-accent-foreground/90 px-1.5 py-0.5 rounded-sm font-mono text-sm", className)} {...props}>
        {children}
      </code>
    )
  },
  hr: ({node, ...props}) => <hr className="my-8 border-border/50" {...props} />,
};

function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs.filter(Boolean).join(' ');
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    // Removed prose classes to apply custom styles more directly via markdown-content and customComponents
    <div className="markdown-content max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={customComponents}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
