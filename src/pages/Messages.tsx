import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Inbox,
  Search,
  Filter,
  Send,
  Paperclip,
  Smile,
  Clock,
  Star,
  Archive,
  MoreHorizontal,
  Bot,
  User,
  MessageSquare,
  Eye
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Sample conversations data
const conversations = [
  {
    id: 1,
    contact: "Sarah Johnson",
    handle: "@sarah_johnson",
    lastMessage: "Thanks for reaching out! I'm definitely interested...",
    timestamp: "2 min ago",
    unread: true,
    campaign: "SaaS Founders Q4",
    priority: "high",
    avatar: "/api/placeholder/40/40"
  },
  {
    id: 2,
    contact: "Mike Chen",
    handle: "@mike_chen_dev",
    lastMessage: "Can you send me more details about pricing?",
    timestamp: "1 hour ago",
    unread: true,
    campaign: "Tech Startup Leads",
    priority: "medium",
    avatar: "/api/placeholder/40/40"
  },
  {
    id: 3,
    contact: "Emily Rodriguez",
    handle: "@emily_marketing",
    lastMessage: "Not interested at this time, thanks.",
    timestamp: "3 hours ago",
    unread: false,
    campaign: "E-commerce CEOs",
    priority: "low",
    avatar: "/api/placeholder/40/40"
  }
];

const messages = [
  {
    id: 1,
    type: "received",
    content: "Thanks for reaching out! I'm definitely interested in learning more about your platform. Could you send me some details about pricing and features?",
    timestamp: "2:34 PM",
    sender: "Sarah Johnson"
  },
  {
    id: 2,
    type: "sent",
    content: "Hi Sarah! Thanks for your interest. I'd love to show you how Bloomy can help automate your Instagram outreach and boost your conversion rates. Would you be available for a quick 15-minute demo this week?",
    timestamp: "2:30 PM",
    sender: "You"
  },
  {
    id: 3,
    type: "received",
    content: "Hey! I noticed you're working on scaling your SaaS business. I've been helping companies like yours automate their outreach with great results.",
    timestamp: "Yesterday 4:15 PM",
    sender: "Sarah Johnson"
  }
];

const folders = [
  { name: "All", count: 247, active: true },
  { name: "Unread", count: 12, active: false },
  { name: "Assigned to me", count: 34, active: false },
  { name: "Needs reply", count: 8, active: false },
  { name: "Snoozed", count: 3, active: false },
  { name: "Archived", count: 189, active: false }
];

export default function Messages() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [messageText, setMessageText] = useState("");

  return (
    <div className="p-6">
      <div className="h-[calc(100vh-8rem)] flex gap-6">
        {/* Left Sidebar - Folders */}
        <Card className="w-64 bg-gradient-card border-border shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Messages</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            {folders.map((folder) => (
              <Button
                key={folder.name}
                variant={folder.active ? "default" : "ghost"}
                className="w-full justify-between"
                size="sm"
              >
                <span>{folder.name}</span>
                <Badge variant="outline" className="text-xs">
                  {folder.count}
                </Badge>
              </Button>
            ))}
            
            <Separator className="my-4" />
            
            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground px-2">Saved Filters</div>
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <Star className="h-3 w-3 mr-2" />
                High Priority
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <MessageSquare className="h-3 w-3 mr-2" />
                Needs Follow-up
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Middle Panel - Conversation List */}
        <Card className="w-96 bg-gradient-card border-border shadow-card">
          <CardHeader className="pb-3">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  className="pl-10 bg-muted/50 border-border"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-4 border-b border-border cursor-pointer hover:bg-muted/50 transition-colors ${
                    selectedConversation?.id === conversation.id ? "bg-primary/10 border-r-2 border-r-primary" : ""
                  }`}
                  onClick={() => setSelectedConversation(conversation)}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={conversation.avatar} />
                      <AvatarFallback>
                        {conversation.contact.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-medium text-sm truncate">
                          {conversation.contact}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {conversation.timestamp}
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground mb-1">
                        {conversation.handle}
                      </div>
                      <div className="text-sm text-muted-foreground truncate mb-2">
                        {conversation.lastMessage}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {conversation.campaign}
                        </Badge>
                        {conversation.unread && (
                          <div className="h-2 w-2 bg-primary rounded-full" />
                        )}
                        {conversation.priority === "high" && (
                          <div className="h-2 w-2 bg-red-400 rounded-full" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Right Panel - Conversation View */}
        <div className="flex-1 flex flex-col">
          {/* Conversation Header */}
          <Card className="bg-gradient-card border-border shadow-card mb-4">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={selectedConversation?.avatar} />
                    <AvatarFallback>
                      {selectedConversation?.contact.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{selectedConversation?.contact}</div>
                    <div className="text-sm text-muted-foreground">
                      {selectedConversation?.handle} • Online 5 min ago
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Eye className="h-4 w-4" />
                    View Profile
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <Star className="h-4 w-4 mr-2" />
                        Star Conversation
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Clock className="h-4 w-4 mr-2" />
                        Snooze
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Archive className="h-4 w-4 mr-2" />
                        Archive
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Messages */}
          <Card className="flex-1 bg-gradient-card border-border shadow-card mb-4">
            <CardContent className="p-6 flex flex-col h-full">
              <div className="flex-1 space-y-4 overflow-y-auto">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === "sent" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.type === "sent"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <div className="text-sm">{message.content}</div>
                      <div className={`text-xs mt-1 ${
                        message.type === "sent" ? "text-primary-foreground/70" : "text-muted-foreground"
                      }`}>
                        {message.timestamp}
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicator */}
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg p-3 max-w-20">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Message Composer */}
          <Card className="bg-gradient-card border-border shadow-card">
            <CardContent className="p-4">
              {/* AI Suggestions */}
              <div className="mb-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <Bot className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">AI Suggestions</span>
                </div>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="text-xs h-auto p-2 justify-start">
                    "I'd be happy to schedule a quick demo to show you the features..."
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs h-auto p-2 justify-start">
                    "Here's a case study from a similar company that saw great results..."
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex gap-2">
                  <Select>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="follow-up">Follow-up</SelectItem>
                      <SelectItem value="demo">Demo Request</SelectItem>
                      <SelectItem value="pricing">Pricing Info</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                    Variables
                  </Button>
                </div>
                
                <div className="relative">
                  <Textarea
                    placeholder="Type your message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="min-h-20 pr-20 resize-none"
                  />
                  <div className="absolute bottom-3 right-3 flex gap-1">
                    <Button variant="ghost" size="sm">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Smile className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Clock className="h-4 w-4" />
                      Send Later
                    </Button>
                    <Button variant="outline" size="sm">
                      Internal Note
                    </Button>
                  </div>
                  <Button className="gap-2 bg-primary hover:bg-primary/90">
                    <Send className="h-4 w-4" />
                    Send Message
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}