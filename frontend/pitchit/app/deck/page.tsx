'use client';

import { PitchDeckView } from '@/components/PitchDeckView';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react';

// This is mock data - in a real app, this would come from an API or database
const mockPitchDeckData = {
  companyOverview: {
    oneLiner: "AI-powered pitch deck generator for startups",
    missionStatement: "To help entrepreneurs create compelling pitch decks in minutes, not days"
  },
  problem: {
    description: "Creating a professional pitch deck is time-consuming and expensive",
    currentSolutions: "Manual creation, expensive agencies, or generic templates"
  },
  solution: {
    productDescription: "An AI-powered platform that generates customized pitch decks based on your business data",
    keyFeatures: [
      "AI-powered content generation",
      "Professional templates",
      "Real-time collaboration",
      "Custom branding options"
    ]
  },
  market: {
    targetCustomers: "Early-stage startups and entrepreneurs",
    marketSize: {
      totalAddressableMarket: 5000000000,
      serviceableAddressableMarket: 1000000000
    },
    marketGrowth: "20% YoY growth in startup formation"
  },
  product: {
    demoLink: "https://demo.pitchit.ai",
    technologyStack: "Next.js, React, TypeScript, Tailwind CSS"
  },
  businessModel: {
    revenueStreams: "Subscription-based SaaS model with tiered pricing",
    pricingStrategy: "Freemium model with premium features"
  },
  traction: {
    keyMetrics: {
      users: 10000,
      monthlyRevenue: 50000,
      growthRate: "15% MoM"
    },
    milestones: [
      "Launched MVP",
      "Reached 10,000 users",
      "Secured seed funding"
    ]
  },
  team: {
    founders: [
      {
        name: "John Doe",
        role: "CEO",
        background: "Former Product Manager at Google"
      },
      {
        name: "Jane Smith",
        role: "CTO",
        background: "PhD in Computer Science, ML expert"
      }
    ],
    advisors: [
      "Tech Industry Veteran",
      "Successful Startup Founder",
      "Investment Banker"
    ]
  },
  competition: {
    competitors: [
      "Traditional pitch deck agencies",
      "Generic template providers",
      "Manual creation tools"
    ],
    competitiveAdvantage: "AI-powered automation and customization"
  },
  financials: {
    historicalFinancials: {
      revenue: 500000,
      expenses: 300000
    },
    projections: {
      next12MonthsRevenue: 2000000,
      next12MonthsExpenses: 1000000
    }
  },
  funding: {
    amountRaising: 2000000,
    useOfFunds: {
      productDevelopment: 800000,
      marketing: 500000,
      hiring: 500000,
      other: 200000
    },
    fundingHistory: [
      {
        round: "Seed",
        amount: 500000,
        investors: ["Angel Investor 1", "Angel Investor 2"]
      }
    ]
  }
};

export default function DeckPage() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 10; // Total number of slides

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

  return (
    <div className="min-h-screenp-4">
      <div className="mx-auto max-w-[min(80%,64rem)]">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl tracking-tight mt-12">Pitch Deck</h1>
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
          <PitchDeckView {...mockPitchDeckData} />
        </div>
      </div>
    </div>
  );
} 