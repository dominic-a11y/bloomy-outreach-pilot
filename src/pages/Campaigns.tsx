import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { 
  Grid3X3, List, Plus, Search, Filter, MoreHorizontal, Users, Clock, TrendingUp, 
  Play, Pause, Eye, Edit, Rocket, Zap, Target, Brain, Activity, Settings, Star,
  ArrowUp, ArrowDown, Sparkles, Shield, AlertTriangle, CheckCircle, Wifi, Calendar
} from "lucide-react";

// Enhanced campaign data with more futuristic metrics
const campaigns = [
  {
    id: 1,
    name: "Neural SaaS Founders Q4",
    status: "active",
    targetListSize: 2847,
    accountsAttached: 8,
    sendWindow: "9:00 AM - 5:00 PM EST",
    warmupStatus: "complete",
    todayProgress: { sent: 124, target: 150 },
    replyRate: 18.5,
    booked: 12,
    aiScore: 94,
    engagement: 67,
    velocity: "+23%",
    threat: "none"
  },
  {
    id: 2,
    name: "Quantum E-commerce CEOs",
    status: "paused",
    targetListSize: 1523,
    accountsAttached: 5,
    sendWindow: "10:00 AM - 6:00 PM PST",
    warmupStatus: "warming",
    todayProgress: { sent: 0, target: 80 },
    replyRate: 22.1,
    booked: 8,
    aiScore: 87,
    engagement: 45,
    velocity: "+12%",
    threat: "low"
  },
  {
    id: 3,
    name: "Cyber Tech Startup Matrix",
    status: "draft",
    targetListSize: 945,
    accountsAttached: 3,
    sendWindow: "8:00 AM - 4:00 PM EST",
    warmupStatus: "pending",
    todayProgress: { sent: 0, target: 60 },
    replyRate: 0,
    booked: 0,
    aiScore: 0,
    engagement: 0,
    velocity: "0%",
    threat: "none"
  }
];

const statusColors = {
  active: "bg-green-500/20 text-green-400 border-green-500/30",
  paused: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  draft: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  completed: "bg-blue-500/20 text-blue-400 border-blue-500/30"
};

const warmupColors = {
  complete: "bg-green-500/20 text-green-400 border-green-500/30",
  warming: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  pending: "bg-purple-500/20 text-purple-400 border-purple-500/30"
};

const threatColors = {
  none: "bg-green-500/20 text-green-400",
  low: "bg-yellow-500/20 text-yellow-400",
  medium: "bg-orange-500/20 text-orange-400",
  high: "bg-red-500/20 text-red-400"
};

export default function Campaigns() {
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-hero p-6 space-y-6">
      {/* Futuristic Header with Matrix-like Effects */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-card border border-primary/20 p-8 shadow-glow">
        <div className="absolute inset-0 bg-grid-primary/5 animate-pulse"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="relative z-10 flex justify-between items-center">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-primary/20 border border-primary/30 animate-pulse">
                <Rocket className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-primary-glow to-white bg-clip-text text-transparent">
                  Campaign Matrix
                </h1>
                <p className="text-white/70 text-lg">Neural outreach orchestration & quantum performance analytics</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400">3 Active Campaigns</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-primary animate-pulse" />
                <span className="text-white/60">Real-time Neural Processing</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-blue-400" />
                <span className="text-blue-400">Quantum Security Enabled</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button className="gap-2 bg-gradient-primary hover:shadow-glow transition-all duration-300 border border-primary/20">
              <Sparkles className="h-4 w-4" />
              Neural Launch
            </Button>
            <Button variant="outline" className="gap-2 border-primary/30 hover:bg-primary/10">
              <Brain className="h-4 w-4" />
              AI Optimizer
            </Button>
          </div>
        </div>
      </div>

      {/* Advanced Control Panel */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex gap-4 items-center flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary/60 animate-pulse" />
            <Input 
              placeholder="Search neural pathways..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              className="pl-10 bg-gradient-card border-primary/20 text-white placeholder:text-white/50 shadow-card hover:shadow-glow transition-all" 
            />
          </div>
          
          <Select>
            <SelectTrigger className="w-40 bg-gradient-card border-primary/20 text-white shadow-card hover:shadow-glow transition-all">
              <Filter className="h-4 w-4 text-primary" />
              <SelectValue placeholder="Quantum Filter" />
            </SelectTrigger>
            <SelectContent className="bg-gradient-card border-primary/20">
              <SelectItem value="all">All Dimensions</SelectItem>
              <SelectItem value="active">Active Matrix</SelectItem>
              <SelectItem value="paused">Suspended State</SelectItem>
              <SelectItem value="draft">Draft Protocol</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-40 bg-gradient-card border-primary/20 text-white shadow-card hover:shadow-glow transition-all">
              <Target className="h-4 w-4 text-primary" />
              <SelectValue placeholder="AI Score" />
            </SelectTrigger>
            <SelectContent className="bg-gradient-card border-primary/20">
              <SelectItem value="all">All Scores</SelectItem>
              <SelectItem value="high">90+ Elite</SelectItem>
              <SelectItem value="medium">70-89 Prime</SelectItem>
              <SelectItem value="low">Below 70</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-3">
          <Button 
            variant={viewMode === "grid" ? "default" : "outline"} 
            size="sm" 
            onClick={() => setViewMode("grid")}
            className="border-primary/30"
          >
            <Grid3X3 className="h-4 w-4" />
            Neural Grid
          </Button>
          <Button 
            variant={viewMode === "table" ? "default" : "outline"} 
            size="sm" 
            onClick={() => setViewMode("table")}
            className="border-primary/30"
          >
            <List className="h-4 w-4" />
            Data Matrix
          </Button>
        </div>
      </div>

      {/* Futuristic Campaign Grid View */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCampaigns.map((campaign, index) => (
            <Card 
              key={campaign.id} 
              className="group relative overflow-hidden bg-gradient-card border-primary/20 shadow-card hover:shadow-glow transition-all duration-500 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all duration-500"></div>
              
              <CardHeader className="relative pb-3">
                <div className="flex justify-between items-start">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                      <CardTitle className="text-lg text-white font-bold">
                        {campaign.name}
                      </CardTitle>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <Badge className={`${statusColors[campaign.status as keyof typeof statusColors]} text-xs border animate-glow`}>
                        {campaign.status}
                      </Badge>
                      <Badge className={`${warmupColors[campaign.warmupStatus as keyof typeof warmupColors]} text-xs border`}>
                        {campaign.warmupStatus}
                      </Badge>
                      <Badge className={`${threatColors[campaign.threat as keyof typeof threatColors]} text-xs border`}>
                        Threat: {campaign.threat}
                      </Badge>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-white hover:bg-primary/20">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-gradient-card border-primary/20">
                      <DropdownMenuItem className="text-white hover:bg-primary/20">
                        <Eye className="h-4 w-4 mr-2" />
                        Neural Analysis
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-white hover:bg-primary/20">
                        <Edit className="h-4 w-4 mr-2" />
                        Modify Matrix
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-white hover:bg-primary/20">
                        {campaign.status === "active" ? (
                          <>
                            <Pause className="h-4 w-4 mr-2" />
                            Suspend Protocol
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Activate Matrix
                          </>
                        )}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>

              <CardContent className="relative space-y-5">
                {/* Primary Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-muted/20 border border-primary/10">
                    <div className="text-white/60 text-xs uppercase tracking-wide">Neural Targets</div>
                    <div className="font-bold text-white flex items-center gap-1 text-lg">
                      <Users className="h-4 w-4 text-primary" />
                      {campaign.targetListSize.toLocaleString()}
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/20 border border-primary/10">
                    <div className="text-white/60 text-xs uppercase tracking-wide">AI Score</div>
                    <div className="font-bold text-primary text-lg flex items-center gap-1">
                      <Brain className="h-4 w-4" />
                      {campaign.aiScore}
                    </div>
                  </div>
                </div>

                {/* Progress Visualization */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/80">Quantum Progress</span>
                    <span className="font-medium text-white">
                      {campaign.todayProgress.sent}/{campaign.todayProgress.target}
                    </span>
                  </div>
                  <div className="relative">
                    <Progress 
                      value={(campaign.todayProgress.sent / campaign.todayProgress.target) * 100} 
                      className="h-3 bg-muted/30" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-pulse"></div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-2 rounded-lg bg-muted/20 border border-green-500/20">
                    <div className="text-xs text-white/60">Reply Rate</div>
                    <div className="font-bold text-green-400 flex items-center justify-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {campaign.replyRate}%
                    </div>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/20 border border-blue-500/20">
                    <div className="text-xs text-white/60">Booked</div>
                    <div className="font-bold text-blue-400 flex items-center justify-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {campaign.booked}
                    </div>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/20 border border-purple-500/20">
                    <div className="text-xs text-white/60">Velocity</div>
                    <div className="font-bold text-purple-400 flex items-center justify-center gap-1">
                      <Zap className="h-3 w-3" />
                      {campaign.velocity}
                    </div>
                  </div>
                </div>

                {/* Status Footer */}
                <div className="pt-3 border-t border-primary/20">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-white/60">
                      <Clock className="h-3 w-3" />
                      {campaign.sendWindow}
                    </div>
                    <div className="flex items-center gap-1">
                      <Wifi className="h-3 w-3 text-green-400 animate-pulse" />
                      <span className="text-green-400">Live</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Futuristic Table View */}
      {viewMode === "table" && (
        <Card className="bg-gradient-card border-primary/20 shadow-glow">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary animate-pulse" />
              Neural Campaign Matrix
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-primary/20">
                  <tr className="text-left">
                    <th className="p-4 font-medium text-primary uppercase tracking-wide text-xs">Campaign Matrix</th>
                    <th className="p-4 font-medium text-primary uppercase tracking-wide text-xs">Neural Status</th>
                    <th className="p-4 font-medium text-primary uppercase tracking-wide text-xs">Targets</th>
                    <th className="p-4 font-medium text-primary uppercase tracking-wide text-xs">AI Score</th>
                    <th className="p-4 font-medium text-primary uppercase tracking-wide text-xs">Progress</th>
                    <th className="p-4 font-medium text-primary uppercase tracking-wide text-xs">Performance</th>
                    <th className="p-4 font-medium text-primary uppercase tracking-wide text-xs">Threat Level</th>
                    <th className="p-4 font-medium text-primary uppercase tracking-wide text-xs">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCampaigns.map((campaign) => (
                    <tr key={campaign.id} className="border-b border-primary/10 hover:bg-primary/5 transition-colors group">
                      <td className="p-4">
                        <div className="space-y-1">
                          <div className="font-medium text-white flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                            {campaign.name}
                          </div>
                          <div className="text-sm text-white/60 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {campaign.sendWindow}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2 flex-wrap">
                          <Badge className={`${statusColors[campaign.status as keyof typeof statusColors]} text-xs border`}>
                            {campaign.status}
                          </Badge>
                          <Badge className={`${warmupColors[campaign.warmupStatus as keyof typeof warmupColors]} text-xs border`}>
                            {campaign.warmupStatus}
                          </Badge>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-white">
                          <Users className="h-4 w-4 text-primary" />
                          <span className="font-medium">{campaign.targetListSize.toLocaleString()}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Brain className="h-4 w-4 text-primary" />
                          <span className="font-bold text-primary">{campaign.aiScore}</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-3 w-3 ${i < Math.floor(campaign.aiScore / 20) ? "text-yellow-400 fill-current" : "text-muted-foreground"}`} 
                              />
                            ))}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="w-24 space-y-1">
                          <div className="text-xs text-white">
                            {campaign.todayProgress.sent}/{campaign.todayProgress.target}
                          </div>
                          <Progress 
                            value={(campaign.todayProgress.sent / campaign.todayProgress.target) * 100} 
                            className="h-2" 
                          />
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-green-400 text-sm">
                            <TrendingUp className="h-3 w-3" />
                            {campaign.replyRate}% Reply
                          </div>
                          <div className="flex items-center gap-1 text-blue-400 text-sm">
                            <Calendar className="h-3 w-3" />
                            {campaign.booked} Booked
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge className={`${threatColors[campaign.threat as keyof typeof threatColors]} text-xs border`}>
                          {campaign.threat}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity text-white">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-gradient-card border-primary/20">
                            <DropdownMenuItem className="text-white hover:bg-primary/20">
                              <Eye className="h-4 w-4 mr-2" />
                              Neural Analysis
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-white hover:bg-primary/20">
                              <Edit className="h-4 w-4 mr-2" />
                              Modify Matrix
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-white hover:bg-primary/20">
                              {campaign.status === "active" ? (
                                <>
                                  <Pause className="h-4 w-4 mr-2" />
                                  Suspend Protocol
                                </>
                              ) : (
                                <>
                                  <Play className="h-4 w-4 mr-2" />
                                  Activate Matrix
                                </>
                              )}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}