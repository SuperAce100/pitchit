import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ExternalLink, Github, Calendar, User, FileText, Presentation, ShoppingBag } from 'lucide-react';
import { Markdown } from "@/components/ui/markdown";
import Link from 'next/link';

interface GitHubRepoProps {
  name: string;
  description: string;
  url: string;
  readme: string;
  created_by: string;
  tree: string;
  market_research_generated?: boolean;
  technical_brief_generated?: boolean;
  branding_generated?: boolean;
  pitch_deck_generated?: boolean;
}

export function RepoView({ 
  name, 
  description, 
  url, 
  readme, 
  created_by, 
  tree, 
  market_research_generated = false,
  technical_brief_generated = false,
  branding_generated = false,
  pitch_deck_generated = false
}: GitHubRepoProps) {
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
              <div className="prose prose-sm max-w-none dark:prose-invert">
                {readme ? (
                  <Markdown content={readme}>{readme}</Markdown>
                ) : (
                  <p className="text-muted-foreground">No README available</p>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="files" className="mt-4">
              <p className="whitespace-pre-wrap font-mono">{tree}</p>
            </TabsContent>
          </Tabs>
        </CardContent>
        
        <CardFooter className="flex flex-wrap gap-4 justify-center">
          <Link href={`/market?repo=${name}`}>
            <Button variant="outline" className="flex items-center gap-2" disabled={!market_research_generated}>
              <ShoppingBag className="h-4 w-4" />
              Market Research
              {!market_research_generated && (
                <Badge variant="secondary" className="ml-2">Generating...</Badge>
              )}
            </Button>
          </Link>
          <Link href={`/technical?repo=${name}`}>
            <Button variant="outline" className="flex items-center gap-2" disabled={!technical_brief_generated}>
              <FileText className="h-4 w-4" />
              Technical Brief
              {!technical_brief_generated && (
                <Badge variant="secondary" className="ml-2">Generating...</Badge>
              )}
            </Button>
          </Link>
          <Link href={`/branding?repo=${name}`}>
            <Button variant="outline" className="flex items-center gap-2" disabled={!branding_generated}>
              <Presentation className="h-4 w-4" />
              Branding
              {!branding_generated && (
                <Badge variant="secondary" className="ml-2">Generating...</Badge>
              )}
            </Button>
          </Link>
          <Link href={`/deck?repo=${name}`}>
            <Button className="flex items-center gap-2" disabled={!pitch_deck_generated}>
              <Presentation className="h-4 w-4" />
              Pitch Deck
              {!pitch_deck_generated && (
                <Badge variant="secondary" className="ml-2">Generating...</Badge>
              )}
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
} 