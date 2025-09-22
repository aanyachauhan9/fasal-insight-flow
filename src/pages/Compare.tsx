import { motion } from 'framer-motion';
import { Plus, Download, Share, FileText, TrendingUp, Droplets, Thermometer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';

const compareRegions = [
  {
    id: 1,
    name: "Punjab - Ludhiana",
    crop: "Wheat",
    season: "Rabi 2023-24",
    kpis: {
      ndvi: 0.78,
      rainfall: 580,
      yield: 4.6,
      anomalies: 2
    },
    status: "Good",
    trend: "up"
  },
  {
    id: 2,
    name: "Haryana - Karnal", 
    crop: "Wheat",
    season: "Rabi 2023-24",
    kpis: {
      ndvi: 0.72,
      rainfall: 520,
      yield: 4.2,
      anomalies: 1
    },
    status: "Fair",
    trend: "stable"
  },
  {
    id: 3,
    name: "Uttar Pradesh - Meerut",
    crop: "Wheat", 
    season: "Rabi 2023-24",
    kpis: {
      ndvi: 0.69,
      rainfall: 465,
      yield: 3.9,
      anomalies: 4
    },
    status: "Watch",
    trend: "down"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Good': return 'text-success';
    case 'Fair': return 'text-warning';
    case 'Watch': return 'text-destructive';
    default: return 'text-muted-foreground';
  }
};

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case 'up': return '↗️';
    case 'down': return '↘️';
    case 'stable': return '→';
    default: return '—';
  }
};

export default function Compare() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Regional Comparison</h1>
              <p className="text-muted-foreground">
                Side-by-side analysis of agricultural performance across regions
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Create Guide
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Comparison Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {compareRegions.map((region, index) => (
            <motion.div
              key={region.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="shadow-card hover-lift">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{region.name}</CardTitle>
                    <Badge className={getStatusColor(region.status)} variant="secondary">
                      {region.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{region.crop}</span>
                    <span>•</span>
                    <span>{region.season}</span>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* KPI Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{region.kpis.ndvi}</div>
                      <div className="text-xs text-muted-foreground">Mean NDVI</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-water">{region.kpis.rainfall}mm</div>
                      <div className="text-xs text-muted-foreground">Rainfall</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-crop">{region.kpis.yield}t</div>
                      <div className="text-xs text-muted-foreground">Est. Yield/ha</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-destructive">{region.kpis.anomalies}</div>
                      <div className="text-xs text-muted-foreground">Anomalies</div>
                    </div>
                  </div>

                  <Separator />

                  {/* Mini Chart Placeholder */}
                  <div className="h-20 bg-muted rounded border flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground">Time Series Chart</div>
                      <div className="text-lg">{getTrendIcon(region.trend)}</div>
                    </div>
                  </div>

                  {/* Progress Indicators */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        NDVI Health
                      </span>
                      <span>{Math.round(region.kpis.ndvi * 100)}%</span>
                    </div>
                    <Progress value={region.kpis.ndvi * 100} className="h-1" />
                    
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1">
                        <Droplets className="h-3 w-3" />
                        Rainfall Adequacy
                      </span>
                      <span>{Math.round((region.kpis.rainfall / 600) * 100)}%</span>
                    </div>
                    <Progress value={(region.kpis.rainfall / 600) * 100} className="h-1" />
                  </div>

                  {/* Season Calendar Strip */}
                  <div className="mt-4">
                    <div className="text-xs font-medium mb-2">Season Progress</div>
                    <div className="flex h-2 rounded-full overflow-hidden bg-muted">
                      <div className="bg-soil w-1/4" title="Land Prep" />
                      <div className="bg-crop w-1/4" title="Sowing" />
                      <div className="bg-primary w-1/4" title="Growth (Current)" />
                      <div className="bg-muted w-1/4" title="Harvest" />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Prep</span>
                      <span>Sow</span>
                      <span>Grow</span>
                      <span>Harvest</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Add New Comparison */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="shadow-card border-dashed border-2 hover-lift cursor-pointer">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                <Plus className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Add Region for Comparison</h3>
              <p className="text-sm text-muted-foreground mb-4 max-w-md">
                Compare up to 3 regions or crops side-by-side. Add another region to see detailed performance metrics.
              </p>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Select Region
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Synchronized Time Series */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Synchronized Time Series
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">NDVI</Button>
                  <Button variant="outline" size="sm">Rainfall</Button>
                  <Button variant="outline" size="sm">Temperature</Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted rounded-lg border border-border flex items-center justify-center">
                <div className="text-center space-y-2">
                  <TrendingUp className="h-8 w-8 mx-auto text-muted-foreground" />
                  <div className="text-sm font-medium">Multi-Series Chart View</div>
                  <div className="text-xs text-muted-foreground">
                    Synchronized time series for all selected regions
                  </div>
                  <Badge variant="secondary">Chart Integration Coming Soon</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}