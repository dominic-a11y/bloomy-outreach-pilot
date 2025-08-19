import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Grid3X3, List, Plus, Search, Filter, MoreHorizontal, Users, Clock, TrendingUp, Play, Pause, Eye, Edit } from "lucide-react";

// Sample campaign data
const campaigns = [{
  id: 1,
  name: "SaaS Founders Q4",
  status: "active",
  targetListSize: 2847,
  accountsAttached: 8,
  sendWindow: "9:00 AM - 5:00 PM EST",
  warmupStatus: "complete",
  todayProgress: {
    sent: 124,
    target: 150
  },
  replyRate: 18.5,
  booked: 12
}, {
  id: 2,
  name: "E-commerce CEOs",
  status: "paused",
  targetListSize: 1523,
  accountsAttached: 5,
  sendWindow: "10:00 AM - 6:00 PM PST",
  warmupStatus: "warming",
  todayProgress: {
    sent: 0,
    target: 80
  },
  replyRate: 22.1,
  booked: 8
}, {
  id: 3,
  name: "Tech Startup Leads",
  status: "draft",
  targetListSize: 945,
  accountsAttached: 3,
  sendWindow: "8:00 AM - 4:00 PM EST",
  warmupStatus: "pending",
  todayProgress: {
    sent: 0,
    target: 60
  },
  replyRate: 0,
  booked: 0
}];
const statusColors = {
  active: "status-healthy",
  paused: "status-warning",
  draft: "status-muted",
  completed: "status-blocked"
};
const warmupColors = {
  complete: "status-healthy",
  warming: "status-warming",
  pending: "status-checkpoint"
};
export default function Campaigns() {
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const filteredCampaigns = campaigns.filter(campaign => campaign.name.toLowerCase().includes(searchTerm.toLowerCase()));
  return <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Campaigns</h1>
          <p className="text-muted-foreground">Manage your outreach campaigns and track performance.</p>
        </div>
        <Button className="gap-2 bg-primary hover:bg-primary/90 shadow-glow">
          <Plus className="h-4 w-4" />
          Create Campaign
        </Button>
      </div>

      {/* Filters and Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex gap-4 items-center flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search campaigns..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 bg-muted/50 border-border" />
          </div>
          
          <Select>
            <SelectTrigger className="w-32 bg-muted/50 border-border">
              <Filter className="h-4 w-4" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button variant={viewMode === "table" ? "default" : "outline"} size="sm" onClick={() => setViewMode("table")}>
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Campaign Grid View */}
      {viewMode === "grid" && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.map(campaign => <Card key={campaign.id} className="bg-gradient-card border-border shadow-card hover:shadow-glow transition-all group">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg transition-colors text-slate-50">
                      {campaign.name}
                    </CardTitle>
                    <div className="flex gap-2 mt-2">
                      <Badge className={`${statusColors[campaign.status as keyof typeof statusColors]} text-xs`}>
                        {campaign.status}
                      </Badge>
                      <Badge className={`${warmupColors[campaign.warmupStatus as keyof typeof warmupColors]} text-xs`}>
                        {campaign.warmupStatus}
                      </Badge>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Campaign
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        {campaign.status === "active" ? <>
                            <Pause className="h-4 w-4 mr-2" />
                            Pause Campaign
                          </> : <>
                            <Play className="h-4 w-4 mr-2" />
                            Start Campaign
                          </>}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Target List</div>
                    <div className="font-medium flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {campaign.targetListSize.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Accounts</div>
                    <div className="font-medium">{campaign.accountsAttached}</div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Today's Progress</span>
                    <span className="font-medium">
                      {campaign.todayProgress.sent}/{campaign.todayProgress.target}
                    </span>
                  </div>
                  <Progress value={campaign.todayProgress.sent / campaign.todayProgress.target * 100} className="h-2" />
                </div>

                <div className="flex justify-between items-center text-sm">
                  <div>
                    <div className="text-muted-foreground">Reply Rate</div>
                    <div className="font-medium text-green-400">{campaign.replyRate}%</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Booked</div>
                    <div className="font-medium text-primary">{campaign.booked}</div>
                  </div>
                </div>

                <div className="pt-2 border-t border-border">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {campaign.sendWindow}
                  </div>
                </div>
              </CardContent>
            </Card>)}
        </div>}

      {/* Campaign Table View */}
      {viewMode === "table" && <Card className="bg-gradient-card border-border shadow-card">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border">
                  <tr className="text-left">
                    <th className="p-4 font-medium text-muted-foreground">Campaign</th>
                    <th className="p-4 font-medium text-muted-foreground">Status</th>
                    <th className="p-4 font-medium text-muted-foreground">Targets</th>
                    <th className="p-4 font-medium text-muted-foreground">Accounts</th>
                    <th className="p-4 font-medium text-muted-foreground">Progress</th>
                    <th className="p-4 font-medium text-muted-foreground">Reply Rate</th>
                    <th className="p-4 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCampaigns.map(campaign => <tr key={campaign.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="p-4">
                        <div>
                          <div className="font-medium">{campaign.name}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {campaign.sendWindow}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Badge className={`${statusColors[campaign.status as keyof typeof statusColors]} text-xs`}>
                            {campaign.status}
                          </Badge>
                          <Badge className={`${warmupColors[campaign.warmupStatus as keyof typeof warmupColors]} text-xs`}>
                            {campaign.warmupStatus}
                          </Badge>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          {campaign.targetListSize.toLocaleString()}
                        </div>
                      </td>
                      <td className="p-4">{campaign.accountsAttached}</td>
                      <td className="p-4">
                        <div className="w-20">
                          <div className="text-xs mb-1">
                            {campaign.todayProgress.sent}/{campaign.todayProgress.target}
                          </div>
                          <Progress value={campaign.todayProgress.sent / campaign.todayProgress.target * 100} className="h-1" />
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1 text-green-400">
                          <TrendingUp className="h-3 w-3" />
                          {campaign.replyRate}%
                        </div>
                      </td>
                      <td className="p-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Campaign
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              {campaign.status === "active" ? <>
                                  <Pause className="h-4 w-4 mr-2" />
                                  Pause Campaign
                                </> : <>
                                  <Play className="h-4 w-4 mr-2" />
                                  Start Campaign
                                </>}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>}
    </div>;
}