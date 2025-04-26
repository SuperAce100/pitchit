'use client';

import { useState, useEffect, useContext } from 'react';
import { SendHorizontal, Droplet, ChefHat, ShoppingBag, Brain } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { BorderBeam } from '@/components/ui/border-beam';
import { Ripple } from '@/components/ui/ripple';
import { toast } from "sonner";
import axios from 'axios';

export default function GeneratePage() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  // Function to validate GitHub repository URL
  const isValidGitHubRepo = (url: string): boolean => {
    // Regular expression for GitHub repository URLs
    const githubRepoRegex = /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]+$/;
    return githubRepoRegex.test(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate GitHub repository URL
    if (!isValidGitHubRepo(query)) {
      setError('Please enter a valid GitHub repository URL');
      toast.error("Invalid GitHub URL", {
        description: "Please enter a valid GitHub repository URL",
      });
      return;
    }
    
    setIsLoading(true);
    setLoadingMessage('Generating...');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      // In a real app, you would call your API here
      // const response = await axios.post('/api/generate', {
      //   url: query
      // });
      
      setIsLoading(false);
      // setLoadingMessage(response.data.message);
      
      // Navigate to the repo page with the URL as a query parameter
      router.push(`/repo?url=${encodeURIComponent(query)}`);
    } catch (err) {
      setIsLoading(false);
      setError('Failed to generate content. Please try again.');
      toast.error('Failed to generate content. Please try again.');
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12">
      {/* <div className="absolute left-0 top-0 h-full w-full overflow-hidden -z-10 opacity-30">
        <DotPattern 
          className={cn(
            "[mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]",
          )}
        />
      </div> */}
      <div className="w-full max-w-4xl space-y-8">
        <div className="space-y-4 text-center">
          {/* <TextHoverEffect text="MarketMind"/> */}
          <h1 className="text-6xl pb-2 tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
            From code to deck, instantly
          </h1>
          <p className="text-lg text-muted-foreground">
            Our agents will analyse your code, conduct deep market research, and generate a pitch deck for you
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative group rounded-full bg-background">
            <Input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter GitHub repository URL (e.g., https://github.com/username/repo)"
              className={`w-full px-6 py-8 text-xl rounded-full hover:border-primary/30 focus:border-primary/50 transition-all duration-300 pr-16 placeholder:text-muted-foreground/50 ${error ? 'border-red-500' : ''}`}
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              disabled={isLoading || !query.trim()}
              className="absolute right-3 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full"
            >
              <SendHorizontal className="w-6 h-6" />
              <span className="sr-only">Submit</span>
            </Button>
            {isLoading && (
              <BorderBeam duration={20} size={100} />
            )}
          </div>
          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}
        </form>
        <Ripple className="w-full h-full -z-10" />
      </div>
    </div>
  );
} 