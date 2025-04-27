import { useState } from "react"
import { FileText, ChevronDown, ChevronRight } from "lucide-react"
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"

export default function ReadFile() {
  // Default values if props are missing
  const filePath = props.file_path || "unknown"
  const fileContent = props.response || ""
  
  // Determine file type from extension for syntax highlighting
  const getFileType = (path) => {
    const extension = path.split('.').pop().toLowerCase();
    const codeExtensions = {
      js: 'javascript',
      jsx: 'javascript',
      ts: 'typescript',
      tsx: 'typescript',
      py: 'python',
      html: 'html',
      css: 'css',
      json: 'json',
      md: 'markdown',
      txt: 'text',
      csv: 'csv',
      yml: 'yaml',
      yaml: 'yaml',
      xml: 'xml',
      sql: 'sql',
      sh: 'bash',
      bash: 'bash',
      rb: 'ruby',
      java: 'java',
      c: 'c',
      cpp: 'cpp',
      cs: 'csharp',
      go: 'go',
      rs: 'rust',
      php: 'php'
    };
    
    return codeExtensions[extension] || 'text';
  };
  
  // Format content based on file type
  const formatContent = (content, path) => {
    const fileType = getFileType(path);
    
    if (fileType === 'json') {
      try {
        const parsed = JSON.parse(content);
        return (
          <pre className="text-xs">
            {JSON.stringify(parsed, null, 2)}
          </pre>
        );
      } catch (e) {
        // If parsing fails, display as plain text
        return <pre className="text-xs whitespace-pre-wrap">{content}</pre>;
      }
    }
    
    // Handle markdown
    if (fileType === 'markdown' || fileType === 'md') {
      return <div className="text-sm prose prose-sm max-w-none">{renderMarkdown(content)}</div>;
    }
    
    // Handle CSV with simple table formatting
    if (fileType === 'csv') {
      try {
        const rows = content.trim().split('\n').map(row => row.split(','));
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs">
              <tbody>
                {rows.map((row, rowIndex) => (
                  <tr key={rowIndex} className={rowIndex === 0 ? "bg-muted font-medium" : (rowIndex % 2 === 0 ? "bg-muted/30" : "")}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="border px-2 py-1">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      } catch (e) {
        return <pre className="text-xs whitespace-pre-wrap">{content}</pre>;
      }
    }
    
    // For code files, wrap in a <pre>
    if (fileType !== 'text' && fileType !== 'txt') {
      return <pre className="text-xs whitespace-pre-wrap">{content}</pre>;
    }
    
    // Default for text files
    return <div className="text-xs whitespace-pre-wrap">{content}</div>;
  };
  
  // Basic Markdown rendering function for md files
  const renderMarkdown = (text) => {
    if (!text) return null;
    
    // Process the markdown text
    return processMarkdown(text);
  };
  
  // Process markdown with basic rules
  const processMarkdown = (text) => {
    // Split into lines for processing
    const lines = text.split('\n');
    const result = [];
    
    let inCodeBlock = false;
    let codeContent = [];
    let listItems = [];
    let listType = null;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Handle code blocks
      if (line.trim().startsWith('```')) {
        if (inCodeBlock) {
          // End of code block
          result.push(
            <pre key={`code-${i}`} className="bg-muted p-3 rounded-md my-2 overflow-x-auto text-xs">
              {codeContent.join('\n')}
            </pre>
          );
          codeContent = [];
          inCodeBlock = false;
        } else {
          // Start of code block
          inCodeBlock = true;
        }
        continue;
      }
      
      if (inCodeBlock) {
        codeContent.push(line);
        continue;
      }
      
      // Handle headings
      if (line.startsWith('# ')) {
        if (listItems.length > 0) {
          result.push(<ul key={`list-${i}`} className="my-2 pl-6 space-y-1">{listItems}</ul>);
          listItems = [];
          listType = null;
        }
        result.push(<h1 key={`h1-${i}`} className="text-xl font-bold my-2">{line.substring(2)}</h1>);
        continue;
      }
      
      if (line.startsWith('## ')) {
        if (listItems.length > 0) {
          result.push(<ul key={`list-${i}`} className="my-2 pl-6 space-y-1">{listItems}</ul>);
          listItems = [];
          listType = null;
        }
        result.push(<h2 key={`h2-${i}`} className="text-lg font-bold my-2">{line.substring(3)}</h2>);
        continue;
      }
      
      if (line.startsWith('### ')) {
        if (listItems.length > 0) {
          result.push(<ul key={`list-${i}`} className="my-2 pl-6 space-y-1">{listItems}</ul>);
          listItems = [];
          listType = null;
        }
        result.push(<h3 key={`h3-${i}`} className="text-md font-bold my-2">{line.substring(4)}</h3>);
        continue;
      }
      
      // Handle lists
      if (line.match(/^[*-] /)) {
        if (listType !== 'unordered') {
          if (listItems.length > 0) {
            result.push(<ul key={`list-${i}`} className="my-2 pl-6 space-y-1">{listItems}</ul>);
            listItems = [];
          }
          listType = 'unordered';
        }
        listItems.push(
          <li key={`li-${i}`} className="text-sm">
            {processInlineMarkdown(line.substring(2))}
          </li>
        );
        continue;
      }
      
      // Handle paragraphs
      if (line.trim() !== '') {
        result.push(
          <p key={`p-${i}`} className="text-sm my-1">
            {processInlineMarkdown(line)}
          </p>
        );
      } else if (i > 0 && lines[i-1].trim() !== '') {
        result.push(<br key={`br-${i}`} />);
      }
    }
    
    return result;
  };
  
  // Process inline markdown elements
  const processInlineMarkdown = (text) => {
    if (!text) return null;
    
    // Process inline code
    const codeRegex = /`([^`]+)`/g;
    let parts = [];
    let lastIndex = 0;
    let match;
    
    while ((match = codeRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      parts.push(<code key={`code-${match.index}`} className="bg-muted px-1 py-0.5 rounded text-xs">{match[1]}</code>);
      lastIndex = match.index + match[0].length;
    }
    
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }
    
    return parts.length > 0 ? parts : text;
  };
  
  return (
    <div className="w-full max-w-2xl">
      <Accordion 
        type="single" 
        collapsible 
        className="w-full border border-border rounded-md overflow-hidden"
      >
        <AccordionItem value="read-file" className="border-0">
          <AccordionTrigger 
            className="px-4 py-3 text-left bg-muted/30 hover:bg-muted/50 transition-colors no-underline"
          >
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <span className="font-medium">Reading file <span className="text-primary">{filePath}</span></span>
            </div>
          </AccordionTrigger>
          
          <AccordionContent className="p-4 bg-background">
            <Card>
              <CardContent className="p-3">
                {fileContent ? (
                  formatContent(fileContent, filePath)
                ) : (
                  <p className="text-xs text-muted-foreground italic">No content available</p>
                )}
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}