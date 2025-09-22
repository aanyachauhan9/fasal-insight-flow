import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, QrCode, Smartphone, CheckCircle, Copy, ExternalLink, Users, Zap, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';

const whatsAppNumber = "+91-98765-43210"; // Mock number
const whatsAppLink = `https://wa.me/${whatsAppNumber.replace(/[^0-9]/g, '')}?text=Hi%20Fasal-Vikas`;

const keywords = [
  {
    command: 'STATUS',
    description: 'Get system health and latest data updates',
    example: 'Send "STATUS" to check if all systems are operational'
  },
  {
    command: 'RECS',
    description: 'Receive cultivation recommendations for your region',
    example: 'Send "RECS wheat punjab" for wheat cultivation guide'
  },
  {
    command: 'ALERTS', 
    description: 'Subscribe to risk alerts for your area',
    example: 'Send "ALERTS haryana" to get alerts for Haryana state'
  },
  {
    command: 'WEATHER',
    description: 'Get current weather and forecast data',
    example: 'Send "WEATHER delhi" for Delhi weather information'
  },
  {
    command: 'YIELD',
    description: 'Get yield forecasts for specific crops and regions',
    example: 'Send "YIELD rice bihar" for rice yield predictions in Bihar'
  }
];

const features = [
  {
    icon: Zap,
    title: 'Instant Alerts',
    description: 'Real-time notifications for weather anomalies, pest outbreaks, and market changes'
  },
  {
    icon: Users,
    title: 'Expert Advice',
    description: 'Connect with agricultural experts and get personalized recommendations'
  },
  {
    icon: Clock,
    title: '24/7 Availability',
    description: 'Access agricultural insights anytime, anywhere, even in low connectivity areas'
  }
];

export default function WhatsApp() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'pending'>('disconnected');
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConnect = () => {
    setConnectionStatus('pending');
    // Simulate connection process
    setTimeout(() => {
      setConnectionStatus('connected');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl font-bold mb-2">WhatsApp Bot Integration</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Access Fasal-Vikas insights directly through WhatsApp. Get real-time alerts, cultivation advice, and weather updates on your mobile device.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Connection Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-6 w-6 text-green-600" />
                  Connect Your WhatsApp
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Connection Status */}
                <div className="text-center">
                  <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm ${
                    connectionStatus === 'connected' ? 'bg-success/10 text-success' :
                    connectionStatus === 'pending' ? 'bg-warning/10 text-warning' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    <div className={`h-2 w-2 rounded-full ${
                      connectionStatus === 'connected' ? 'bg-success' :
                      connectionStatus === 'pending' ? 'bg-warning animate-pulse' :
                      'bg-muted-foreground'
                    }`} />
                    <span>
                      {connectionStatus === 'connected' ? 'Connected' :
                       connectionStatus === 'pending' ? 'Connecting...' :
                       'Not Connected'}
                    </span>
                  </div>
                </div>

                {/* QR Code Section */}
                <div className="bg-muted/50 rounded-lg p-6 text-center">
                  <div className="flex h-32 w-32 items-center justify-center mx-auto mb-4 bg-white rounded-lg border-2 border-dashed border-border">
                    <QrCode className="h-16 w-16 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Scan this QR code with your WhatsApp camera to start chatting
                  </p>
                  <Badge variant="secondary" className="text-xs">
                    QR Code - Connect Instantly
                  </Badge>
                </div>

                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-2">Or click to open WhatsApp</div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button 
                      onClick={() => window.open(whatsAppLink, '_blank')}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      <Smartphone className="h-4 w-4 mr-2" />
                      Open WhatsApp
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => copyToClipboard(whatsAppNumber)}
                      className="flex-1"
                    >
                      {copied ? <CheckCircle className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                      {copied ? 'Copied!' : 'Copy Number'}
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Manual Setup */}
                <div>
                  <h4 className="font-semibold mb-3">Manual Setup</h4>
                  <div className="space-y-2 text-sm">
                    <p>1. Save this number in your contacts: <strong>{whatsAppNumber}</strong></p>
                    <p>2. Open WhatsApp and search for "Fasal-Vikas"</p>
                    <p>3. Send "Hi" to start receiving agricultural insights</p>
                  </div>
                </div>

                {/* Phone Registration */}
                <div className="space-y-3">
                  <h4 className="font-semibold">Register Your Number</h4>
                  <div className="flex gap-2">
                    <Input
                      placeholder="+91 98765 43210"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={handleConnect} disabled={!phoneNumber || connectionStatus === 'pending'}>
                      {connectionStatus === 'pending' ? 'Connecting...' : 'Connect'}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    We'll send you a verification message to confirm your number
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Features & Commands */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Features */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Bot Capabilities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={feature.title} className="flex gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">{feature.title}</h4>
                        <p className="text-xs text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Keywords */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Available Commands</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {keywords.map((keyword, index) => (
                    <div key={keyword.command} className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="font-mono text-xs">
                          {keyword.command}
                        </Badge>
                        <span className="text-sm font-medium">{keyword.description}</span>
                      </div>
                      <p className="text-xs text-muted-foreground pl-2 border-l-2 border-muted">
                        {keyword.example}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Status Alert */}
        {connectionStatus === 'connected' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Alert className="bg-success/10 border-success">
              <CheckCircle className="h-4 w-4 text-success" />
              <AlertDescription className="text-success">
                <strong>Successfully connected!</strong> You can now receive agricultural alerts and recommendations via WhatsApp. 
                Try sending "STATUS" to test your connection.
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        {/* Integration Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Integration Details
                <Badge variant="secondary">Powered by Twilio</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">24/7</div>
                  <div className="text-xs text-muted-foreground">Service Availability</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-success mb-1">5</div>
                  <div className="text-xs text-muted-foreground">Languages Supported</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-water mb-1">&lt; 2s</div>
                  <div className="text-xs text-muted-foreground">Average Response</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-crop mb-1">Free</div>
                  <div className="text-xs text-muted-foreground">For All Users</div>
                </div>
              </div>

              <Separator />

              <div className="text-sm space-y-2">
                <h4 className="font-semibold">Privacy & Security</h4>
                <ul className="space-y-1 text-muted-foreground ml-4">
                  <li>• Your phone number is encrypted and securely stored</li>
                  <li>• Chat messages are not stored beyond processing</li>
                  <li>• Opt-out available anytime by sending "STOP"</li>
                  <li>• Compliant with WhatsApp Business API policies</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}