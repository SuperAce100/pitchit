'use client';

import { PitchDeckView } from '@/components/PitchDeckView';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react';

// This is mock data - in a real app, this would come from an API or database
const mockPitchDeckData = {
  slide_1_title: {
    company_name: "PitchIt",
    tagline: "AI-powered pitch deck generator for startups"
  },
  slide_2_problem: {
    problem_statement: "Creating a professional pitch deck is time-consuming and expensive. Entrepreneurs spend countless hours perfecting their pitch decks or pay thousands to agencies.",
    why_now: "With the rise of AI and the increasing number of startups, there's a growing need for efficient, cost-effective solutions to create compelling pitch decks."
  },
  slide_3_solution: {
    product_overview: "PitchIt is an AI-powered platform that generates customized pitch decks based on your business data, saving you time and money.",
    key_features: [
      "AI-powered content generation",
      "Professional templates",
      "Real-time collaboration",
      "Custom branding options"
    ],
    unique_value_proposition: "Unlike traditional agencies or generic templates, PitchIt combines AI technology with industry expertise to create pitch decks that stand out."
  },
  slide_4_market_opportunity: {
    target_market: "Early-stage startups and entrepreneurs seeking funding",
    market_size: "$5B total addressable market with $1B serviceable market",
    market_growth: "20% YoY growth in startup formation, creating increasing demand for pitch deck services"
  },
  slide_5_product_demonstration: {
    how_it_works: "Users input their business information through our intuitive interface. Our AI analyzes the data and generates a professional pitch deck with compelling narratives and visuals.",
    user_experience_highlights: "Simple 3-step process: Input data, customize design, export presentation. No design skills required."
  },
  slide_6_business_model: {
    revenue_streams: "Subscription-based SaaS model with tiered pricing plans",
    pricing_strategy: "Freemium model with premium features for professional users. Enterprise plans for agencies and accelerators."
  },
  slide_7_roadmap: {
    milestones_achieved: [
      "Launched MVP",
      "Reached 10,000 users",
      "Secured seed funding"
    ],
    future_plans: [
      "Launch advanced AI features",
      "Expand to international markets",
      "Develop mobile app"
    ]
  },
  slide_8_call_to_action: {
    funding_needs: "$2M Seed Round",
    use_of_funds: "Product development (40%), Marketing (25%), Hiring (25%), Other (10%)",
    vision_statement: "To become the go-to platform for pitch deck creation, empowering entrepreneurs worldwide to tell their stories effectively."
  }
};

export default function DeckPage() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 8; // Total number of slides

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
    <div className="min-h-screen p-4">
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
        <div className="mt-4 text-center text-sm text-gray-500">
          <p>Use arrow keys to navigate • Press 'F' for fullscreen</p>
        </div>
      </div>
    </div>
  );
} 