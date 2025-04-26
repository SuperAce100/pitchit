'use client';

import { PitchDeckView } from '@/components/PitchDeckView';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, AlertCircle, RefreshCw, Server } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { fetchPitchDeckData, PitchDeckData } from '@/lib/api';
import { checkBackendServer } from '@/lib/checkBackend';

export default function DeckPage() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [pitchDeckData, setPitchDeckData] = useState<PitchDeckData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [serverStatus, setServerStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const searchParams = useSearchParams();
  const repoName = searchParams.get('repo');
  const totalSlides = 8; // Total number of slides

  const checkServer = async () => {
    setServerStatus('checking');
    const isRunning = await checkBackendServer();
    setServerStatus(isRunning ? 'online' : 'offline');
    return isRunning;
  };

  const getPitchDeckData = async () => {
    if (!repoName) {
      setError('No repository name provided');
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
      const data = await fetchPitchDeckData(repoName);
      setPitchDeckData(data);
      setLoading(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch pitch deck data';
      setError(errorMessage);
      setLoading(false);
      console.error('Error fetching pitch deck data:', err);
    }
  };

  useEffect(() => {
    checkServer();
    getPitchDeckData();
  }, [repoName]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === 'ArrowRight') {
        setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
      } else if (e.key === 'f') {
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
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
            onClick={() => getPitchDeckData()}
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
          <a href="/repo" className="text-primary hover:underline">
            Go back to repository page
          </a>
        </div>
      </div>
    );
  }

  if (!pitchDeckData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="text-xl mb-4">No pitch deck data available</div>
        <a href="/repo" className="text-primary hover:underline">
          Go back to repository page
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="mx-auto max-w-[min(80%,64rem)]">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl tracking-tight mt-12">
            {repoName ? `${repoName} Pitch Deck` : 'Pitch Deck'}
          </h1>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={toggleFullscreen}
              className="bg-white/80 border-gray-200 hover:bg-white"
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        <div className="rounded-lg overflow-hidden shadow-md">
          <PitchDeckView {...pitchDeckData} />
        </div>
        <div className="mt-4 text-center text-sm text-gray-500">
          <p>Use arrow keys to navigate • Press 'F' for fullscreen</p>
        </div>
      </div>
    </div>
  );
} 