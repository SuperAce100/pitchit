import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

interface PitchDeckProps {
  companyOverview: {
    oneLiner: string;
    missionStatement: string;
  };
  problem: {
    description: string;
    currentSolutions: string;
  };
  solution: {
    productDescription: string;
    keyFeatures: string[];
  };
  market: {
    targetCustomers: string;
    marketSize: {
      totalAddressableMarket: number;
      serviceableAddressableMarket: number;
    };
    marketGrowth: string;
  };
  product: {
    demoLink: string;
    technologyStack: string;
  };
  businessModel: {
    revenueStreams: string;
    pricingStrategy: string;
  };
  traction: {
    keyMetrics: {
      users: number;
      monthlyRevenue: number;
      growthRate: string;
    };
    milestones: string[];
  };
  team: {
    founders: Array<{
      name: string;
      role: string;
      background: string;
    }>;
    advisors: string[];
  };
  competition: {
    competitors: string[];
    competitiveAdvantage: string;
  };
  financials: {
    historicalFinancials: {
      revenue: number;
      expenses: number;
    };
    projections: {
      next12MonthsRevenue: number;
      next12MonthsExpenses: number;
    };
  };
  funding: {
    amountRaising: number;
    useOfFunds: {
      productDevelopment: number;
      marketing: number;
      hiring: number;
      other: number;
    };
    fundingHistory: Array<{
      round: string;
      amount: number;
      investors: string[];
    }>;
  };
}

export function PitchDeckView(props: PitchDeckProps) {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <Carousel className="w-full">
        <CarouselContent>
          {/* Title Slide */}
          <CarouselItem>
            <div className="p-6 h-[600px] flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
              <h1 className="text-4xl font-bold text-center mb-6">{props.companyOverview.oneLiner}</h1>
              <p className="text-xl text-center max-w-2xl">{props.companyOverview.missionStatement}</p>
            </div>
          </CarouselItem>

          {/* Problem Slide */}
          <CarouselItem>
            <div className="p-6 h-[600px] flex flex-col bg-gradient-to-br from-red-50 to-orange-50 rounded-lg">
              <h2 className="text-3xl font-bold mb-6">The Problem</h2>
              <div className="flex-1 flex flex-col justify-center">
                <p className="text-xl mb-6">{props.problem.description}</p>
                <div className="bg-white/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Current Solutions:</h3>
                  <p>{props.problem.currentSolutions}</p>
                </div>
              </div>
            </div>
          </CarouselItem>

          {/* Solution Slide */}
          <CarouselItem>
            <div className="p-6 h-[600px] flex flex-col bg-gradient-to-br from-green-50 to-teal-50 rounded-lg">
              <h2 className="text-3xl font-bold mb-6">Our Solution</h2>
              <div className="flex-1 flex flex-col justify-center">
                <p className="text-xl mb-6">{props.solution.productDescription}</p>
                <div className="bg-white/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Key Features:</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {props.solution.keyFeatures.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </CarouselItem>

          {/* Market Slide */}
          <CarouselItem>
            <div className="p-6 h-[600px] flex flex-col bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
              <h2 className="text-3xl font-bold mb-6">Market Opportunity</h2>
              <div className="flex-1 grid grid-cols-2 gap-6">
                <div className="bg-white/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Target Customers</h3>
                  <p>{props.market.targetCustomers}</p>
                </div>
                <div className="bg-white/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Market Size</h3>
                  <p>TAM: ${props.market.marketSize.totalAddressableMarket.toLocaleString()}</p>
                  <p>SAM: ${props.market.marketSize.serviceableAddressableMarket.toLocaleString()}</p>
                </div>
                <div className="col-span-2 bg-white/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Market Growth</h3>
                  <p>{props.market.marketGrowth}</p>
                </div>
              </div>
            </div>
          </CarouselItem>

          {/* Product Slide */}
          <CarouselItem>
            <div className="p-6 h-[600px] flex flex-col bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg">
              <h2 className="text-3xl font-bold mb-6">Product</h2>
              <div className="flex-1 flex flex-col justify-center">
                <div className="bg-white/50 p-4 rounded-lg mb-6">
                  <h3 className="font-semibold mb-2">Demo</h3>
                  <a href={props.product.demoLink} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                    View Demo
                  </a>
                </div>
                <div className="bg-white/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Technology Stack</h3>
                  <p>{props.product.technologyStack}</p>
                </div>
              </div>
            </div>
          </CarouselItem>

          {/* Business Model Slide */}
          <CarouselItem>
            <div className="p-6 h-[600px] flex flex-col bg-gradient-to-br from-yellow-50 to-amber-50 rounded-lg">
              <h2 className="text-3xl font-bold mb-6">Business Model</h2>
              <div className="flex-1 grid grid-cols-2 gap-6">
                <div className="bg-white/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Revenue Streams</h3>
                  <p>{props.businessModel.revenueStreams}</p>
                </div>
                <div className="bg-white/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Pricing Strategy</h3>
                  <p>{props.businessModel.pricingStrategy}</p>
                </div>
              </div>
            </div>
          </CarouselItem>

          {/* Traction Slide */}
          <CarouselItem>
            <div className="p-6 h-[600px] flex flex-col bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg">
              <h2 className="text-3xl font-bold mb-6">Traction</h2>
              <div className="flex-1 grid grid-cols-2 gap-6">
                <div className="bg-white/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Key Metrics</h3>
                  <p>Users: {props.traction.keyMetrics.users.toLocaleString()}</p>
                  <p>Monthly Revenue: ${props.traction.keyMetrics.monthlyRevenue.toLocaleString()}</p>
                  <p>Growth Rate: {props.traction.keyMetrics.growthRate}</p>
                </div>
                <div className="bg-white/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Milestones</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {props.traction.milestones.map((milestone, index) => (
                      <li key={index}>{milestone}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </CarouselItem>

          {/* Team Slide */}
          <CarouselItem>
            <div className="p-6 h-[600px] flex flex-col bg-gradient-to-br from-indigo-50 to-violet-50 rounded-lg">
              <h2 className="text-3xl font-bold mb-6">Team</h2>
              <div className="flex-1 grid grid-cols-2 gap-6">
                <div className="bg-white/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-4">Founders</h3>
                  {props.team.founders.map((founder, index) => (
                    <div key={index} className="mb-4">
                      <p className="font-medium">{founder.name} - {founder.role}</p>
                      <p className="text-sm">{founder.background}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-white/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Advisors</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {props.team.advisors.map((advisor, index) => (
                      <li key={index}>{advisor}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </CarouselItem>

          {/* Competition Slide */}
          <CarouselItem>
            <div className="p-6 h-[600px] flex flex-col bg-gradient-to-br from-rose-50 to-red-50 rounded-lg">
              <h2 className="text-3xl font-bold mb-6">Competition</h2>
              <div className="flex-1 grid grid-cols-2 gap-6">
                <div className="bg-white/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Competitors</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {props.competition.competitors.map((competitor, index) => (
                      <li key={index}>{competitor}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Competitive Advantage</h3>
                  <p>{props.competition.competitiveAdvantage}</p>
                </div>
              </div>
            </div>
          </CarouselItem>

          {/* Financials Slide */}
          <CarouselItem>
            <div className="p-6 h-[600px] flex flex-col bg-gradient-to-br from-sky-50 to-blue-50 rounded-lg">
              <h2 className="text-3xl font-bold mb-6">Financials</h2>
              <div className="flex-1 grid grid-cols-2 gap-6">
                <div className="bg-white/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Historical Financials</h3>
                  <p>Revenue: ${props.financials.historicalFinancials.revenue.toLocaleString()}</p>
                  <p>Expenses: ${props.financials.historicalFinancials.expenses.toLocaleString()}</p>
                </div>
                <div className="bg-white/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Projections (Next 12 Months)</h3>
                  <p>Revenue: ${props.financials.projections.next12MonthsRevenue.toLocaleString()}</p>
                  <p>Expenses: ${props.financials.projections.next12MonthsExpenses.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </CarouselItem>

          {/* Funding Slide */}
          <CarouselItem>
            <div className="p-6 h-[600px] flex flex-col bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg">
              <h2 className="text-3xl font-bold mb-6">Funding</h2>
              <div className="flex-1 grid grid-cols-2 gap-6">
                <div className="bg-white/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Amount Raising</h3>
                  <p className="text-2xl font-bold">${props.funding.amountRaising.toLocaleString()}</p>
                </div>
                <div className="bg-white/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Use of Funds</h3>
                  <p>Product Development: ${props.funding.useOfFunds.productDevelopment.toLocaleString()}</p>
                  <p>Marketing: ${props.funding.useOfFunds.marketing.toLocaleString()}</p>
                  <p>Hiring: ${props.funding.useOfFunds.hiring.toLocaleString()}</p>
                  <p>Other: ${props.funding.useOfFunds.other.toLocaleString()}</p>
                </div>
                <div className="col-span-2 bg-white/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Funding History</h3>
                  {props.funding.fundingHistory.map((round, index) => (
                    <div key={index} className="mb-2">
                      <p className="font-medium">{round.round} - ${round.amount.toLocaleString()}</p>
                      <p className="text-sm">Investors: {round.investors.join(', ')}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </div>
  );
} 