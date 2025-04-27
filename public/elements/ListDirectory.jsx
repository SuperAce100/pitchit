import { useState } from "react"
import { 
  Folder, 
  FolderOpen, 
  File, 
  FileText, 
  FileCode, 
  FileImage, 
  FilePlus, 
  FileArchive, 
  Music, 
  Video, 
  Database
} from "lucide-react"
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"

export default function ListDirectory() {
  // Default values if props are missing
  const dirPath = props.file_path || "/"
  const dirContent = props.response || ""
  
  // Parse directory content into structured data
  const parseDirectoryContent = () => {
    if (!dirContent) return [];
    
    const lines = dirContent.trim().split('\n');
    
    return lines.map(line => {
      // Determine if it's a directory (ends with '/')
      const isDirectory = line.endsWith('/') || (!line.includes('.') && !line.includes(' '));
      
      // Get the file name - last part after the last /
      const parts = line.split('/');
      const name = parts[parts.length - 1] || parts[parts.length - 2] || line;
      
      // Get the extension if it's a file
      const extension = !isDirectory && name.includes('.') ? 
        name.substring(name.lastIndexOf('.') + 1).toLowerCase() : null;
      
      return {
        path: line,
        name: name || line,
        isDirectory,
        extension
      };
    });
  };
  
  // Get directory stats
  const getDirectoryStats = () => {
    const items = parseDirectoryContent();
    const dirs = items.filter(item => item.isDirectory);
    const files = items.filter(item => !item.isDirectory);
    
    return {
      totalItems: items.length,
      directories: dirs.length,
      files: files.length
    };
  };
  
  // Get icon for file type
  const getFileIcon = (item) => {
    if (item.isDirectory) {
      return <Folder className="h-5 w-5 text-yellow-500" />;
    }
    
    const ext = item.extension;
    
    // Code files
    if (['js', 'jsx', 'ts', 'tsx', 'py', 'java', 'c', 'cpp', 'cs', 'go', 'rb', 'php', 'html', 'css'].includes(ext)) {
      return <FileCode className="h-5 w-5 text-blue-500" />;
    }
    
    // Image files
    if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'bmp'].includes(ext)) {
      return <FileImage className="h-5 w-5 text-purple-500" />;
    }
    
    // Text files
    if (['txt', 'md', 'json', 'yml', 'yaml', 'xml', 'csv'].includes(ext)) {
      return <FileText className="h-5 w-5 text-gray-500" />;
    }
    
    // Audio files
    if (['mp3', 'wav', 'ogg', 'flac', 'aac'].includes(ext)) {
      return <Music className="h-5 w-5 text-green-500" />;
    }
    
    // Video files
    if (['mp4', 'webm', 'mkv', 'avi', 'mov'].includes(ext)) {
      return <Video className="h-5 w-5 text-red-500" />;
    }
    
    // Archive files
    if (['zip', 'rar', '7z', 'tar', 'gz'].includes(ext)) {
      return <FileArchive className="h-5 w-5 text-orange-500" />;
    }
    
    // Database files
    if (['db', 'sqlite', 'sql'].includes(ext)) {
      return <Database className="h-5 w-5 text-emerald-500" />;
    }
    
    // Document files
    if (['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(ext)) {
      return <FilePlus className="h-5 w-5 text-sky-500" />;
    }
    
    // Default
    return <File className="h-5 w-5 text-gray-400" />;
  };
  
  return (
    <div className="w-full max-w-2xl">
      <Accordion 
        type="single" 
        collapsible 
        className="w-full border border-border rounded-md overflow-hidden"
      >
        <AccordionItem value="list-directory" className="border-0">
          <AccordionTrigger 
            className="px-4 py-3 text-left bg-muted/30 hover:bg-muted/50 transition-colors no-underline"
          >
            <div className="flex items-center gap-2">
              <FolderOpen className="h-5 w-5 text-primary" />
              <span className="font-medium">Listed directory <span className="text-primary font-mono">{dirPath}</span></span>
            </div>
            <Badge variant="outline" className="ml-auto">
              {getDirectoryStats().totalItems} items
            </Badge>
          </AccordionTrigger>
          
          <AccordionContent className="p-0 bg-background">
              {dirContent ? (
                <div className="divide-y px-2">
                  {parseDirectoryContent().map((item, index) => (
                    <div 
                      key={index} 
                      className="flex items-center p-3 gap-3 hover:bg-muted/50 rounded-md transition-colors mx-1 my-0.5"
                    >
                      <div className="flex-shrink-0">
                        {getFileIcon(item)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="truncate font-medium">
                          {item.name}{item.isDirectory && '/'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full py-10">
                  <FolderOpen className="h-12 w-12 text-muted-foreground mb-2 opacity-20" />
                  <p className="text-muted-foreground">No directory content available</p>
                </div>
              )}

            
            <div className="px-4 py-2 text-xs text-muted-foreground border-t">
              {`${getDirectoryStats().directories} directories, ${getDirectoryStats().files} files`}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}