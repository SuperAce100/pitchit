import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Monitor, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogTrigger, DialogClose } from '@/components/ui/dialog';

// Slide components
const TitleSlide = ({ title, subtitle }) => (
  <div className="flex flex-col items-center justify-center h-full text-center p-8">
    <h1 className="text-4xl font-bold mb-6">{title}</h1>
    <p className="text-xl text-gray-700">{subtitle}</p>
  </div>
);

const ProductOverviewSlide = ({ product_idea, product_overview }) => (
  <div className="flex flex-col h-full p-8">
    <h2 className="text-3xl font-bold mb-6">Product Overview</h2>
    <div className="grid grid-cols-1 gap-6 flex-grow">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-2">The Idea</h3>
          <p>{product_idea}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-2">Overview</h3>
          <p>{product_overview}</p>
        </CardContent>
      </Card>
    </div>
  </div>
);

const FeatureSlide = ({ features }) => (
  <div className="flex flex-col h-full p-8">
    <h2 className="text-3xl font-bold mb-6">Key Features</h2>
    <div className="grid grid-cols-2 gap-4 flex-grow">
      {features.map((feature, index) => (
        <Card key={index} className="flex">
          <CardContent className="p-4 flex items-center">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3">
              {index + 1}
            </div>
            <p>{feature}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

const DevelopmentStepsSlide = ({ steps }) => (
  <div className="flex flex-col h-full p-8">
    <h2 className="text-3xl font-bold mb-6">Development Roadmap</h2>
    <div className="flex flex-col space-y-4 flex-grow">
      {steps.map((step, index) => (
        <div key={index} className="flex items-start">
          <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center mr-3">
            {index + 1}
          </div>
          <Card className="flex-grow">
            <CardContent className="p-4">
              <p>{step}</p>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  </div>
);

const TechnologySlide = ({ technologies_used }) => (
  <div className="flex flex-col h-full p-8">
    <h2 className="text-3xl font-bold mb-6">Technologies Used</h2>
    <div className="flex flex-wrap gap-3 flex-grow content-start">
      {technologies_used.map((tech, index) => (
        <Badge key={index} className="text-md py-2 px-3 bg-gray-100 text-gray-800 hover:bg-gray-200">
          {tech}
        </Badge>
      ))}
    </div>
  </div>
);

const XFactorsSlide = ({ x_factors }) => (
  <div className="flex flex-col h-full p-8">
    <h2 className="text-3xl font-bold mb-6">Our X-Factors</h2>
    <div className="grid grid-cols-2 gap-4 flex-grow">
      {x_factors.map((factor, index) => (
        <Card key={index} className="bg-gradient-to-br from-purple-50 to-indigo-50">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-2">Advantage {index + 1}</h3>
            <p>{factor}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

const MarketOverviewSlide = ({ market_name, market_summary, market_size, market_growth }) => (
  <div className="flex flex-col h-full p-8">
    <h2 className="text-3xl font-bold mb-6">Market Overview: {market_name}</h2>
    <div className="grid grid-cols-1 gap-6 mb-4 flex-grow">
      <Card>
        <CardContent className="p-4">
          <p>{market_summary}</p>
        </CardContent>
      </Card>
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-blue-50">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-2">Market Size</h3>
            <p className="text-2xl font-bold text-blue-600">{market_size}</p>
          </CardContent>
        </Card>
        <Card className="bg-green-50">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-2">Growth Rate</h3>
            <p className="text-2xl font-bold text-green-600">{market_growth}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
);

const CompetitorSlide = ({ competitors }) => (
  <div className="flex flex-col h-full p-8">
    <h2 className="text-3xl font-bold mb-6">Competitive Landscape</h2>
    <div className="grid grid-cols-1 gap-6 flex-grow">
      {competitors.map((competitor, index) => (
        <Card key={index} className="border-l-4 border-blue-500">
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-semibold">{competitor.name}</h3>
              <Badge variant="outline">{competitor.market_share}</Badge>
            </div>
            <p className="mb-3 text-gray-600">{competitor.description}</p>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <h4 className="text-sm font-semibold text-green-600 mb-1">Strengths</h4>
                <p className="text-sm">{competitor.strengths}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-red-600 mb-1">Weaknesses</h4>
                <p className="text-sm">{competitor.weaknesses}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

const ThankYouSlide = () => (
  <div className="flex flex-col items-center justify-center h-full text-center p-8">
    <h1 className="text-4xl font-bold mb-6">Thank You</h1>
    <p className="text-xl text-gray-700 mb-8">Questions & Discussion</p>
  </div>
);

const SlideNavigator = ({ currentSlide, totalSlides, goToSlide }) => (
  <div className="flex items-center justify-center mt-4 space-x-1">
    {Array.from({ length: totalSlides }).map((_, index) => (
      <Button
        key={index}
        variant={currentSlide === index ? "default" : "outline"}
        size="sm"
        className="w-8 h-8 p-0 rounded-full"
        onClick={() => goToSlide(index)}
      >
        {index + 1}
      </Button>
    ))}
  </div>
);

export default function SlideDeckViewer() {

    technical_brief_data = props.technical_brief_data
    market_research_data = props.market_research_data

  const [currentSlide, setCurrentSlide] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  
  // Extract properties from props
  const { 
    product_idea, 
    product_overview, 
    steps, 
    features, 
    technologies_used, 
    x_factors 
  } = technical_brief_data;
  
  const { 
    market_name, 
    market_summary, 
    market_size, 
    market_growth, 
    competitors 
  } = market_research_data;

  // Create slides array
  const slides = [
    <TitleSlide 
      title="Product Proposal" 
      subtitle="Technical Brief & Market Analysis" 
    />,
    <ProductOverviewSlide 
      product_idea={product_idea} 
      product_overview={product_overview} 
    />,
    <FeatureSlide 
      features={features} 
    />,
    <DevelopmentStepsSlide 
      steps={steps} 
    />,
    <TechnologySlide 
      technologies_used={technologies_used} 
    />,
    <XFactorsSlide 
      x_factors={x_factors} 
    />,
    <MarketOverviewSlide 
      market_name={market_name}
      market_summary={market_summary}
      market_size={market_size}
      market_growth={market_growth}
    />,
    <CompetitorSlide 
      competitors={competitors} 
    />,
    <ThankYouSlide />
  ];

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? prev : prev + 1));
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? prev : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') goToNextSlide();
    if (e.key === 'ArrowLeft') goToPrevSlide();
    if (e.key === 'Escape') setFullscreen(false);
  };

  const MainContent = () => (
    <div className="flex flex-col" onKeyDown={handleKeyDown} tabIndex="0">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Slide {currentSlide + 1} of {slides.length}</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={() => setCurrentSlide(0)}>
            First
          </Button>
          <Button variant="outline" size="sm" onClick={goToPrevSlide} disabled={currentSlide === 0}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={goToNextSlide} disabled={currentSlide === slides.length - 1}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" onClick={() => setFullscreen(true)}>
              <Monitor className="h-4 w-4" />
            </Button>
          </DialogTrigger>
        </div>
      </div>
      
      <Card className="border border-gray-200 shadow-sm">
        <CardContent className="p-0">
          <AspectRatio ratio={16/9} className="bg-white">
            <div className="w-full h-full">
              {slides[currentSlide]}
            </div>
          </AspectRatio>
        </CardContent>
      </Card>
      
      <SlideNavigator 
        currentSlide={currentSlide} 
        totalSlides={slides.length} 
        goToSlide={goToSlide} 
      />
    </div>
  );

  const FullscreenContent = () => (
    <div className="fixed inset-0 bg-white z-50 flex flex-col" onKeyDown={handleKeyDown} tabIndex="0">
      <div className="absolute top-4 right-4 z-10">
        <Button variant="outline" size="icon" className="rounded-full" onClick={() => setFullscreen(false)}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center">
        <div className="bg-white bg-opacity-75 px-4 py-2 rounded-full shadow flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={goToPrevSlide} disabled={currentSlide === 0} className="rounded-full">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <span className="text-sm font-medium">
            {currentSlide + 1} / {slides.length}
          </span>
          
          <Button variant="outline" size="sm" onClick={goToNextSlide} disabled={currentSlide === slides.length - 1} className="rounded-full">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full h-full max-w-7xl mx-auto">
          {slides[currentSlide]}
        </div>
      </div>
    </div>
  );

  return (
    <Dialog open={fullscreen} onOpenChange={setFullscreen}>
      <MainContent />
      
      <DialogContent className="max-w-full max-h-full w-full h-full p-0 m-0 border-none" hideClose>
        <FullscreenContent />
      </DialogContent>
    </Dialog>
  );
};