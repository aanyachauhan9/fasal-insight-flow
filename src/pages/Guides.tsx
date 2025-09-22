import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Tractor, 
  Sprout, 
  Droplets, 
  Sparkles, 
  Bug, 
  Scissors, 
  Download, 
  MessageCircle,
  Calendar,
  MapPin,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';

const cultivationSteps = [
  {
    id: 'prep',
    title: 'Land Preparation',
    icon: Tractor,
    description: 'Soil testing, field preparation, and planning',
    duration: '2-3 weeks',
    tasks: [
      'Conduct soil pH and nutrient testing',
      'Clear field of crop residue and weeds', 
      'Deep plowing to 8-10 inches depth',
      'Apply organic matter (FYM/compost)',
      'Level the field for uniform water distribution'
    ],
    status: 'completed'
  },
  {
    id: 'variety',
    title: 'Variety Selection',
    icon: Sprout,
    description: 'Choose optimal crop variety for local conditions',
    duration: '1 week',
    tasks: [
      'Select disease-resistant varieties',
      'Consider maturity period (110-130 days)',
      'Check seed quality and germination rate',
      'Source certified seeds from authorized dealers',
      'Calculate seed requirement (100-125 kg/hectare)'
    ],
    status: 'current'
  },
  {
    id: 'sowing',
    title: 'Sowing & Planting',
    icon: Sprout,
    description: 'Optimal timing and techniques for sowing',
    duration: '1-2 weeks',
    tasks: [
      'Sow during optimal window (Nov 15 - Dec 15)',
      'Maintain row spacing of 20-22.5 cm',
      'Sow seeds at 4-5 cm depth',
      'Apply starter fertilizer (DAP)',
      'Ensure adequate soil moisture at sowing'
    ],
    status: 'upcoming'
  },
  {
    id: 'irrigation',
    title: 'Water Management',
    icon: Droplets,
    description: 'Irrigation scheduling and water conservation',
    duration: 'Throughout season',
    tasks: [
      'First irrigation 3 weeks after sowing',
      'Critical irrigations: CRI, tillering, flowering',
      'Apply 5-6 irrigations (450-500mm total)',
      'Monitor soil moisture using sensors',
      'Implement drip/sprinkler where possible'
    ],
    status: 'upcoming'
  },
  {
    id: 'nutrition',
    title: 'Nutrient Management',
    icon: Sparkles,
    description: 'Fertilizer application and soil health',
    duration: 'Throughout season',
    tasks: [
      'Apply NPK as per soil test recommendations',
      'Basal application: 50% N, full P & K',
      'Top dressing: 25% N at CRI, 25% at tillering',
      'Apply micronutrients (Zn, Fe) if deficient',
      'Monitor crop for nutrient deficiency symptoms'
    ],
    status: 'upcoming'
  },
  {
    id: 'pest',
    title: 'Pest & Disease Control',
    icon: Bug,
    description: 'Integrated pest management strategies',
    duration: 'Throughout season',
    tasks: [
      'Regular monitoring for pests and diseases',
      'Use IPM approach: biological + chemical',
      'Apply preventive sprays during vulnerable stages',
      'Monitor weather for disease pressure',
      'Maintain field hygiene and crop rotation'
    ],
    status: 'upcoming'
  },
  {
    id: 'harvest',
    title: 'Harvest & Post-Harvest',
    icon: Scissors,
    description: 'Timing harvest and storage management',
    duration: '2-3 weeks',
    tasks: [
      'Harvest at physiological maturity (85-90% grain moisture)',
      'Use combine harvester for efficiency',
      'Dry grains to 12-14% moisture content',
      'Clean and grade harvested produce',
      'Store in proper containers with pest control'
    ],
    status: 'upcoming'
  }
];

const seasonCalendar = [
  { month: 'Oct', activity: 'Land Prep', intensity: 80 },
  { month: 'Nov', activity: 'Sowing', intensity: 100 },
  { month: 'Dec', activity: 'Early Growth', intensity: 60 },
  { month: 'Jan', activity: 'Tillering', intensity: 70 },
  { month: 'Feb', activity: 'Stem Extension', intensity: 90 },
  { month: 'Mar', activity: 'Flowering', intensity: 95 },
  { month: 'Apr', activity: 'Grain Filling', intensity: 85 },
  { month: 'May', activity: 'Harvest', intensity: 100 }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'bg-success';
    case 'current': return 'bg-primary';
    case 'upcoming': return 'bg-muted';
    default: return 'bg-muted';
  }
};

export default function Guides() {
  const [selectedCrop, setSelectedCrop] = useState('wheat');
  const [selectedRegion, setSelectedRegion] = useState('punjab');
  const [soilType, setSoilType] = useState('alluvial');
  const [sowingDate, setSowingDate] = useState('2024-11-15');
  const [openSteps, setOpenSteps] = useState<string[]>(['variety']);

  const toggleStep = (stepId: string) => {
    setOpenSteps(prev => 
      prev.includes(stepId) 
        ? prev.filter(id => id !== stepId)
        : [...prev, stepId]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-bold mb-2">Cultivation Guides</h1>
          <p className="text-muted-foreground">
            Personalized step-by-step cultivation recommendations based on your specific conditions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Configuration Panel */}
          <div className="lg:col-span-1">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Crop</label>
                  <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wheat">Wheat</SelectItem>
                      <SelectItem value="rice">Rice</SelectItem>
                      <SelectItem value="cotton">Cotton</SelectItem>
                      <SelectItem value="sugarcane">Sugarcane</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Region</label>
                  <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="punjab">Punjab</SelectItem>
                      <SelectItem value="haryana">Haryana</SelectItem>
                      <SelectItem value="up">Uttar Pradesh</SelectItem>
                      <SelectItem value="bihar">Bihar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Soil Type</label>
                  <Select value={soilType} onValueChange={setSoilType}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alluvial">Alluvial</SelectItem>
                      <SelectItem value="clay">Clay</SelectItem>
                      <SelectItem value="sandy">Sandy Loam</SelectItem>
                      <SelectItem value="black">Black Cotton</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Sowing Date</label>
                  <Input
                    type="date"
                    value={sowingDate}
                    onChange={(e) => setSowingDate(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Button className="w-full" size="sm">
                    Generate Guide
                  </Button>
                  <Button variant="outline" className="w-full" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                  <Button variant="outline" className="w-full" size="sm">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Send to WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Season Calendar */}
            <Card className="shadow-card mt-4">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Season Calendar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {seasonCalendar.map((item, index) => (
                    <div key={item.month} className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-medium">{item.month}</span>
                        <span className="text-muted-foreground">{item.activity}</span>
                      </div>
                      <Progress value={item.intensity} className="h-1" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Guide Content */}
          <div className="lg:col-span-3">
            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">
                    Wheat Cultivation Guide
                  </CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    Punjab, Alluvial Soil
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge variant="secondary">Rabi 2023-24</Badge>
                  <Badge variant="outline">110-day variety</Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Progress Overview */}
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Season Progress</span>
                    <span className="text-xs text-muted-foreground">Step 2 of 7</span>
                  </div>
                  <Progress value={28} className="h-2" />
                  <div className="mt-2 text-xs text-muted-foreground">
                    Current: Variety Selection • Next: Sowing (in 5 days)
                  </div>
                </div>

                {/* Cultivation Steps */}
                <div className="space-y-3">
                  {cultivationSteps.map((step, index) => {
                    const Icon = step.icon;
                    const isOpen = openSteps.includes(step.id);
                    
                    return (
                      <motion.div
                        key={step.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Collapsible
                          open={isOpen}
                          onOpenChange={() => toggleStep(step.id)}
                        >
                          <Card className={`border-l-4 ${
                            step.status === 'completed' ? 'border-l-success' :
                            step.status === 'current' ? 'border-l-primary' : 'border-l-muted'
                          }`}>
                            <CollapsibleTrigger className="w-full">
                              <CardContent className="p-4">
                                <div className="flex items-center gap-4">
                                  <div className="flex-shrink-0">
                                    <div className={`flex h-10 w-10 items-center justify-center rounded-full ${getStatusColor(step.status)} text-white`}>
                                      <Icon className="h-5 w-5" />
                                    </div>
                                  </div>
                                  
                                  <div className="flex-1 text-left">
                                    <div className="flex items-center justify-between">
                                      <h3 className="font-semibold">{step.title}</h3>
                                      <div className="flex items-center gap-2">
                                        <Badge variant="outline" className="text-xs">
                                          {step.duration}
                                        </Badge>
                                        {isOpen ? (
                                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                        ) : (
                                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                        )}
                                      </div>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{step.description}</p>
                                  </div>
                                </div>
                              </CardContent>
                            </CollapsibleTrigger>
                            
                            <CollapsibleContent>
                              <CardContent className="pt-0 pb-4 px-4">
                                <div className="ml-14 space-y-2">
                                  <Separator />
                                  <div className="mt-4">
                                    <h4 className="font-medium text-sm mb-3">Key Tasks:</h4>
                                    <ul className="space-y-2">
                                      {step.tasks.map((task, taskIndex) => (
                                        <li key={taskIndex} className="flex items-start gap-2 text-sm">
                                          <div className="flex-shrink-0 mt-1.5">
                                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                          </div>
                                          <span>{task}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  
                                  {step.status === 'current' && (
                                    <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
                                      <div className="text-sm font-medium text-primary mb-1">
                                        💡 Current Recommendation
                                      </div>
                                      <div className="text-xs text-muted-foreground">
                                        Based on current weather conditions and soil analysis, prioritize disease-resistant varieties like HD-3086 or PBW-725 for your region.
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </CardContent>
                            </CollapsibleContent>
                          </Card>
                        </Collapsible>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}