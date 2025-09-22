import { motion } from 'framer-motion';
import { 
  Database, 
  Clock, 
  Activity, 
  Users, 
  Zap,
  CheckCircle,
  AlertCircle,
  XCircle,
  TrendingUp,
  MapPin,
  Calendar
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

const systemMetrics = {
  datasets: {
    total: 12,
    loaded: 11,
    status: 'healthy'
  },
  lastIngest: '2024-01-15T14:30:00Z',
  latencyP95: 145, // milliseconds
  rowCount: 2847000, // approximate
  vectorSync: 'ok'
};

const datasets = [
  {
    name: 'IMD Weather Stations',
    status: 'active',
    coverage: 'India-wide',
    lastUpdate: '2024-01-15T12:00:00Z',
    records: 450000
  },
  {
    name: 'Sentinel-2 NDVI',
    status: 'active', 
    coverage: 'Pan-India',
    lastUpdate: '2024-01-14T18:30:00Z',
    records: 890000
  },
  {
    name: 'SMAP Soil Moisture',
    status: 'active',
    coverage: 'Global (India subset)',
    lastUpdate: '2024-01-15T06:00:00Z',
    records: 234000
  },
  {
    name: 'Agricultural Census',
    status: 'active',
    coverage: 'District-level',
    lastUpdate: '2024-01-10T00:00:00Z',
    records: 156000
  },
  {
    name: 'Crop Yield Statistics',
    status: 'active',
    coverage: '28 states',
    lastUpdate: '2024-01-12T15:45:00Z',
    records: 78000
  },
  {
    name: 'Market Prices (AGMARKNET)',
    status: 'warning',
    coverage: '6000+ markets',
    lastUpdate: '2024-01-13T09:30:00Z',
    records: 340000
  }
];

const changelog = [
  {
    date: '2024-01-15',
    version: 'v2.4.0',
    type: 'feature',
    description: 'Added multilingual support for Hindi, Telugu, Bengali, and Tamil'
  },
  {
    date: '2024-01-12', 
    version: 'v2.3.1',
    type: 'improvement',
    description: 'Improved NDVI anomaly detection accuracy by 15%'
  },
  {
    date: '2024-01-08',
    version: 'v2.3.0',
    type: 'feature', 
    description: 'Launched WhatsApp bot integration with Twilio'
  },
  {
    date: '2024-01-05',
    version: 'v2.2.3',
    type: 'fix',
    description: 'Fixed soil moisture data ingestion pipeline delays'
  },
  {
    date: '2024-01-02',
    version: 'v2.2.2',
    type: 'improvement',
    description: 'Enhanced map rendering performance for large datasets'
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'active':
    case 'healthy':
    case 'ok':
      return <CheckCircle className="h-4 w-4 text-success" />;
    case 'warning':
    case 'lag':
      return <AlertCircle className="h-4 w-4 text-warning" />;
    case 'error':
    case 'failed':
      return <XCircle className="h-4 w-4 text-destructive" />;
    default:
      return <Activity className="h-4 w-4 text-muted-foreground" />;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'feature': return 'bg-primary text-primary-foreground';
    case 'improvement': return 'bg-success text-success-foreground';
    case 'fix': return 'bg-warning text-warning-foreground';
    default: return 'bg-secondary text-secondary-foreground';
  }
};

export default function About() {
  const healthPercentage = (systemMetrics.datasets.loaded / systemMetrics.datasets.total) * 100;
  const uptimeHours = Math.floor(Math.random() * 100) + 720; // Mock uptime
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-bold mb-2">System Status & Information</h1>
          <p className="text-muted-foreground">
            Real-time health metrics, data coverage, and system performance monitoring
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* System Pulse */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  System Pulse
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Overall Health</span>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(systemMetrics.datasets.status)}
                    <span className="text-sm">{healthPercentage.toFixed(1)}%</span>
                  </div>
                </div>
                <Progress value={healthPercentage} className="h-2" />

                <Separator />

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Datasets Loaded</span>
                    <span className="font-medium">
                      {systemMetrics.datasets.loaded}/{systemMetrics.datasets.total}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Ingest</span>
                    <span className="font-medium">
                      {new Date(systemMetrics.lastIngest).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">P95 Latency</span>
                    <span className="font-medium">{systemMetrics.latencyP95}ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Records</span>
                    <span className="font-medium">
                      {(systemMetrics.rowCount / 1000000).toFixed(1)}M
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Vector Sync</span>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(systemMetrics.vectorSync)}
                      <span className="font-medium">Active</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">{uptimeHours}h</div>
                    <div className="text-xs text-muted-foreground">Uptime</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-success">99.2%</div>
                    <div className="text-xs text-muted-foreground">Availability</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-water">1.2K</div>
                    <div className="text-xs text-muted-foreground">Queries/day</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-crop">85</div>
                    <div className="text-xs text-muted-foreground">Active Users</div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">API Response Time</span>
                    <Badge variant="secondary">Excellent</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Data Freshness</span>
                    <Badge variant="secondary">&lt; 30 min</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Error Rate</span>
                    <Badge variant="secondary">0.03%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Coverage Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Data Coverage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-40 bg-muted rounded-lg border border-border flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <MapPin className="h-6 w-6 mx-auto text-muted-foreground" />
                    <div className="text-sm font-medium">Coverage Map</div>
                    <div className="text-xs text-muted-foreground">
                      Pan-India agricultural data coverage
                    </div>
                  </div>
                </div>
                <div className="mt-4 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span>States Covered</span>
                    <span className="font-medium">28/28</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Districts</span>
                    <span className="font-medium">640+</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Weather Stations</span>
                    <span className="font-medium">1,200+</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Dataset Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Data Sources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {datasets.map((dataset, index) => (
                    <div 
                      key={dataset.name}
                      className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {getStatusIcon(dataset.status)}
                          <h4 className="font-medium text-sm">{dataset.name}</h4>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {dataset.coverage} • {(dataset.records / 1000).toFixed(0)}K records
                        </div>
                      </div>
                      <div className="text-right text-xs">
                        <div className="text-muted-foreground">Updated</div>
                        <div className="font-medium">
                          {new Date(dataset.lastUpdate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Changelog */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Recent Updates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {changelog.map((item, index) => (
                    <div 
                      key={`${item.date}-${index}`}
                      className="flex gap-3 p-3 rounded-lg border border-border"
                    >
                      <div className="flex-shrink-0">
                        <Badge 
                          className={`text-xs ${getTypeColor(item.type)}`}
                          variant="secondary"
                        >
                          {item.type}
                        </Badge>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium">{item.version}</span>
                          <span className="text-xs text-muted-foreground">{item.date}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* API Documentation Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6"
        >
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                API Contracts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="font-medium mb-1">POST /chat/run</div>
                  <div className="text-xs text-muted-foreground">
                    Natural language query processing
                  </div>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="font-medium mb-1">GET /yield/nowcast</div>
                  <div className="text-xs text-muted-foreground">
                    Real-time yield predictions
                  </div>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="font-medium mb-1">POST /alerts/search</div>
                  <div className="text-xs text-muted-foreground">
                    Agricultural risk monitoring
                  </div>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="font-medium mb-1">GET /status</div>
                  <div className="text-xs text-muted-foreground">
                    System health metrics
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}