"use client";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';

interface MarkdownRendererProps {
  content: string;
}

// Basic custom components for styling, can be expanded
const customComponents: Components = {
  h1: ({node, ...props}) => <h1 className="text-3xl md:text-4xl font-bold mt-6 mb-4 pb-2 border-b" {...props} />,
  h2: ({node, ...props}) => <h2 className="text-2xl md:text-3xl font-semibold mt-8 mb-4 pb-2 border-b" {...props} />,
  h3: ({node, ...props}) => <h3 className="text-xl md:text-2xl font-semibold mt-6 mb-3" {...props} />,
  p: ({node, ...props}) => <p className="mb-4 leading-relaxed text-foreground/90" {...props} />,
  ul: ({node, ...props}) => <ul className="list-disc list-inside mb-4 pl-4 space-y-1" {...props} />,
  ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-4 pl-4 space-y-1" {...props} />,
  li: ({node, ...props}) => <li className="mb-1" {...props} />,
  a: ({node, ...props}) => <a className="text-primary hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
  blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground" {...props} />,
  code: ({node, inline, className, children, ...props}) => {
    const match = /language-(\w+)/.exec(className || '')
    return !inline && match ? (
      // For now, basic pre formatting. Syntax highlighting can be added later if needed.
      <pre className="bg-muted p-4 rounded-md overflow-x-auto my-4">
        <code className={className} {...props}>{children}</code>
      </pre>
    ) : (
      <code className={cn("bg-muted text-muted-foreground px-1 py-0.5 rounded-sm font-mono text-sm", className)} {...props}>
        {children}
      </code>
    )
  },
  // Add more custom renderers as needed
};

function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs.filter(Boolean).join(' ');
}


export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="markdown-content prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none dark:prose-invert">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={customComponents}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
