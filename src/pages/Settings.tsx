import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Settings as SettingsIcon, Users, Shield, Zap } from "lucide-react";

export default function Settings() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Configure your organization, users, and integrations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="h-5 w-5 text-primary" />
              Organization
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Organization Name</label>
              <Input defaultValue="Bloomy Inc" className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium">Primary Color</label>
              <Input type="color" defaultValue="#8B5CF6" className="mt-1 h-10" />
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Team Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 border rounded">
                <span>john@bloomy.com</span>
                <span className="text-sm text-muted-foreground">Owner</span>
              </div>
              <div className="flex justify-between items-center p-2 border rounded">
                <span>jane@bloomy.com</span>
                <span className="text-sm text-muted-foreground">Manager</span>
              </div>
            </div>
            <Button className="mt-4 w-full">Invite Member</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}