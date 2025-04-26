import { MarketResearchView } from "@/components/MarketResearchView"

// This would typically come from your API or database
const mockData = {
  market_size: "$500M",
  market_growth: "25% YoY",
  competitors: [
    {
      name: "Competitor A",
      description: "Traditional pitch deck creation platform",
      market_share: "40%",
      strengths: "Established brand, large user base",
      weaknesses: "Outdated technology, limited AI features",
    },
    {
      name: "Competitor B",
      description: "AI-powered presentation tool",
      market_share: "30%",
      strengths: "Modern interface, good AI integration",
      weaknesses: "Limited customization, high pricing",
    },
  ],
}

export default function MarketResearchPage() {
  return (
    <div className="container mx-auto py-8 max-w-[min(80%,64rem)]">
      <MarketResearchView {...mockData} />
    </div>
  )
} 