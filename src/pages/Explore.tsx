import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, History, Settings, Download, Edit3, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

const mockHistory = [
  "Show wheat yield trends in Punjab, last 3 years",
  "Compare rainfall patterns across Haryana districts",
  "NDVI anomalies in Maharashtra this season",
  "Soil moisture deficit in Rajasthan blocks",
];

const mockResponse = {
  summary: "Based on the analysis of wheat yield data in Punjab from 2021-2023, there's been a consistent upward trend with average yields increasing from 4.2 to 4.7 tonnes per hectare. The correlation with rainfall patterns shows optimal yields occur with 550-650mm precipitation during the growing season.",
  sql: `SELECT 
  district_name,
  year,
  AVG(yield_tonnes_per_hectare) as avg_yield,
  SUM(rainfall_mm) as total_rainfall
FROM agriculture_data 
WHERE state = 'Punjab' 
  AND crop = 'Wheat'
  AND year BETWEEN 2021 AND 2023
GROUP BY district_name, year
ORDER BY year, avg_yield DESC;`,
  sources: [
    { title: "Punjab Agricultural Statistics 2023", snippet: "Wheat production data across 22 districts..." },
    { title: "IMD Weather Data", snippet: "Rainfall measurements from meteorological stations..." },
    { title: "Satellite NDVI Analysis", snippet: "Vegetation health indices from Sentinel-2..." }
  ]
};

export default function Explore() {
  const [query, setQuery] = useState('');
  const [currentQuery, setCurrentQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [activeTab, setActiveTab] = useState('map');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setCurrentQuery(query);
      setShowResults(true);
      setQuery('');
    }
  };

  const loadHistoryQuery = (historyQuery: string) => {
    setQuery(historyQuery);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-bold mb-2">Agricultural Data Explorer</h1>
          <p className="text-muted-foreground">
            Ask questions about crops, weather, soil, and yield data in natural language
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Left Panel - Chat Interface */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>Chat Panel</span>
                  <Badge variant="secondary" className="text-xs">AI</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Query Input */}
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="relative">
                    <Input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="e.g., Show wheat yield and rainfall trend in Bundelkhand, last 5 years"
                      className="pr-12 min-h-[60px] text-sm resize-none"
                    />
                    <Button
                      type="submit"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      disabled={!query.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </form>

                {/* Response Card */}
                {showResults && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3"
                  >
                    <div className="text-sm font-medium text-muted-foreground">
                      Query: "{currentQuery}"
                    </div>
                    
                    <div className="rounded-lg border border-border bg-muted/50 p-4 space-y-3">
                      <div className="text-sm">{mockResponse.summary}</div>
                      
                      <Separator />
                      
                      <details className="text-xs">
                        <summary className="cursor-pointer font-medium text-muted-foreground hover:text-foreground">
                          Generated SQL
                        </summary>
                        <pre className="mt-2 whitespace-pre-wrap font-mono bg-background p-2 rounded border text-xs overflow-x-auto">
                          {mockResponse.sql}
                        </pre>
                      </details>
                      
                      <details className="text-xs">
                        <summary className="cursor-pointer font-medium text-muted-foreground hover:text-foreground">
                          Sources ({mockResponse.sources.length})
                        </summary>
                        <div className="mt-2 space-y-1">
                          {mockResponse.sources.map((source, index) => (
                            <div key={index} className="p-2 bg-background rounded border">
                              <div className="font-medium">{source.title}</div>
                              <div className="text-muted-foreground">{source.snippet}</div>
                            </div>
                          ))}
                        </div>
                      </details>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Play className="h-3 w-3 mr-1" />
                        Run
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit3 className="h-3 w-3 mr-1" />
                        Edit SQL
                      </Button>
                      <Button size="sm" variant="outline">
                        Clear
                      </Button>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>

            {/* Query History */}
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <History className="h-4 w-4" />
                  Recent Queries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-32">
                  <div className="space-y-2">
                    {mockHistory.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => loadHistoryQuery(item)}
                        className="w-full text-left text-xs p-2 rounded hover:bg-muted transition-colors border border-transparent hover:border-border"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Filters */}
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Settings className="h-4 w-4" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                <div>
                  <label className="font-medium">Date Range</label>
                  <select className="w-full mt-1 p-1 border rounded text-xs">
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Current Season</option>
                    <option>Custom</option>
                  </select>
                </div>
                <div>
                  <label className="font-medium">Variables</label>
                  <div className="mt-1 space-y-1">
                    {['Rainfall', 'NDVI', 'Soil Moisture', 'Temperature', 'Yield'].map((variable) => (
                      <label key={variable} className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="rounded text-xs" />
                        <span>{variable}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Results */}
          <div className="lg:col-span-2">
            <Card className="h-full shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Analysis Results</CardTitle>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="h-full p-0">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
                  <TabsList className="w-full justify-start rounded-none border-b">
                    <TabsTrigger value="map">Map</TabsTrigger>
                    <TabsTrigger value="charts">Charts</TabsTrigger>
                    <TabsTrigger value="table">Table</TabsTrigger>
                    <TabsTrigger value="nowcast">Yield Nowcast</TabsTrigger>
                  </TabsList>
                  
                  <div className="flex-1 overflow-hidden">
                    <TabsContent value="map" className="h-full m-0 p-4">
                      <div className="h-full bg-muted rounded-lg border border-border flex items-center justify-center">
                        <div className="text-center space-y-2">
                          <div className="text-sm font-medium">Interactive Map View</div>
                          <div className="text-xs text-muted-foreground">
                            District boundaries, weather stations, and data points would appear here
                          </div>
                          <Badge variant="secondary">Map Integration Coming Soon</Badge>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="charts" className="h-full m-0 p-4">
                      <div className="h-full bg-muted rounded-lg border border-border flex items-center justify-center">
                        <div className="text-center space-y-2">
                          <div className="text-sm font-medium">Data Visualizations</div>
                          <div className="text-xs text-muted-foreground">
                            Time series, bar charts, and scatter plots based on your query
                          </div>
                          <Badge variant="secondary">Charts Loading...</Badge>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="table" className="h-full m-0 p-4">
                      <div className="h-full bg-muted rounded-lg border border-border flex items-center justify-center">
                        <div className="text-center space-y-2">
                          <div className="text-sm font-medium">Data Table</div>
                          <div className="text-xs text-muted-foreground">
                            Sortable table with query results and export options
                          </div>
                          <Badge variant="secondary">Loading Data...</Badge>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="nowcast" className="h-full m-0 p-4">
                      <div className="space-y-4">
                        <Card className="border border-border">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg flex items-center justify-between">
                              Wheat Yield Forecast
                              <Badge variant="secondary" className="text-xs">Live Model v2.1</Badge>
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="grid grid-cols-3 gap-4 text-center">
                              <div>
                                <div className="text-2xl font-bold text-primary">4.5</div>
                                <div className="text-xs text-muted-foreground">Mean (t/ha)</div>
                              </div>
                              <div>
                                <div className="text-sm text-muted-foreground">3.8 - 5.2</div>
                                <div className="text-xs text-muted-foreground">95% Confidence</div>
                              </div>
                              <div>
                                <div className="text-sm text-success">+12%</div>
                                <div className="text-xs text-muted-foreground">vs Last Year</div>
                              </div>
                            </div>
                            
                            <Separator />
                            
                            <div>
                              <div className="text-sm font-medium mb-2">Key Factors</div>
                              <div className="space-y-1 text-xs">
                                <div className="flex justify-between">
                                  <span>NDVI Score</span>
                                  <span className="text-primary">0.75 (High)</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Rainfall</span>
                                  <span className="text-success">588mm (Optimal)</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Temperature</span>
                                  <span className="text-warning">24.2°C (Above avg)</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>
                  </div>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}