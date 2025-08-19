import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Send,
  TrendingUp,
  Phone,
  DollarSign,
  Users,
  MessageSquare,
  Calendar,
  Shield,
  Plus,
  Upload,
  Brain,
  Activity
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

// Sample data
const topCards = [
  { title: "Messages Sent", value: "12,847", change: "+12%", icon: Send, color: "text-blue-400" },
  { title: "Reply Rate", value: "24.5%", change: "+5.2%", icon: TrendingUp, color: "text-green-400" },
  { title: "Booked Calls", value: "156", change: "+18%", icon: Phone, color: "text-purple-400" },
  { title: "Revenue", value: "$48,290", change: "+22%", icon: DollarSign, color: "text-yellow-400" }
];

const recentActivity = [
  { type: "lead", message: "New lead from Instagram campaign", time: "2 min ago", icon: Users },
  { type: "message", message: "Reply received from @sarah_johnson", time: "5 min ago", icon: MessageSquare },
  { type: "call", message: "Call booked for tomorrow 2:00 PM", time: "12 min ago", icon: Calendar },
  { type: "block", message: "Account @marketing_pro detected as limited", time: "18 min ago", icon: Shield }
];

const quickActions = [
  { title: "Create Campaign", icon: Plus, variant: "default" as const },
  { title: "Add Account", icon: Users, variant: "outline" as const },
  { title: "Import Leads", icon: Upload, variant: "outline" as const },
  { title: "Open AI Studio", icon: Brain, variant: "outline" as const }
];

const chartData = [
  { name: "Mon", messages: 1200, conversations: 45, calls: 8 },
  { name: "Tue", messages: 1800, conversations: 67, calls: 12 },
  { name: "Wed", messages: 1400, conversations: 52, calls: 9 },
  { name: "Thu", messages: 2200, conversations: 89, calls: 18 },
  { name: "Fri", messages: 1900, conversations: 71, calls: 14 },
  { name: "Sat", messages: 800, conversations: 28, calls: 5 },
  { name: "Sun", messages: 600, conversations: 19, calls: 3 }
];

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your outreach.</p>
        </div>
        <div className="flex gap-2">
          {quickActions.map((action) => (
            <Button key={action.title} variant={action.variant} className="gap-2">
              <action.icon className="h-4 w-4" />
              {action.title}
            </Button>
          ))}
        </div>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {topCards.map((card) => (
          <Card key={card.title} className="bg-gradient-card border-border shadow-card hover:shadow-glow transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <card.icon className={`h-5 w-5 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">{card.value}</div>
              <div className="flex items-center gap-1 text-xs">
                <TrendingUp className="h-3 w-3 text-green-400" />
                <span className="text-green-400">{card.change}</span>
                <span className="text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Instagram DMs by Day
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="messages" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2} 
                  dot={{ fill: "hsl(var(--primary))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Conversations by Day
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }} 
                />
                <Bar dataKey="conversations" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity and Active Accounts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <div className="p-2 rounded-full bg-primary/20">
                  <activity.icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.message}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {activity.type}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Active Accounts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">24</div>
              <p className="text-sm text-muted-foreground">Accounts online</p>
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Healthy</span>
                <span className="text-green-400 font-medium">18</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Warming</span>
                <span className="text-yellow-400 font-medium">4</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Limited</span>
                <span className="text-orange-400 font-medium">2</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Blocked</span>
                <span className="text-red-400 font-medium">0</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}