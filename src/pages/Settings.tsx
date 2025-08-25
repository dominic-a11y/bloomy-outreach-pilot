import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Settings as SettingsIcon, Key, Shield, Zap } from "lucide-react";
export default function Settings() {
  return <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-white">Configure your organization, users, and integrations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <SettingsIcon className="h-5 w-5 text-primary" />
              Organization
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-white">Organization Name</label>
              <Input defaultValue="Bloomy Inc" className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium text-white">Primary Color</label>
              <Input type="color" defaultValue="#8B5CF6" className="mt-1 h-10" />
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Key className="h-5 w-5 text-primary" />
              API Keys
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-white">OpenAI API Key</label>
              <Input 
                type="password" 
                placeholder="sk-..." 
                className="mt-1 bg-muted/50 border-border text-white" 
              />
            </div>
            <div>
              <label className="text-sm font-medium text-white">Claude API Key</label>
              <Input 
                type="password" 
                placeholder="sk-ant-..." 
                className="mt-1 bg-muted/50 border-border text-white" 
              />
            </div>
            <div>
              <label className="text-sm font-medium text-white">Google API Key</label>
              <Input 
                type="password" 
                placeholder="AIza..." 
                className="mt-1 bg-muted/50 border-border text-white" 
              />
            </div>
            <Button className="w-full">Save</Button>
          </CardContent>
        </Card>
      </div>
    </div>;
}