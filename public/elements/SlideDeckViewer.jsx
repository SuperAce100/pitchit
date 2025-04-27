import { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent
} from "@/components/ui/card";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Lightbulb, 
  BarChart, 
  TrendingUp, 
  Users, 
  Code, 
  Star,
  ListChecks,
  Package,
  ArrowUpRight,
  ArrowDownRight,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  PresentationIcon,
  Target
} from 'lucide-react';

export default function SlideDeckPresenter() {
  const [techBrief, setTechBrief] = useState(null);
  const [marketData, setMarketData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);

  useEffect(() => {
    try {
      // Parse technical brief data
      if (props.technicalBriefData) {
        if (typeof props.technicalBriefData === 'string') {
          setTechBrief(JSON.parse(props.technicalBriefData));
        } else {
          setTechBrief(props.technicalBriefData);
        }
      }
      
      // Parse market research data
      if (props.marketResearchData) {
        if (typeof props.marketResearchData === 'string') {
          setMarketData(JSON.parse(props.marketResearchData));
        } else {
          setMarketData(props.marketResearchData);
        }
      }
      
      setLoading(false);
    } catch (err) {
      console.error("Error parsing data:", err);
      setError("Failed to parse input data");
      setLoading(false);
    }
  }, [props.technicalBriefData, props.marketResearchData]);

  useEffect(() => {
    // Count total slides once data is loaded
    if (techBrief || marketData) {
      let count = 1; // Title slide
      
      // Market slides
      if (marketData) {
        count += 2; // Market overview + competitors
      }
      
      // Tech brief slides
      if (techBrief) {
        count += 1; // Product overview
        count += techBrief.steps && techBrief.steps.length > 0 ? 1 : 0; // Development process
        count += techBrief.features && techBrief.features.length > 0 ? 1 : 0; // Features
        count += techBrief.technologies && techBrief.technologies.length > 0 ? 1 : 0; // Technologies
        count += techBrief.xFactors && techBrief.xFactors.length > 0 ? 1 : 0; // X-factors
      }
      
      count += 1; // Conclusion slide
      
      setTotalSlides(count);
    }
  }, [techBrief, marketData]);

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const toggleFullscreen = () => {
    setFullscreen(!fullscreen);
  };

  if (loading) {
    return (
      <Card className="w-full shadow-md">
        <CardContent className="p-8 flex justify-center">
          <div className="flex flex-col items-center">
            <div className="h-8 w-8 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-500">Loading presentation data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || (!techBrief && !marketData)) {
    return (
      <Card className="w-full shadow-md">
        <CardContent className="p-8">
          <div className="flex flex-col items-center text-center">
            <PresentationIcon className="h-12 w-12 text-red-500 mb-4" />
            <h3 className="text-lg font-medium">Error Loading Presentation</h3>
            <p className="mt-2 text-gray-500">{error || "No presentation data available"}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Function to parse market share string to number (e.g., "25%" -> 25)
  const parseMarketShare = (shareStr) => {
    if (!shareStr) return 0;
    const match = shareStr.match(/(\d+)/);
    return match ? parseInt(match[0], 10) : 0;
  };

  // Sort competitors by market share (highest first)
  const sortedCompetitors = marketData?.competitors ? 
    [...marketData.competitors].sort((a, b) => 
      parseMarketShare(b.market_share) - parseMarketShare(a.market_share)
    ) : [];

  // Title for the presentation
  const presentationTitle = techBrief?.productName || "Product Analysis";
  
  // Prepare slide content
  const slides = [
    // Slide 1: Title
    <div key="title-slide" className="flex flex-col items-center justify-center h-full text-center p-8">
      <h1 className="text-3xl md:text-5xl font-bold mb-4">{presentationTitle}</h1>
      <p className="text-xl md:text-2xl text-gray-600 mb-8">
        {techBrief?.productIdea || "Comprehensive Analysis"}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        {techBrief?.date && <p className="text-gray-500">Date: {techBrief.date}</p>}
        {techBrief?.author && <p className="text-gray-500">Prepared by: {techBrief.author}</p>}
      </div>
    </div>
  ];

  // Market Research Slides
  if (marketData) {
    // Slide: Market Overview
    slides.push(
      <div key="market-overview" className="h-full p-8">
        <div className="flex items-center mb-6">
          <BarChart className="h-6 w-6 mr-2 text-blue-500" />
          <h2 className="text-2xl md:text-3xl font-bold">Market Overview</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <BarChart className="h-5 w-5 mr-2 text-blue-600" />
              Market Size
            </h3>
            <p className="text-3xl font-bold text-blue-700">{marketData.market_size}</p>
            <p className="text-sm text-gray-600 mt-2">Total addressable market value</p>
          </div>
          
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
              Growth Rate
            </h3>
            <p className="text-3xl font-bold text-green-700">{marketData.market_growth}</p>
            <p className="text-sm text-gray-600 mt-2">Projected annual growth rate</p>
          </div>
        </div>
        
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Key Market Insights</h3>
          <ul className="space-y-2 list-disc pl-5">
            <li>Total market size of {marketData.market_size} presents significant opportunity</li>
            <li>Market growing at {marketData.market_growth}, indicating strong demand</li>
            <li>Competitive landscape includes {marketData.competitors?.length || 0} major players</li>
            {marketData.competitors?.length > 0 && (
              <li>{sortedCompetitors[0].name} currently leads with {sortedCompetitors[0].market_share} market share</li>
            )}
          </ul>
        </div>
      </div>
    );
    
    // Slide: Competitor Analysis
    slides.push(
      <div key="competitors" className="h-full p-8">
        <div className="flex items-center mb-6">
          <Users className="h-6 w-6 mr-2 text-blue-500" />
          <h2 className="text-2xl md:text-3xl font-bold">Competitive Landscape</h2>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Market Share Distribution</h3>
          <div className="space-y-4">
            {sortedCompetitors.slice(0, 5).map((competitor, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="font-medium text-gray-800 mr-4 w-32 truncate">{competitor.name}</span>
                <div className="flex-1 flex items-center">
                  <Progress
                    value={parseMarketShare(competitor.market_share)}
                    className="h-3 flex-1 mr-4"
                  />
                  <span className="text-sm font-semibold min-w-[45px] text-right">
                    {competitor.market_share}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {sortedCompetitors.slice(0, 2).map((competitor, index) => (
            <div key={index} className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-1">{competitor.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{competitor.description}</p>
              
              <div className="mt-3">
                <div className="flex items-start mb-2">
                  <ArrowUpRight className="h-4 w-4 mr-2 text-green-500 flex-shrink-0 mt-1" />
                  <p className="text-sm"><span className="font-medium">Strengths:</span> {competitor.strengths}</p>
                </div>
                <div className="flex items-start">
                  <ArrowDownRight className="h-4 w-4 mr-2 text-red-500 flex-shrink-0 mt-1" />
                  <p className="text-sm"><span className="font-medium">Weaknesses:</span> {competitor.weaknesses}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Technical Brief Slides
  if (techBrief) {
    // Slide: Product Overview
    slides.push(
      <div key="product-overview" className="h-full p-8">
        <div className="flex items-center mb-6">
          <Lightbulb className="h-6 w-6 mr-2 text-amber-500" />
          <h2 className="text-2xl md:text-3xl font-bold">Product Overview</h2>
        </div>
        
        <div className="bg-amber-50 p-6 rounded-lg mb-6">
          <p className="text-lg italic text-gray-700">
            "{techBrief.productIdea || "A revolutionary product for our target market"}"
          </p>
        </div>
        
        <ScrollArea className="h-64 w-full rounded-md border p-4">
          <div className="text-gray-700 whitespace-pre-line">
            {techBrief.productOverview || "No product overview provided"}
          </div>
        </ScrollArea>
        
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Key Differentiators</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium flex items-center mb-2">
                <Target className="h-4 w-4 mr-2 text-blue-600" />
                Target Market
              </h4>
              <p className="text-sm">
                {marketData?.competitors?.length ?
                  `A ${marketData.market_size} market growing at ${marketData.market_growth} annually` :
                  "Addressing a significant market opportunity"}
              </p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium flex items-center mb-2">
                <Star className="h-4 w-4 mr-2 text-green-600" />
                Value Proposition
              </h4>
              <p className="text-sm">
                {techBrief.xFactors && techBrief.xFactors.length > 0 ?
                  techBrief.xFactors[0].description :
                  "Delivering unique value to our customers"}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
    
    // Slide: Development Process (if steps exist)
    if (techBrief.steps && techBrief.steps.length > 0) {
      slides.push(
        <div key="development-process" className="h-full p-8">
          <div className="flex items-center mb-6">
            <ListChecks className="h-6 w-6 mr-2 text-indigo-500" />
            <h2 className="text-2xl md:text-3xl font-bold">Development Process</h2>
          </div>
          
          <div className="relative ml-6 mt-8">
            {techBrief.steps.slice(0, 5).map((step, index) => (
              <div key={index} className="mb-10 relative">
                {/* Timeline connector */}
                {index < techBrief.steps.slice(0, 5).length - 1 && (
                  <div className="absolute h-full w-0.5 bg-indigo-200 left-0 top-10 -ml-3"></div>
                )}
                
                {/* Step marker */}
                <div className="absolute w-8 h-8 rounded-full bg-indigo-100 border-2 border-indigo-500 flex items-center justify-center -left-4 top-0">
                  <span className="text-sm font-bold text-indigo-600">{index + 1}</span>
                </div>
                
                {/* Step content */}
                <div className="pl-8">
                  <h4 className="text-lg font-semibold text-gray-900">{step.title}</h4>
                  <p className="text-gray-700 mt-1">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          {techBrief.steps.length > 5 && (
            <p className="text-sm text-gray-500 text-center mt-4">
              + {techBrief.steps.length - 5} additional steps not shown
            </p>
          )}
        </div>
      );
    }
    
    // Slide: Features (if features exist)
    if (techBrief.features && techBrief.features.length > 0) {
      slides.push(
        <div key="features" className="h-full p-8">
          <div className="flex items-center mb-6">
            <Package className="h-6 w-6 mr-2 text-violet-500" />
            <h2 className="text-2xl md:text-3xl font-bold">Main Features</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {techBrief.features.slice(0, 4).map((feature, index) => (
              <div key={index} className="bg-white border rounded-lg p-5 shadow-sm">
                <h3 className="text-lg font-semibold mb-2">{feature.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{feature.description}</p>
                
                {feature.benefits && feature.benefits.length > 0 && (
                  <div>
                    <Separator className="my-3" />
                    <h4 className="text-sm font-medium mb-2">Key Benefits:</h4>
                    <ul className="text-sm space-y-1">
                      {feature.benefits.slice(0, 2).map((benefit, bidx) => (
                        <li key={bidx} className="flex items-start">
                          <span className="text-green-500 mr-2">✓</span> {benefit}
                        </li>
                      ))}
                      {feature.benefits.length > 2 && (
                        <li className="text-sm text-gray-500">+ {feature.benefits.length - 2} more</li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {techBrief.features.length > 4 && (
            <p className="text-sm text-gray-500 text-center mt-6">
              + {techBrief.features.length - 4} additional features not shown
            </p>
          )}
        </div>
      );
    }
    
    // Slide: Technologies (if technologies exist)
    if (techBrief.technologies && techBrief.technologies.length > 0) {
      slides.push(
        <div key="technologies" className="h-full p-8">
          <div className="flex items-center mb-6">
            <Code className="h-6 w-6 mr-2 text-cyan-500" />
            <h2 className="text-2xl md:text-3xl font-bold">Technologies Used</h2>
          </div>
          
          <div className="flex flex-wrap gap-3 mt-8">
            {techBrief.technologies.map((tech, index) => (
              <div 
                key={index} 
                className="bg-gradient-to-r from-cyan-50 to-blue-50 px-4 py-3 rounded-lg border border-cyan-100"
              >
                <p className="font-medium text-cyan-800">{tech}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-4">Technology Benefits</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-cyan-500 font-bold mr-2">•</span>
                <p>Modern technology stack ensures scalability and future-proofing</p>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-500 font-bold mr-2">•</span>
                <p>Integration capabilities with existing systems</p>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-500 font-bold mr-2">•</span>
                <p>Robust security and performance</p>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-500 font-bold mr-2">•</span>
                <p>Support for rapid iteration and enhancement</p>
              </li>
            </ul>
          </div>
        </div>
      );
    }
    
    // Slide: X-Factors (if xFactors exist)
    if (techBrief.xFactors && techBrief.xFactors.length > 0) {
      slides.push(
        <div key="xfactors" className="h-full p-8">
          <div className="flex items-center mb-6">
            <Star className="h-6 w-6 mr-2 text-amber-500" />
            <h2 className="text-2xl md:text-3xl font-bold">Unique Selling Points</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {techBrief.xFactors.slice(0, 4).map((factor, index) => (
              <div key={index} className="bg-gradient-to-r from-amber-50 to-yellow-50 p-6 rounded-lg border border-amber-100">
                <div className="flex items-center mb-3">
                  <Star className="h-5 w-5 text-amber-500 mr-2" />
                  <h3 className="text-lg font-semibold">{factor.title}</h3>
                </div>
                <p className="text-gray-700">{factor.description}</p>
              </div>
            ))}
          </div>
          
          {techBrief.xFactors.length > 4 && (
            <p className="text-sm text-gray-500 text-center mt-6">
              + {techBrief.xFactors.length - 4} additional unique selling points not shown
            </p>
          )}
        </div>
      );
    }
  }
  
  // Final slide: Conclusion
  slides.push(
    <div key="conclusion" className="flex flex-col items-center justify-center h-full text-center p-8">
      <h2 className="text-3xl font-bold mb-6">Summary & Next Steps</h2>
      
      <div className="max-w-2xl mx-auto">
        <ul className="space-y-4 text-lg text-left mb-8">
          <li className="flex items-start">
            <span className="text-green-500 font-bold mr-2">✓</span>
            <p>
              {marketData ? 
                `Targeting a ${marketData.market_size} market with ${marketData.market_growth} growth` : 
                'Addressing a significant market opportunity'}
            </p>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 font-bold mr-2">✓</span>
            <p>
              {techBrief?.productIdea || 'Innovative product concept with clear market fit'}
            </p>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 font-bold mr-2">✓</span>
            <p>
              {techBrief?.xFactors && techBrief.xFactors.length > 0 ? 
                `Strong differentiators: ${techBrief.xFactors[0].title}` : 
                'Unique value proposition and competitive advantage'}
            </p>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 font-bold mr-2">✓</span>
            <p>Clear development roadmap and technical strategy</p>
          </li>
        </ul>
      </div>
      
      <div className="pt-4">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-md text-lg">
          Proceed to Development
        </Button>
      </div>
    </div>
  );

  return (
    <div className={`${fullscreen ? 'fixed inset-0 z-50 bg-white' : 'relative'}`}>
      <div className="flex flex-col h-full">
        {/* Presentation controls */}
        <div className="bg-gray-100 p-2 flex justify-between items-center border-b">
          <div className="flex items-center">
            <PresentationIcon className="h-5 w-5 mr-2 text-blue-600" />
            <span className="font-medium">{presentationTitle}</span>
          </div>
          <div className="flex items-center gap-1">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={prevSlide}
              disabled={currentSlide === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm mx-2">
              {currentSlide + 1} / {totalSlides}
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={nextSlide}
              disabled={currentSlide === totalSlides - 1}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleFullscreen}
              className="ml-2"
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Slide content */}
        <div className={`bg-gray-50 flex-1 ${fullscreen ? 'overflow-auto' : ''}`}>
          <div 
            className={`
              bg-white mx-auto shadow-lg relative
              ${fullscreen ? 'w-full h-full max-w-6xl' : 'aspect-[16/9] w-full'}
            `}
          >
            {slides[currentSlide]}
          </div>
        </div>
      </div>
    </div>
  );
}