import { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart, 
  TrendingUp, 
  Users, 
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Search
} from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { 
  HoverCard,
  HoverCardTrigger,
  HoverCardContent
} from "@/components/ui/hover-card";

export default function MarketResearchViewer() {
  const [activeTab, setActiveTab] = useState("overview");
  const [marketData, setMarketData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");



  useEffect(() => {
    // Parse the JSON data from props
    try {
      if (props.marketData) {
        // If props.marketData is a string, parse it as JSON
        if (typeof props.marketData === 'string') {
          setMarketData(JSON.parse(props.marketData));
        } else {
          // If it's already an object, use it directly
          setMarketData(props.marketData);
        }
      }
      setLoading(false);
    } catch (err) {
      console.error("Error parsing JSON data:", err);
      setError("Failed to parse market research data");
      setLoading(false);
    }
  }, [props.marketData]);

  // Filter competitors based on search term
  const filteredCompetitors = marketData?.competitors?.filter(competitor => 
    competitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    competitor.description.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (loading) {
    return (
      <Card className="w-full shadow-md">
        <CardContent className="p-8 flex justify-center">
          <div className="flex flex-col items-center">
            <div className="h-8 w-8 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-500">Loading market research data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !marketData) {
    return (
      <Card className="w-full shadow-md">
        <CardContent className="p-8">
          <div className="flex flex-col items-center text-center">
            <BarChart className="h-12 w-12 text-red-500 mb-4" />
            <h3 className="text-lg font-medium">Error Loading Market Data</h3>
            <p className="mt-2 text-gray-500">{error || "No market data available"}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Function to convert market share string to number (e.g., "25%" -> 25)
  const parseMarketShare = (shareStr) => {
    if (!shareStr) return 0;
    const match = shareStr.match(/(\d+)/);
    return match ? parseInt(match[0], 10) : 0;
  };

  // Sort competitors by market share (highest first)
  const sortedCompetitors = [...filteredCompetitors].sort((a, b) => 
    parseMarketShare(b.market_share) - parseMarketShare(a.market_share)
  );

  const renderCompetitorCards = () => {
    return sortedCompetitors.map((competitor, index) => (
      <Card key={index} className="mb-6 overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg font-medium">{competitor.name}</CardTitle>
              <CardDescription className="mt-1">{competitor.description}</CardDescription>
            </div>
            <Badge className="bg-blue-100 text-blue-800 border-blue-200">
              {competitor.market_share}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pb-3">
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Market Share</span>
              <span className="text-sm text-gray-500">{competitor.market_share}</span>
            </div>
            <Progress
              value={parseMarketShare(competitor.market_share)}
              className="h-2"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <h4 className="text-sm font-medium flex items-center mb-2">
                <ArrowUpRight className="h-4 w-4 mr-1 text-green-500" />
                Strengths
              </h4>
              <p className="text-sm text-gray-600">{competitor.strengths}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium flex items-center mb-2">
                <ArrowDownRight className="h-4 w-4 mr-1 text-red-500" />
                Weaknesses
              </h4>
              <p className="text-sm text-gray-600">{competitor.weaknesses}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    ));
  };

  const renderCompetitorTable = () => {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">Company</TableHead>
              <TableHead>Market Share</TableHead>
              <TableHead className="hidden md:table-cell">Strengths</TableHead>
              <TableHead className="hidden md:table-cell">Weaknesses</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedCompetitors.map((competitor, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  <div className="flex flex-col">
                    <span>{competitor.name}</span>
                    <span className="text-xs text-gray-500 md:hidden">
                      {competitor.description.substring(0, 50)}...
                    </span>
                    <span className="hidden text-xs text-gray-500 md:inline-block">
                      {competitor.description}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className="bg-blue-50 text-blue-700">
                    {competitor.market_share}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <span className="cursor-help underline decoration-dotted underline-offset-2">
                        {competitor.strengths.substring(0, 40)}...
                      </span>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <p className="text-sm">{competitor.strengths}</p>
                    </HoverCardContent>
                  </HoverCard>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <span className="cursor-help underline decoration-dotted underline-offset-2">
                        {competitor.weaknesses.substring(0, 40)}...
                      </span>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <p className="text-sm">{competitor.weaknesses}</p>
                    </HoverCardContent>
                  </HoverCard>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  return (
    <Card className="w-full shadow-md">
      <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 border-b">
        <Badge variant="outline" className="w-fit mb-2 bg-blue-100 text-blue-800 border-blue-200">
          Market Research
        </Badge>
        
        <CardTitle className="text-xl font-bold">
          {props.title || marketData.market_name || "Market Analysis Report"}
        </CardTitle>
        
        <CardDescription className="mt-2">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
            <div className="flex items-center text-blue-700">
              <BarChart className="h-4 w-4 mr-1" />
              <span className="font-medium">Market Size:</span>
              <span className="ml-1">{marketData.market_size}</span>
            </div>
            <div className="flex items-center text-green-700">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span className="font-medium">Growth Rate:</span>
              <span className="ml-1">{marketData.market_growth}</span>
            </div>
          </div>
          {(marketData.market_summary || props.market_summary) && (
            <div className="mt-3 text-gray-600">
              {marketData.market_summary || props.market_summary}
            </div>
          )}
        </CardDescription>
      </CardHeader>
      
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview" className="text-xs sm:text-sm">
            <BarChart className="h-4 w-4 mr-1 sm:mr-2" /> Overview
          </TabsTrigger>
          <TabsTrigger value="competitors-cards" className="text-xs sm:text-sm">
            <Users className="h-4 w-4 mr-1 sm:mr-2" /> Competitor Cards
          </TabsTrigger>
          <TabsTrigger value="competitors-table" className="text-xs sm:text-sm">
            <PieChart className="h-4 w-4 mr-1 sm:mr-2" /> Comparison Table
          </TabsTrigger>
        </TabsList>
        
        <CardContent className="p-0">
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search competitors..."
                className="pl-8 h-9 rounded-md border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-full text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <ScrollArea className="h-[500px] w-full">
            <TabsContent value="overview" className="p-6 m-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <BarChart className="h-4 w-4 mr-2 text-blue-500" />
                      Market Size
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-semibold">{marketData.market_size}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Total addressable market value as of latest data
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
                      Growth Rate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-semibold">{marketData.market_growth}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Projected annual growth rate for the next 5 years
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              {(marketData.market_name || props.market_name) && (
                <Card className="mt-6">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <PieChart className="h-4 w-4 mr-2 text-purple-500" />
                      {marketData.market_name || props.market_name}
                    </CardTitle>
                  </CardHeader>
                  {(marketData.market_summary || props.market_summary) && (
                    <CardContent>
                      <p className="text-sm text-gray-700">{marketData.market_summary || props.market_summary}</p>
                    </CardContent>
                  )}
                </Card>
              )}
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-3">Key Competitors Overview</h3>
                <Separator className="mb-4" />
                
                <div className="space-y-4">
                  {sortedCompetitors.slice(0, 5).map((competitor, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="font-medium text-gray-700">{competitor.name}</span>
                      </div>
                      <div className="flex items-center">
                        <Progress
                          value={parseMarketShare(competitor.market_share)}
                          className="h-2 w-24 sm:w-32 md:w-40 mr-3"
                        />
                        <span className="text-sm font-medium min-w-[45px] text-right">
                          {competitor.market_share}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                
                {marketData.competitors.length > 5 && (
                  <div className="mt-4 text-center text-sm text-gray-500">
                    + {marketData.competitors.length - 5} more competitors
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="competitors-cards" className="p-6 m-0">
              {sortedCompetitors.length > 0 ? (
                renderCompetitorCards()
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No competitors match your search
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="competitors-table" className="p-6 m-0">
              {sortedCompetitors.length > 0 ? (
                renderCompetitorTable()
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No competitors match your search
                </div>
              )}
            </TabsContent>
          </ScrollArea>
        </CardContent>
      </Tabs>
      
      <CardFooter className="bg-gray-50 p-4 flex justify-between items-center text-sm text-gray-600 border-t">
        <p className="text-xs text-gray-500">
          {props.date ? `Last updated: ${props.date}` : 'Last updated: N/A'}
        </p>
        
        <Button variant="outline" size="sm" className="text-xs flex items-center">
          <Download className="h-3 w-3 mr-1" /> Export Research
        </Button>
      </CardFooter>
    </Card>
  );
}