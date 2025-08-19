import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Brain, Play, Save, TestTube } from "lucide-react";

export default function AIStudio() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">AI Studio</h1>
          <p className="text-muted-foreground">Configure AI prompts and test responses for your outreach campaigns.</p>
        </div>
        <Button className="gap-2 bg-primary hover:bg-primary/90 shadow-glow">
          <Save className="h-4 w-4" />
          Save Configuration
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              System Prompt
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea 
              className="min-h-32" 
              placeholder="Define the AI's personality and behavior..."
              defaultValue="You are a professional sales assistant helping with Instagram DM outreach. Be friendly, helpful, and focus on building genuine relationships."
            />
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TestTube className="h-4 w-4 text-primary" />
              Test Bench
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea 
              className="min-h-20" 
              placeholder="Type a test message..."
            />
            <Button className="w-full gap-2">
              <Play className="h-4 w-4" />
              Test AI Response
            </Button>
            <div className="p-3 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">AI Response:</div>
              <div className="text-sm">Thanks for your interest! I'd love to show you how our platform can help automate your outreach...</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}