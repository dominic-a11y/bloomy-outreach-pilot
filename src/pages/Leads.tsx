import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Search, Filter, Plus, Eye, Tag, Upload, Archive, UserPlus, MessageSquare, DollarSign, Calendar, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Sample leads data
const leads = [{
  id: 1,
  name: "Sarah Johnson",
  handle: "@sarah_johnson",
  source: "Cold Outreach",
  stage: "qualified",
  lastContact: "2 hours ago",
  score: 85,
  owner: "John Doe",
  tags: ["SaaS", "Founder"],
  avatar: "/api/placeholder/40/40",
  company: "TechStart Inc",
  dealValue: 2500
}, {
  id: 2,
  name: "Mike Chen",
  handle: "@mike_chen_dev",
  source: "Referral",
  stage: "interested",
  lastContact: "1 day ago",
  score: 72,
  owner: "Jane Smith",
  tags: ["Developer", "Startup"],
  avatar: "/api/placeholder/40/40",
  company: "DevCorp",
  dealValue: 1800
}, {
  id: 3,
  name: "Emily Rodriguez",
  handle: "@emily_marketing",
  source: "Instagram",
  stage: "new",
  lastContact: "3 days ago",
  score: 65,
  owner: "Unassigned",
  tags: ["Marketing", "Agency"],
  avatar: "/api/placeholder/40/40",
  company: "MarketPro",
  dealValue: 3200
}];
const stageConfig = {
  new: {
    label: "New",
    className: "bg-blue-500/20 text-blue-400 border-blue-500/30"
  },
  contacted: {
    label: "Contacted",
    className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
  },
  interested: {
    label: "Interested",
    className: "bg-green-500/20 text-green-400 border-green-500/30"
  },
  qualified: {
    label: "Qualified",
    className: "bg-purple-500/20 text-purple-400 border-purple-500/30"
  },
  won: {
    label: "Won",
    className: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
  },
  lost: {
    label: "Lost",
    className: "bg-red-500/20 text-red-400 border-red-500/30"
  }
};
export default function Leads() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLead, setSelectedLead] = useState<typeof leads[0] | null>(null);
  const filteredLeads = leads.filter(lead => lead.name.toLowerCase().includes(searchTerm.toLowerCase()) || lead.handle.toLowerCase().includes(searchTerm.toLowerCase()));
  return <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Leads</h1>
          <p className="text-white">Manage your prospects and track their journey through your funnel.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Upload className="h-4 w-4" />
            Import
          </Button>
          <Button className="gap-2 bg-primary hover:bg-primary/90 shadow-glow">
            <Plus className="h-4 w-4" />
            Add Lead
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex gap-4 items-center flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/60" />
            <Input placeholder="Search leads..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 bg-muted/50 border-border" />
          </div>
          
          <Select>
            <SelectTrigger className="w-32 bg-muted/50 border-border">
              <SelectValue placeholder="Stage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stages</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="interested">Interested</SelectItem>
              <SelectItem value="qualified">Qualified</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-32 bg-muted/50 border-border">
              <SelectValue placeholder="Owner" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Owners</SelectItem>
              <SelectItem value="john">John Doe</SelectItem>
              <SelectItem value="jane">Jane Smith</SelectItem>
              <SelectItem value="unassigned">Unassigned</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <UserPlus className="h-4 w-4" />
            Assign Owner
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Tag className="h-4 w-4" />
            Add Tags
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Archive className="h-4 w-4" />
            Archive
          </Button>
        </div>
      </div>

      {/* Leads Table */}
      <Card className="bg-gradient-card border-border shadow-card">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border">
                <TableHead>Lead</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Last Contact</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Deal Value</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.map(lead => <TableRow key={lead.id} className="border-b border-border hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={lead.avatar} />
                        <AvatarFallback>
                          {lead.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-white">{lead.name}</div>
                        <div className="text-sm text-white">{lead.handle}</div>
                        <div className="text-xs text-white">{lead.company}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs text-white">
                      {lead.source}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${stageConfig[lead.stage as keyof typeof stageConfig].className} text-xs`}>
                      {stageConfig[lead.stage as keyof typeof stageConfig].label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-white">{lead.lastContact}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => <Star key={i} className={`h-3 w-3 ${i < Math.floor(lead.score / 20) ? "text-yellow-400 fill-current" : "text-muted-foreground"}`} />)}
                      </div>
                      <span className="text-xs text-foreground/60">{lead.score}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-white">{lead.owner}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm font-medium text-white">${lead.dealValue.toLocaleString()}</div>
                  </TableCell>
                  <TableCell>
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="ghost" size="sm" onClick={() => setSelectedLead(lead)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </SheetTrigger>
                      <SheetContent className="w-96 bg-card border-border">
                        <SheetHeader>
                          <SheetTitle className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={lead.avatar} />
                              <AvatarFallback>
                                {lead.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div>{lead.name}</div>
                              <div className="text-sm font-normal text-muted-foreground">{lead.handle}</div>
                            </div>
                          </SheetTitle>
                          <SheetDescription>
                            Lead profile and interaction history
                          </SheetDescription>
                        </SheetHeader>
                        
                        <Tabs defaultValue="overview" className="mt-6">
                          <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="notes">Notes</TabsTrigger>
                            <TabsTrigger value="messages">Messages</TabsTrigger>
                            <TabsTrigger value="deals">Deals</TabsTrigger>
                          </TabsList>
                          
                          <TabsContent value="overview" className="space-y-4">
                            <div>
                              <h4 className="font-medium mb-3">Quick Actions</h4>
                              <div className="space-y-2">
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Change stage" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="contacted">Contacted</SelectItem>
                                    <SelectItem value="interested">Interested</SelectItem>
                                    <SelectItem value="qualified">Qualified</SelectItem>
                                    <SelectItem value="won">Won</SelectItem>
                                    <SelectItem value="lost">Lost</SelectItem>
                                  </SelectContent>
                                </Select>
                                <Button className="w-full justify-start gap-2" variant="outline">
                                  <MessageSquare className="h-4 w-4" />
                                  Send Message
                                </Button>
                                <Button className="w-full justify-start gap-2" variant="outline">
                                  <Calendar className="h-4 w-4" />
                                  Schedule Call
                                </Button>
                              </div>
                            </div>

                            <div>
                              <h4 className="font-medium mb-3">Lead Information</h4>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Company</span>
                                  <span className="font-medium">{lead.company}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Source</span>
                                  <span className="font-medium">{lead.source}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Owner</span>
                                  <span className="font-medium">{lead.owner}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Score</span>
                                  <span className="font-medium">{lead.score}/100</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Deal Value</span>
                                  <span className="font-medium">${lead.dealValue.toLocaleString()}</span>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h4 className="font-medium mb-3">Tags</h4>
                              <div className="flex flex-wrap gap-2">
                                {lead.tags.map(tag => <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>)}
                              </div>
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="notes" className="space-y-4">
                            <div>
                              <h4 className="font-medium mb-3">Add Note</h4>
                              <Textarea placeholder="Add a note about this lead..." className="min-h-20" />
                              <Button size="sm" className="mt-2">Add Note</Button>
                            </div>
                            <div>
                              <h4 className="font-medium mb-3">Recent Notes</h4>
                              <div className="space-y-3">
                                <div className="p-3 bg-muted/50 rounded-lg">
                                  <div className="text-sm">Very interested in our premium plan. Mentioned budget approval needed.</div>
                                  <div className="text-xs text-muted-foreground mt-1">2 hours ago by John Doe</div>
                                </div>
                                <div className="p-3 bg-muted/50 rounded-lg">
                                  <div className="text-sm">Initial contact made. Responded positively to outreach.</div>
                                  <div className="text-xs text-muted-foreground mt-1">1 day ago by John Doe</div>
                                </div>
                              </div>
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="messages" className="space-y-4">
                            <div className="space-y-3">
                              <div className="p-3 bg-primary/10 rounded-lg ml-4">
                                <div className="text-sm">Thanks for reaching out! I'm definitely interested in learning more about your platform.</div>
                                <div className="text-xs text-muted-foreground mt-1">2 hours ago</div>
                              </div>
                              <div className="p-3 bg-muted/50 rounded-lg mr-4">
                                <div className="text-sm">Hi Sarah! I noticed you're working on scaling your SaaS. Would love to show you how Bloomy can help automate your outreach.</div>
                                <div className="text-xs text-muted-foreground mt-1">1 day ago</div>
                              </div>
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="deals" className="space-y-4">
                            <div>
                              <h4 className="font-medium mb-3">Active Deal</h4>
                              <Card className="bg-muted/50">
                                <CardContent className="p-4">
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="font-medium">Premium Plan</div>
                                    <div className="flex items-center gap-1 text-green-400">
                                      <DollarSign className="h-3 w-3" />
                                      ${lead.dealValue.toLocaleString()}
                                    </div>
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    Expected close: Next week
                                  </div>
                                  <div className="mt-2">
                                    <Badge className="status-healthy text-xs">
                                      90% Probability
                                    </Badge>
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </SheetContent>
                    </Sheet>
                  </TableCell>
                </TableRow>)}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>;
}