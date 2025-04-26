'use client';

import { useState, useEffect } from 'react';
import { RepoView } from '@/components/RepoView';
import { useSearchParams } from 'next/navigation';
import { fetchRepoData, GitHubRepoData, refreshRepoData, fetchMarketResearchData, fetchTechnicalBriefData, fetchBrandingData, fetchPitchDeckData } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw, Server } from 'lucide-react';
import { checkBackendServer } from '@/lib/checkBackend';
import { useRepoStore } from '@/lib/store';

export default function RepoPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [serverStatus, setServerStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [checkingComponents, setCheckingComponents] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const repoUrl = searchParams.get('url');

  const { 
    repoData, 
    marketResearchGenerated, 
    technicalBriefGenerated,
    brandingGenerated,
    pitchDeckGenerated,
    setRepoData, 
    setMarketResearchGenerated,
    setTechnicalBriefGenerated,
    setBrandingGenerated,
    setPitchDeckGenerated
  } = useRepoStore();

  const checkServer = async () => {
    setServerStatus('checking');
    const isRunning = await checkBackendServer();
    setServerStatus(isRunning ? 'online' : 'offline');
    return isRunning;
  };

  const checkComponents = async (repoName: string, regenerate: boolean = false) => {
    if (checkingComponents) return;
    
    try {
      setCheckingComponents(true);
      
      // Check market research
      if (!marketResearchGenerated) {
        const marketResearchResponse = await fetchMarketResearchData(repoName, regenerate);
        if (marketResearchResponse) {
          setMarketResearchGenerated(true);
        }
      }
      
      // Check technical brief
      if (!technicalBriefGenerated) {
        const technicalBriefResponse = await fetchTechnicalBriefData(repoName, regenerate);
        if (technicalBriefResponse) {
          setTechnicalBriefGenerated(true);
        }
      }
      
      // Check branding
      if (!brandingGenerated) {
        const brandingResponse = await fetchBrandingData(repoName, regenerate);
        if (brandingResponse) {
          setBrandingGenerated(true);
        }
      }
      
      // Check pitch deck
      if (!pitchDeckGenerated) {
        const pitchDeckResponse = await fetchPitchDeckData(repoName, regenerate);
        if (pitchDeckResponse) {
          setPitchDeckGenerated(true);
        }
      }
      
      // If any component was generated, refresh the repo data
      if (marketResearchGenerated || technicalBriefGenerated || brandingGenerated || pitchDeckGenerated) {
        const updatedRepoData = await refreshRepoData(repoName);
        setRepoData(updatedRepoData);
      }
      
      return marketResearchGenerated && technicalBriefGenerated && brandingGenerated && pitchDeckGenerated;
    } catch (err) {
      console.error('Error checking components:', err);
      return false;
    } finally {
      setCheckingComponents(false);
    }
  };

  const getRepoData = async () => {
    if (!repoUrl) {
      setError('No repository URL provided');
      setLoading(false);
      return;
    }

    // Check if the backend server is running
    const isServerRunning = await checkServer();
    if (!isServerRunning) {
      setError('Backend server is not running. Please start the server and try again.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const description = searchParams.get('description');
      const data = await fetchRepoData(repoUrl, description || undefined);
      setRepoData(data);
      
      // Check if components exist in the JSON file
      await checkComponents(data.name);
      
      setLoading(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch repository data';
      setError(errorMessage);
      setLoading(false);
      console.error(err);
    }
  };

  // Set up polling for components
  useEffect(() => {
    if (!repoData || (marketResearchGenerated && technicalBriefGenerated && brandingGenerated && pitchDeckGenerated)) return;
    
    const intervalId = setInterval(async () => {
      if (repoData) {
        const allGenerated = await checkComponents(repoData.name);
        if (allGenerated) {
          clearInterval(intervalId);
        }
      }
    }, 5000); // Check every 5 seconds
    
    return () => clearInterval(intervalId);
  }, [repoData, marketResearchGenerated, technicalBriefGenerated, brandingGenerated, pitchDeckGenerated]);

  useEffect(() => {
    checkServer();
    // If we have a URL parameter, it takes precedence over stored data
    if (repoUrl) {
      getRepoData();
    } else if (repoData) {
      // If we have stored data but no URL parameter, redirect to the stored repo
      window.location.href = `/repo?url=${encodeURIComponent(repoData.url)}`;
    } else {
      setLoading(false);
    }
  }, [repoUrl]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen max-w-[min(80%,64rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="flex items-center gap-2 text-destructive text-xl mb-4">
          <AlertCircle className="h-6 w-6" />
          <span>{error}</span>
        </div>
        {serverStatus === 'offline' && (
          <div className="flex items-center gap-2 text-amber-500 mb-4">
            <Server className="h-5 w-5" />
            <span>Backend server is offline</span>
          </div>
        )}
        <div className="flex flex-col items-center gap-4">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => getRepoData()}
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
          <a href="/generate" className="text-primary hover:underline">
            Go back to generate page
          </a>
        </div>
      </div>
    );
  }

  if (!repoData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="text-xl mb-4">No repository data available</div>
        <a href="/generate" className="text-primary hover:underline">
          Go back to generate page
        </a>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen max-w-[min(80%,64rem)]">
      <RepoView 
        {...repoData} 
        market_research_generated={marketResearchGenerated}
        technical_brief_generated={technicalBriefGenerated}
        branding_generated={brandingGenerated}
        pitch_deck_generated={pitchDeckGenerated}
      />
    </div>
  );
}
