import { TechnicalBriefView } from "@/components/TechnicalBriefView"

// This would typically come from your API or database
const mockData = {
  product_idea: "A revolutionary AI-powered pitch deck generator",
  product_overview: "An intelligent platform that helps entrepreneurs create compelling pitch decks using AI",
  steps: [
    {
      name: "Data Collection",
      description: "Gather information about the product, market, and business model",
    },
    {
      name: "AI Analysis",
      description: "Process the collected data to generate insights and recommendations",
    },
    {
      name: "Deck Generation",
      description: "Create a professional pitch deck with optimized content and design",
    },
  ],
  features: [
    {
      name: "AI-Powered Content",
      description: "Generate compelling content based on your business data",
    },
    {
      name: "Smart Design",
      description: "Automatically create visually appealing slides with consistent branding",
    },
  ],
  technologies_used: [
    {
      name: "Next.js",
      description: "React framework for the frontend",
    },
    {
      name: "OpenAI",
      description: "AI model for content generation",
    },
  ],
  x_factors: [
    {
      name: "Unique Value Proposition",
      description: "First AI-powered pitch deck generator with real-time collaboration",
    },
    {
      name: "Market Timing",
      description: "Perfect timing with the rise of AI and remote work",
    },
  ],
}

export default function TechnicalBriefPage() {
  return (
    <div className="container mx-auto py-4 max-w-[min(80%,64rem)]">
      <TechnicalBriefView {...mockData} />
    </div>
  )
} 