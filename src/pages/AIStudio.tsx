import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Brain, Play, Save, TestTube } from "lucide-react";

export default function AIStudio() {
  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center md:space-y-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">AI Studio</h1>
          <p className="text-sm md:text-base text-white">Configure AI prompts and test responses for your outreach campaigns.</p>
        </div>
        <Button className="gap-2 bg-primary hover:bg-primary/90 shadow-glow self-start md:self-auto">
          <Save className="h-4 w-4" />
          <span className="hidden sm:inline">Save Configuration</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
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
            <CardTitle className="flex items-center gap-2 text-white">
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
              <div className="text-sm text-foreground/60 mb-1">AI Response:</div>
              <div className="text-sm text-white">Thanks for your interest! I'd love to show you how our platform can help automate your outreach...</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}