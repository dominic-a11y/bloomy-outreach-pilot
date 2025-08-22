import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  Send, TrendingUp, Phone, DollarSign, Users, MessageSquare, Calendar, Shield, 
  Plus, Upload, Brain, Activity, Target, Zap, Globe, Clock, Star, ArrowUp, 
  ArrowDown, BarChart3, PieChart, Wifi, Database, Bot, AlertTriangle, 
  CheckCircle, Eye, Filter, Settings, Sparkles, Rocket, Crown, Award
} from "lucide-react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, AreaChart, Area, PieChart as RechartsPieChart, Pie, Cell, RadialBarChart, RadialBar
} from "recharts";

// Enhanced sample data with more metrics
const primaryMetrics = [
  {
    title: "Messages Sent",
    value: "12,847",
    change: "+12%",
    trend: "up",
    icon: Send,
    color: "text-blue-400",
    bgGlow: "from-blue-500/20 to-blue-600/5"
  },
  {
    title: "Reply Rate",
    value: "24.5%",
    change: "+5.2%",
    trend: "up",
    icon: TrendingUp,
    color: "text-green-400",
    bgGlow: "from-green-500/20 to-green-600/5"
  },
  {
    title: "Booked Calls",
    value: "156",
    change: "+18%",
    trend: "up",
    icon: Phone,
    color: "text-purple-400",
    bgGlow: "from-purple-500/20 to-purple-600/5"
  },
  {
    title: "Revenue",
    value: "$48,290",
    change: "+22%",
    trend: "up",
    icon: DollarSign,
    color: "text-yellow-400",
    bgGlow: "from-yellow-500/20 to-yellow-600/5"
  }
];

const secondaryMetrics = [
  { title: "Active Campaigns", value: "8", icon: Target, color: "text-cyan-400" },
  { title: "AI Responses", value: "1,247", icon: Bot, color: "text-pink-400" },
  { title: "Lead Score", value: "92", icon: Star, color: "text-orange-400" },
  { title: "Conversion Rate", value: "18.2%", icon: Zap, color: "text-indigo-400" }
];

const performanceData = [
  { name: "Mon", messages: 1200, replies: 240, calls: 8, revenue: 4200 },
  { name: "Tue", messages: 1800, replies: 432, calls: 12, revenue: 6800 },
  { name: "Wed", messages: 1400, replies: 294, calls: 9, revenue: 5100 },
  { name: "Thu", messages: 2200, replies: 550, calls: 18, revenue: 8900 },
  { name: "Fri", messages: 1900, replies: 456, calls: 14, revenue: 7200 },
  { name: "Sat", messages: 800, replies: 168, calls: 5, revenue: 2800 },
  { name: "Sun", messages: 600, replies: 126, calls: 3, revenue: 1900 }
];

const platformData = [
  { name: "Instagram", value: 45, color: "#E1306C" },
  { name: "LinkedIn", value: 30, color: "#0077B5" },
  { name: "Twitter", value: 15, color: "#1DA1F2" },
  { name: "Facebook", value: 10, color: "#4267B2" }
];

const recentActivity = [
  { type: "success", message: "Campaign 'Tech Leads Q4' achieved 95% delivery rate", time: "2 min ago", icon: CheckCircle },
  { type: "alert", message: "Account @sarah_marketing shows unusual activity", time: "5 min ago", icon: AlertTriangle },
  { type: "info", message: "AI model updated with new response patterns", time: "12 min ago", icon: Brain },
  { type: "success", message: "New high-value lead scored 98/100", time: "18 min ago", icon: Star },
  { type: "info", message: "Weekly performance report generated", time: "25 min ago", icon: BarChart3 }
];

const topPerformers = [
  { account: "@tech_innovator", score: 98, responses: 45, calls: 8 },
  { account: "@startup_founder", score: 94, responses: 38, calls: 6 },
  { account: "@marketing_pro", score: 91, responses: 42, calls: 7 },
  { account: "@sales_leader", score: 89, responses: 35, calls: 5 }
];

const aiInsights = [
  { insight: "Best messaging time: 2-4 PM weekdays", confidence: 94, icon: Clock },
  { insight: "Personalized openers increase replies by 34%", confidence: 89, icon: Target },
  { insight: "Follow-up timing optimization available", confidence: 87, icon: Zap }
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-hero p-6 space-y-6">
      {/* Futuristic Header with Animated Elements */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-card border border-primary/20 p-8 shadow-glow">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 animate-pulse"></div>
        <div className="relative z-10 flex justify-between items-center">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/20 border border-primary/30">
                <Sparkles className="h-6 w-6 text-primary animate-pulse" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-primary-glow bg-clip-text text-transparent">
                Mission Control
              </h1>
            </div>
            <p className="text-white/70 text-lg">Real-time outreach intelligence & automation</p>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400">All Systems Operational</span>
              </div>
              <div className="flex items-center gap-2">
                <Wifi className="h-4 w-4 text-primary" />
                <span className="text-white/60">Connected to 24 accounts</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button className="gap-2 bg-gradient-primary hover:shadow-glow transition-all duration-300 border border-primary/20">
              <Rocket className="h-4 w-4" />
              Launch Campaign
            </Button>
            <Button variant="outline" className="gap-2 border-primary/30 hover:bg-primary/10">
              <Brain className="h-4 w-4" />
              AI Studio
            </Button>
            <Button variant="outline" className="gap-2 border-primary/30 hover:bg-primary/10">
              <Settings className="h-4 w-4" />
              Control Panel
            </Button>
          </div>
        </div>
      </div>

      {/* Primary Metrics Grid with Enhanced Animations */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {primaryMetrics.map((metric, index) => (
          <Card key={metric.title} className="group relative overflow-hidden bg-gradient-card border-primary/20 shadow-card hover:shadow-glow transition-all duration-500 hover:scale-105">
            <div className={`absolute inset-0 bg-gradient-to-br ${metric.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
            <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/80">
                {metric.title}
              </CardTitle>
              <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                <metric.icon className={`h-5 w-5 ${metric.color}`} />
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-3xl font-bold text-white mb-2">{metric.value}</div>
              <div className="flex items-center gap-2 text-sm">
                {metric.trend === "up" ? (
                  <ArrowUp className="h-4 w-4 text-green-400" />
                ) : (
                  <ArrowDown className="h-4 w-4 text-red-400" />
                )}
                <span className={metric.trend === "up" ? "text-green-400" : "text-red-400"}>
                  {metric.change}
                </span>
                <span className="text-white/60">vs last period</span>
              </div>
              <div className="mt-3">
                <Progress value={75 + index * 5} className="h-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Secondary Metrics Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {secondaryMetrics.map((metric) => (
          <Card key={metric.title} className="bg-gradient-card border-primary/20 shadow-card hover:shadow-glow transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-white/60 uppercase tracking-wide">{metric.title}</p>
                  <p className="text-2xl font-bold text-white">{metric.value}</p>
                </div>
                <metric.icon className={`h-6 w-6 ${metric.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Advanced Analytics Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Multi-Metric Performance Chart */}
        <Card className="xl:col-span-2 bg-gradient-card border-primary/20 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <BarChart3 className="h-5 w-5 text-primary" />
              Performance Analytics
              <Badge variant="outline" className="ml-auto border-primary/30 text-primary">Real-time</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="messagesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="repliesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--primary))",
                    borderRadius: "12px",
                    boxShadow: "var(--shadow-glow)"
                  }} 
                />
                <Area type="monotone" dataKey="messages" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#messagesGradient)" strokeWidth={2} />
                <Area type="monotone" dataKey="replies" stroke="#10b981" fillOpacity={1} fill="url(#repliesGradient)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Platform Distribution */}
        <Card className="bg-gradient-card border-primary/20 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <PieChart className="h-5 w-5 text-primary" />
              Platform Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <RechartsPieChart>
                <Pie
                  data={platformData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {platformData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--primary))",
                    borderRadius: "8px"
                  }}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {platformData.map((platform) => (
                <div key={platform.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: platform.color }}></div>
                    <span className="text-white/80">{platform.name}</span>
                  </div>
                  <span className="text-white font-medium">{platform.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights & Top Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-card border-primary/20 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Brain className="h-5 w-5 text-primary animate-pulse" />
              AI Insights
              <Badge variant="outline" className="ml-auto border-green-500/30 text-green-400">Live</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {aiInsights.map((insight, index) => (
              <div key={index} className="p-4 rounded-lg bg-muted/20 border border-primary/10 hover:border-primary/30 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/20">
                    <insight.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-white font-medium">{insight.insight}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-white/60">Confidence:</span>
                      <div className="flex-1 h-2 bg-muted/50 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-primary-glow transition-all duration-1000"
                          style={{ width: `${insight.confidence}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-primary font-medium">{insight.confidence}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-primary/20 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Award className="h-5 w-5 text-primary" />
              Top Performers
              <Badge variant="outline" className="ml-auto border-yellow-500/30 text-yellow-400">This Week</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {topPerformers.map((performer, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 border border-primary/30">
                    {index === 0 && <Crown className="h-4 w-4 text-yellow-400" />}
                    {index !== 0 && <span className="text-sm font-bold text-primary">{index + 1}</span>}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{performer.account}</p>
                    <div className="flex gap-4 text-xs text-white/60">
                      <span>{performer.responses} responses</span>
                      <span>{performer.calls} calls</span>
                    </div>
                  </div>
                </div>
                <div className="ml-auto text-right">
                  <div className="text-lg font-bold text-primary">{performer.score}</div>
                  <div className="text-xs text-white/60">score</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Real-time Activity Feed & System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-gradient-card border-primary/20 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Activity className="h-5 w-5 text-primary animate-pulse" />
              Live Activity Stream
              <div className="ml-auto flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-400">Live</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 max-h-96 overflow-y-auto">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-4 p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors border-l-2 border-primary/30">
                <div className={`p-2 rounded-full ${
                  activity.type === 'success' ? 'bg-green-500/20 text-green-400' :
                  activity.type === 'alert' ? 'bg-orange-500/20 text-orange-400' :
                  'bg-blue-500/20 text-blue-400'
                }`}>
                  <activity.icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white font-medium leading-relaxed">{activity.message}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-white/60">{activity.time}</span>
                    <Badge variant="outline" className="text-xs border-primary/20">
                      {activity.type}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-primary/20 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Database className="h-5 w-5 text-primary" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white/80">API Rate Limit</span>
                  <span className="text-primary font-medium">78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white/80">Message Queue</span>
                  <span className="text-green-400 font-medium">24%</span>
                </div>
                <Progress value={24} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white/80">AI Processing</span>
                  <span className="text-blue-400 font-medium">91%</span>
                </div>
                <Progress value={91} className="h-2" />
              </div>
            </div>

            <Separator className="border-primary/20" />

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-white/80">Message Engine</span>
                </div>
                <CheckCircle className="h-4 w-4 text-green-400" />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-white/80">AI Response Bot</span>
                </div>
                <CheckCircle className="h-4 w-4 text-green-400" />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-white/80">Account Monitor</span>
                </div>
                <AlertTriangle className="h-4 w-4 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}