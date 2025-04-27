import { useState } from "react"
import { Search, ExternalLink } from "lucide-react"
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"

export default function WebSearch() {
  // Default values if props are missing
  const query = props.args?.query || ""
  const searchResults = props.response || ""
  
  // Basic Markdown rendering function
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
      
      // Handle task lists
      if (line.match(/^- \[[xX ]\] /)) {
        if (listType !== 'task') {
          if (listItems.length > 0) {
            result.push(<ul key={`list-${i}`} className="my-2 pl-6 space-y-1">{listItems}</ul>);
            listItems = [];
          }
          listType = 'task';
        }
        
        const isChecked = line.match(/^- \[[xX]\] /);
        const taskText = line.replace(/^- \[[xX ]\] /, '');
        
        listItems.push(
          <li key={`li-${i}`} className="flex items-start gap-2 text-sm">
            <div className={`w-4 h-4 mt-0.5 flex items-center justify-center rounded border ${isChecked ? 'bg-primary border-primary' : 'border-muted-foreground'}`}>
              {isChecked && (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-white">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              )}
            </div>
            <span>{processInlineMarkdown(taskText)}</span>
          </li>
        );
        continue;
      }
      
      // Handle lists
      if (line.match(/^[*-] /)) {
        if (listType !== 'unordered') {
          if (listItems.length > 0) {
            if (listType === 'task') {
              result.push(<ul key={`list-${i}`} className="my-2 pl-6 space-y-1">{listItems}</ul>);
            } else {
              result.push(
                listType === 'ordered' 
                  ? <ol key={`list-${i}`} className="my-2 pl-6 space-y-1 list-decimal">{listItems}</ol>
                  : <ul key={`list-${i}`} className="my-2 pl-6 space-y-1">{listItems}</ul>
              );
            }
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
      
      if (line.match(/^\d+\. /)) {
        if (listType !== 'ordered') {
          if (listItems.length > 0) {
            if (listType === 'task') {
              result.push(<ul key={`list-${i}`} className="my-2 pl-6 space-y-1">{listItems}</ul>);
            } else {
              result.push(
                listType === 'unordered' 
                  ? <ul key={`list-${i}`} className="my-2 pl-6 space-y-1">{listItems}</ul>
                  : <ol key={`list-${i}`} className="my-2 pl-6 space-y-1 list-decimal">{listItems}</ol>
              );
            }
            listItems = [];
          }
          listType = 'ordered';
        }
        
        const textContent = line.substring(line.indexOf('. ') + 2);
        listItems.push(
          <li key={`li-${i}`} className="text-sm">
            {processInlineMarkdown(textContent)}
          </li>
        );
        continue;
      }
      
      // Flush any pending list items
      if (listItems.length > 0 && line.trim() === '') {
        if (listType === 'task') {
          result.push(<ul key={`list-${i}`} className="my-2 pl-6 space-y-1">{listItems}</ul>);
        } else {
          result.push(
            listType === 'unordered' 
              ? <ul key={`list-${i}`} className="my-2 pl-6 space-y-1">{listItems}</ul>
              : <ol key={`list-${i}`} className="my-2 pl-6 space-y-1 list-decimal">{listItems}</ol>
          );
        }
        listItems = [];
        listType = null;
        result.push(<br key={`br-${i}`} />);
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
    
    // Handle any remaining list items
    if (listItems.length > 0) {
      if (listType === 'task') {
        result.push(<ul key="list-final" className="my-2 pl-6 space-y-1">{listItems}</ul>);
      } else {
        result.push(
          listType === 'unordered' 
            ? <ul key="list-final" className="my-2 pl-6 space-y-1">{listItems}</ul>
            : <ol key="list-final" className="my-2 pl-6 space-y-1 list-decimal">{listItems}</ol>
        );
      }
    }
    
    return result;
  };
  
  // Process inline markdown elements
  const processInlineMarkdown = (text) => {
    if (!text) return null;
    
    // First process links - [text](url)
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let linkParts = [];
    let lastLinkIndex = 0;
    let linkMatch;
    
    while ((linkMatch = linkRegex.exec(text)) !== null) {
      if (linkMatch.index > lastLinkIndex) {
        linkParts.push(processOtherInlineElements(text.substring(lastLinkIndex, linkMatch.index)));
      }
      linkParts.push(
        <a 
          key={`link-${linkMatch.index}`} 
          href="#" 
          className="text-primary hover:underline flex items-center gap-1 inline-flex"
          onClick={(e) => e.preventDefault()}
        >
          {linkMatch[1]}
          <ExternalLink className="h-3 w-3" />
        </a>
      );
      lastLinkIndex = linkMatch.index + linkMatch[0].length;
    }
    
    if (lastLinkIndex < text.length) {
      linkParts.push(processOtherInlineElements(text.substring(lastLinkIndex)));
    }
    
    return linkParts.length > 0 ? linkParts : processOtherInlineElements(text);
  };
  
  // Process other inline elements like code, bold, italic
  const processOtherInlineElements = (text) => {
    if (!text) return null;
    
    // Process inline code
    const codeRegex = /`([^`]+)`/g;
    let parts = [];
    let lastIndex = 0;
    let match;
    
    while ((match = codeRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(processBoldItalic(text.substring(lastIndex, match.index)));
      }
      parts.push(<code key={`code-${match.index}`} className="bg-muted px-1 py-0.5 rounded text-xs">{match[1]}</code>);
      lastIndex = match.index + match[0].length;
    }
    
    if (lastIndex < text.length) {
      parts.push(processBoldItalic(text.substring(lastIndex)));
    }
    
    return parts.length > 0 ? parts : processBoldItalic(text);
  };
  
  // Process bold and italic formatting
  const processBoldItalic = (text) => {
    if (!text) return null;
    
    // First, handle bold with ** or __
    const boldRegex = /(\*\*|__)([^\*_]+)\1/g;
    let boldResult = [];
    let lastBoldIndex = 0;
    let boldMatch;
    
    while ((boldMatch = boldRegex.exec(text)) !== null) {
      if (boldMatch.index > lastBoldIndex) {
        boldResult.push(text.substring(lastBoldIndex, boldMatch.index));
      }
      boldResult.push(<strong key={`bold-${boldMatch.index}`}>{boldMatch[2]}</strong>);
      lastBoldIndex = boldMatch.index + boldMatch[0].length;
    }
    
    if (lastBoldIndex < text.length) {
      boldResult.push(text.substring(lastBoldIndex));
    }
    
    const boldText = boldResult.length > 0 ? boldResult : text;
    
    // Then, handle italic with * or _
    if (typeof boldText === 'string') {
      const italicRegex = /(\*|_)([^\*_]+)\1/g;
      let italicResult = [];
      let lastItalicIndex = 0;
      let italicMatch;
      
      while ((italicMatch = italicRegex.exec(boldText)) !== null) {
        if (italicMatch.index > lastItalicIndex) {
          italicResult.push(boldText.substring(lastItalicIndex, italicMatch.index));
        }
        italicResult.push(<em key={`italic-${italicMatch.index}`}>{italicMatch[2]}</em>);
        lastItalicIndex = italicMatch.index + italicMatch[0].length;
      }
      
      if (lastItalicIndex < boldText.length) {
        italicResult.push(boldText.substring(lastItalicIndex));
      }
      
      return italicResult.length > 0 ? italicResult : boldText;
    }
    
    return boldText;
  };
  
  // Extract the number of results (if provided in the markdown)
  const extractResultCount = () => {
    if (!searchResults) return null;
    
    // Try to find patterns like "Found 10 results" or "5 results found"
    const countRegex = /(\d+)\s+results?|results?:?\s+(\d+)/i;
    const match = searchResults.match(countRegex);
    
    if (match) {
      const count = match[1] || match[2];
      return `${count} results`;
    }
    
    return null;
  };
  
  return (
    <div className="w-full max-w-2xl">
      <Accordion 
        type="single" 
        collapsible 
        className="w-full border border-border rounded-md overflow-hidden"
      >
        <AccordionItem value="web-search" className="border-0">
          <AccordionTrigger 
            className="px-4 py-3 text-left bg-muted/30 hover:bg-muted/50 transition-colors no-underline"
          >
            <div className="flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" />
              <span className="font-medium">Searched <span className="text-primary italic">"{query}"</span></span>
            </div>
          </AccordionTrigger>
          
          <AccordionContent className="p-4 bg-background">
            <Card>
              <CardContent className="p-3 pt-5">
                {searchResults ? (
                  <div className="space-y-1">
                    {renderMarkdown(searchResults)}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground italic">No search results available</p>
                )}
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}