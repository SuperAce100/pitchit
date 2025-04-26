'use client';

import { useState, useEffect } from 'react';
import { RepoView } from '@/components/RepoView';
import { useSearchParams } from 'next/navigation';
import { fetchRepoData, GitHubRepoData } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw, Server } from 'lucide-react';
import { checkBackendServer } from '@/lib/checkBackend';

export default function RepoPage() {
  const [repoData, setRepoData] = useState<GitHubRepoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [serverStatus, setServerStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const searchParams = useSearchParams();
  const repoUrl = searchParams.get('url');

  const checkServer = async () => {
    setServerStatus('checking');
    const isRunning = await checkBackendServer();
    setServerStatus(isRunning ? 'online' : 'offline');
    return isRunning;
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
      const data = await fetchRepoData(repoUrl);
      setRepoData(data);
      setLoading(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch repository data';
      setError(errorMessage);
      setLoading(false);
      console.error(err);
    }
  };

  useEffect(() => {
    checkServer();
    getRepoData();
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
      <RepoView {...repoData} />
    </div>
  );
}
