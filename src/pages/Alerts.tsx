import { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, MapPin, Info, Calendar, TrendingDown, Droplets, Thermometer, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';

const mockAlerts = [
  {
    id: 1,
    severity: 'high',
    title: 'Critical Soil Moisture Deficit',
    summary: 'Soil moisture levels below 20% threshold in 12 blocks of Rajasthan',
    variable: 'soil',
    region: 'Rajasthan - Jaisalmer District',
    timestamp: '2024-01-15T10:30:00Z',
    sparkline: [45, 42, 38, 35, 28, 22, 18], // Declining soil moisture
    bbox: [70.9, 26.9, 71.5, 27.3]
  },
  {
    id: 2,
    severity: 'medium',
    title: 'NDVI Anomaly Detected',
    summary: 'Vegetation index 15% below seasonal average in wheat growing regions',
    variable: 'ndvi',
    region: 'Punjab - Bathinda',
    timestamp: '2024-01-14T14:20:00Z',
    sparkline: [0.75, 0.73, 0.68, 0.65, 0.62, 0.59, 0.58],
    bbox: [74.9, 30.1, 75.3, 30.5]
  },
  {
    id: 3,
    severity: 'low',
    title: 'Temperature Stress Warning',
    summary: 'Temperatures exceeding 35°C for 5 consecutive days during flowering',
    variable: 'temp',
    region: 'Maharashtra - Aurangabad',
    timestamp: '2024-01-13T09:15:00Z',
    sparkline: [32, 34, 36, 37, 38, 36, 35],
    bbox: [75.2, 19.8, 75.6, 20.2]
  },
  {
    id: 4,
    severity: 'high',
    title: 'Rainfall Deficit Alert',
    summary: 'Cumulative rainfall 40% below normal for the season',
    variable: 'rainfall',
    region: 'Karnataka - Belgaum',
    timestamp: '2024-01-12T16:45:00Z',
    sparkline: [25, 20, 15, 10, 8, 5, 3],
    bbox: [74.4, 15.8, 74.8, 16.2]
  }
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'high': return 'destructive';
    case 'medium': return 'outline';
    case 'low': return 'secondary';
    default: return 'secondary';
  }
};

const getVariableIcon = (variable: string) => {
  switch (variable) {
    case 'soil': return Droplets;
    case 'temp': return Thermometer;
    case 'ndvi': return TrendingDown;
    case 'rainfall': return Droplets;
    default: return AlertTriangle;
  }
};

export default function Alerts() {
  const [selectedAlert, setSelectedAlert] = useState<typeof mockAlerts[0] | null>(null);
  const [filters, setFilters] = useState({
    severity: 'all',
    variable: 'all',
    dateRange: '7d'
  });

  const filteredAlerts = mockAlerts.filter(alert => {
    if (filters.severity !== 'all' && alert.severity !== filters.severity) return false;
    if (filters.variable !== 'all' && alert.variable !== filters.variable) return false;
    return true;
  });

  const MiniSparkline = ({ data, className = "" }: { data: number[], className?: string }) => (
    <div className={`flex items-end gap-0.5 h-8 ${className}`}>
      {data.map((value, i) => {
        const height = Math.max(2, (value / Math.max(...data)) * 100);
        return (
          <div
            key={i}
            className="bg-current rounded-sm w-1 opacity-60"
            style={{ height: `${height}%` }}
          />
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-bold mb-2">Risk & Anomaly Center</h1>
          <p className="text-muted-foreground">
            Monitor agricultural risks and environmental anomalies across regions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Filter className="h-5 w-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Severity</label>
                  <Select value={filters.severity} onValueChange={(value) => setFilters(prev => ({ ...prev, severity: value }))}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Variable</label>
                  <Select value={filters.variable} onValueChange={(value) => setFilters(prev => ({ ...prev, variable: value }))}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Variables</SelectItem>
                      <SelectItem value="temp">Temperature</SelectItem>
                      <SelectItem value="rainfall">Rainfall</SelectItem>
                      <SelectItem value="ndvi">NDVI</SelectItem>
                      <SelectItem value="soil">Soil Moisture</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Time Range</label>
                  <Select value={filters.dateRange} onValueChange={(value) => setFilters(prev => ({ ...prev, dateRange: value }))}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1d">Last 24 hours</SelectItem>
                      <SelectItem value="7d">Last 7 days</SelectItem>
                      <SelectItem value="30d">Last 30 days</SelectItem>
                      <SelectItem value="90d">Last 90 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Alert Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Critical</span>
                  <Badge variant="destructive" className="text-xs">
                    {filteredAlerts.filter(a => a.severity === 'high').length}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Warning</span>
                  <Badge className="text-xs" style={{ backgroundColor: 'hsl(var(--warning))' }}>
                    {filteredAlerts.filter(a => a.severity === 'medium').length}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Info</span>
                  <Badge variant="secondary" className="text-xs">
                    {filteredAlerts.filter(a => a.severity === 'low').length}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="list" className="space-y-4">
              <TabsList>
                <TabsTrigger value="list">Alert List</TabsTrigger>
                <TabsTrigger value="map">Map View</TabsTrigger>
              </TabsList>

              <TabsContent value="list">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Active Alerts ({filteredAlerts.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[600px]">
                      <div className="space-y-3">
                        {filteredAlerts.map((alert, index) => {
                          const Icon = getVariableIcon(alert.variable);
                          return (
                            <motion.div
                              key={alert.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <Card className="hover-lift cursor-pointer border-border">
                                <CardContent className="p-4">
                                  <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0">
                                      <Badge variant={getSeverityColor(alert.severity)} className="mb-2">
                                        {alert.severity.toUpperCase()}
                                      </Badge>
                                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                                        <Icon className="h-4 w-4" />
                                      </div>
                                    </div>
                                    
                                    <div className="flex-1 min-w-0">
                                      <h4 className="font-semibold text-sm mb-1">{alert.title}</h4>
                                      <p className="text-xs text-muted-foreground mb-2">{alert.summary}</p>
                                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                          <MapPin className="h-3 w-3" />
                                          {alert.region}
                                        </span>
                                        <span className="flex items-center gap-1">
                                          <Calendar className="h-3 w-3" />
                                          {new Date(alert.timestamp).toLocaleDateString()}
                                        </span>
                                      </div>
                                    </div>

                                    <div className="flex-shrink-0 flex items-center gap-3">
                                      <MiniSparkline 
                                        data={alert.sparkline} 
                                        className="text-muted-foreground w-16" 
                                      />
                                      <div className="flex flex-col gap-1">
                                        <Button size="sm" variant="outline" className="h-7 px-2 text-xs">
                                          <MapPin className="h-3 w-3 mr-1" />
                                          Map
                                        </Button>
                                        <Drawer>
                                          <DrawerTrigger asChild>
                                            <Button size="sm" variant="outline" className="h-7 px-2 text-xs">
                                              <Info className="h-3 w-3 mr-1" />
                                              Info
                                            </Button>
                                          </DrawerTrigger>
                                          <DrawerContent className="max-w-2xl mx-auto">
                                            <DrawerHeader>
                                              <DrawerTitle>{alert.title}</DrawerTitle>
                                            </DrawerHeader>
                                            <div className="p-6 space-y-4">
                                              <div>
                                                <h4 className="font-semibold mb-2">Alert Details</h4>
                                                <p className="text-sm text-muted-foreground">{alert.summary}</p>
                                              </div>
                                              <div>
                                                <h4 className="font-semibold mb-2">Data Sources</h4>
                                                <div className="text-sm space-y-1">
                                                  <p>• Satellite imagery from Sentinel-2</p>
                                                  <p>• Weather station data from IMD</p>
                                                  <p>• Soil moisture sensors (SMAP)</p>
                                                </div>
                                              </div>
                                              <div>
                                                <h4 className="font-semibold mb-2">Recommended Actions</h4>
                                                <div className="text-sm space-y-1">
                                                  <p>• Implement water conservation measures</p>
                                                  <p>• Consider drought-resistant crop varieties</p>
                                                  <p>• Monitor irrigation schedules closely</p>
                                                </div>
                                              </div>
                                            </div>
                                          </DrawerContent>
                                        </Drawer>
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </motion.div>
                          );
                        })}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="map">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Alert Hotspots</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[600px] bg-muted rounded-lg border border-border flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <MapPin className="h-8 w-8 mx-auto text-muted-foreground" />
                        <div className="text-sm font-medium">Interactive Alert Map</div>
                        <div className="text-xs text-muted-foreground max-w-md">
                          Geographic visualization of alerts with severity-based clustering and zoom-to-region functionality
                        </div>
                        <Badge variant="secondary">Map Integration Coming Soon</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}