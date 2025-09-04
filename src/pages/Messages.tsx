import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Inbox, Search, Filter, Send, Paperclip, Smile, Clock, Star, Archive, MoreHorizontal, Bot, User, MessageSquare, Eye } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Demo conversations data - Creators Inc OnlyFans Management
const conversations = [{
  id: 1,
  contact: "Victoria",
  role: "Content Creator",
  company: "OnlyFans",
  handle: "",
  lastMessage: "Perfect, here's my calendar → https://calendly.com/creatorsinc/demo",
  timestamp: "2 min ago",
  unread: true,
  campaign: "OnlyFans Creators",
  priority: "high",
  outcome: "booked_call",
  avatar: "/api/placeholder/40/40"
}, {
  id: 2,
  contact: "Sarah",
  role: "Content Creator", 
  company: "OnlyFans",
  handle: "",
  lastMessage: "idk what if I don't grow tho",
  timestamp: "15 min ago",
  unread: true,
  campaign: "OnlyFans Creators",
  priority: "medium",
  outcome: "objection",
  avatar: "/api/placeholder/40/40"
}, {
  id: 3,
  contact: "Kayla",
  role: "Content Creator",
  company: "OnlyFans", 
  handle: "",
  lastMessage: "what do you guys even do?",
  timestamp: "1 hour ago",
  unread: true,
  campaign: "OnlyFans Creators",
  priority: "medium",
  outcome: "interested",
  avatar: "/api/placeholder/40/40"
}, {
  id: 4,
  contact: "Mercedes",
  role: "Content Creator",
  company: "OnlyFans",
  handle: "",
  lastMessage: "what's the catch?",
  timestamp: "2 hours ago",
  unread: true,
  campaign: "OnlyFans Creators",
  priority: "medium",
  outcome: "objection",
  avatar: "/api/placeholder/40/40"
}, {
  id: 5,
  contact: "Taylor",
  role: "Content Creator",
  company: "OnlyFans",
  handle: "",
  lastMessage: "idk, I already do good",
  timestamp: "3 hours ago",
  unread: false,
  campaign: "OnlyFans Creators",
  priority: "low",
  outcome: "objection", 
  avatar: "/api/placeholder/40/40"
}, {
  id: 6,
  contact: "Ines",
  role: "Content Creator",
  company: "OnlyFans",
  handle: "",
  lastMessage: "ok sure sounds good",
  timestamp: "4 hours ago",
  unread: true,
  campaign: "OnlyFans Creators",
  priority: "high",
  outcome: "booked_call",
  avatar: "/api/placeholder/40/40"
}, {
  id: 7,
  contact: "Kiana",
  role: "Content Creator",
  company: "OnlyFans",
  handle: "",
  lastMessage: "A simple yay or nay will do the work!",
  timestamp: "1 day ago",
  unread: false,
  campaign: "OnlyFans Creators",
  priority: "low",
  outcome: "follow_up",
  avatar: "/api/placeholder/40/40"
}, {
  id: 8,
  contact: "Jessica",
  role: "Content Creator", 
  company: "OnlyFans",
  handle: "",
  lastMessage: "wow ok but what do u guys actually do?",
  timestamp: "1 day ago",
  unread: true,
  campaign: "OnlyFans Creators",
  priority: "medium",
  outcome: "interested",
  avatar: "/api/placeholder/40/40"
}, {
  id: 9,
  contact: "Ashley",
  role: "Content Creator",
  company: "OnlyFans", 
  handle: "",
  lastMessage: "yeah that's fine",
  timestamp: "2 days ago",
  unread: true,
  campaign: "OnlyFans Creators",
  priority: "high",
  outcome: "booked_call",
  avatar: "/api/placeholder/40/40"
}, {
  id: 10,
  contact: "Mia",
  role: "Content Creator",
  company: "OnlyFans",
  handle: "",
  lastMessage: "how much do u take?",
  timestamp: "2 days ago",
  unread: false,
  campaign: "OnlyFans Creators",
  priority: "medium",
  outcome: "objection",
  avatar: "/api/placeholder/40/40"
}, {
  id: 11,
  contact: "Sophia",
  role: "Content Creator",
  company: "OnlyFans",
  handle: "",
  lastMessage: "Just checking in 🫡",
  timestamp: "3 days ago",
  unread: false,
  campaign: "OnlyFans Creators",
  priority: "low",
  outcome: "follow_up",
  avatar: "/api/placeholder/40/40"
}, {
  id: 12,
  contact: "Emma",
  role: "Content Creator",
  company: "OnlyFans", 
  handle: "",
  lastMessage: "call works",
  timestamp: "4 days ago",
  unread: true,
  campaign: "OnlyFans Creators",
  priority: "high",
  outcome: "booked_call",
  avatar: "/api/placeholder/40/40"
}];

// Conversation message threads mapped by conversation ID
const conversationMessages = {
  1: [
  // Victoria - Booked Call
  {
    id: 1,
    type: "sent",
    content: "Hi Victoria, there's something important you need to know immediately.",
    timestamp: "Yesterday 2:15 PM",
    sender: "Creators Inc"
  }, {
    id: 2,
    type: "received",
    content: "hey",
    timestamp: "Yesterday 3:22 PM",
    sender: "Victoria"
  }, {
    id: 3,
    type: "received",
    content: "what is it",
    timestamp: "Yesterday 3:24 PM",
    sender: "Victoria"
  }, {
    id: 4,
    type: "sent",
    content: "Thanks for getting back to me 🫶 First off, you look stunning! You've been killing it on IG, but you're missing at least 35–40k a month by not using Reddit, Tumblr & Discord. Have you ever thought about management for your OnlyFans?",
    timestamp: "Yesterday 4:10 PM",
    sender: "Creators Inc"
  }, {
    id: 5,
    type: "received",
    content: "no not really",
    timestamp: "Today 9:30 AM",
    sender: "Victoria"
  }, {
    id: 6,
    type: "sent",
    content: "File sent ✅",
    timestamp: "Today 9:35 AM",
    sender: "Creators Inc"
  }, {
    id: 7,
    type: "received",
    content: "wow ok but what do u guys actually do?",
    timestamp: "Today 10:45 AM",
    sender: "Victoria"
  }, {
    id: 8,
    type: "sent",
    content: "Gotcha! We take care of everything: chatting, promo, DMCA/security, marketing, content guidance, and 24/7 account management. You only focus on content — we handle the rest.",
    timestamp: "Today 11:00 AM",
    sender: "Creators Inc"
  }, {
    id: 9,
    type: "received",
    content: "what if I don't grow tho",
    timestamp: "Today 1:20 PM",
    sender: "Victoria"
  }, {
    id: 10,
    type: "sent",
    content: "Totally fair question. We spend 300k+ each month on ads across all creators, and even the smallest earner makes 40k/month. Growth is standard with our system.",
    timestamp: "Today 1:25 PM",
    sender: "Creators Inc"
  }, {
    id: 11,
    type: "received",
    content: "alright yeah sounds good",
    timestamp: "Today 2:30 PM",
    sender: "Victoria"
  }, {
    id: 12,
    type: "sent",
    content: "Perfect, here's my calendar → https://calendly.com/creatorsinc/demo",
    timestamp: "Today 2:32 PM",
    sender: "Creators Inc"
  }],
  2: [
  // Sarah - Objection (Growth)
  {
    id: 1,
    type: "sent",
    content: "Hi Sarah, there's something important you need to know immediately.",
    timestamp: "2 days ago 11:30 AM",
    sender: "Creators Inc"
  }, {
    id: 2,
    type: "received",
    content: "what",
    timestamp: "2 days ago 2:15 PM",
    sender: "Sarah"
  }, {
    id: 3,
    type: "sent",
    content: "Thanks for getting back to me 🫶 First off, I must express my admiration for your looks — stunning! Here's the thing, you've been killing it on IG, but you're sleeping on at least 35–40k monthly by not using Reddit, Tumblr & Discord. The good news is… it can be utilised. I won't fluff around, so let me ask: have you ever considered having management for your OnlyFans?",
    timestamp: "2 days ago 2:45 PM",
    sender: "Creators Inc"
  }, {
    id: 4,
    type: "received",
    content: "File sent ✅",
    timestamp: "2 days ago 3:00 PM",
    sender: "Creators Inc"
  }, {
    id: 5,
    type: "received",
    content: "idk, I already do good",
    timestamp: "Yesterday 10:45 AM",
    sender: "Sarah"
  }, {
    id: 6,
    type: "sent",
    content: "Gotcha! I hope you don't mind me asking, how much are you currently making on OnlyFans?",
    timestamp: "Yesterday 11:15 AM",
    sender: "Creators Inc"
  }, {
    id: 7,
    type: "received",
    content: "like 15k a month but that's pretty good",
    timestamp: "Yesterday 3:20 PM",
    sender: "Sarah"
  }, {
    id: 8,
    type: "sent",
    content: "That's actually amazing! Most creators would kill for those numbers. But imagine if we could get you to 40-50k without changing your content style. The biggest difference would be expanding to platforms you're not on yet.",
    timestamp: "Yesterday 4:00 PM",
    sender: "Creators Inc"
  }, {
    id: 9,
    type: "received",
    content: "idk what if I don't grow tho",
    timestamp: "15 min ago",
    sender: "Sarah"
  }],
  3: [
  // Kayla - Interested
  {
    id: 1,
    type: "sent",
    content: "Hi Kayla, there's something important you need to know immediately.",
    timestamp: "3 days ago 9:15 AM",
    sender: "Creators Inc"
  }, {
    id: 2,
    type: "received",
    content: "ok what",
    timestamp: "3 days ago 1:20 PM",
    sender: "Kayla"
  }, {
    id: 3,
    type: "sent",
    content: "Thanks for getting back to me 🫶 First off, I must express my admiration for your looks — stunning! Here's the thing, you've been killing it on IG, but you're sleeping on at least 35–40k monthly by not using Reddit, Tumblr & Discord. The good news is… it can be utilised. I won't fluff around, so let me ask: have you ever considered having management for your OnlyFans?",
    timestamp: "3 days ago 2:45 PM",
    sender: "Creators Inc"
  }, {
    id: 4,
    type: "received",
    content: "umm maybe? idk much about it",
    timestamp: "3 days ago 4:30 PM",
    sender: "Kayla"
  }, {
    id: 5,
    type: "sent",
    content: "File sent ✅",
    timestamp: "3 days ago 4:35 PM",
    sender: "Creators Inc"
  }, {
    id: 6,
    type: "received",
    content: "what do you guys even do?",
    timestamp: "1 hour ago",
    sender: "Kayla"
  }],
  4: [
  // Mercedes - Objection (Catch)
  {
    id: 1,
    type: "sent",
    content: "Hi Mercedes, there's something important you need to know immediately.",
    timestamp: "1 week ago 2:30 PM",
    sender: "Creators Inc"
  }, {
    id: 2,
    type: "received",
    content: "what's up",
    timestamp: "6 days ago 4:45 PM",
    sender: "Mercedes"
  }, {
    id: 3,
    type: "sent",
    content: "Thanks for getting back to me 🫶 First off, I must express my admiration for your looks — stunning! Here's the thing, you've been killing it on IG, but you're sleeping on at least 35–40k monthly by not using Reddit, Tumblr & Discord. The good news is… it can be utilised. I won't fluff around, so let me ask: have you ever considered having management for your OnlyFans?",
    timestamp: "6 days ago 5:20 PM",
    sender: "Creators Inc"
  }, {
    id: 4,
    type: "sent",
    content: "File sent ✅",
    timestamp: "6 days ago 5:25 PM",
    sender: "Creators Inc"
  }, {
    id: 5,
    type: "received",
    content: "this looks too good to be true",
    timestamp: "5 days ago 11:15 AM",
    sender: "Mercedes"
  }, {
    id: 6,
    type: "received",
    content: "what's the catch?",
    timestamp: "2 hours ago",
    sender: "Mercedes"
  }],
  5: [
  // Taylor - Already do good objection
  {
    id: 1,
    type: "sent",
    content: "Hi Taylor, there's something important you need to know immediately.",
    timestamp: "4 days ago 10:00 AM",
    sender: "Creators Inc"
  }, {
    id: 2,
    type: "received",
    content: "??",
    timestamp: "4 days ago 2:30 PM",
    sender: "Taylor"
  }, {
    id: 3,
    type: "sent",
    content: "Thanks for getting back to me 🫶 First off, I must express my admiration for your looks — stunning! Here's the thing, you've been killing it on IG, but you're sleeping on at least 35–40k monthly by not using Reddit, Tumblr & Discord. The good news is… it can be utilised. I won't fluff around, so let me ask: have you ever considered having management for your OnlyFans?",
    timestamp: "4 days ago 3:15 PM",
    sender: "Creators Inc"
  }, {
    id: 4,
    type: "sent",
    content: "File sent ✅",
    timestamp: "4 days ago 3:20 PM",
    sender: "Creators Inc"
  }, {
    id: 5,
    type: "received",
    content: "idk, I already do good",
    timestamp: "3 hours ago",
    sender: "Taylor"
  }],
  6: [
  // Ines - Booked Call
  {
    id: 1,
    type: "sent",
    content: "Hi Ines, there's something important you need to know immediately.",
    timestamp: "5 days ago 1:20 PM",
    sender: "Creators Inc"
  }, {
    id: 2,
    type: "received",
    content: "hey what's important?",
    timestamp: "5 days ago 4:30 PM",
    sender: "Ines"
  }, {
    id: 3,
    type: "sent",
    content: "Thanks for getting back to me 🫶 First off, I must express my admiration for your looks — stunning! Here's the thing, you've been killing it on IG, but you're sleeping on at least 35–40k monthly by not using Reddit, Tumblr & Discord. The good news is… it can be utilised. I won't fluff around, so let me ask: have you ever considered having management for your OnlyFans?",
    timestamp: "4 days ago 9:45 AM",
    sender: "Creators Inc"
  }, {
    id: 4,
    type: "received",
    content: "yeah actually that sounds interesting",
    timestamp: "4 days ago 2:15 PM",
    sender: "Ines"
  }, {
    id: 5,
    type: "sent",
    content: "File sent ✅",
    timestamp: "4 days ago 2:20 PM",
    sender: "Creators Inc"
  }, {
    id: 6,
    type: "received",
    content: "damn ok this looks legit",
    timestamp: "4 days ago 3:00 PM",
    sender: "Ines"
  }, {
    id: 7,
    type: "sent",
    content: "So if there's interest, I can walk you through exactly how it works on a quick call.",
    timestamp: "4 days ago 3:15 PM",
    sender: "Creators Inc"
  }, {
    id: 8,
    type: "received",
    content: "ok sure sounds good",
    timestamp: "4 hours ago",
    sender: "Ines"
  }],
  7: [
  // Kiana - Follow up (no reply)
  {
    id: 1,
    type: "sent",
    content: "Hi Kiana, there's something important you need to know immediately.",
    timestamp: "2 weeks ago 2:30 PM",
    sender: "Creators Inc"
  }, {
    id: 2,
    type: "sent",
    content: "Just checking in 🫡",
    timestamp: "1 week ago 2:30 PM",
    sender: "Creators Inc"
  }, {
    id: 3,
    type: "sent",
    content: "A simple yay or nay will do the work!",
    timestamp: "1 day ago",
    sender: "Creators Inc"
  }],
  8: [
  // Jessica - Interested  
  {
    id: 1,
    type: "sent",
    content: "Hi Jessica, there's something important you need to know immediately.",
    timestamp: "3 days ago 10:00 AM",
    sender: "Creators Inc"
  }, {
    id: 2,
    type: "received",
    content: "what",
    timestamp: "3 days ago 2:30 PM",
    sender: "Jessica"
  }, {
    id: 3,
    type: "sent",
    content: "Thanks for getting back to me 🫶 First off, I must express my admiration for your looks — stunning! Here's the thing, you've been killing it on IG, but you're sleeping on at least 35–40k monthly by not using Reddit, Tumblr & Discord. The good news is… it can be utilised. I won't fluff around, so let me ask: have you ever considered having management for your OnlyFans?",
    timestamp: "3 days ago 3:15 PM",
    sender: "Creators Inc"
  }, {
    id: 4,
    type: "received",
    content: "no not really",
    timestamp: "2 days ago 9:45 AM",
    sender: "Jessica"
  }, {
    id: 5,
    type: "sent",
    content: "File sent ✅",
    timestamp: "2 days ago 10:00 AM",
    sender: "Creators Inc"
  }, {
    id: 6,
    type: "received",
    content: "wow ok but what do u guys actually do?",
    timestamp: "1 day ago",
    sender: "Jessica"
  }],
  9: [
  // Ashley - Booked Call
  {
    id: 1,
    type: "sent",
    content: "Hi Ashley, there's something important you need to know immediately.",
    timestamp: "4 days ago 1:20 PM",
    sender: "Creators Inc"
  }, {
    id: 2,
    type: "received",
    content: "hey what's up?",
    timestamp: "4 days ago 4:30 PM",
    sender: "Ashley"
  }, {
    id: 3,
    type: "sent",
    content: "Thanks for getting back to me 🫶 First off, I must express my admiration for your looks — stunning! Here's the thing, you've been killing it on IG, but you're sleeping on at least 35–40k monthly by not using Reddit, Tumblr & Discord. The good news is… it can be utilised. I won't fluff around, so let me ask: have you ever considered having management for your OnlyFans?",
    timestamp: "3 days ago 9:45 AM",
    sender: "Creators Inc"
  }, {
    id: 4,
    type: "received",
    content: "honestly yeah I've thought about it",
    timestamp: "3 days ago 2:15 PM",
    sender: "Ashley"
  }, {
    id: 5,
    type: "sent",
    content: "File sent ✅",
    timestamp: "3 days ago 2:20 PM",
    sender: "Creators Inc"
  }, {
    id: 6,
    type: "received",
    content: "these results look crazy good",
    timestamp: "3 days ago 3:00 PM",
    sender: "Ashley"
  }, {
    id: 7,
    type: "sent",
    content: "So if there's interest, I can walk you through exactly how it works on a quick call.",
    timestamp: "3 days ago 3:15 PM",
    sender: "Creators Inc"
  }, {
    id: 8,
    type: "received",
    content: "yeah that's fine",
    timestamp: "2 days ago",
    sender: "Ashley"
  }],
  10: [
  // Mia - Objection (Commission)
  {
    id: 1,
    type: "sent",
    content: "Hi Mia, there's something important you need to know immediately.",
    timestamp: "5 days ago 10:00 AM",
    sender: "Creators Inc"
  }, {
    id: 2,
    type: "received",
    content: "what's important",
    timestamp: "5 days ago 2:30 PM",
    sender: "Mia"
  }, {
    id: 3,
    type: "sent",
    content: "Thanks for getting back to me 🫶 First off, I must express my admiration for your looks — stunning! Here's the thing, you've been killing it on IG, but you're sleeping on at least 35–40k monthly by not using Reddit, Tumblr & Discord. The good news is… it can be utilised. I won't fluff around, so let me ask: have you ever considered having management for your OnlyFans?",
    timestamp: "4 days ago 3:15 PM",
    sender: "Creators Inc"
  }, {
    id: 4,
    type: "sent",
    content: "File sent ✅",
    timestamp: "4 days ago 3:20 PM",
    sender: "Creators Inc"
  }, {
    id: 5,
    type: "received",
    content: "looks good but",
    timestamp: "3 days ago 9:45 AM",
    sender: "Mia"
  }, {
    id: 6,
    type: "received",
    content: "how much do u take?",
    timestamp: "2 days ago",
    sender: "Mia"
  }],
  11: [
  // Sophia - Follow up
  {
    id: 1,
    type: "sent",
    content: "Hi Sophia, there's something important you need to know immediately.",
    timestamp: "2 weeks ago 1:20 PM",
    sender: "Creators Inc"
  }, {
    id: 2,
    type: "sent",
    content: "Just checking in 🫡",
    timestamp: "3 days ago",
    sender: "Creators Inc"
  }],
  12: [
  // Emma - Booked Call
  {
    id: 1,
    type: "sent",
    content: "Hi Emma, there's something important you need to know immediately.",
    timestamp: "6 days ago 1:20 PM",
    sender: "Creators Inc"
  }, {
    id: 2,
    type: "received",
    content: "hi what's up",
    timestamp: "6 days ago 4:30 PM",
    sender: "Emma"
  }, {
    id: 3,
    type: "sent",
    content: "Thanks for getting back to me 🫶 First off, I must express my admiration for your looks — stunning! Here's the thing, you've been killing it on IG, but you're sleeping on at least 35–40k monthly by not using Reddit, Tumblr & Discord. The good news is… it can be utilised. I won't fluff around, so let me ask: have you ever considered having management for your OnlyFans?",
    timestamp: "5 days ago 9:45 AM",
    sender: "Creators Inc"
  }, {
    id: 4,
    type: "received",
    content: "yeah actually I have",
    timestamp: "5 days ago 2:15 PM",
    sender: "Emma"
  }, {
    id: 5,
    type: "sent",
    content: "File sent ✅",
    timestamp: "5 days ago 2:20 PM",
    sender: "Creators Inc"
  }, {
    id: 6,
    type: "received",
    content: "omg these numbers are insane",
    timestamp: "5 days ago 3:00 PM",
    sender: "Emma"
  }, {
    id: 7,
    type: "sent",
    content: "So if there's interest, I can walk you through exactly how it works on a quick call.",
    timestamp: "5 days ago 3:15 PM",
    sender: "Creators Inc"
  }, {
    id: 8,
    type: "received",
    content: "call works",
    timestamp: "4 days ago",
    sender: "Emma"
  }]
};

// Default to Sarah Chen's conversation
const messages = conversationMessages[1] || [];
const folders = [{
  name: "All",
  count: 247,
  active: true
}, {
  name: "Unread",
  count: 12,
  active: false
}, {
  name: "Assigned to me",
  count: 34,
  active: false
}, {
  name: "Needs reply",
  count: 8,
  active: false
}, {
  name: "Snoozed",
  count: 3,
  active: false
}, {
  name: "Archived",
  count: 189,
  active: false
}];
export default function Messages() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [messageText, setMessageText] = useState("");

  // Get messages for selected conversation
  const currentMessages = conversationMessages[selectedConversation?.id] || [];
  return <div className="p-6">
      <div className="h-[calc(100vh-8rem)] flex gap-6">
        {/* Left Sidebar - Folders */}
        <Card className="w-64 bg-gradient-card border-border shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-white">Messages</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            {folders.map(folder => <Button key={folder.name} variant={folder.active ? "default" : "ghost"} className="w-full justify-between text-white" size="sm">
                <span className="text-white">{folder.name}</span>
                <Badge variant="outline" className="text-xs text-white">
                  {folder.count}
                </Badge>
              </Button>)}
            
            <Separator className="my-4" />
            
            <div className="space-y-2">
              <div className="text-sm font-medium text-white/80 px-2">Saved Filters</div>
              <Button variant="ghost" size="sm" className="w-full justify-start text-white">
                <Star className="h-3 w-3 mr-2" />
                High Priority
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start text-white">
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
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/60" />
                <Input placeholder="Search conversations..." className="pl-10 bg-muted/50 border-border" />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0 flex flex-col h-[calc(100vh-12rem)]">
            <div className="flex-1 overflow-y-auto">
              {conversations.map(conversation => 
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
                        <div className="font-medium text-sm truncate text-white">
                          {conversation.contact}
                        </div>
                        <div className="text-xs text-white">
                          {conversation.timestamp}
                        </div>
                      </div>
                      <div className="text-xs text-white mb-1">
                        {conversation.handle}
                      </div>
                      <div className="text-sm text-white truncate mb-2">
                        {conversation.lastMessage}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs text-white">
                          {conversation.campaign}
                        </Badge>
                        {conversation.unread && <div className="h-2 w-2 bg-primary rounded-full" />}
                        {conversation.priority === "high" && <div className="h-2 w-2 bg-red-400 rounded-full" />}
                      </div>
                    </div>
                  </div>
                </div>
              )}
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
                    <div className="font-medium text-white">{selectedConversation?.contact}</div>
                    <div className="text-sm text-white">
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
          <Card className="flex-1 bg-gradient-card border-border shadow-card mb-4 flex flex-col min-h-0">
            <CardContent className="p-6 flex flex-col h-full min-h-0">
              <div className="flex-1 overflow-y-auto pr-2 space-y-4 max-h-[calc(100vh-32rem)]">
                {currentMessages.map(message => 
                  <div key={message.id} className={`flex ${message.type === "sent" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] rounded-lg p-3 ${
                      message.type === "sent" 
                        ? "bg-primary text-white" 
                        : "bg-white text-black border border-border"
                    }`}>
                      <div className={`text-sm ${
                        message.type === "sent" ? "text-white" : "text-black"
                      }`}>
                        {message.content}
                      </div>
                      <div className={`text-xs mt-1 ${
                        message.type === "sent" ? "text-white/70" : "text-black/60"
                      }`}>
                        {message.timestamp}
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Typing Indicator */}
                <div className="flex justify-start">
                  <div className="bg-white border border-border rounded-lg p-3 max-w-20">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-black/60 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-black/60 rounded-full animate-bounce" style={{
                      animationDelay: "0.1s"
                    }}></div>
                      <div className="w-2 h-2 bg-black/60 rounded-full animate-bounce" style={{
                      animationDelay: "0.2s"
                    }}></div>
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
                  <span className="text-sm font-medium text-white">AI Suggestions</span>
                </div>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="text-xs h-auto p-2 justify-start !text-black hover:!text-black">
                    "I'd be happy to schedule a quick demo to show you the features..."
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs h-auto p-2 justify-start !text-black hover:!text-black">
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
                  <Textarea placeholder="Type your message..." value={messageText} onChange={e => setMessageText(e.target.value)} className="min-h-20 pr-20 resize-none bg-muted text-foreground placeholder:text-muted-foreground border-border focus:border-primary" />
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
    </div>;
}