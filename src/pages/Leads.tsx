import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { 
  Search, Filter, Plus, Eye, Tag, Upload, Archive, UserPlus, MessageSquare, 
  DollarSign, Calendar, Star, Users, Clock, Target, Brain, Activity, Zap, 
  Sparkles, Shield, Rocket, Bot, ArrowUp, TrendingUp, Wifi, Database
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Enhanced leads data with futuristic metrics
const leads = [
  {
    id: 1,
    name: "Sarah Quantum",
    handle: "@sarah_neural_founder",
    source: "Neural Outreach",
    stage: "quantum_qualified",
    lastContact: "2 nano-cycles ago",
    score: 98,
    owner: "AI Agent Alpha",
    tags: ["Quantum SaaS", "Neural Founder", "Elite"],
    avatar: "/api/placeholder/40/40",
    company: "QuantumStart Dynamics",
    dealValue: 125000,
    engagement: 94,
    threat: "none",
    priority: "ultra-high",
    neuralPattern: "innovator",
    velocity: "+45%"
  },
  {
    id: 2,
    name: "Marcus CyberDev",
    handle: "@marcus_quantum_builder",
    source: "AI Referral Matrix",
    stage: "neural_interested",
    lastContact: "1 quantum-day ago",
    score: 87,
    owner: "AI Agent Beta", 
    tags: ["Cyber Developer", "Quantum Startup", "Prime"],
    avatar: "/api/placeholder/40/40",
    company: "CyberDev Nexus",
    dealValue: 89000,
    engagement: 78,
    threat: "low",
    priority: "high",
    neuralPattern: "builder",
    velocity: "+23%"
  },
  {
    id: 3,
    name: "Emily Neural",
    handle: "@emily_quantum_marketing",
    source: "Digital Dimension",
    stage: "cyber_new",
    lastContact: "3 quantum-cycles ago",
    score: 72,
    owner: "Neural Unassigned",
    tags: ["Quantum Marketing", "AI Agency", "Standard"],
    avatar: "/api/placeholder/40/40",
    company: "Neural MarketPro",
    dealValue: 156000,
    engagement: 65,
    threat: "none",
    priority: "medium",
    neuralPattern: "strategist",
    velocity: "+18%"
  }
];

const stageConfig = {
  cyber_new: {
    label: "Cyber New",
    className: "bg-blue-500/20 text-blue-400 border-blue-500/30"
  },
  neural_contacted: {
    label: "Neural Contact",
    className: "bg-purple-500/20 text-purple-400 border-purple-500/30"
  },
  neural_interested: {
    label: "Neural Interest",
    className: "bg-green-500/20 text-green-400 border-green-500/30"
  },
  quantum_qualified: {
    label: "Quantum Qualified",
    className: "bg-primary/20 text-primary border-primary/30"
  },
  cyber_won: {
    label: "Cyber Won",
    className: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
  },
  neural_lost: {
    label: "Neural Lost",
    className: "bg-red-500/20 text-red-400 border-red-500/30"
  }
};

const priorityColors = {
  "ultra-high": "bg-red-500/20 text-red-400 border-red-500/30",
  high: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  low: "bg-green-500/20 text-green-400 border-green-500/30"
};

export default function Leads() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLead, setSelectedLead] = useState<typeof leads[0] | null>(null);
  
  const filteredLeads = leads.filter(lead =>
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.handle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-hero p-6 space-y-6">
      {/* Futuristic Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-card border border-primary/20 p-8 shadow-glow">
        <div className="absolute inset-0 bg-grid-primary/5"></div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-green-500/10 rounded-full blur-2xl animate-pulse"></div>
        
        <div className="relative z-10 flex justify-between items-center">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-primary/20 border border-primary/30 animate-pulse">
                <Target className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-primary-glow to-white bg-clip-text text-transparent">
                  Neural Lead Matrix
                </h1>
                <p className="text-white/70 text-lg">Quantum prospect analysis & conversion optimization</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400">{leads.length} Active Prospects</span>
              </div>
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4 text-primary animate-pulse" />
                <span className="text-white/60">AI Scoring Active</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-blue-400" />
                <span className="text-blue-400">Quantum Analytics</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button className="gap-2 bg-gradient-primary hover:shadow-glow transition-all duration-300 border border-primary/20">
              <Sparkles className="h-4 w-4" />
              Neural Import
            </Button>
            <Button variant="outline" className="gap-2 border-primary/30 hover:bg-primary/10">
              <Bot className="h-4 w-4" />
              AI Analysis
            </Button>
          </div>
        </div>
      </div>

      {/* Advanced Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex gap-4 items-center flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary/60 animate-pulse" />
            <Input 
              placeholder="Search neural prospects..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              className="pl-10 bg-gradient-card border-primary/20 text-white placeholder:text-white/50 shadow-card hover:shadow-glow transition-all" 
            />
          </div>
          
          <Select>
            <SelectTrigger className="w-40 bg-gradient-card border-primary/20 text-white shadow-card hover:shadow-glow transition-all">
              <Filter className="h-4 w-4 text-primary" />
              <SelectValue placeholder="Neural Stage" />
            </SelectTrigger>
            <SelectContent className="bg-gradient-card border-primary/20">
              <SelectItem value="all">All Dimensions</SelectItem>
              <SelectItem value="cyber_new">Cyber New</SelectItem>
              <SelectItem value="neural_contacted">Neural Contact</SelectItem>
              <SelectItem value="neural_interested">Neural Interest</SelectItem>
              <SelectItem value="quantum_qualified">Quantum Qualified</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-40 bg-gradient-card border-primary/20 text-white shadow-card hover:shadow-glow transition-all">
              <Target className="h-4 w-4 text-primary" />
              <SelectValue placeholder="Priority Level" />
            </SelectTrigger>
            <SelectContent className="bg-gradient-card border-primary/20">
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="ultra-high">Ultra High</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="gap-2 border-primary/30 hover:bg-primary/10">
            <UserPlus className="h-4 w-4" />
            Assign Neural Agent
          </Button>
          <Button variant="outline" size="sm" className="gap-2 border-primary/30 hover:bg-primary/10">
            <Tag className="h-4 w-4" />
            Quantum Tags
          </Button>
          <Button variant="outline" size="sm" className="gap-2 border-primary/30 hover:bg-primary/10">
            <Database className="h-4 w-4" />
            Neural Archive
          </Button>
        </div>
      </div>

      {/* Neural Leads Table */}
      <Card className="bg-gradient-card border-primary/20 shadow-glow">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary animate-pulse" />
            Quantum Prospect Matrix
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-primary/20">
                <TableHead className="text-primary uppercase tracking-wide text-xs">Neural Profile</TableHead>
                <TableHead className="text-primary uppercase tracking-wide text-xs">Quantum Source</TableHead>
                <TableHead className="text-primary uppercase tracking-wide text-xs">Neural Stage</TableHead>
                <TableHead className="text-primary uppercase tracking-wide text-xs">Last Sync</TableHead>
                <TableHead className="text-primary uppercase tracking-wide text-xs">AI Score</TableHead>
                <TableHead className="text-primary uppercase tracking-wide text-xs">Neural Agent</TableHead>
                <TableHead className="text-primary uppercase tracking-wide text-xs">Quantum Value</TableHead>
                <TableHead className="text-primary uppercase tracking-wide text-xs">Priority</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.map((lead) => (
                <TableRow key={lead.id} className="border-b border-primary/10 hover:bg-primary/5 transition-colors group">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border-2 border-primary/20">
                        <AvatarImage src={lead.avatar} />
                        <AvatarFallback className="bg-primary/20 text-primary">
                          {lead.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-white flex items-center gap-2">
                          {lead.name}
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                        </div>
                        <div className="text-sm text-white/70">{lead.handle}</div>
                        <div className="text-xs text-primary">{lead.company}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs text-white border-primary/30">
                      {lead.source}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${stageConfig[lead.stage as keyof typeof stageConfig].className} text-xs border`}>
                      {stageConfig[lead.stage as keyof typeof stageConfig].label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-white/80 flex items-center gap-1">
                      <Clock className="h-3 w-3 text-primary" />
                      {lead.lastContact}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-3 w-3 ${i < Math.floor(lead.score / 20) ? "text-yellow-400 fill-current" : "text-muted-foreground"}`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm font-bold text-primary">{lead.score}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-white/80 flex items-center gap-1">
                      <Bot className="h-3 w-3 text-primary" />
                      {lead.owner}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm font-bold text-green-400 flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      ${lead.dealValue.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${priorityColors[lead.priority as keyof typeof priorityColors]} text-xs border`}>
                      {lead.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => setSelectedLead(lead)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-white hover:bg-primary/20"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </SheetTrigger>
                      <SheetContent className="w-96 bg-gradient-card border-primary/20">
                        <SheetHeader>
                          <SheetTitle className="flex items-center gap-3 text-white">
                            <Avatar className="h-10 w-10 border-2 border-primary/30">
                              <AvatarImage src={lead.avatar} />
                              <AvatarFallback className="bg-primary/20 text-primary">
                                {lead.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="text-white">{lead.name}</div>
                              <div className="text-sm font-normal text-white/70">{lead.handle}</div>
                            </div>
                          </SheetTitle>
                          <SheetDescription className="text-white/60">
                            Neural profile analysis & quantum interaction matrix
                          </SheetDescription>
                        </SheetHeader>
                        
                        <Tabs defaultValue="overview" className="mt-6">
                          <TabsList className="grid w-full grid-cols-4 bg-muted/20 border border-primary/20">
                            <TabsTrigger value="overview" className="data-[state=active]:bg-primary/20">Overview</TabsTrigger>
                            <TabsTrigger value="neural" className="data-[state=active]:bg-primary/20">Neural</TabsTrigger>
                            <TabsTrigger value="quantum" className="data-[state=active]:bg-primary/20">Quantum</TabsTrigger>
                            <TabsTrigger value="cyber" className="data-[state=active]:bg-primary/20">Cyber</TabsTrigger>
                          </TabsList>
                          
                          <TabsContent value="overview" className="space-y-4 text-white">
                            {/* Quick Actions */}
                            <div>
                              <h4 className="font-medium mb-3 text-white/90">Neural Actions</h4>
                              <div className="space-y-2">
                                <Select>
                                  <SelectTrigger className="bg-muted/20 border-primary/20 text-white">
                                    <SelectValue placeholder="Quantum stage shift" />
                                  </SelectTrigger>
                                  <SelectContent className="bg-gradient-card border-primary/20">
                                    <SelectItem value="neural_contacted">Neural Contact</SelectItem>
                                    <SelectItem value="neural_interested">Neural Interest</SelectItem>
                                    <SelectItem value="quantum_qualified">Quantum Qualified</SelectItem>
                                    <SelectItem value="cyber_won">Cyber Won</SelectItem>
                                  </SelectContent>
                                </Select>
                                <Button className="w-full justify-start gap-2 bg-primary/20 hover:bg-primary/30 border border-primary/30" variant="outline">
                                  <MessageSquare className="h-4 w-4" />
                                  Neural Message
                                </Button>
                                <Button className="w-full justify-start gap-2" variant="outline">
                                  <Calendar className="h-4 w-4" />
                                  Quantum Schedule
                                </Button>
                              </div>
                            </div>

                            {/* Lead Intel */}
                            <div>
                              <h4 className="font-medium mb-3 text-white/90">Quantum Intel</h4>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-white/60">Company Matrix</span>
                                  <span className="font-medium text-primary">{lead.company}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-white/60">Neural Source</span>
                                  <span className="font-medium text-white">{lead.source}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-white/60">AI Agent</span>
                                  <span className="font-medium text-primary">{lead.owner}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-white/60">Quantum Score</span>
                                  <span className="font-medium text-green-400">{lead.score}/100</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-white/60">Cyber Value</span>
                                  <span className="font-medium text-green-400">${lead.dealValue.toLocaleString()}</span>
                                </div>
                              </div>
                            </div>

                            {/* Neural Metrics */}
                            <div>
                              <h4 className="font-medium mb-3 text-white/90">Neural Metrics</h4>
                              <div className="space-y-3">
                                <div>
                                  <div className="flex justify-between text-sm mb-1">
                                    <span className="text-white/60">Engagement Level</span>
                                    <span className="text-primary">{lead.engagement}%</span>
                                  </div>
                                  <Progress value={lead.engagement} className="h-2" />
                                </div>
                                <div className="flex items-center gap-2">
                                  <TrendingUp className="h-4 w-4 text-green-400" />
                                  <span className="text-sm text-green-400">Velocity: {lead.velocity}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Brain className="h-4 w-4 text-primary" />
                                  <span className="text-sm text-primary">Pattern: {lead.neuralPattern}</span>
                                </div>
                              </div>
                            </div>

                            {/* Quantum Tags */}
                            <div>
                              <h4 className="font-medium mb-3 text-white/90">Quantum Tags</h4>
                              <div className="flex flex-wrap gap-2">
                                {lead.tags.map(tag => (
                                  <Badge key={tag} variant="outline" className="text-xs border-primary/30 text-primary">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="neural" className="space-y-4">
                            <div>
                              <h4 className="font-medium mb-3 text-white">Neural Notes</h4>
                              <Textarea 
                                placeholder="Add neural observation..." 
                                className="min-h-20 bg-muted/20 border-primary/20 text-white" 
                              />
                              <Button size="sm" className="mt-2 bg-primary/20 hover:bg-primary/30">
                                Add Neural Note
                              </Button>
                            </div>
                            <div>
                              <h4 className="font-medium mb-3 text-white">Recent Neural Activity</h4>
                              <div className="space-y-3">
                                <div className="p-3 bg-muted/20 rounded-lg border border-primary/10">
                                  <div className="text-sm text-white">Neural pattern analysis shows high engagement with quantum solutions.</div>
                                  <div className="text-xs text-white/60 mt-1">2 cycles ago by AI Agent Alpha</div>
                                </div>
                                <div className="p-3 bg-muted/20 rounded-lg border border-primary/10">
                                  <div className="text-sm text-white">Initial quantum contact established. Positive neural response detected.</div>
                                  <div className="text-xs text-white/60 mt-1">1 day ago by AI Agent Alpha</div>
                                </div>
                              </div>
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="quantum" className="space-y-4">
                            <div className="space-y-3">
                              <div className="p-3 bg-primary/10 rounded-lg ml-4 border border-primary/20">
                                <div className="text-sm text-white">Neural response: I'm definitely interested in quantum optimization for our platform!</div>
                                <div className="text-xs text-white/60 mt-1">2 cycles ago</div>
                              </div>
                              <div className="p-3 bg-muted/20 rounded-lg mr-4 border border-primary/10">
                                <div className="text-sm text-white">Quantum greeting: Your neural patterns suggest you're scaling a quantum SaaS. Our AI can optimize your matrix!</div>
                                <div className="text-xs text-white/60 mt-1">1 day ago</div>
                              </div>
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="cyber" className="space-y-4">
                            <div>
                              <h4 className="font-medium mb-3 text-white">Active Cyber Deal</h4>
                              <Card className="bg-muted/20 border border-primary/20">
                                <CardContent className="p-4">
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="font-medium text-white">Quantum Premium Matrix</div>
                                    <div className="flex items-center gap-1 text-green-400">
                                      <DollarSign className="h-3 w-3" />
                                      ${lead.dealValue.toLocaleString()}
                                    </div>
                                  </div>
                                  <div className="text-sm text-white/60">
                                    Neural close probability: Next quantum cycle
                                  </div>
                                  <div className="mt-2">
                                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                                      {lead.score}% Quantum Probability
                                    </Badge>
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </SheetContent>
                    </Sheet>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}