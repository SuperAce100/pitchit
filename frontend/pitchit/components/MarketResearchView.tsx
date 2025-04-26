import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Competitor {
  name: string
  description: string
  market_share: string
  strengths: string
  weaknesses: string
}

interface MarketResearchProps {
  market_name: string
  market_summary: string
  market_size: string
  market_growth: string
  competitors: Competitor[]
}

export function MarketResearchView({
  market_name,
  market_summary,
  market_size,
  market_growth,
  competitors,
}: MarketResearchProps) {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl tracking-tight">{market_name}</h1>
      <p className="text-lg text-muted-foreground">{market_summary}</p>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border p-6">
          <h2 className="text-lg font-medium mb-2">Market Size</h2>
          <p className="text-2xl font-bold">{market_size}</p>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="text-lg font-medium mb-2">Market Growth</h2>
          <p className="text-2xl font-bold">{market_growth}</p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-2xl mb-4">Competitors</h3>
        <div className="space-y-6 grid gap-6 grid-cols-1 md:grid-cols-2">
          {competitors.map((competitor, index) => (
            <div key={index} className="rounded-lg border p-4">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-medium">{competitor.name}</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">Market Share:</span>
                  <span className="font-medium">{competitor.market_share}</span>
                </div>
              </div>
              <p className="mb-4 text-sm text-muted-foreground">{competitor.description}</p>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 font-medium text-green-600">Strengths</h4>
                  <p className="text-sm">{competitor.strengths}</p>
                </div>
                <div>
                  <h4 className="mb-2 font-medium text-red-600">Weaknesses</h4>
                  <p className="text-sm">{competitor.weaknesses}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 