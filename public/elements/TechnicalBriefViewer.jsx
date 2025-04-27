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
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  Lightbulb, 
  FileText, 
  ListChecks, 
  Package, 
  Code, 
  Star,
  Download
} from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function TechnicalBriefViewer() {
  const [activeTab, setActiveTab] = useState("overview");
  const [brief, setBrief] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Parse the JSON data from props
    try {
      if (props.briefData) {
        // If props.briefData is a string, parse it as JSON
        if (typeof props.briefData === 'string') {
          setBrief(JSON.parse(props.briefData));
        } else {
          // If it's already an object, use it directly
          setBrief(props.briefData);
        }
      }
      setLoading(false);
    } catch (err) {
      console.error("Error parsing JSON data:", err);
      setError("Failed to parse technical brief data");
      setLoading(false);
    }
  }, [props.briefData]);

  if (loading) {
    return (
      <Card className="w-full shadow-md">
        <CardContent className="p-8 flex justify-center">
          <div className="flex flex-col items-center">
            <div className="h-8 w-8 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-500">Loading technical brief...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !brief) {
    return (
      <Card className="w-full shadow-md">
        <CardContent className="p-8">
          <div className="flex flex-col items-center text-center">
            <FileText className="h-12 w-12 text-red-500 mb-4" />
            <h3 className="text-lg font-medium">Error Loading Brief</h3>
            <p className="mt-2 text-gray-500">{error || "No brief data available"}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const renderTechnologies = () => {
    if (!brief.technologies || brief.technologies.length === 0) {
      return <p className="text-gray-500">No technologies specified</p>;
    }

    return (
      <div className="flex flex-wrap gap-2 mt-2">
        {brief.technologies.map((tech, index) => (
          <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-800 hover:bg-gray-200">
            {tech}
          </Badge>
        ))}
      </div>
    );
  };

  const renderXFactors = () => {
    if (!brief.xFactors || brief.xFactors.length === 0) {
      return <p className="text-gray-500">No unique selling points specified</p>;
    }

    return (
      <div className="space-y-4 mt-4">
        {brief.xFactors.map((factor, index) => (
          <div key={index} className="flex items-start">
            <Star className="h-5 w-5 mr-2 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium">{factor.title}</h4>
              <p className="text-gray-600 text-sm">{factor.description}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderFeatures = () => {
    if (!brief.features || brief.features.length === 0) {
      return <p className="text-gray-500">No features specified</p>;
    }

    return (
      <Accordion type="single" collapsible className="w-full">
        {brief.features.map((feature, index) => (
          <AccordionItem key={index} value={`feature-${index}`}>
            <AccordionTrigger className="text-base font-medium py-3">
              {feature.name}
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              <p className="mb-2">{feature.description}</p>
              {feature.benefits && (
                <div className="mt-4">
                  <h5 className="font-medium text-sm mb-2">Benefits:</h5>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {feature.benefits.map((benefit, bidx) => (
                      <li key={bidx} className="text-gray-600">{benefit}</li>
                    ))}
                  </ul>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    );
  };

  const renderSteps = () => {
    if (!brief.steps || brief.steps.length === 0) {
      return <p className="text-gray-500">No development steps specified</p>;
    }

    return (
      <div className="relative ml-6 mt-4">
        {brief.steps.map((step, index) => (
          <div key={index} className="mb-8 relative">
            {/* Timeline connector */}
            {index < brief.steps.length - 1 && (
              <div className="absolute h-full w-0.5 bg-gray-200 left-0 top-8 -ml-3"></div>
            )}
            
            {/* Step marker */}
            <div className="absolute w-6 h-6 rounded-full bg-blue-100 border-2 border-blue-500 flex items-center justify-center -left-3 top-0">
              <span className="text-xs font-bold text-blue-600">{index + 1}</span>
            </div>
            
            {/* Step content */}
            <div className="pl-6">
              <h4 className="font-medium text-gray-900">{step.title}</h4>
              <p className="text-gray-600 mt-1">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card className="w-full shadow-md">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
            Technical Brief
          </Badge>
          {brief.status && (
            <Badge variant="outline" className={
              brief.status === 'Draft' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
              brief.status === 'Review' ? 'bg-purple-100 text-purple-800 border-purple-200' :
              brief.status === 'Approved' ? 'bg-green-100 text-green-800 border-green-200' :
              'bg-gray-100 text-gray-800 border-gray-200'
            }>
              {brief.status}
            </Badge>
          )}
        </div>
        
        <CardTitle className="text-xl font-bold">{brief.productName || 'Unnamed Product'}</CardTitle>
        
        <CardDescription className="mt-2">
          <div className="font-medium text-gray-700">{brief.productIdea || 'No product idea specified'}</div>
          <div className="flex items-center mt-3 text-sm text-gray-500">
            {brief.author && (
              <span className="mr-4">Author: {brief.author}</span>
            )}
            {brief.date && (
              <span>Date: {brief.date}</span>
            )}
          </div>
        </CardDescription>
      </CardHeader>
      
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 p-0">
          <TabsTrigger value="overview" className="text-xs sm:text-sm py-2">
            <FileText className="h-4 w-4 mr-1 sm:mr-2" /> Overview
          </TabsTrigger>
          <TabsTrigger value="steps" className="text-xs sm:text-sm py-2">
            <ListChecks className="h-4 w-4 mr-1 sm:mr-2" /> Process
          </TabsTrigger>
          <TabsTrigger value="features" className="text-xs sm:text-sm py-2">
            <Package className="h-4 w-4 mr-1 sm:mr-2" /> Features
          </TabsTrigger>
          <TabsTrigger value="technologies" className="text-xs sm:text-sm py-2">
            <Code className="h-4 w-4 mr-1 sm:mr-2" /> Tech
          </TabsTrigger>
          <TabsTrigger value="xfactors" className="text-xs sm:text-sm py-2">
            <Star className="h-4 w-4 mr-1 sm:mr-2" /> X-Factors
          </TabsTrigger>
        </TabsList>
        
        <CardContent className="p-0">
          <ScrollArea className="h-[450px] w-full">
            <TabsContent value="overview" className="p-6 m-0">
              <h3 className="text-lg font-medium flex items-center mb-3">
                <FileText className="h-5 w-5 mr-2 text-blue-500" />
                Product Overview
              </h3>
              <Separator className="mb-4" />
              <div className="text-gray-700 whitespace-pre-line">
                {brief.productOverview || 'No product overview provided'}
              </div>
            </TabsContent>
            
            <TabsContent value="steps" className="p-6 m-0">
              <h3 className="text-lg font-medium flex items-center mb-3">
                <ListChecks className="h-5 w-5 mr-2 text-blue-500" />
                Development Process
              </h3>
              <Separator className="mb-4" />
              {renderSteps()}
            </TabsContent>
            
            <TabsContent value="features" className="p-6 m-0">
              <h3 className="text-lg font-medium flex items-center mb-3">
                <Package className="h-5 w-5 mr-2 text-blue-500" />
                Main Features
              </h3>
              <Separator className="mb-4" />
              {renderFeatures()}
            </TabsContent>
            
            <TabsContent value="technologies" className="p-6 m-0">
              <h3 className="text-lg font-medium flex items-center mb-3">
                <Code className="h-5 w-5 mr-2 text-blue-500" />
                Technologies Used
              </h3>
              <Separator className="mb-4" />
              {renderTechnologies()}
            </TabsContent>
            
            <TabsContent value="xfactors" className="p-6 m-0">
              <h3 className="text-lg font-medium flex items-center mb-3">
                <Star className="h-5 w-5 mr-2 text-blue-500" />
                Unique Selling Points
              </h3>
              <Separator className="mb-4" />
              {renderXFactors()}
            </TabsContent>
          </ScrollArea>
        </CardContent>
      </Tabs>
      
      <CardFooter className="bg-gray-50 p-4 flex justify-between items-center text-sm text-gray-600 border-t">
        <p className="text-xs text-gray-500">
          {brief.version ? `Version ${brief.version}` : 'No version information'}
        </p>
        
        <Button variant="outline" size="sm" className="text-xs flex items-center">
          <Download className="h-3 w-3 mr-1" /> Export Brief
        </Button>
      </CardFooter>
    </Card>
  );
}