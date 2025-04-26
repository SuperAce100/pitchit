'use client';

import { useState, useEffect } from 'react';
import { RepoView } from '@/components/RepoView';
import { useSearchParams } from 'next/navigation';

export default function RepoPage() {
  const [repoData, setRepoData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const repoUrl = searchParams.get('url');

  useEffect(() => {
    const fetchRepoData = async () => {
      if (!repoUrl) {
        setError('No repository URL provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // In a real app, you would fetch the data from your API
        // For now, we'll use mock data
        const mockData = {
        "name": "marketmind",
        "description": "Test marketmindrepository for cloning",
        "url": "https://github.com/mrTSB/marketmind",
        "readme": "# marketmind\n\nWon best overall prize at CMU's AI Valley Hackathon.\n",
        "created_by": "mrTSB",
            "tree": "marketmind_4246167c-daed-4c90-bf92-16e69d5054ed/\n\u251c\u2500\u2500 backend/\n\u2502   \u251c\u2500\u2500 db.py\n\u2502   \u251c\u2500\u2500 executive_briefs.py\n\u2502   \u251c\u2500\u2500 generate_gtm.py\n\u2502   \u251c\u2500\u2500 heatmap.py\n\u2502   \u251c\u2500\u2500 main.py\n\u2502   \u251c\u2500\u2500 make_campaigns.py\n\u2502   \u251c\u2500\u2500 make_personas.py\n\u2502   \u251c\u2500\u2500 market_research.py\n\u2502   \u251c\u2500\u2500 models/\n\u2502   \u2502   \u251c\u2500\u2500 __init__.py\n\u2502   \u2502   \u251c\u2500\u2500 agents.py\n\u2502   \u2502   \u251c\u2500\u2500 images.py\n\u2502   \u2502   \u251c\u2500\u2500 llms.py\n\u2502   \u2502   \u251c\u2500\u2500 tool_registry.py\n\u2502   \u2502   \u2514\u2500\u2500 tools.py\n\u2502   \u251c\u2500\u2500 pyproject.toml\n\u2502   \u251c\u2500\u2500 test_backend.py\n\u2502   \u2514\u2500\u2500 uv.lock\n\u251c\u2500\u2500 frontend/\n\u2502   \u2514\u2500\u2500 marketmind/\n\u2502       \u251c\u2500\u2500 app/\n\u2502       \u2502   \u251c\u2500\u2500 analytics/\n\u2502       \u2502   \u2502   \u2514\u2500\u2500 page.tsx\n\u2502       \u2502   \u251c\u2500\u2500 api/\n\u2502       \u2502   \u2502   \u251c\u2500\u2500 clear-content/\n\u2502       \u2502   \u2502   \u2502   \u2514\u2500\u2500 route.ts\n\u2502       \u2502   \u2502   \u251c\u2500\u2500 group-chat/\n\u2502       \u2502   \u2502   \u2502   \u2514\u2500\u2500 route.ts\n\u2502       \u2502   \u2502   \u251c\u2500\u2500 heatmap/\n\u2502       \u2502   \u2502   \u2502   \u2514\u2500\u2500 route.ts\n\u2502       \u2502   \u2502   \u251c\u2500\u2500 load-content/\n\u2502       \u2502   \u2502   \u2502   \u2514\u2500\u2500 route.ts\n\u2502       \u2502   \u2502   \u251c\u2500\u2500 save-campaigns/\n\u2502       \u2502   \u2502   \u2502   \u2514\u2500\u2500 route.ts\n\u2502       \u2502   \u2502   \u2514\u2500\u2500 save-content/\n\u2502       \u2502   \u2502       \u2514\u2500\u2500 route.ts\n\u2502       \u2502   \u251c\u2500\u2500 campaigns/\n\u2502       \u2502   \u2502   \u2514\u2500\u2500 page.tsx\n\u2502       \u2502   \u251c\u2500\u2500 communicator.tsx\n\u2502       \u2502   \u251c\u2500\u2500 content/\n\u2502       \u2502   \u2502   \u251c\u2500\u2500 campaigns-058b65ba-b1f6-411a-bd01-cfc2591a393e.json\n\u2502       \u2502   \u2502   \u251c\u2500\u2500 campaigns-fdfc77a1-541f-4f18-ad48-a296f2fbe01d.json\n\u2502       \u2502   \u2502   \u251c\u2500\u2500 executive-brief-058b65ba-b1f6-411a-bd01-cfc2591a393e.json\n\u2502       \u2502   \u2502   \u251c\u2500\u2500 executive-brief-fdfc77a1-541f-4f18-ad48-a296f2fbe01d.json\n\u2502       \u2502   \u2502   \u251c\u2500\u2500 gtm-plan-058b65ba-b1f6-411a-bd01-cfc2591a393e.json\n\u2502       \u2502   \u2502   \u251c\u2500\u2500 gtm-plan-fdfc77a1-541f-4f18-ad48-a296f2fbe01d.json\n\u2502       \u2502   \u2502   \u251c\u2500\u2500 market-research-058b65ba-b1f6-411a-bd01-cfc2591a393e.json\n\u2502       \u2502   \u2502   \u251c\u2500\u2500 market-research-fdfc77a1-541f-4f18-ad48-a296f2fbe01d.json\n\u2502       \u2502   \u2502   \u251c\u2500\u2500 personas-058b65ba-b1f6-411a-bd01-cfc2591a393e.json\n\u2502       \u2502   \u2502   \u2514\u2500\u2500 personas-fdfc77a1-541f-4f18-ad48-a296f2fbe01d.json\n\u2502       \u2502   \u251c\u2500\u2500 dashboard/\n\u2502       \u2502   \u2502   \u2514\u2500\u2500 page.tsx\n\u2502       \u2502   \u251c\u2500\u2500 executive-brief/\n\u2502       \u2502   \u2502   \u2514\u2500\u2500 page.tsx\n\u2502       \u2502   \u251c\u2500\u2500 favicon.ico\n\u2502       \u2502   \u251c\u2500\u2500 generate/\n\u2502       \u2502   \u2502   \u2514\u2500\u2500 page.tsx\n\u2502       \u2502   \u251c\u2500\u2500 globals.css\n\u2502       \u2502   \u251c\u2500\u2500 gtm/\n\u2502       \u2502   \u2502   \u2514\u2500\u2500 page.tsx\n\u2502       \u2502   \u251c\u2500\u2500 heatmap/\n\u2502       \u2502   \u2502   \u2514\u2500\u2500 page.tsx\n\u2502       \u2502   \u251c\u2500\u2500 layout.tsx\n\u2502       \u2502   \u251c\u2500\u2500 market-research/\n\u2502       \u2502   \u2502   \u2514\u2500\u2500 page.tsx\n\u2502       \u2502   \u251c\u2500\u2500 page.tsx\n\u2502       \u2502   \u251c\u2500\u2500 personas/\n\u2502       \u2502   \u2502   \u2514\u2500\u2500 page.tsx\n\u2502       \u2502   \u251c\u2500\u2500 providers/\n\u2502       \u2502   \u2502   \u2514\u2500\u2500 content_id_provider.tsx\n\u2502       \u2502   \u2514\u2500\u2500 settings/\n\u2502       \u2502       \u2514\u2500\u2500 page.tsx\n\u2502       \u251c\u2500\u2500 components/\n\u2502       \u2502   \u251c\u2500\u2500 Campaign.tsx\n\u2502       \u2502   \u251c\u2500\u2500 ChatDialog.tsx\n\u2502       \u2502   \u251c\u2500\u2500 DetailedCampaign.tsx\n\u2502       \u2502   \u251c\u2500\u2500 executive-brief/\n\u2502       \u2502   \u2502   \u2514\u2500\u2500 ExecutiveBrief.tsx\n\u2502       \u2502   \u251c\u2500\u2500 GroupChatDialog.tsx\n\u2502       \u2502   \u251c\u2500\u2500 gtm/\n\u2502       \u2502   \u2502   \u2514\u2500\u2500 GTMPlan.tsx\n\u2502       \u2502   \u251c\u2500\u2500 HeatmapAnalysis.tsx\n\u2502       \u2502   \u251c\u2500\u2500 LandingPage.tsx\n\u2502       \u2502   \u251c\u2500\u2500 LoadingModal.tsx\n\u2502       \u2502   \u251c\u2500\u2500 magicui/\n\u2502       \u2502   \u2502   \u251c\u2500\u2500 border-beam.tsx\n\u2502       \u2502   \u2502   \u251c\u2500\u2500 dot-pattern.tsx\n\u2502       \u2502   \u2502   \u251c\u2500\u2500 marquee.tsx\n\u2502       \u2502   \u2502   \u251c\u2500\u2500 ripple.tsx\n\u2502       \u2502   \u2502   \u2514\u2500\u2500 text-animate.tsx\n\u2502       \u2502   \u251c\u2500\u2500 market-research/\n\u2502       \u2502   \u2502   \u251c\u2500\u2500 Competitor.tsx\n\u2502       \u2502   \u2502   \u251c\u2500\u2500 MarketDemographics.tsx\n\u2502       \u2502   \u2502   \u251c\u2500\u2500 MarketSize.tsx\n\u2502       \u2502   \u2502   \u251c\u2500\u2500 MarketTrends.tsx\n\u2502       \u2502   \u2502   \u251c\u2500\u2500 PainPoints.tsx\n\u2502       \u2502   \u2502   \u2514\u2500\u2500 RegulatoryEnvironment.tsx\n\u2502       \u2502   \u251c\u2500\u2500 Navigation.tsx\n\u2502       \u2502   \u251c\u2500\u2500 Persona.tsx\n\u2502       \u2502   \u251c\u2500\u2500 QuickLoadingModal.tsx\n\u2502       \u2502   \u251c\u2500\u2500 theme-provider.tsx\n\u2502       \u2502   \u2514\u2500\u2500 ui/\n\u2502       \u2502       \u251c\u2500\u2500 accordion.tsx\n\u2502       \u2502       \u251c\u2500\u2500 alert.tsx\n\u2502       \u2502       \u251c\u2500\u2500 badge.tsx\n\u2502       \u2502       \u251c\u2500\u2500 button.tsx\n\u2502       \u2502       \u251c\u2500\u2500 card.tsx\n\u2502       \u2502       \u251c\u2500\u2500 command.tsx\n\u2502       \u2502       \u251c\u2500\u2500 compare.tsx\n\u2502       \u2502       \u251c\u2500\u2500 dialog.tsx\n\u2502       \u2502       \u251c\u2500\u2500 dropdown-menu.tsx\n\u2502       \u2502       \u251c\u2500\u2500 flip-words.tsx\n\u2502       \u2502       \u251c\u2500\u2500 input.tsx\n\u2502       \u2502       \u251c\u2500\u2500 mode-toggle.tsx\n\u2502       \u2502       \u251c\u2500\u2500 navigation-menu.tsx\n\u2502       \u2502       \u251c\u2500\u2500 progress.tsx\n\u2502       \u2502       \u251c\u2500\u2500 scroll-area.tsx\n\u2502       \u2502       \u251c\u2500\u2500 select.tsx\n\u2502       \u2502       \u251c\u2500\u2500 skeleton.tsx\n\u2502       \u2502       \u251c\u2500\u2500 sparkles.tsx\n\u2502       \u2502       \u251c\u2500\u2500 tabs.tsx\n\u2502       \u2502       \u2514\u2500\u2500 text-hover-effect.tsx\n\u2502       \u251c\u2500\u2500 components.json\n\u2502       \u251c\u2500\u2500 eslint.config.mjs\n\u2502       \u251c\u2500\u2500 fancy/\n\u2502       \u2502   \u2514\u2500\u2500 components/\n\u2502       \u2502       \u2514\u2500\u2500 text/\n\u2502       \u2502           \u2514\u2500\u2500 typewriter.tsx\n\u2502       \u251c\u2500\u2500 lib/\n\u2502       \u2502   \u2514\u2500\u2500 utils.ts\n\u2502       \u251c\u2500\u2500 next.config.js\n\u2502       \u251c\u2500\u2500 next.config.ts\n\u2502       \u251c\u2500\u2500 package.json\n\u2502       \u251c\u2500\u2500 pnpm-lock.yaml\n\u2502       \u251c\u2500\u2500 postcss.config.mjs\n\u2502       \u251c\u2500\u2500 public/\n\u2502       \u2502   \u251c\u2500\u2500 logo.svg\n\u2502       \u2502   \u251c\u2500\u2500 logos/\n\u2502       \u2502   \u2502   \u251c\u2500\u2500 google.svg\n\u2502       \u2502   \u2502   \u251c\u2500\u2500 HubSpot.svg\n\u2502       \u2502   \u2502   \u251c\u2500\u2500 Microsoft.svg\n\u2502       \u2502   \u2502   \u251c\u2500\u2500 notion.svg\n\u2502       \u2502   \u2502   \u251c\u2500\u2500 slack.svg\n\u2502       \u2502   \u2502   \u2514\u2500\u2500 Snapchat.svg\n\u2502       \u2502   \u2514\u2500\u2500 marketmind-logo.png\n\u2502       \u251c\u2500\u2500 README.md\n\u2502       \u2514\u2500\u2500 tsconfig.json\n\u2514\u2500\u2500 README.md\n"
        };

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setRepoData(mockData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch repository data');
        setLoading(false);
        console.error(err);
      }
    };

    fetchRepoData();
  }, [repoUrl]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="text-destructive text-xl mb-4">{error}</div>
        <a href="/generate" className="text-primary hover:underline">
          Go back to generate page
        </a>
      </div>
    );
  }

  if (!repoData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="text-xl mb-4">No repository data available</div>
        <a href="/generate" className="text-primary hover:underline">
          Go back to generate page
        </a>
      </div>
    );
  }

  return <RepoView {...repoData} />;
}
