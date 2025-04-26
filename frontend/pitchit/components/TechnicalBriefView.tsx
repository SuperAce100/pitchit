import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Step {
  name: string
  description: string
}

interface Feature {
  name: string
  description: string
}

interface Technology {
  name: string
  description: string
}

interface XFactor {
  name: string
  description: string
}

interface TechnicalBriefProps {
  product_idea: string
  product_overview: string
  steps: Step[]
  features: Feature[]
  technologies_used: Technology[]
  x_factors: XFactor[]
}

export function TechnicalBriefView({
  product_idea,
  product_overview,
  steps,
  features,
  technologies_used,
  x_factors,
}: TechnicalBriefProps) {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl tracking-tight mt-4">{product_idea}</h1>
      <p className="text-lg text-muted-foreground">{product_overview}</p>

      <h3 className="text-2xl tracking-tight mt-2">Workflow</h3>
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className="rounded-full bg-primary/10 text-primary w-10 h-10 flex items-center justify-center">
              {index + 1}
            </div>
            <div>
              <h4 className="font-medium">{step.name}</h4>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      <h3 className="text-2xl tracking-tight mt-2">Tech</h3>
      <div className="flex flex-wrap gap-2">
        {technologies_used.map((tech, index) => (
          <Badge key={index} variant="primary" className="p-2">
            <div>
              <div className="font-medium">{tech.name}</div>
              <div className="text-xs text-muted-foreground">{tech.description}</div>
            </div>
          </Badge>
        ))}
      </div>

      <h3 className="text-2xl tracking-tight mt-2">Features</h3>
      <div className="grid gap-4 md:grid-cols-2">
        {features.map((feature, index) => (
          <div key={index} className="rounded-lg border p-4 shadow-sm">
            <h4 className="font-medium">{feature.name}</h4>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>

    
      <h3 className="text-2xl tracking-tight mt-2">X-Factors</h3>
      <div className="grid gap-4 md:grid-cols-2">
        {x_factors.map((factor, index) => (
          <div key={index} className="rounded-lg border p-4 shadow-sm">
            <h4 className="font-medium">{factor.name}</h4>
            <p className="text-sm text-muted-foreground">{factor.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
} 