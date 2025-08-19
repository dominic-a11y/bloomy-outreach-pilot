import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FolderOpen, Plus, Search } from "lucide-react";

export default function Content() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Content Library</h1>
          <p className="text-foreground/80">Manage your templates, media files, and message content.</p>
        </div>
        <Button className="gap-2 bg-primary hover:bg-primary/90 shadow-glow">
          <Plus className="h-4 w-4" />
          Add Content
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/60" />
        <Input placeholder="Search content..." className="pl-10 bg-muted/50 border-border" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1,2,3,4,5,6].map((i) => (
          <Card key={i} className="bg-gradient-card border-border shadow-card hover:shadow-glow transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base text-white">
                <FolderOpen className="h-4 w-4 text-primary" />
                Template {i}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground/60">Sample message template for outreach campaigns...</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}