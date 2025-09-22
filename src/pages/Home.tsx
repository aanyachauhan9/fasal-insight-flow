import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Map, TrendingUp, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import heroImage from '@/assets/hero-agriculture.jpg';

const presets = [
  {
    title: "District-wise NDVI (Kharif 2023)",
    description: "Visualize vegetation health across districts for the current Kharif season",
    href: "/explore?preset=ndvi-kharif",
    icon: TrendingUp,
    badge: "Popular"
  },
  {
    title: "Top 10 blocks by soil moisture deficit",
    description: "Identify regions with critical soil moisture levels this week",
    href: "/alerts?filter=soil-deficit", 
    icon: BarChart3,
    badge: "Alert"
  },
  {
    title: "Yield vs rainfall (Bihar, 2019–2024)",
    description: "Compare historical yield patterns with rainfall data",
    href: "/compare?preset=bihar-yield",
    icon: Map,
    badge: "Analysis"
  }
];

const features = [
  {
    icon: Zap,
    title: "AI-Powered Analytics",
    description: "Convert natural language questions into actionable agricultural insights"
  },
  {
    icon: Map,
    title: "Geospatial Intelligence", 
    description: "Interactive maps with real-time NDVI, soil moisture, and weather data"
  },
  {
    icon: TrendingUp,
    title: "Yield Forecasting",
    description: "Live ML models providing crop yield predictions with confidence intervals"
  },
  {
    icon: BarChart3,
    title: "Risk Monitoring",
    description: "Early warning system for weather anomalies and crop stress indicators"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero grain-texture">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Agricultural landscape with data visualization"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-crop/20" />
        </div>
        
        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center text-white"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Ask for yield, rainfall, NDVI, soil moisture—
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">
                get answers you can act on
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
              AI conversational analytics platform that transforms agricultural data into actionable insights for better farming decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/explore">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold">
                  Start Exploring
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Presets Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Quick Start Analytics</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Jump into insights with these popular analysis presets, or create your own custom queries.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {presets.map((preset, index) => {
              const Icon = preset.icon;
              return (
                <motion.div
                  key={preset.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link to={preset.href}>
                    <Card className="hover-lift cursor-pointer border-border shadow-card h-full">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <Icon className="h-6 w-6" />
                          </div>
                          <Badge variant="secondary">{preset.badge}</Badge>
                        </div>
                        <CardTitle className="text-lg">{preset.title}</CardTitle>
                        <CardDescription className="text-sm">
                          {preset.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center text-sm text-primary font-medium">
                          Open Analysis
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Intelligent Agriculture Analytics</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive platform combining satellite data, weather information, and AI to deliver precise agricultural insights.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center p-6"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mx-auto mb-4">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Demo Video Placeholder */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-4">See Fasal-Vikas in Action</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Watch how farmers and agricultural experts use our platform to make data-driven decisions.
            </p>
            
            <div className="relative rounded-2xl overflow-hidden bg-muted border border-border shadow-card aspect-video">
              <div className="flex items-center justify-center h-full bg-gradient-to-br from-primary/5 to-crop/5">
                <div className="text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-primary mx-auto mb-4">
                    <svg className="h-8 w-8 fill-current" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <p className="text-muted-foreground">Demo video coming soon</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Link to="/explore">
                <Button size="lg" className="font-semibold">
                  Try Live Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}