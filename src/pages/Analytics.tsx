import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Download, Trophy, TrendingUp, Mail } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
const chartData = [{
  name: "Jan",
  replies: 120,
  bookings: 45
}, {
  name: "Feb",
  replies: 180,
  bookings: 67
}, {
  name: "Mar",
  replies: 140,
  bookings: 52
}, {
  name: "Apr",
  replies: 220,
  bookings: 89
}];
const topOpener = {
  template: "Hi [Name], I noticed your recent work on [Company Project]. Your approach to [Specific Detail] caught my attention...",
  replyRate: 67,
  totalSent: 342,
  totalReplies: 229,
  improvement: "+23%"
};
export default function Analytics() {
  return <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Analytics</h1>
          <p className="text-white">Track performance and optimize your outreach campaigns.</p>
        </div>
        <Button className="gap-2" variant="outline">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2 bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <BarChart3 className="h-5 w-5 text-primary" />
              Reply Rate Over Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip />
                <Line type="monotone" dataKey="replies" stroke="hsl(var(--primary))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-primary/20 via-background to-background border-primary/20 shadow-glow overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent bg-violet-950" />
          <CardHeader className="relative">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-white">
                <div className="p-2 rounded-lg bg-primary/20 border border-primary/30">
                  <Trophy className="h-5 w-5 text-primary" />
                </div>
                Top Opener
              </CardTitle>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 animate-glow">
                <TrendingUp className="h-3 w-3 mr-1" />
                {topOpener.improvement}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="relative space-y-4">
            <div className="p-4 rounded-lg bg-background/50 border border-border/50 backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                <p className="text-sm text-foreground/90 leading-relaxed">
                  "{topOpener.template}"
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 rounded-lg bg-primary/10 border border-primary/20">
                <div className="text-2xl font-bold text-white">{topOpener.replyRate}%</div>
                <div className="text-xs text-white">Reply Rate</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-secondary/10 border border-secondary/20">
                <div className="text-2xl font-bold text-white">{topOpener.totalReplies}</div>
                <div className="text-xs text-foreground/70">Total Replies</div>
              </div>
            </div>
            
            <div className="text-center pt-2">
              <p className="text-xs text-white">
                Out of {topOpener.totalSent} messages sent
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;
}