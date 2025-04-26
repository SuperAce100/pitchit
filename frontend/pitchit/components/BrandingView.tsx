import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface BrandingProps {
  logo_url: string
  color_palette: {
    primary: string
    secondary: string
  }
  font_family: string
  font_size: string
}

export function BrandingView( props : BrandingProps) {
  const color_palette = props.color_palette;
  const font_family = props.font_family;
  const font_size = props.font_size;
  const logo_url = props.logo_url;
  console.log(props);
  return (
    <div className="space-y-12">
      <h1 className="text-4xl tracking-tight">Brand Identity</h1>
      <div className="flex items-center space-x-8">
        <div className="h-32 w-32 rounded-lg border bg-muted">
          {logo_url && (
            <img
              src={logo_url}
              alt="Logo"
              className="h-full w-full rounded-lg object-cover"
            />
          )}
        </div>
        <div>
          <h3 className="text-xl font-medium">Logo</h3>
          <p className="text-base text-muted-foreground">
            {logo_url ? "Custom logo uploaded" : "No logo uploaded"}
          </p>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-xl font-medium">Color Palette</h3>
        <div className="flex space-x-8">
          <div>
            <div
              className="h-20 w-20 rounded-full border"
              style={{ backgroundColor: color_palette.primary }}
            />
            <p className="mt-2 text-base">Primary</p>
          </div>
          <div>
            <div
              className="h-20 w-20 rounded-full border"
              style={{ backgroundColor: color_palette.secondary }}
            />
            <p className="mt-2 text-base">Secondary</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-xl font-medium">Typography</h3>
        <div className="space-y-4">
          <div>
            <p className="text-base text-muted-foreground">Font Family</p>
            <p className={cn("text-xl font-medium", font_family)}>{font_family}</p>
          </div>
          <div>
            <p className="text-base text-muted-foreground">Base Font Size</p>
            <p style={{ fontSize: font_size }} className="text-xl font-medium">
              {font_size}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 