"use client";

import React from "react";
import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { Button } from "./button";
import { Copy } from "lucide-react";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface MarkdownProps {
  content: string;
  className?: string;
  children: React.ReactNode;
}

export function Markdown({ children, className }: MarkdownProps) {

    const components: Components = {
      // Text components
      p: ({ children }) => <p className="text-sm mb-3 last:mb-0">{children}</p>,
      h1: ({ children }) => <h1 className="text-2xl font-bold mt-6 mb-4">{children}</h1>,
      h2: ({ children }) => <h2 className="text-xl font-bold mt-5 mb-3">{children}</h2>,
      h3: ({ children }) => <h3 className="text-lg font-bold mt-4 mb-2">{children}</h3>,
      h4: ({ children }) => <h4 className="text-base font-bold mt-3 mb-2">{children}</h4>,
      h5: ({ children }) => <h5 className="text-sm font-bold mt-2 mb-1">{children}</h5>,
      h6: ({ children }) => <h6 className="text-xs font-bold mt-2 mb-1">{children}</h6>,

      // Lists
      ul: ({ children }) => <ul className="text-sm my-2 pl-6 list-disc">{children}</ul>,
      ol: ({ children }) => <ol className="text-sm my-2 pl-6 list-decimal">{children}</ol>,
      li: ({ children }) => <li className="my-0.5">{children}</li>,

      // Inline formatting
      strong: ({ children }) => <strong className="font-bold">{children}</strong>,
      em: ({ children }) => <em className="italic">{children}</em>,
      del: ({ children }) => <del className="line-through">{children}</del>,

      // Block elements
      blockquote: ({ children }) => (
        <blockquote className="pl-4 border-l-4 border-border my-2 italic text-muted-foreground">{children}</blockquote>
      ),
      hr: () => <hr className="my-4 border-t border-border" />,

      // Tables
      table: ({ children }) => (
        <div className="overflow-x-auto my-4">
          <table className="min-w-full divide-y divide-border border border-border">{children}</table>
        </div>
      ),
      thead: ({ children }) => <thead className="bg-muted/50">{children}</thead>,
      tbody: ({ children }) => <tbody className="divide-y divide-border">{children}</tbody>,
      tr: ({ children }) => <tr>{children}</tr>,
      th: ({ children }) => (
        <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">{children}</th>
      ),
      td: ({ children }) => <td className="px-3 py-2 whitespace-nowrap text-sm">{children}</td>,

      // Links and images
      a: ({ children, href, title }) => (
        <a
          href={href}
          title={title}
          className="text-primary hover:underline"
          target={href?.startsWith('http') ? '_blank' : undefined}
          rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      ),
      img: ({ src, alt, title }) => (
        <img
          src={src || ''}
          alt={alt || ''}
          title={title || alt || ''}
          className="max-w-full h-auto my-2 rounded-lg"
        />
      ),

      // Code blocks and inline code
      code: ({ inline, className, children }) => {
        const match = /language-(\w+)/.exec(className || '')
        return !inline && match ? (
          <div className="relative group">
            <Button
              onClick={() => {
                navigator.clipboard.writeText(String(children))
                const button = document.activeElement as HTMLButtonElement
                if (button) {
                  const originalContent = button.innerHTML
                  button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>'
                  setTimeout(() => {
                    button.innerHTML = originalContent
                  }, 1000)
                }
              }}
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 opacity-100"
              title="Copy code"
            >
              <Copy className="h-2 w-2" />
            </Button>
            <SyntaxHighlighter
              language={match[1]}
              style={oneDark}
              PreTag="div"
              className="rounded-lg border border-border bg-background shadow-sm"
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          </div>
        ) : (
          <code className="bg-background px-1.5 py-0.5 rounded-md text-sm text-primary font-mono shadow-sm">
            {children}
          </code>
        )
      },
      pre: ({ children }) => <>{children}</>,
    };

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={components}
    >
      {children}
    </ReactMarkdown>
  );
}
