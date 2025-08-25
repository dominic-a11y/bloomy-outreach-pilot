import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ScrollText, Heart, UserPlus, MessageCircle, Eye, MessageSquare, Shield, AlertTriangle, CheckCircle, Settings } from "lucide-react";

// Warmup action data
const warmupActions = [
  {
    id: 1,
    name: "Scrolls",
    icon: ScrollText,
    current: 145,
    target: 200,
    status: "safe"
  },
  {
    id: 2,
    name: "Likes",
    icon: Heart,
    current: 28,
    target: 50,
    status: "safe"
  },
  {
    id: 3,
    name: "Follows",
    icon: UserPlus,
    current: 12,
    target: 15,
    status: "approaching"
  },
  {
    id: 4,
    name: "Comments",
    icon: MessageCircle,
    current: 5,
    target: 8,
    status: "safe"
  },
  {
    id: 5,
    name: "Story Views",
    icon: Eye,
    current: 35,
    target: 40,
    status: "approaching"
  },
  {
    id: 6,
    name: "DM Opens / Replies",
    icon: MessageSquare,
    current: 8,
    target: 12,
    status: "safe"
  }
];

const statusColors = {
  safe: "bg-green-500/20 text-green-400 border-green-500/30",
  approaching: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  risky: "bg-red-500/20 text-red-400 border-red-500/30",
  completed: "bg-blue-500/20 text-blue-400 border-blue-500/30"
};

const safetyStatusConfig = {
  safe: { color: "text-green-400", bg: "bg-green-500/20", icon: CheckCircle },
  moderate: { color: "text-yellow-400", bg: "bg-yellow-500/20", icon: AlertTriangle },
  risky: { color: "text-red-400", bg: "bg-red-500/20", icon: Shield }
};

export default function Campaigns() {
  const [targets, setTargets] = useState<Record<number, number>>(
    warmupActions.reduce((acc, action) => ({ ...acc, [action.id]: action.target }), {})
  );

  const totalCurrent = warmupActions.reduce((sum, action) => sum + action.current, 0);
  const totalTarget = Object.values(targets).reduce((sum, target) => sum + target, 0);
  const completionPercentage = Math.round((totalCurrent / totalTarget) * 100);

  // Determine overall safety status
  const getSafetyStatus = () => {
    if (completionPercentage < 50) return "safe";
    if (completionPercentage < 80) return "moderate";
    return "risky";
  };

  const safetyStatus = getSafetyStatus();
  const SafetyIcon = safetyStatusConfig[safetyStatus].icon;

  const updateTarget = (actionId: number, newTarget: number) => {
    setTargets(prev => ({ ...prev, [actionId]: Math.max(1, newTarget) }));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Warmup</h1>
          <p className="text-muted-foreground">Scale your Instagram accounts naturally with safe automation limits.</p>
        </div>
        <Button className="gap-2 bg-primary hover:bg-primary/90 shadow-glow">
          <Settings className="h-4 w-4" />
          Configure Settings
        </Button>
      </div>

      {/* Summary Card */}
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-xl text-white flex items-center gap-3">
            <SafetyIcon className={`h-6 w-6 ${safetyStatusConfig[safetyStatus].color}`} />
            Daily Warmup Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total Actions Today</p>
              <p className="text-3xl font-bold text-white">{totalCurrent.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">of {totalTarget.toLocaleString()} target</p>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Completion Progress</p>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-white">{completionPercentage}%</span>
                  <span className="text-sm text-muted-foreground">complete</span>
                </div>
                <Progress value={completionPercentage} className="h-3" />
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Safety Status</p>
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${safetyStatusConfig[safetyStatus].bg} ${safetyStatusConfig[safetyStatus].color} border`}>
                <SafetyIcon className="h-4 w-4" />
                <span className="text-sm font-medium capitalize">{safetyStatus}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                {safetyStatus === "safe" && "Operating within safe limits"}
                {safetyStatus === "moderate" && "Approaching daily limits"}
                {safetyStatus === "risky" && "Near or at daily limits"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {warmupActions.map((action) => {
          const ActionIcon = action.icon;
          const currentTarget = targets[action.id];
          const progressPercentage = Math.round((action.current / currentTarget) * 100);
          
          // Determine status based on progress
          let actionStatus = "safe";
          if (progressPercentage >= 100) actionStatus = "completed";
          else if (progressPercentage >= 80) actionStatus = "approaching";
          else if (progressPercentage >= 90) actionStatus = "risky";

          return (
            <Card key={action.id} className="bg-gradient-card border-border shadow-card hover:shadow-glow transition-all">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/20">
                      <ActionIcon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg text-white">{action.name}</CardTitle>
                  </div>
                  <Badge className={`text-xs border ${statusColors[actionStatus]}`}>
                    {actionStatus}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Daily Target</p>
                    <Input
                      type="number"
                      value={currentTarget}
                      onChange={(e) => updateTarget(action.id, parseInt(e.target.value) || 0)}
                      className="w-20 h-8 text-white bg-muted/50 border-border mt-1"
                      min="1"
                    />
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Current</p>
                    <p className="text-2xl font-bold text-white">{action.current}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Progress</span>
                    <span className="text-sm font-medium text-white">
                      {action.current}/{currentTarget}
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {progressPercentage}% of daily target
                  </p>
                </div>

                <div className="pt-2 border-t border-border">
                  <div className="flex items-center gap-2 text-xs">
                    {actionStatus === "safe" && (
                      <>
                        <CheckCircle className="h-3 w-3 text-green-400" />
                        <span className="text-green-400">Safe to continue</span>
                      </>
                    )}
                    {actionStatus === "approaching" && (
                      <>
                        <AlertTriangle className="h-3 w-3 text-yellow-400" />
                        <span className="text-yellow-400">Approaching limit</span>
                      </>
                    )}
                    {actionStatus === "completed" && (
                      <>
                        <CheckCircle className="h-3 w-3 text-blue-400" />
                        <span className="text-blue-400">Target completed</span>
                      </>
                    )}
                    {actionStatus === "risky" && (
                      <>
                        <Shield className="h-3 w-3 text-red-400" />
                        <span className="text-red-400">Consider pausing</span>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}