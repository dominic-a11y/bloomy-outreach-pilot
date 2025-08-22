import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Search, Filter, Plus, MoreHorizontal, Play, Pause, UserCheck, Trash2, Eye,
  Clock, Send, Inbox, Globe, Users, Activity, Brain, Shield, Zap, Target,
  Sparkles, Rocket, Bot, Wifi, Database, Settings, TrendingUp, ArrowUp
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Enhanced account data with futuristic metrics
const accounts = [
  {
    id: 1,
    handle: "@quantum_growth_nexus",
    status: "neural_healthy",
    proxyLabel: "Neural-US-East-1",
    dailyLimit: 200,
    todaySent: 147,
    inboxUnread: 23,
    nextAction: "2:30 PM Quantum Cycle",
    avatar: "/api/placeholder/40/40",
    followers: 3847,
    following: 651,
    engagement: 94,
    aiScore: 98,
    threat: "none",
    velocity: "+34%",
    neuralPattern: "aggressive"
  },
  {
    id: 2,
    handle: "@cyber_outreach_matrix",
    status: "quantum_warming",
    proxyLabel: "Quantum-EU-Central",
    dailyLimit: 150,
    todaySent: 89,
    inboxUnread: 12,
    nextAction: "3:45 PM Neural Sync",
    avatar: "/api/placeholder/40/40",
    followers: 2523,
    following: 1092,
    engagement: 87,
    aiScore: 89,
    threat: "low",
    velocity: "+28%",
    neuralPattern: "balanced"
  },
  {
    id: 3,
    handle: "@neural_growth_bot",
    status: "cyber_limited",
    proxyLabel: "Cyber-Asia-Pacific",
    dailyLimit: 75,
    todaySent: 0,
    inboxUnread: 45,
    nextAction: "Neural Recovery Mode",
    avatar: "/api/placeholder/40/40",
    followers: 1945,
    following: 434,
    engagement: 45,
    aiScore: 67,
    threat: "medium",
    velocity: "-12%",
    neuralPattern: "conservative"
  },
  {
    id: 4,
    handle: "@quantum_marketing_ai",
    status: "neural_checkpoint",
    proxyLabel: "Neural-US-West-2",
    dailyLimit: 100,
    todaySent: 0,
    inboxUnread: 8,
    nextAction: "Quantum Verification Needed",
    avatar: "/api/placeholder/40/40",
    followers: 4521,
    following: 767,
    engagement: 76,
    aiScore: 85,
    threat: "low",
    velocity: "+15%",
    neuralPattern: "strategic"
  }
];

const statusConfig = {
  neural_healthy: { 
    label: "Neural Healthy", 
    className: "bg-green-500/20 text-green-400 border-green-500/30" 
  },
  quantum_warming: { 
    label: "Quantum Warming", 
    className: "bg-orange-500/20 text-orange-400 border-orange-500/30" 
  },
  cyber_limited: { 
    label: "Cyber Limited", 
    className: "bg-red-500/20 text-red-400 border-red-500/30" 
  },
  neural_checkpoint: { 
    label: "Neural Checkpoint", 
    className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" 
  },
  quantum_blocked: { 
    label: "Quantum Blocked", 
    className: "bg-gray-500/20 text-gray-400 border-gray-500/30" 
  }
};

const threatColors = {
  none: "bg-green-500/20 text-green-400",
  low: "bg-yellow-500/20 text-yellow-400",
  medium: "bg-orange-500/20 text-orange-400",
  high: "bg-red-500/20 text-red-400"
};

export default function Accounts() {
  const [selectedAccounts, setSelectedAccounts] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAccounts = accounts.filter(account =>
    account.handle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleAccountSelection = (accountId: number) => {
    setSelectedAccounts(prev =>
      prev.includes(accountId)
        ? prev.filter(id => id !== accountId)
        : [...prev, accountId]
    );
  };

  const toggleSelectAll = () => {
    setSelectedAccounts(
      selectedAccounts.length === filteredAccounts.length
        ? []
        : filteredAccounts.map(account => account.id)
    );
  };

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
                <Users className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-primary-glow to-white bg-clip-text text-transparent">
                  Neural Account Matrix
                </h1>
                <p className="text-white/70 text-lg">Quantum account orchestration & cyber health monitoring</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400">{accounts.filter(a => a.status === 'neural_healthy').length} Neural Healthy</span>
              </div>
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4 text-primary animate-pulse" />
                <span className="text-white/60">AI Monitoring Active</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-blue-400" />
                <span className="text-blue-400">Quantum Security</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button className="gap-2 bg-gradient-primary hover:shadow-glow transition-all duration-300 border border-primary/20">
              <Sparkles className="h-4 w-4" />
              Neural Connect
            </Button>
            <Button variant="outline" className="gap-2 border-primary/30 hover:bg-primary/10">
              <Bot className="h-4 w-4" />
              AI Analysis
            </Button>
          </div>
        </div>
      </div>

      {/* Performance Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Accounts", value: accounts.length.toString(), icon: Users, color: "text-primary" },
          { label: "Neural Healthy", value: accounts.filter(a => a.status === 'neural_healthy').length.toString(), icon: Shield, color: "text-green-400" },
          { label: "Avg AI Score", value: Math.round(accounts.reduce((acc, a) => acc + a.aiScore, 0) / accounts.length).toString(), icon: Brain, color: "text-purple-400" },
          { label: "Total Followers", value: accounts.reduce((acc, a) => acc + a.followers, 0).toLocaleString(), icon: TrendingUp, color: "text-blue-400" }
        ].map((metric, index) => (
          <Card key={metric.label} className="group bg-gradient-card border-primary/20 shadow-card hover:shadow-glow transition-all duration-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white/60 text-xs uppercase tracking-wide">{metric.label}</div>
                  <div className="text-2xl font-bold text-white">{metric.value}</div>
                </div>
                <metric.icon className={`h-8 w-8 ${metric.color} group-hover:animate-pulse`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and Bulk Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex gap-4 items-center flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary/60 animate-pulse" />
            <Input
              placeholder="Search neural accounts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gradient-card border-primary/20 text-white placeholder:text-white/50 shadow-card hover:shadow-glow transition-all"
            />
          </div>
          
          <Button variant="outline" size="sm" className="gap-2 border-primary/30 hover:bg-primary/10">
            <Filter className="h-4 w-4" />
            Quantum Filter
          </Button>
        </div>

        {selectedAccounts.length > 0 && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2 border-primary/30 hover:bg-primary/10">
              <Play className="h-4 w-4" />
              Neural Warmup ({selectedAccounts.length})
            </Button>
            <Button variant="outline" size="sm" className="gap-2 border-primary/30 hover:bg-primary/10">
              <Pause className="h-4 w-4" />
              Quantum Pause
            </Button>
            <Button variant="outline" size="sm" className="gap-2 border-primary/30 hover:bg-primary/10">
              <UserCheck className="h-4 w-4" />
              Cyber Verify
            </Button>
            <Button variant="outline" size="sm" className="gap-2 text-destructive hover:text-destructive border-red-500/30">
              <Trash2 className="h-4 w-4" />
              Neural Purge
            </Button>
          </div>
        )}
      </div>

      {/* Accounts Matrix Table */}
      <Card className="bg-gradient-card border-primary/20 shadow-glow">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary animate-pulse" />
            Quantum Account Matrix
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-primary/20">
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedAccounts.length === filteredAccounts.length}
                    onCheckedChange={toggleSelectAll}
                    className="border-primary/30"
                  />
                </TableHead>
                <TableHead className="text-primary uppercase tracking-wide text-xs">Neural Profile</TableHead>
                <TableHead className="text-primary uppercase tracking-wide text-xs">Quantum Status</TableHead>
                <TableHead className="text-primary uppercase tracking-wide text-xs">Cyber Proxy</TableHead>
                <TableHead className="text-primary uppercase tracking-wide text-xs">Neural Limit</TableHead>
                <TableHead className="text-primary uppercase tracking-wide text-xs">Today Sent</TableHead>
                <TableHead className="text-primary uppercase tracking-wide text-xs">AI Score</TableHead>
                <TableHead className="text-primary uppercase tracking-wide text-xs">Threat Level</TableHead>
                <TableHead className="text-primary uppercase tracking-wide text-xs">Neural Action</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAccounts.map((account) => (
                <TableRow key={account.id} className="border-b border-primary/10 hover:bg-primary/5 transition-colors group">
                  <TableCell>
                    <Checkbox
                      checked={selectedAccounts.includes(account.id)}
                      onCheckedChange={() => toggleAccountSelection(account.id)}
                      className="border-primary/30"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border-2 border-primary/20">
                        <AvatarImage src={account.avatar} />
                        <AvatarFallback className="bg-primary/20 text-primary">
                          {account.handle.slice(1, 3).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-white flex items-center gap-2">
                          {account.handle}
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                        </div>
                        <div className="text-xs text-white/70">
                          {account.followers.toLocaleString()} neural followers
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <TrendingUp className="h-3 w-3 text-green-400" />
                          <span className="text-green-400">{account.velocity}</span>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${statusConfig[account.status as keyof typeof statusConfig].className} text-xs border`}>
                      {statusConfig[account.status as keyof typeof statusConfig].label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm text-white">
                      <Globe className="h-3 w-3 text-primary" />
                      {account.proxyLabel}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm font-medium text-white">{account.dailyLimit}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium text-white">{account.todaySent}</div>
                      <div className="w-16 bg-muted/30 rounded-full h-2 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-primary to-primary-glow h-2 rounded-full transition-all duration-500" 
                          style={{ width: `${(account.todaySent / account.dailyLimit) * 100}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Brain className="h-4 w-4 text-primary" />
                      <span className="text-sm font-bold text-primary">{account.aiScore}</span>
                      <div className="w-12 bg-muted/30 rounded-full h-1">
                        <div 
                          className="bg-primary h-1 rounded-full" 
                          style={{ width: `${account.aiScore}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${threatColors[account.threat as keyof typeof threatColors]} text-xs border`}>
                      {account.threat}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm text-white">
                      <Clock className="h-3 w-3 text-primary" />
                      {account.nextAction}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-white hover:bg-primary/20"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </SheetTrigger>
                      <SheetContent className="w-96 bg-gradient-card border-primary/20">
                        <SheetHeader>
                          <SheetTitle className="flex items-center gap-3 text-white">
                            <Avatar className="h-10 w-10 border-2 border-primary/30">
                              <AvatarImage src={account.avatar} />
                              <AvatarFallback className="bg-primary/20 text-primary">
                                {account.handle.slice(1, 3).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            {account.handle}
                          </SheetTitle>
                          <SheetDescription className="text-white/60">
                            Neural account analysis & quantum performance metrics
                          </SheetDescription>
                        </SheetHeader>
                        
                        <div className="mt-6 space-y-6">
                          {/* Profile Overview */}
                          <div>
                            <h4 className="font-medium mb-3 text-white/90 flex items-center gap-2">
                              <Target className="h-4 w-4 text-primary" />
                              Neural Profile Overview
                            </h4>
                            <div className="space-y-3">
                              <div className="flex justify-between">
                                <span className="text-white/60">Neural Followers</span>
                                <span className="font-medium text-primary">{account.followers.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-white/60">Cyber Following</span>
                                <span className="font-medium text-white">{account.following.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-white/60">Quantum Proxy</span>
                                <span className="font-medium text-primary">{account.proxyLabel}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-white/60">Neural Pattern</span>
                                <span className="font-medium text-green-400">{account.neuralPattern}</span>
                              </div>
                            </div>
                          </div>

                          {/* Performance Metrics */}
                          <div>
                            <h4 className="font-medium mb-3 text-white/90 flex items-center gap-2">
                              <Activity className="h-4 w-4 text-primary animate-pulse" />
                              Quantum Performance
                            </h4>
                            <div className="space-y-3">
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span className="text-white/60">AI Score</span>
                                  <span className="text-primary font-bold">{account.aiScore}/100</span>
                                </div>
                                <Progress value={account.aiScore} className="h-2" />
                              </div>
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span className="text-white/60">Engagement Rate</span>
                                  <span className="text-green-400 font-bold">{account.engagement}%</span>
                                </div>
                                <Progress value={account.engagement} className="h-2" />
                              </div>
                              <div className="flex items-center gap-2">
                                <ArrowUp className="h-4 w-4 text-green-400" />
                                <span className="text-sm text-green-400">Velocity: {account.velocity}</span>
                              </div>
                            </div>
                          </div>

                          {/* Today's Activity */}
                          <div>
                            <h4 className="font-medium mb-3 text-white/90 flex items-center gap-2">
                              <Zap className="h-4 w-4 text-primary" />
                              Today's Neural Activity
                            </h4>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-white/60">Neural Messages Sent</span>
                                <span className="font-medium text-white">{account.todaySent}/{account.dailyLimit}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-white/60">Quantum Inbox</span>
                                <span className="font-medium text-blue-400">{account.inboxUnread} unread</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-white/60">Next Neural Action</span>
                                <span className="font-medium text-primary">{account.nextAction}</span>
                              </div>
                            </div>
                          </div>

                          {/* Neural Actions */}
                          <div>
                            <h4 className="font-medium mb-3 text-white/90 flex items-center gap-2">
                              <Rocket className="h-4 w-4 text-primary" />
                              Neural Actions
                            </h4>
                            <div className="space-y-2">
                              <Button className="w-full justify-start gap-2 bg-primary/20 hover:bg-primary/30 border border-primary/30" variant="outline">
                                <Send className="h-4 w-4" />
                                Send Neural Test
                              </Button>
                              <Button className="w-full justify-start gap-2" variant="outline">
                                <UserCheck className="h-4 w-4" />
                                Quantum Verify
                              </Button>
                              <Button className="w-full justify-start gap-2" variant="outline">
                                <Pause className="h-4 w-4" />
                                Neural Pause
                              </Button>
                              <Button className="w-full justify-start gap-2" variant="outline">
                                <Database className="h-4 w-4" />
                                Export Neural Data
                              </Button>
                            </div>
                          </div>
                        </div>
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