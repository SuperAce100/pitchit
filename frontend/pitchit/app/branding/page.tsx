import { BrandingView } from "@/components/BrandingView"

// This would typically come from your API or database
const mockData = {
  logo_url: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
  color_palette: {
    primary: "#0066FF",
    secondary: "#FF6600",
  },
  font_family: "Inter",
  font_size: "16px",
}

export default function BrandingPage() {
  return (
    <div className="container mx-auto py-8 max-w-[min(80%,64rem)]">
      <BrandingView {...mockData} />
    </div>
  )
} 