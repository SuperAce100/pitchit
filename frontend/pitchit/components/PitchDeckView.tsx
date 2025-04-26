import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

// Shared styles
const styles = {
  slide: "p-6 h-[600px] flex flex-col",
  slide_title: "text-4xl tracking-tight mb-6",
  content_card: "bg-white/80 p-4 rounded-lg",
  content_title: "font-semibold mb-2",
  list: "list-disc pl-5 space-y-2",
  grid: "flex-1 grid grid-cols-2 gap-6",
  full_width: "col-span-2",
  slide_background: "bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg"
};

// Slide Components
const TitleSlide = ({ company_name, tagline }: { company_name: string; tagline: string }) => (
  <div className={`${styles.slide} items-center justify-center ${styles.slide_background}`}>
    <h1 className="text-4xl font-bold text-center mb-6">{company_name}</h1>
    <p className="text-xl text-center max-w-2xl">{tagline}</p>
  </div>
);

const ProblemSlide = ({ problem_statement, why_now }: { problem_statement: string; why_now?: string }) => (
  <div className={`${styles.slide} items-center justify-center ${styles.slide_background}`}>
    <h2 className={styles.slide_title}>The Problem</h2>
    <div className="flex-1 flex flex-col justify-center">
      <p className="text-xl mb-6">{problem_statement}</p>
      {why_now && (
        <div className={styles.content_card}>
          <h3 className={styles.content_title}>Why Now?</h3>
          <p>{why_now}</p>
        </div>
      )}
    </div>
  </div>
);

const SolutionSlide = ({ product_overview, key_features, unique_value_proposition }: { 
  product_overview: string; 
  key_features?: string[]; 
  unique_value_proposition?: string;
}) => (
  <div className={`${styles.slide} items-center justify-center ${styles.slide_background}`}>
    <h2 className={styles.slide_title}>Our Solution</h2>
    <div className="flex-1 flex flex-col justify-center">
      <p className="text-xl mb-6">{product_overview}</p>
      {key_features && key_features.length > 0 && (
        <div className={styles.content_card}>
          <h3 className={styles.content_title}>Key Features:</h3>
          <ul className={styles.list}>
            {key_features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      )}
      {unique_value_proposition && (
        <div className={`${styles.content_card} mt-4`}>
          <h3 className={styles.content_title}>Unique Value Proposition:</h3>
          <p>{unique_value_proposition}</p>
        </div>
      )}
    </div>
  </div>
);

const MarketOpportunitySlide = ({ target_market, market_size, market_growth }: { 
  target_market: string; 
  market_size: string; 
  market_growth?: string;
}) => (
  <div className={`${styles.slide} items-center justify-center ${styles.slide_background}`}>
    <h2 className={styles.slide_title}>Market Opportunity</h2>
    <div className={styles.grid}>
      <div className={styles.content_card}>
        <h3 className={styles.content_title}>Target Market</h3>
        <p>{target_market}</p>
      </div>
      <div className={styles.content_card}>
        <h3 className={styles.content_title}>Market Size</h3>
        <p>{market_size}</p>
      </div>
      {market_growth && (
        <div className={`${styles.content_card} ${styles.full_width}`}>
          <h3 className={styles.content_title}>Market Growth</h3>
          <p>{market_growth}</p>
        </div>
      )}
    </div>
  </div>
);

const ProductDemonstrationSlide = ({ how_it_works, user_experience_highlights }: { 
  how_it_works: string; 
  user_experience_highlights?: string;
}) => (
  <div className={`${styles.slide} items-center justify-center ${styles.slide_background}`}>
    <h2 className={styles.slide_title}>Product Demonstration</h2>
    <div className="flex-1 flex flex-col justify-center">
      <div className={styles.content_card}>
        <h3 className={styles.content_title}>How It Works</h3>
        <p>{how_it_works}</p>
      </div>
      {user_experience_highlights && (
        <div className={`${styles.content_card} mt-4`}>
          <h3 className={styles.content_title}>User Experience Highlights</h3>
          <p>{user_experience_highlights}</p>
        </div>
      )}
    </div>
  </div>
);

const BusinessModelSlide = ({ revenue_streams, pricing_strategy }: { 
  revenue_streams: string; 
  pricing_strategy?: string;
}) => (
  <div className={`${styles.slide} items-center justify-center ${styles.slide_background}`}>
    <h2 className={styles.slide_title}>Business Model</h2>
    <div className={styles.grid}>
      <div className={styles.content_card}>
        <h3 className={styles.content_title}>Revenue Streams</h3>
        <p>{revenue_streams}</p>
      </div>
      {pricing_strategy && (
        <div className={styles.content_card}>
          <h3 className={styles.content_title}>Pricing Strategy</h3>
          <p>{pricing_strategy}</p>
        </div>
      )}
    </div>
  </div>
);

const RoadmapSlide = ({ milestones_achieved, future_plans }: { 
  milestones_achieved?: string[]; 
  future_plans?: string[];
}) => (
  <div className={`${styles.slide} items-center justify-center ${styles.slide_background}`}>
    <h2 className={styles.slide_title}>Roadmap</h2>
    <div className={styles.grid}>
      {milestones_achieved && milestones_achieved.length > 0 && (
        <div className={styles.content_card}>
          <h3 className={styles.content_title}>Milestones Achieved</h3>
          <ul className={styles.list}>
            {milestones_achieved.map((milestone, index) => (
              <li key={index}>{milestone}</li>
            ))}
          </ul>
        </div>
      )}
      {future_plans && future_plans.length > 0 && (
        <div className={styles.content_card}>
          <h3 className={styles.content_title}>Future Plans</h3>
          <ul className={styles.list}>
            {future_plans.map((plan, index) => (
              <li key={index}>{plan}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </div>
);

const CallToActionSlide = ({ funding_needs, use_of_funds, vision_statement }: { 
  funding_needs: string; 
  use_of_funds: string; 
  vision_statement?: string;
}) => (
  <div className={`${styles.slide} items-center justify-center ${styles.slide_background}`}>
    <h2 className={styles.slide_title}>Call to Action</h2>
    <div className={styles.grid}>
      <div className={styles.content_card}>
        <h3 className={styles.content_title}>Funding Needs</h3>
        <p className="text-2xl font-bold">{funding_needs}</p>
      </div>
      <div className={styles.content_card}>
        <h3 className={styles.content_title}>Use of Funds</h3>
        <p>{use_of_funds}</p>
      </div>
      {vision_statement && (
        <div className={`${styles.content_card} ${styles.full_width}`}>
          <h3 className={styles.content_title}>Vision Statement</h3>
          <p>{vision_statement}</p>
        </div>
      )}
    </div>
  </div>
);

interface PitchDeckProps {
  slide_1_title: {
    company_name: string;
    tagline: string;
  };
  slide_2_problem: {
    problem_statement: string;
    why_now?: string;
  };
  slide_3_solution: {
    product_overview: string;
    key_features?: string[];
    unique_value_proposition?: string;
  };
  slide_4_market_opportunity: {
    target_market: string;
    market_size: string;
    market_growth?: string;
  };
  slide_5_product_demonstration: {
    how_it_works: string;
    user_experience_highlights?: string;
  };
  slide_6_business_model: {
    revenue_streams: string;
    pricing_strategy?: string;
  };
  slide_7_roadmap: {
    milestones_achieved?: string[];
    future_plans?: string[];
  };
  slide_8_call_to_action: {
    funding_needs: string;
    use_of_funds: string;
    vision_statement?: string;
  };
}

export function PitchDeckView(props: PitchDeckProps) {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <Carousel className="w-full">
        <CarouselContent>
          <CarouselItem>
            <TitleSlide {...props.slide_1_title} />
          </CarouselItem>
          <CarouselItem>
            <ProblemSlide {...props.slide_2_problem} />
          </CarouselItem>
          <CarouselItem>
            <SolutionSlide {...props.slide_3_solution} />
          </CarouselItem>
          <CarouselItem>
            <MarketOpportunitySlide {...props.slide_4_market_opportunity} />
          </CarouselItem>
          <CarouselItem>
            <ProductDemonstrationSlide {...props.slide_5_product_demonstration} />
          </CarouselItem>
          <CarouselItem>
            <BusinessModelSlide {...props.slide_6_business_model} />
          </CarouselItem>
          <CarouselItem>
            <RoadmapSlide {...props.slide_7_roadmap} />
          </CarouselItem>
          <CarouselItem>
            <CallToActionSlide {...props.slide_8_call_to_action} />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </div>
  );
} 