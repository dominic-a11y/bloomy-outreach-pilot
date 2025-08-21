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

// Demo conversations data - Realistic outreach scenarios
const conversations = [{
  id: 1,
  contact: "Sarah Chen",
  role: "CEO",
  company: "TechFlow SaaS",
  handle: "@sarahchen_techflow",
  lastMessage: "Perfect, here's my Calendly: calendly.com/sarah-chen/15min",
  timestamp: "2 min ago",
  unread: true,
  campaign: "SaaS Founders Q4",
  priority: "high",
  outcome: "booked_call",
  avatar: "/api/placeholder/40/40"
}, {
  id: 2,
  contact: "Marcus Johnson",
  role: "Marketing Director",
  company: "Urban Lifestyle",
  handle: "@marcus_urban",
  lastMessage: "Already working with an agency, but thanks for reaching out",
  timestamp: "1 hour ago",
  unread: false,
  campaign: "E-commerce Brands",
  priority: "low",
  outcome: "objection",
  avatar: "/api/placeholder/40/40"
}, {
  id: 3,
  contact: "Priya Patel",
  role: "Founder",
  company: "MindfuI Coach",
  handle: "@priya_mindful",
  lastMessage: "Sounds interesting! Can you send me some case studies first?",
  timestamp: "3 hours ago",
  unread: true,
  campaign: "Coaching Business",
  priority: "medium",
  outcome: "interested",
  avatar: "/api/placeholder/40/40"
}, {
  id: 4,
  contact: "Ahmed Al-Rashid",
  role: "Agency Owner",
  company: "Digital Growth Co",
  handle: "@ahmed_dgc",
  lastMessage: "Currently at capacity, maybe revisit in Q2?",
  timestamp: "5 hours ago",
  unread: false,
  campaign: "Marketing Agencies",
  priority: "medium",
  outcome: "delay",
  avatar: "/api/placeholder/40/40"
}, {
  id: 5,
  contact: "Lisa Wang",
  role: "E-commerce Director",
  company: "StyleForward",
  handle: "@lisa_styleforward",
  lastMessage: "Too expensive for us right now, sorry",
  timestamp: "1 day ago",
  unread: false,
  campaign: "Fashion Brands",
  priority: "low",
  outcome: "price_objection",
  avatar: "/api/placeholder/40/40"
}, {
  id: 6,
  contact: "Carlos Rodriguez",
  role: "Startup Founder",
  company: "FoodieApp",
  handle: "@carlos_foodie",
  lastMessage: "Let's schedule for next Tuesday if you have time",
  timestamp: "1 day ago",
  unread: true,
  campaign: "Food Tech Startups",
  priority: "high",
  outcome: "booked_call",
  avatar: "/api/placeholder/40/40"
}, {
  id: 7,
  contact: "Jennifer Kim",
  role: "Growth Marketing Lead",
  company: "FinanceFlow",
  handle: "@jen_financeflow",
  lastMessage: "Not the right fit for us atm",
  timestamp: "2 days ago",
  unread: false,
  campaign: "FinTech Companies",
  priority: "low",
  outcome: "not_fit",
  avatar: "/api/placeholder/40/40"
}, {
  id: 8,
  contact: "David Thompson",
  role: "CEO",
  company: "BuildTech Solutions",
  handle: "@david_buildtech",
  lastMessage: "This looks promising. What's your success rate?",
  timestamp: "2 days ago",
  unread: true,
  campaign: "B2B Services",
  priority: "medium",
  outcome: "interested",
  avatar: "/api/placeholder/40/40"
}, {
  id: 9,
  contact: "Ana Sofia Gutierrez",
  role: "Brand Manager",
  company: "Eco Essentials",
  handle: "@ana_ecoessentials",
  lastMessage: "Definitely interested! When can we chat?",
  timestamp: "3 days ago",
  unread: true,
  campaign: "Sustainable Brands",
  priority: "high",
  outcome: "booked_call",
  avatar: "/api/placeholder/40/40"
}, {
  id: 10,
  contact: "Raj Singh",
  role: "Co-founder",
  company: "CloudSync Pro",
  handle: "@raj_cloudsync",
  lastMessage: "We handle our own marketing internally",
  timestamp: "3 days ago",
  unread: false,
  campaign: "SaaS Founders Q4",
  priority: "low",
  outcome: "internal_team",
  avatar: "/api/placeholder/40/40"
}, {
  id: 11,
  contact: "Emma Nielsen",
  role: "Creative Director",
  company: "Nordic Design Studio",
  handle: "@emma_nordic",
  lastMessage: "Looks great but we're bootstrapped rn. Maybe later?",
  timestamp: "4 days ago",
  unread: false,
  campaign: "Creative Agencies",
  priority: "medium",
  outcome: "budget_constraints",
  avatar: "/api/placeholder/40/40"
}, {
  id: 12,
  contact: "Tyler Brooks",
  role: "Performance Marketing Manager",
  company: "FitGear Pro",
  handle: "@tyler_fitgear",
  lastMessage: "Can you walk me through the ROI projections?",
  timestamp: "5 days ago",
  unread: true,
  campaign: "Fitness Brands",
  priority: "medium",
  outcome: "needs_info",
  avatar: "/api/placeholder/40/40"
}];

// Conversation message threads mapped by conversation ID
const conversationMessages = {
  1: [
  // Sarah Chen - SaaS CEO (Booked Call)
  {
    id: 1,
    type: "sent",
    content: "Hi Sarah! Noticed TechFlow is scaling fast on LinkedIn. We've been helping SaaS teams cut CAC by 30% with structured paid social campaigns. Would you be open to a 10-min chat this week?",
    timestamp: "Yesterday 3:15 PM",
    sender: "You"
  }, {
    id: 2,
    type: "received",
    content: "Thanks for reaching out! We do run some ads but honestly our ROAS has been pretty inconsistent. What kind of results have you seen with other SaaS companies?",
    timestamp: "Yesterday 4:22 PM",
    sender: "Sarah Chen"
  }, {
    id: 3,
    type: "sent",
    content: "Great question! Just last month we helped CloudStrike reduce their ad spend by $40k while increasing qualified leads by 60%. The key was restructuring their funnel and targeting. Want me to send over the case study?",
    timestamp: "Yesterday 4:45 PM",
    sender: "You"
  }, {
    id: 4,
    type: "received",
    content: "Yes please! And honestly a quick call would be great too. I'm always looking for ways to optimize our growth channels.",
    timestamp: "Today 9:30 AM",
    sender: "Sarah Chen"
  }, {
    id: 5,
    type: "sent",
    content: "Awesome! I'll send the case study right after this. For the call, I have slots Friday afternoon or Monday morning. Which works better for you?",
    timestamp: "Today 10:15 AM",
    sender: "You"
  }, {
    id: 6,
    type: "received",
    content: "Perfect, here's my Calendly: calendly.com/sarah-chen/15min",
    timestamp: "Today 2:34 PM",
    sender: "Sarah Chen"
  }, {
    id: 7,
    type: "sent",
    content: "Awesome! Just booked a slot for Friday at 2pm. Looking forward to chatting!",
    timestamp: "Today 2:36 PM",
    sender: "You"
  }],
  2: [
  // Marcus Johnson - Marketing Director (Objection)
  {
    id: 1,
    type: "sent",
    content: "Hey Marcus! Love what Urban Lifestyle is doing with sustainable fashion. Saw your recent post about scaling challenges - we specialize in helping lifestyle brands optimize their paid social to reduce customer acquisition costs. Quick question: what's your biggest bottleneck in customer acquisition right now?",
    timestamp: "2 days ago 11:30 AM",
    sender: "You"
  }, {
    id: 2,
    type: "received",
    content: "Thanks for the message! Our main challenge is definitely cost efficiency. We're spending quite a bit on Meta ads but the CPAs keep climbing.",
    timestamp: "2 days ago 2:15 PM",
    sender: "Marcus Johnson"
  }, {
    id: 3,
    type: "sent",
    content: "Totally understand - that's exactly what we solve. We recently helped a similar fashion brand cut their CPA by 45% while scaling to 7-figures. Would love to show you the strategy - do you have 15 minutes this week?",
    timestamp: "2 days ago 3:30 PM",
    sender: "You"
  }, {
    id: 4,
    type: "received",
    content: "I appreciate the offer, but we're actually working with an agency already. They've been with us for 8 months now.",
    timestamp: "Yesterday 10:45 AM",
    sender: "Marcus Johnson"
  }, {
    id: 5,
    type: "sent",
    content: "No worries at all! If you ever want a second opinion or audit of your current setup, happy to provide some insights. Sometimes a fresh perspective can unlock new growth opportunities.",
    timestamp: "Yesterday 11:30 AM",
    sender: "You"
  }, {
    id: 6,
    type: "received",
    content: "Already working with an agency, but thanks for reaching out",
    timestamp: "1 hour ago",
    sender: "Marcus Johnson"
  }, {
    id: 7,
    type: "sent",
    content: "Totally understand! Feel free to reach out if you ever need a second opinion. Best of luck with your current setup!",
    timestamp: "1 hour ago",
    sender: "You"
  }],
  3: [
  // Priya Patel - Coach (Interested)
  {
    id: 1,
    type: "sent",
    content: "Hi Priya! Been following your mindfulness content - really powerful stuff 🙏 I help coaches like you automate client acquisition through targeted social campaigns. Many of our coaching clients see 3-5x more discovery calls within 60 days. Would love to share how we do it!",
    timestamp: "4 days ago 9:15 AM",
    sender: "You"
  }, {
    id: 2,
    type: "received",
    content: "Thank you! That sounds exactly like what I need. I've been trying to scale beyond word-of-mouth but haven't had much luck with online advertising. What kind of coaching businesses do you usually work with?",
    timestamp: "4 days ago 1:20 PM",
    sender: "Priya Patel"
  }, {
    id: 3,
    type: "sent",
    content: "We work with all types - life coaches, business coaches, health coaches. The approach is similar: we create content that positions you as the expert and drives warm leads to book calls. One mindfulness coach we worked with went from 2 calls/week to 15+ calls/week.",
    timestamp: "4 days ago 2:45 PM",
    sender: "You"
  }, {
    id: 4,
    type: "received",
    content: "That's incredible! I'm definitely interested in learning more. Do you have any case studies or examples you could share?",
    timestamp: "3 days ago 4:30 PM",
    sender: "Priya Patel"
  }, {
    id: 5,
    type: "sent",
    content: "Absolutely! I'll send over a detailed case study of another mindfulness coach who scaled from $8k to $25k/month in 90 days. Plus some examples of the content strategy we used. Should I email it to you?",
    timestamp: "3 days ago 5:15 PM",
    sender: "You"
  }, {
    id: 6,
    type: "received",
    content: "Sounds interesting! Can you send me some case studies first?",
    timestamp: "3 hours ago",
    sender: "Priya Patel"
  }, {
    id: 7,
    type: "sent",
    content: "Absolutely! Just sent you the case study and some additional examples. Let me know what you think and we can schedule a call when you're ready!",
    timestamp: "2 hours ago",
    sender: "You"
  }],
  4: [
  // Ahmed Al-Rashid - Agency Owner (Delay)
  {
    id: 1,
    type: "sent",
    content: "Hey Ahmed! Saw Digital Growth Co is absolutely crushing it with client results. We help agencies like yours add an extra revenue stream with white-label social media management. Are you currently at capacity or looking to expand services?",
    timestamp: "1 week ago 2:30 PM",
    sender: "You"
  }, {
    id: 2,
    type: "received",
    content: "Thanks for reaching out! We're definitely at capacity right now. Our team is swamped with current clients. What exactly does the white-label offering include?",
    timestamp: "6 days ago 4:45 PM",
    sender: "Ahmed Al-Rashid"
  }, {
    id: 3,
    type: "sent",
    content: "Perfect timing actually! Our white-label program handles the entire social media execution while you maintain client relationships. We've helped agencies increase revenue by 40-60% without hiring additional staff. Many start small with 2-3 clients.",
    timestamp: "6 days ago 5:20 PM",
    sender: "You"
  }, {
    id: 4,
    type: "received",
    content: "Interesting concept. We might have bandwidth issues until Q2 though. How does the pricing work?",
    timestamp: "5 days ago 11:15 AM",
    sender: "Ahmed Al-Rashid"
  }, {
    id: 5,
    type: "sent",
    content: "Totally understand the timing! Our pricing is per-client, so it scales with your capacity. Would it make sense to revisit this conversation in March? I can send you some case studies to review when you have more bandwidth.",
    timestamp: "5 days ago 12:30 PM",
    sender: "You"
  }, {
    id: 6,
    type: "received",
    content: "Currently at capacity, maybe revisit in Q2?",
    timestamp: "5 hours ago",
    sender: "Ahmed Al-Rashid"
  }, {
    id: 7,
    type: "sent",
    content: "Perfect! I'll reach out in March. In the meantime, I'll send you those case studies so you can review when you have time. Talk soon!",
    timestamp: "4 hours ago",
    sender: "You"
  }],
  6: [
  // Carlos Rodriguez - Startup Founder (Booked Call)
  {
    id: 1,
    type: "sent",
    content: "Hey Carlos! FoodieApp looks amazing - love the local restaurant discovery feature. Noticed you're growing fast, we help food tech startups scale user acquisition through targeted social campaigns. Mind if I ask what your biggest growth challenge is right now?",
    timestamp: "3 days ago 10:00 AM",
    sender: "You"
  }, {
    id: 2,
    type: "received",
    content: "Hey! Thanks for checking out the app 😊 Our biggest challenge is definitely user acquisition cost. We're getting users but the LTV:CAC ratio isn't where we need it to be for our next funding round.",
    timestamp: "3 days ago 2:30 PM",
    sender: "Carlos Rodriguez"
  }, {
    id: 3,
    type: "sent",
    content: "That's exactly what we specialize in! We recently helped another food delivery app improve their LTV:CAC from 2.1 to 4.8 in just 90 days. The secret was restructuring their targeting and creative strategy. Would you be interested in seeing how we did it?",
    timestamp: "3 days ago 3:15 PM",
    sender: "You"
  }, {
    id: 4,
    type: "received",
    content: "Wow, that's a huge improvement! Yes, I'd definitely be interested. We're always looking for ways to optimize our growth metrics before Series A.",
    timestamp: "2 days ago 9:45 AM",
    sender: "Carlos Rodriguez"
  }, {
    id: 5,
    type: "sent",
    content: "Perfect! I'd love to walk you through the exact strategy and see if it would work for FoodieApp. Do you have 20 minutes this week for a quick screen share? I can show you the case study and we can discuss your specific challenges.",
    timestamp: "2 days ago 11:00 AM",
    sender: "You"
  }, {
    id: 6,
    type: "received",
    content: "Let's schedule for next Tuesday if you have time",
    timestamp: "1 day ago",
    sender: "Carlos Rodriguez"
  }, {
    id: 7,
    type: "sent",
    content: "Perfect! Tuesday works great. I'll send you a calendar invite for 2pm with the Zoom link. Really excited to dive into your growth strategy!",
    timestamp: "1 day ago",
    sender: "You"
  }],
  9: [
  // Ana Sofia Gutierrez - Brand Manager (Booked Call)
  {
    id: 1,
    type: "sent",
    content: "Hi Ana! Eco Essentials' sustainability mission is incredible - really resonates with what consumers want today. We help sustainable brands like yours scale through authentic social media campaigns that align with your values. Are you currently running any social advertising?",
    timestamp: "5 days ago 1:20 PM",
    sender: "You"
  }, {
    id: 2,
    type: "received",
    content: "Thank you! We're passionate about our mission. We do some organic social but haven't had much success with paid ads. Most agencies don't really understand the sustainable products space. What's your experience with eco-conscious brands?",
    timestamp: "5 days ago 4:30 PM",
    sender: "Ana Sofia Gutierrez"
  }, {
    id: 3,
    type: "sent",
    content: "You're absolutely right - most agencies treat sustainable brands like any other product. We specialize in purpose-driven marketing and have helped 12+ eco brands this year. One client (similar to Eco Essentials) increased revenue 300% while maintaining authentic messaging.",
    timestamp: "4 days ago 9:45 AM",
    sender: "You"
  }, {
    id: 4,
    type: "received",
    content: "That sounds exactly like what we need! We want to grow but not compromise our values or messaging. Can you tell me more about your approach?",
    timestamp: "4 days ago 2:15 PM",
    sender: "Ana Sofia Gutierrez"
  }, {
    id: 5,
    type: "sent",
    content: "Absolutely! Our approach focuses on storytelling that highlights environmental impact while driving conversions. We create content that educates and inspires action. Would you like to hop on a quick call so I can show you some campaign examples?",
    timestamp: "4 days ago 3:00 PM",
    sender: "You"
  }, {
    id: 6,
    type: "received",
    content: "Definitely interested! When can we chat?",
    timestamp: "3 days ago",
    sender: "Ana Sofia Gutierrez"
  }, {
    id: 7,
    type: "sent",
    content: "Fantastic! How about Thursday at 3pm? I'll send you a Zoom link and prepare some specific examples for sustainable brands like yours.",
    timestamp: "3 days ago",
    sender: "You"
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
                <Badge variant="outline" className="text-xs">
                  {folder.count}
                </Badge>
              </Button>)}
            
            <Separator className="my-4" />
            
            <div className="space-y-2">
              <div className="text-sm font-medium text-white/80 px-2">Saved Filters</div>
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
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/60" />
                <Input placeholder="Search conversations..." className="pl-10 bg-muted/50 border-border" />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {conversations.map(conversation => <div key={conversation.id} className={`p-4 border-b border-border cursor-pointer hover:bg-muted/50 transition-colors ${selectedConversation?.id === conversation.id ? "bg-primary/10 border-r-2 border-r-primary" : ""}`} onClick={() => setSelectedConversation(conversation)}>
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
                        <div className="text-xs text-foreground/60">
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
                </div>)}
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
                    <div className="text-sm text-foreground/60">
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