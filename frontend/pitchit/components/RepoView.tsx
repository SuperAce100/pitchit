import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, Github, Calendar, User, FileText } from 'lucide-react';
import { Tree, Folder, File } from "@/components/ui/file-tree";
import { Markdown } from "@/components/ui/markdown";

interface GitHubRepoProps {
  name: string;
  description: string;
  url: string;
  readme: string;
  created_by: string;
  tree: string;
}

export function RepoView({ name, description, url, readme, created_by, tree }: GitHubRepoProps) {
  // Format the URL if needed
  const formattedUrl = url.startsWith('http') ? url : `https://${url}`;
  
  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="w-full">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Github className="h-6 w-6" />
              <CardTitle className="text-2xl font-bold">{name}</CardTitle>
            </div>
            <Badge variant="outline" className="text-sm">
              <ExternalLink className="h-4 w-4 mr-1" />
              <a href={formattedUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                View on GitHub
              </a>
            </Badge>
          </div>
          <CardDescription className="text-lg mt-2">{description}</CardDescription>
          <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{created_by}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Created recently</span>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="readme" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="readme" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                README
              </TabsTrigger>
              <TabsTrigger value="files" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Files
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="readme" className="mt-4">
              <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  {readme ? (
                    <Markdown content={readme}>{readme}</Markdown>
                  ) : (
                    <p className="text-muted-foreground">No README available</p>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="files" className="mt-4">
              <ScrollArea className="h-[400px] w-full rounded-md border p-4 font-mono">
                <p className="whitespace-pre-wrap">{tree}</p>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
        
        <CardFooter className="flex justify-between pt-4">
          <Button variant="outline">Download ZIP</Button>
          <Button>Generate Pitch Deck</Button>
        </CardFooter>
      </Card>
    </div>
  );
} 