'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { fetchMarketResearchData, MarketResearchData } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function MarketPage() {
  const [marketData, setMarketData] = useState<MarketResearchData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [checkingData, setCheckingData] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const repoName = searchParams.get('repo');

  const checkMarketResearch = async () => {
    if (!repoName || checkingData) return;
    
    try {
      setCheckingData(true);
      const data = await fetchMarketResearchData(repoName);
      setMarketData(data);
      setError(null);
      return true;
    } catch (err) {
      console.error('Error fetching market research data:', err);
      return false;
    } finally {
      setCheckingData(false);
    }
  };

  const getMarketData = async () => {
    if (!repoName) {
      setError('No repository name provided');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await checkMarketResearch();
      setLoading(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch market research data';
      setError(errorMessage);
      setLoading(false);
      console.error(err);
    }
  };

  // Set up polling for market research data
  useEffect(() => {
    if (!repoName || marketData) return;
    
    const intervalId = setInterval(async () => {
      const data = await checkMarketResearch();
      if (data) {
        clearInterval(intervalId);
      }
    }, 5000); // Check every 5 seconds
    
    return () => clearInterval(intervalId);
  }, [repoName, marketData]);

  useEffect(() => {
    getMarketData();
  }, [repoName]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
        <p className="text-lg">Generating market research data...</p>
        <p className="text-sm text-muted-foreground">This may take a few minutes</p>
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
        <div className="flex flex-col items-center gap-4">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => getMarketData()}
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

  if (!marketData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="text-xl mb-4">No market research data available</div>
        <a href="/repo" className="text-primary hover:underline">
          Go back to repository page
        </a>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen max-w-[min(80%,64rem)] p-4">
      <h1 className="text-3xl font-bold mb-6">Market Research</h1>
      <div className="space-y-6">
        <div className="bg-card rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Market Size</h2>
          <p className="text-muted-foreground">{marketData.market_size}</p>
        </div>
        <div className="bg-card rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Market Growth</h2>
          <p className="text-muted-foreground">{marketData.market_growth}</p>
        </div>
        <div className="bg-card rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Competitors</h2>
          <ul className="list-disc list-inside space-y-2">
            {marketData.competitors.map((competitor, index) => (
              <li key={index} className="text-muted-foreground">{competitor.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
} 