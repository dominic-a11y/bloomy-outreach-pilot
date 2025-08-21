import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Play,
  Pause,
  UserCheck,
  Trash2,
  Eye,
  Clock,
  Send,
  Inbox,
  Globe
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Sample account data
const accounts = [
  {
    id: 1,
    handle: "@bloomy_growth",
    status: "healthy",
    proxyLabel: "US-East-1",
    dailyLimit: 150,
    todaySent: 87,
    inboxUnread: 12,
    nextAction: "2:30 PM",
    avatar: "/api/placeholder/40/40",
    followers: 2847,
    following: 451
  },
  {
    id: 2,
    handle: "@outreach_pro",
    status: "warming",
    proxyLabel: "US-West-2",
    dailyLimit: 100,
    todaySent: 23,
    inboxUnread: 5,
    nextAction: "3:45 PM",
    avatar: "/api/placeholder/40/40",
    followers: 1523,
    following: 892
  },
  {
    id: 3,
    handle: "@growth_ninja",
    status: "limited",
    proxyLabel: "EU-Central",
    dailyLimit: 50,
    todaySent: 0,
    inboxUnread: 23,
    nextAction: "Paused",
    avatar: "/api/placeholder/40/40",
    followers: 945,
    following: 234
  },
  {
    id: 4,
    handle: "@marketing_ace",
    status: "checkpoint",
    proxyLabel: "US-East-2",
    dailyLimit: 75,
    todaySent: 0,
    inboxUnread: 7,
    nextAction: "Verification needed",
    avatar: "/api/placeholder/40/40",
    followers: 3421,
    following: 567
  }
];

const statusConfig = {
  healthy: { label: "Healthy", className: "status-healthy" },
  warming: { label: "Warming", className: "status-warming" },
  limited: { label: "Limited", className: "status-limited" },
  checkpoint: { label: "Checkpoint", className: "status-checkpoint" },
  blocked: { label: "Blocked", className: "status-blocked" }
};

export default function Accounts() {
  const [selectedAccounts, setSelectedAccounts] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAccounts = accounts.filter(account =>
    account.handle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleAccountSelection = (accountId: number) => {
    setSelectedAccounts(prev =>
      prev.includes(accountId)
        ? prev.filter(id => id !== accountId)
        : [...prev, accountId]
    );
  };

  const toggleSelectAll = () => {
    setSelectedAccounts(
      selectedAccounts.length === filteredAccounts.length
        ? []
        : filteredAccounts.map(account => account.id)
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Accounts</h1>
          <p className="text-white">Manage your Instagram accounts and monitor their health.</p>
        </div>
        <Button className="gap-2 bg-primary hover:bg-primary/90 shadow-glow">
          <Plus className="h-4 w-4" />
          Add Account
        </Button>
      </div>

      {/* Filters and Bulk Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex gap-4 items-center flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/60" />
            <Input
              placeholder="Search accounts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-muted/50 border-border"
            />
          </div>
          
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>

        {selectedAccounts.length > 0 && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Play className="h-4 w-4" />
              Start Warmup ({selectedAccounts.length})
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Pause className="h-4 w-4" />
              Pause
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <UserCheck className="h-4 w-4" />
              Verify
            </Button>
            <Button variant="outline" size="sm" className="gap-2 text-destructive hover:text-destructive">
              <Trash2 className="h-4 w-4" />
              Remove
            </Button>
          </div>
        )}
      </div>

      {/* Accounts Table */}
      <Card className="bg-gradient-card border-border shadow-card">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border">
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedAccounts.length === filteredAccounts.length}
                    onCheckedChange={toggleSelectAll}
                  />
                </TableHead>
                <TableHead>Account</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Proxy</TableHead>
                <TableHead>Daily Limit</TableHead>
                <TableHead>Today Sent</TableHead>
                <TableHead>Unread</TableHead>
                <TableHead>Next Action</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAccounts.map((account) => (
                <TableRow key={account.id} className="border-b border-border hover:bg-muted/50">
                  <TableCell>
                    <Checkbox
                      checked={selectedAccounts.includes(account.id)}
                      onCheckedChange={() => toggleAccountSelection(account.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={account.avatar} />
                        <AvatarFallback>
                          {account.handle.slice(1, 3).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-white">{account.handle}</div>
                        <div className="text-xs text-white">
                          {account.followers.toLocaleString()} followers
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${statusConfig[account.status as keyof typeof statusConfig].className} text-xs`}>
                      {statusConfig[account.status as keyof typeof statusConfig].label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm text-white">
                      <Globe className="h-3 w-3 text-foreground/60" />
                      {account.proxyLabel}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm font-medium text-white">{account.dailyLimit}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium text-white">{account.todaySent}</div>
                      <div className="w-16 bg-muted rounded-full h-1">
                        <div 
                          className="bg-primary h-1 rounded-full" 
                          style={{ width: `${(account.todaySent / account.dailyLimit) * 100}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Inbox className="h-3 w-3 text-foreground/60" />
                      <span className="text-sm font-medium text-white">{account.inboxUnread}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm text-white">
                      <Clock className="h-3 w-3 text-foreground/60" />
                      {account.nextAction}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </SheetTrigger>
                      <SheetContent className="w-96 bg-card border-border">
                        <SheetHeader>
                          <SheetTitle className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={account.avatar} />
                              <AvatarFallback>
                                {account.handle.slice(1, 3).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            {account.handle}
                          </SheetTitle>
                          <SheetDescription>
                            Account details and performance metrics
                          </SheetDescription>
                        </SheetHeader>
                        
                        <div className="mt-6 space-y-6">
                          <div>
                            <h4 className="font-medium mb-3 text-white">Profile Overview</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-foreground/60">Followers</span>
                                <span className="font-medium text-white">{account.followers.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-foreground/60">Following</span>
                                <span className="font-medium text-white">{account.following.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-foreground/60">Proxy</span>
                                <span className="font-medium text-white">{account.proxyLabel}</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-3 text-white">Today's Activity</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-foreground/60">Messages Sent</span>
                                <span className="font-medium text-white">{account.todaySent}/{account.dailyLimit}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-foreground/60">Unread Messages</span>
                                <span className="font-medium text-white">{account.inboxUnread}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-foreground/60">Next Action</span>
                                <span className="font-medium text-white">{account.nextAction}</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-3 text-white">Actions</h4>
                            <div className="space-y-2">
                              <Button className="w-full justify-start gap-2" variant="outline">
                                <Send className="h-4 w-4" />
                                Send Test Message
                              </Button>
                              <Button className="w-full justify-start gap-2" variant="outline">
                                <UserCheck className="h-4 w-4" />
                                Verify Account
                              </Button>
                              <Button className="w-full justify-start gap-2" variant="outline">
                                <Pause className="h-4 w-4" />
                                Pause Account
                              </Button>
                            </div>
                          </div>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}