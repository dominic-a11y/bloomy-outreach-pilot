import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, Play, Save, TestTube, Sparkles, Zap, Activity, Settings, 
  Code, Cpu, Database, Globe, Shield, Target, Rocket, Eye,
  ArrowRight, ChevronRight, Bot, Wand2, CircuitBoard, Binary
} from "lucide-react";

const aiModels = [
  { name: "GPT-4 Turbo", status: "active", efficiency: 94, cost: "$$", latency: "250ms" },
  { name: "Claude 3.5", status: "standby", efficiency: 89, cost: "$$$", latency: "180ms" },
  { name: "Neural Custom", status: "training", efficiency: 97, cost: "$", latency: "120ms" }
];

const responseTemplates = [
  { id: 1, name: "Tech Founder Opener", category: "Opening", effectiveness: 92 },
  { id: 2, name: "SaaS Follow-up", category: "Follow-up", effectiveness: 87 },
  { id: 3, name: "Value Proposition", category: "Pitch", effectiveness: 95 },
  { id: 4, name: "Meeting Scheduler", category: "Booking", effectiveness: 83 }
];

const neuralMetrics = [
  { metric: "Response Accuracy", value: 94, trend: "+12%" },
  { metric: "Conversion Rate", value: 78, trend: "+8%" },
  { metric: "Threat Detection", value: 99, trend: "+2%" },
  { metric: "Learning Speed", value: 85, trend: "+15%" }
];

export default function AIStudio() {
  return (
    <div className="min-h-screen bg-gradient-hero p-6 space-y-6">
      {/* Futuristic Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-card border border-primary/20 p-8 shadow-glow">
        <div className="absolute inset-0 bg-grid-primary/5"></div>
        <div className="absolute top-0 left-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl animate-pulse"></div>
        
        <div className="relative z-10 flex justify-between items-center">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-primary/20 border border-primary/30 animate-pulse">
                <Brain className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-primary-glow to-white bg-clip-text text-transparent">
                  Neural AI Studio
                </h1>
                <p className="text-white/70 text-lg">Advanced AI orchestration & response optimization lab</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400">AI Core Online</span>
              </div>
              <div className="flex items-center gap-2">
                <CircuitBoard className="h-4 w-4 text-primary animate-pulse" />
                <span className="text-white/60">Neural Networks Active</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-blue-400" />
                <span className="text-blue-400">Quantum Encryption</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button className="gap-2 bg-gradient-primary hover:shadow-glow transition-all duration-300 border border-primary/20">
              <Rocket className="h-4 w-4" />
              Deploy Model
            </Button>
            <Button variant="outline" className="gap-2 border-primary/30 hover:bg-primary/10">
              <Settings className="h-4 w-4" />
              Neural Config
            </Button>
          </div>
        </div>
      </div>

      {/* AI Performance Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {neuralMetrics.map((metric, index) => (
          <Card key={metric.metric} className="group bg-gradient-card border-primary/20 shadow-card hover:shadow-glow transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardContent className="relative p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-white/60 text-xs uppercase tracking-wide">{metric.metric}</div>
                <Cpu className="h-4 w-4 text-primary animate-pulse" />
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-white">{metric.value}%</div>
                <div className="flex items-center gap-2">
                  <ArrowRight className="h-3 w-3 text-green-400" />
                  <span className="text-green-400 text-sm font-medium">{metric.trend}</span>
                </div>
                <Progress value={metric.value} className="h-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main AI Studio Interface */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* AI Model Configuration */}
        <Card className="xl:col-span-2 bg-gradient-card border-primary/20 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Brain className="h-5 w-5 text-primary animate-pulse" />
              Neural Architecture Lab
              <Badge variant="outline" className="ml-auto border-primary/30 text-primary">Advanced</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="prompt" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-muted/20 border border-primary/20">
                <TabsTrigger value="prompt" className="data-[state=active]:bg-primary/20">System Prompt</TabsTrigger>
                <TabsTrigger value="models" className="data-[state=active]:bg-primary/20">AI Models</TabsTrigger>
                <TabsTrigger value="templates" className="data-[state=active]:bg-primary/20">Templates</TabsTrigger>
                <TabsTrigger value="testing" className="data-[state=active]:bg-primary/20">Neural Test</TabsTrigger>
              </TabsList>

              <TabsContent value="prompt" className="space-y-4">
                <div className="p-4 rounded-lg bg-muted/20 border border-primary/10">
                  <div className="flex items-center gap-2 mb-3">
                    <Code className="h-4 w-4 text-primary" />
                    <span className="text-white/80 text-sm">System Neural Configuration</span>
                  </div>
                  <Textarea 
                    className="min-h-40 bg-black/50 border-primary/20 text-white font-mono text-sm" 
                    placeholder="Define the AI's neural pathways and behavior matrix..."
                    defaultValue={`NEURAL_SYSTEM_PROMPT = {
  "core_personality": "Advanced sales AI with quantum empathy protocols",
  "communication_style": "Professional, warm, relationship-focused",
  "objectives": ["Build authentic connections", "Identify pain points", "Provide value"],
  "constraints": ["No spam behavior", "Respect boundaries", "Maintain authenticity"],
  "learning_mode": "continuous_optimization",
  "threat_detection": "enabled",
  "quantum_encryption": "active"
}`}
                  />
                </div>
                <div className="flex gap-3">
                  <Button className="gap-2 bg-primary/20 hover:bg-primary/30 border border-primary/30">
                    <Save className="h-4 w-4" />
                    Save Neural Config
                  </Button>
                  <Button variant="outline" className="gap-2 border-primary/30">
                    <Wand2 className="h-4 w-4" />
                    Auto-Optimize
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="models" className="space-y-4">
                {aiModels.map((model, index) => (
                  <div key={index} className="p-4 rounded-lg bg-muted/20 border border-primary/10 hover:border-primary/30 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${model.status === 'active' ? 'bg-green-400 animate-pulse' : model.status === 'training' ? 'bg-orange-400 animate-pulse' : 'bg-gray-400'}`}></div>
                        <div>
                          <div className="font-medium text-white">{model.name}</div>
                          <div className="text-sm text-white/60">{model.status}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="text-center">
                          <div className="text-white/60">Efficiency</div>
                          <div className="text-primary font-bold">{model.efficiency}%</div>
                        </div>
                        <div className="text-center">
                          <div className="text-white/60">Cost</div>
                          <div className="text-yellow-400">{model.cost}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-white/60">Latency</div>
                          <div className="text-green-400">{model.latency}</div>
                        </div>
                        <Button size="sm" variant="outline" className="border-primary/30">
                          {model.status === 'active' ? 'Configure' : 'Activate'}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="templates" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {responseTemplates.map((template) => (
                    <div key={template.id} className="p-4 rounded-lg bg-muted/20 border border-primary/10 hover:border-primary/30 transition-colors group">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="font-medium text-white">{template.name}</div>
                          <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                            {template.category}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-white/60">Effectiveness</div>
                          <div className="font-bold text-green-400">{template.effectiveness}%</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="border-primary/30 text-xs">
                          <Eye className="h-3 w-3 mr-1" />
                          Preview
                        </Button>
                        <Button size="sm" variant="outline" className="border-primary/30 text-xs">
                          <Bot className="h-3 w-3 mr-1" />
                          Train AI
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="testing" className="space-y-4">
                <div className="p-4 rounded-lg bg-muted/20 border border-primary/10">
                  <div className="flex items-center gap-2 mb-3">
                    <TestTube className="h-4 w-4 text-primary animate-pulse" />
                    <span className="text-white/80">Neural Test Environment</span>
                  </div>
                  <Textarea 
                    className="min-h-20 bg-black/50 border-primary/20 text-white" 
                    placeholder="Enter test scenario or message to analyze AI response..."
                  />
                  <div className="flex gap-3 mt-3">
                    <Button className="gap-2 bg-primary/20 hover:bg-primary/30 border border-primary/30">
                      <Play className="h-4 w-4" />
                      Run Neural Test
                    </Button>
                    <Button variant="outline" className="gap-2 border-primary/30">
                      <Activity className="h-4 w-4" />
                      Performance Analysis
                    </Button>
                  </div>
                </div>
                
                <div className="p-4 rounded-lg bg-gradient-to-r from-primary/10 to-blue-500/10 border border-primary/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="h-4 w-4 text-primary animate-pulse" />
                    <span className="text-white/80 text-sm">AI Neural Response:</span>
                  </div>
                  <div className="text-white bg-black/30 p-3 rounded border border-primary/20 font-mono text-sm">
                    {`> Processing neural pathways...
> Analyzing context vectors...
> Generating optimized response...

"Thanks for your interest! I noticed you're scaling your SaaS platform. 
I'd love to show you how our quantum automation can eliminate 80% of your 
manual outreach while maintaining that personal touch. 

Would you be open to a brief 15-minute neural demo this week?"`}
                  </div>
                  <div className="flex items-center justify-between mt-3 text-xs">
                    <div className="flex gap-4">
                      <span className="text-green-400">Confidence: 94%</span>
                      <span className="text-blue-400">Relevance: 89%</span>
                      <span className="text-purple-400">Conversion Probability: 76%</span>
                    </div>
                    <Badge variant="outline" className="border-green-500/30 text-green-400">
                      Neural Approved
                    </Badge>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Real-time AI Status */}
        <Card className="bg-gradient-card border-primary/20 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Activity className="h-5 w-5 text-primary animate-pulse" />
              Neural Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* System Status */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-white/80">Neural Core</span>
                </div>
                <span className="text-green-400 text-sm font-medium">Online</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-white/80">Learning Engine</span>
                </div>
                <span className="text-blue-400 text-sm font-medium">Training</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-white/80">Quantum Processor</span>
                </div>
                <span className="text-orange-400 text-sm font-medium">Optimizing</span>
              </div>
            </div>

            {/* Processing Queue */}
            <div className="space-y-3">
              <div className="text-sm font-medium text-white/80">Processing Queue</div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/60">Active Responses</span>
                  <span className="text-primary font-medium">147</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/60">Learning Iterations</span>
                  <span className="text-green-400 font-medium">2,847</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/60">Neural Pathways</span>
                  <span className="text-blue-400 font-medium">98,432</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-3">
              <div className="text-sm font-medium text-white/80">Quick Actions</div>
              <div className="space-y-2">
                <Button size="sm" variant="outline" className="w-full justify-start gap-2 border-primary/30">
                  <Target className="h-4 w-4" />
                  Train New Model
                </Button>
                <Button size="sm" variant="outline" className="w-full justify-start gap-2 border-primary/30">
                  <Database className="h-4 w-4" />
                  Export Neural Data
                </Button>
                <Button size="sm" variant="outline" className="w-full justify-start gap-2 border-primary/30">
                  <Globe className="h-4 w-4" />
                  Deploy Globally
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}