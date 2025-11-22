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
const conversations = [
  // Existing conversations with Calendly links updated
  {
    id: 1,
    contact: "Victoria",
    role: "Content Creator",
    company: "OnlyFans",
    lastMessage: "Perfect, here's my calendar → https://calendly.com/creatorsinc/dem…",
    timestamp: "2 min ago",
    unread: true,
    campaign: "OnlyFans Creators",
    priority: "high",
    outcome: "booked_call",
    avatar: "/api/placeholder/40/40"
  },
  {
    id: 2,
    contact: "Sarah",
    role: "Content Creator", 
    company: "OnlyFans",
    lastMessage: "We've scaled creators from no social media presence to 40–70k/month. Growth is guaranteed because we combine heavy ad spend with organic loops like Reddit, Discord, TikTok, and reposts.",
    timestamp: "15 min ago",
    unread: true,
    campaign: "OnlyFans Creators",
    priority: "medium",
    outcome: "objection",
    avatar: "/api/placeholder/40/40"
  },
  {
    id: 3,
    contact: "Kayla",
    role: "Content Creator",
    company: "OnlyFans", 
    lastMessage: "Perfect, here's my calendar → https://calendly.com/creatorsinc/de…",
    timestamp: "1 hour ago",
    unread: true,
    campaign: "OnlyFans Creators",
    priority: "high",
    outcome: "booked_call",
    avatar: "/api/placeholder/40/40"
  },
  {
    id: 4,
    contact: "Mercedes",
    role: "Content Creator",
    company: "OnlyFans",
    lastMessage: "we'll cover that on the call, it's easier to explain live.",
    timestamp: "2 hours ago",
    unread: true,
    campaign: "OnlyFans Creators",
    priority: "medium",
    outcome: "objection",
    avatar: "/api/placeholder/40/40"
  },
  // New conversations following the script
  {
    id: 5,
    contact: "Naomi",
    role: "Content Creator",
    company: "OnlyFans",
    lastMessage: "great, here's my calendar → https://calendly.com/creatorsinc/demo3…",
    timestamp: "3 hours ago",
    unread: true,
    campaign: "OnlyFans Creators",
    priority: "high",
    outcome: "booked_call",
    avatar: "/api/placeholder/40/40"
  },
  {
    id: 6,
    contact: "Chloe",
    role: "Content Creator",
    company: "OnlyFans",
    lastMessage: "perfect, here's my calendar → https://calendly.com/creatorsinc/de12…",
    timestamp: "4 hours ago",
    unread: true,
    campaign: "OnlyFans Creators",
    priority: "high",
    outcome: "booked_call",
    avatar: "/api/placeholder/40/40"
  },
  {
    id: 7,
    contact: "Riley",
    role: "Content Creator",
    company: "OnlyFans",
    lastMessage: "great, here's my calendar → https://calendly.com/creatorsinc/demo4…",
    timestamp: "5 hours ago",
    unread: true,
    campaign: "OnlyFans Creators",
    priority: "high",
    outcome: "booked_call",
    avatar: "/api/placeholder/40/40"
  },
  {
    id: 8,
    contact: "Jenna",
    role: "Content Creator",
    company: "OnlyFans",
    lastMessage: "so wanna hop on a quick call to walk through it?",
    timestamp: "6 hours ago",
    unread: true,
    campaign: "OnlyFans Creators",
    priority: "medium",
    outcome: "pitch",
    avatar: "/api/placeholder/40/40"
  },
  {
    id: 9,
    contact: "Alina",
    role: "Content Creator",
    company: "OnlyFans",
    lastMessage: "we'll cover that on the call, way easier to explain live.",
    timestamp: "8 hours ago",
    unread: false,
    campaign: "OnlyFans Creators",
    priority: "medium",
    outcome: "objection",
    avatar: "/api/placeholder/40/40"
  },
  {
    id: 10,
    contact: "Bri",
    role: "Content Creator",
    company: "OnlyFans",
    lastMessage: "fair point. we've taken ppl from 0 to 70k/month. growth's not optional, it happens with our mix of heavy ad spend + organic repost loops.",
    timestamp: "10 hours ago",
    unread: true,
    campaign: "OnlyFans Creators",
    priority: "medium",
    outcome: "objection",
    avatar: "/api/placeholder/40/40"
  },
  {
    id: 11,
    contact: "Mia",
    role: "Content Creator",
    company: "OnlyFans",
    lastMessage: "still there? a simple yay or nay will do 🤝",
    timestamp: "12 hours ago",
    unread: false,
    campaign: "OnlyFans Creators",
    priority: "low",
    outcome: "follow_up",
    avatar: "/api/placeholder/40/40"
  },
  {
    id: 12,
    contact: "Lexi",
    role: "Content Creator",
    company: "OnlyFans",
    lastMessage: "gotcha. we handle literally everything: chatting, marketing, promo, dmca/security, boosting socials, content guidance. we've got 24/7 teams running it.",
    timestamp: "1 day ago",
    unread: true,
    campaign: "OnlyFans Creators",
    priority: "medium",
    outcome: "interested",
    avatar: "/api/placeholder/40/40"
  },
  {
    id: 13,
    contact: "Tasha",
    role: "Content Creator",
    company: "OnlyFans",
    lastMessage: "perfect, here's my calendar → https://calendly.com/creatorsinc/de5…",
    timestamp: "1 day ago",
    unread: true,
    campaign: "OnlyFans Creators",
    priority: "high",
    outcome: "booked_call",
    avatar: "/api/placeholder/40/40"
  },
  {
    id: 14,
    contact: "Zoe",
    role: "Content Creator",
    company: "OnlyFans",
    lastMessage: "cool, how much are you at rn if you don't mind me asking?",
    timestamp: "1 day ago",
    unread: false,
    campaign: "OnlyFans Creators",
    priority: "medium",
    outcome: "objection",
    avatar: "/api/placeholder/40/40"
  },
  {
    id: 15,
    contact: "Paige",
    role: "Content Creator",
    company: "OnlyFans",
    lastMessage: "great, here's my calendar → https://calendly.com/creatorsinc/demo7…",
    timestamp: "2 days ago",
    unread: true,
    campaign: "OnlyFans Creators",
    priority: "high",
    outcome: "booked_call",
    avatar: "/api/placeholder/40/40"
  },
  {
    id: 16,
    contact: "Carmen",
    role: "Content Creator",
    company: "OnlyFans",
    lastMessage: "we'll cover that more on the call, easier to explain live.",
    timestamp: "2 days ago",
    unread: true,
    campaign: "OnlyFans Creators",
    priority: "medium",
    outcome: "objection",
    avatar: "/api/placeholder/40/40"
  },
  {
    id: 17,
    contact: "Lara",
    role: "Content Creator",
    company: "OnlyFans",
    lastMessage: "just checking in 🫡 cause i don't want u to miss this.",
    timestamp: "2 days ago",
    unread: false,
    campaign: "OnlyFans Creators",
    priority: "low",
    outcome: "follow_up",
    avatar: "/api/placeholder/40/40"
  },
  {
    id: 18,
    contact: "Dani",
    role: "Content Creator",
    company: "OnlyFans",
    lastMessage: "understood. but we've scaled ppl with no socials into 6 figures. our systems guarantee growth.",
    timestamp: "3 days ago",
    unread: true,
    campaign: "OnlyFans Creators",
    priority: "medium",
    outcome: "objection",
    avatar: "/api/placeholder/40/40"
  },
  {
    id: 19,
    contact: "Mya",
    role: "Content Creator",
    company: "OnlyFans",
    lastMessage: "perfect, here's my calendar → https://calendly.com/creatorsinc/demo8…",
    timestamp: "3 days ago",
    unread: true,
    campaign: "OnlyFans Creators",
    priority: "high",
    outcome: "booked_call",
    avatar: "/api/placeholder/40/40"
  },
  {
    id: 20,
    contact: "Taylor",
    role: "Content Creator",
    company: "OnlyFans",
    lastMessage: "we'll cover that on the call, it's way easier to explain live.",
    timestamp: "3 days ago",
    unread: false,
    campaign: "OnlyFans Creators",
    priority: "medium",
    outcome: "objection", 
    avatar: "/api/placeholder/40/40"
  },
  {
    id: 21,
    contact: "Ines",
    role: "Content Creator",
    company: "OnlyFans",
    lastMessage: "Perfect, here's my calendar → https://calendly.com/creatorsinc/de9…",
    timestamp: "4 hours ago",
    unread: true,
    campaign: "OnlyFans Creators",
    priority: "high",
    outcome: "booked_call",
    avatar: "/api/placeholder/40/40"
  },
  {
    id: 22,
    contact: "Kiana",
    role: "Content Creator",
    company: "OnlyFans",
    lastMessage: "A simple yay or nay will do the work!",
    timestamp: "1 day ago",
    unread: false,
    campaign: "OnlyFans Creators",
    priority: "low",
    outcome: "follow_up",
    avatar: "/api/placeholder/40/40"
  }
];

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
    type: "sent",
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
  }, {
    id: 10,
    type: "sent",
    content: "We've scaled creators from no social media presence to 40–70k/month. Growth is guaranteed because we combine heavy ad spend with organic loops like Reddit, Discord, TikTok, and reposts.",
    timestamp: "15 min ago",
    sender: "Creators Inc"
  }],
  3: [
  // Kayla - Booked Call
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
    timestamp: "2 hours ago",
    sender: "Kayla"
  }, {
    id: 7,
    type: "sent",
    content: "gotcha. we handle literally everything: chatting, marketing, promo, dmca/security, boosting socials, content guidance. we've got 24/7 teams running it.",
    timestamp: "2 hours ago",
    sender: "Creators Inc"
  }, {
    id: 8,
    type: "received",
    content: "ok sounds cool but what if I don't grow",
    timestamp: "1 hour ago",
    sender: "Kayla"
  }, {
    id: 9,
    type: "sent",
    content: "fair point. we've taken ppl from 0 to 70k/month. growth's not optional, it happens with our mix of heavy ad spend + organic repost loops.",
    timestamp: "1 hour ago",
    sender: "Creators Inc"
  }, {
    id: 10,
    type: "received",
    content: "ok sounds good",
    timestamp: "1 hour ago",
    sender: "Kayla"
  }, {
    id: 11,
    type: "sent",
    content: "Perfect, here's my calendar → https://calendly.com/creatorsinc/de…",
    timestamp: "1 hour ago",
    sender: "Creators Inc"
  }],
  4: [
  // Mercedes - Revenue Share Objection
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
    timestamp: "3 hours ago",
    sender: "Mercedes"
  }, {
    id: 7,
    type: "sent",
    content: "good q. no catch. we put in the ad spend + organic promo systems. you just focus on content.",
    timestamp: "3 hours ago",
    sender: "Creators Inc"
  }, {
    id: 8,
    type: "received",
    content: "how much do u take?",
    timestamp: "2 hours ago",
    sender: "Mercedes"
  }, {
    id: 9,
    type: "sent",
    content: "we'll cover that on the call, it's easier to explain live.",
    timestamp: "2 hours ago",
    sender: "Creators Inc"
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
  }, {
    id: 6,
    type: "sent",
    content: "Gotcha! I hope you don't mind me asking, how much are you currently making on OnlyFans?",
    timestamp: "3 hours ago",
    sender: "Creators Inc"
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
  }, {
    id: 9,
    type: "sent",
    content: "Perfect, here's my calendar → https://calendly.com/creatorsinc/demo",
    timestamp: "4 hours ago",
    sender: "Creators Inc"
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
  }, {
    id: 7,
    type: "sent",
    content: "Gotcha! In short, we handle everything: chatting, marketing, promo, DMCA/security, content guidance, and boosting your social presence. We have 24/7 expert teams, so all you need to focus on is content.",
    timestamp: "1 day ago",
    sender: "Creators Inc"
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
  }, {
    id: 9,
    type: "sent",
    content: "Perfect, here's my calendar → https://calendly.com/creatorsinc/demo",
    timestamp: "2 days ago",
    sender: "Creators Inc"
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
  }, {
    id: 7,
    type: "sent",
    content: "Most of our success comes from paid marketing. We invest 5k–25k+ per creator every month into TikTok, Reddit, IG, and Twitter ads. That's why we take 50% — but our lowest earner is already at 40k/month.",
    timestamp: "2 days ago",
    sender: "Creators Inc"
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
  27: [
  // Naomi - Booked Call (following example script)
  {
    id: 1,
    type: "received",
    content: "hey",
    timestamp: "Yesterday 2:15 PM",
    sender: "Naomi"
  }, {
    id: 2,
    type: "sent",
    content: "Hi Naomi, there's something important you need to know immediately.",
    timestamp: "Yesterday 2:16 PM",
    sender: "Creators Inc"
  }, {
    id: 3,
    type: "received",
    content: "oh?",
    timestamp: "Yesterday 3:22 PM",
    sender: "Naomi"
  }, {
    id: 4,
    type: "sent",
    content: "thanks for replying 🫶 first off, you look insane. here's the thing tho — you're leaving 35–40k a month untouched by not using reddit, tumblr & discord. have you ever thought about management for OF?",
    timestamp: "Yesterday 3:25 PM",
    sender: "Creators Inc"
  }, {
    id: 5,
    type: "received",
    content: "nah not really",
    timestamp: "Yesterday 4:30 PM",
    sender: "Naomi"
  }, {
    id: 6,
    type: "sent",
    content: "File sent ✅",
    timestamp: "Yesterday 4:32 PM",
    sender: "Creators Inc"
  }, {
    id: 7,
    type: "sent",
    content: "just so you see it clear, we've scaled girls from basically no socials to 40–70k a month. it's all ads + organic loops",
    timestamp: "Today 9:30 AM",
    sender: "Creators Inc"
  }, {
    id: 8,
    type: "received",
    content: "idk feels like bs lol",
    timestamp: "Today 11:45 AM",
    sender: "Naomi"
  }, {
    id: 9,
    type: "sent",
    content: "fair 😅 but we handle everything: chatting, promo, dmca/security, content guidance. you only focus on content.",
    timestamp: "Today 11:50 AM",
    sender: "Creators Inc"
  }, {
    id: 10,
    type: "received",
    content: "yeah but i'm already doing good",
    timestamp: "Today 1:20 PM",
    sender: "Naomi"
  }, {
    id: 11,
    type: "sent",
    content: "cool, how much are you at rn if you don't mind me asking?",
    timestamp: "Today 1:25 PM",
    sender: "Creators Inc"
  }, {
    id: 12,
    type: "received",
    content: "like decent, but not crazy",
    timestamp: "Today 2:10 PM",
    sender: "Naomi"
  }, {
    id: 13,
    type: "sent",
    content: "understood. still, even our smallest partners are doing way more. growth is built in because of how much we put into ads + repost systems.",
    timestamp: "Today 2:15 PM",
    sender: "Creators Inc"
  }, {
    id: 14,
    type: "received",
    content: "hmm and what do u take then?",
    timestamp: "Today 2:45 PM",
    sender: "Naomi"
  }, {
    id: 15,
    type: "sent",
    content: "good q, we'll cover that on the call. way easier to explain live.",
    timestamp: "Today 2:47 PM",
    sender: "Creators Inc"
  }, {
    id: 16,
    type: "received",
    content: "ok fine",
    timestamp: "Today 3:15 PM",
    sender: "Naomi"
  }, {
    id: 17,
    type: "sent",
    content: "perfect, let's do a quick call so i can break it down.",
    timestamp: "Today 3:16 PM",
    sender: "Creators Inc"
  }, {
    id: 18,
    type: "received",
    content: "yeah sure",
    timestamp: "Today 3:20 PM",
    sender: "Naomi"
  }, {
    id: 19,
    type: "sent",
    content: "great, here's my calendar → https://calendly.com/creatorsinc/demo3…",
    timestamp: "Today 3:21 PM",
    sender: "Creators Inc"
  }],
  28: [
  // Chloe - Booked Call (following example script)
  {
    id: 1,
    type: "received",
    content: "hiya",
    timestamp: "2 days ago 11:30 AM",
    sender: "Chloe"
  }, {
    id: 2,
    type: "sent",
    content: "Hi Chloe, there's something important you need to know immediately.",
    timestamp: "2 days ago 11:35 AM",
    sender: "Creators Inc"
  }, {
    id: 3,
    type: "received",
    content: "tell me then lol",
    timestamp: "2 days ago 2:15 PM",
    sender: "Chloe"
  }, {
    id: 4,
    type: "sent",
    content: "thanks for replying 🫶 honestly you're stunning. but you're sleeping on 35–40k monthly by not using reddit, tumblr & discord. ever considered management?",
    timestamp: "2 days ago 2:20 PM",
    sender: "Creators Inc"
  }, {
    id: 5,
    type: "received",
    content: "nah i'm fine tbh",
    timestamp: "2 days ago 4:30 PM",
    sender: "Chloe"
  }, {
    id: 6,
    type: "sent",
    content: "File sent ✅",
    timestamp: "2 days ago 4:35 PM",
    sender: "Creators Inc"
  }, {
    id: 7,
    type: "sent",
    content: "just checking in 🫡 cause i don't want u to miss this.",
    timestamp: "Yesterday 10:00 AM",
    sender: "Creators Inc"
  }, {
    id: 8,
    type: "received",
    content: "what do u even do though?",
    timestamp: "Yesterday 2:15 PM",
    sender: "Chloe"
  }, {
    id: 9,
    type: "sent",
    content: "gotcha. we handle literally everything: chatting, marketing, promo, dmca/security, boosting socials, content guidance. we've got 24/7 teams running it.",
    timestamp: "Yesterday 2:20 PM",
    sender: "Creators Inc"
  }, {
    id: 10,
    type: "received",
    content: "sounds like a lot lol",
    timestamp: "Yesterday 3:45 PM",
    sender: "Chloe"
  }, {
    id: 11,
    type: "sent",
    content: "yeah but for you it's easy. you only focus on content.",
    timestamp: "Yesterday 3:50 PM",
    sender: "Creators Inc"
  }, {
    id: 12,
    type: "received",
    content: "what if i don't grow tho",
    timestamp: "Today 9:30 AM",
    sender: "Chloe"
  }, {
    id: 13,
    type: "sent",
    content: "fair point. we've taken ppl from 0 to 70k/month. growth's not optional, it happens with our mix of heavy ad spend + organic repost loops.",
    timestamp: "Today 9:35 AM",
    sender: "Creators Inc"
  }, {
    id: 14,
    type: "received",
    content: "and how much do u take?",
    timestamp: "Today 11:20 AM",
    sender: "Chloe"
  }, {
    id: 15,
    type: "sent",
    content: "we'll cover that more on the call, easier to explain live.",
    timestamp: "Today 11:25 PM",
    sender: "Creators Inc"
  }, {
    id: 16,
    type: "received",
    content: "ok ok",
    timestamp: "Today 1:45 PM",
    sender: "Chloe"
  }, {
    id: 17,
    type: "sent",
    content: "so wanna hop on a quick call?",
    timestamp: "Today 1:50 PM",
    sender: "Creators Inc"
  }, {
    id: 18,
    type: "received",
    content: "yeah fine",
    timestamp: "Today 2:30 PM",
    sender: "Chloe"
  }, {
    id: 19,
    type: "sent",
    content: "perfect, here's my calendar → https://calendly.com/creatorsinc/de12…",
    timestamp: "Today 2:31 PM",
    sender: "Creators Inc"
  }],
  29: [
  // Riley - Booked Call (following example script)
  {
    id: 1,
    type: "received",
    content: "yo",
    timestamp: "3 days ago 10:00 AM",
    sender: "Riley"
  }, {
    id: 2,
    type: "sent",
    content: "Hi Riley, there's something important you need to know immediately.",
    timestamp: "3 days ago 10:05 AM",
    sender: "Creators Inc"
  }, {
    id: 3,
    type: "received",
    content: "what now 😂",
    timestamp: "3 days ago 1:20 PM",
    sender: "Riley"
  }, {
    id: 4,
    type: "sent",
    content: "you look incredible btw. but straight up — you're missing 35–40k a month without reddit, discord & tumblr. thought about management?",
    timestamp: "3 days ago 1:25 PM",
    sender: "Creators Inc"
  }, {
    id: 5,
    type: "received",
    content: "nahhh",
    timestamp: "3 days ago 3:30 PM",
    sender: "Riley"
  }, {
    id: 6,
    type: "sent",
    content: "File sent ✅",
    timestamp: "3 days ago 3:35 PM",
    sender: "Creators Inc"
  }, {
    id: 7,
    type: "sent",
    content: "still there? a simple yay or nay will do 🤝",
    timestamp: "2 days ago 11:00 AM",
    sender: "Creators Inc"
  }, {
    id: 8,
    type: "received",
    content: "lol fine. but whats the catch",
    timestamp: "Yesterday 4:15 PM",
    sender: "Riley"
  }, {
    id: 9,
    type: "sent",
    content: "good q. no catch. we put in the ad spend + organic promo systems. you just focus on content.",
    timestamp: "Yesterday 4:20 PM",
    sender: "Creators Inc"
  }, {
    id: 10,
    type: "received",
    content: "idk man feels like a scam",
    timestamp: "Today 10:30 AM",
    sender: "Riley"
  }, {
    id: 11,
    type: "sent",
    content: "understood. but we've scaled ppl with no socials into 6 figures. our systems guarantee growth.",
    timestamp: "Today 10:35 AM",
    sender: "Creators Inc"
  }, {
    id: 12,
    type: "received",
    content: "ok but how much u take?",
    timestamp: "Today 12:45 PM",
    sender: "Riley"
  }, {
    id: 13,
    type: "sent",
    content: "we'll cover that on the call, easier live.",
    timestamp: "Today 12:50 PM",
    sender: "Creators Inc"
  }, {
    id: 14,
    type: "received",
    content: "mhm",
    timestamp: "Today 2:15 PM",
    sender: "Riley"
  }, {
    id: 15,
    type: "sent",
    content: "cool, then let's walk thru it on a quick call",
    timestamp: "Today 2:20 PM",
    sender: "Creators Inc"
  }, {
    id: 16,
    type: "received",
    content: "yeah sure",
    timestamp: "Today 3:00 PM",
    sender: "Riley"
  }, {
    id: 17,
    type: "sent",
    content: "great, here's my calendar → https://calendly.com/creatorsinc/demo4…",
    timestamp: "Today 3:01 PM",
    sender: "Creators Inc"
  }],
  30: [
  // Jenna - Pitch Stage
  {
    id: 1,
    type: "sent",
    content: "Hi Jenna, there's something important you need to know immediately.",
    timestamp: "4 days ago 9:15 AM",
    sender: "Creators Inc"
  }, {
    id: 2,
    type: "received",
    content: "what's that",
    timestamp: "4 days ago 2:30 PM",
    sender: "Jenna"
  }, {
    id: 3,
    type: "sent",
    content: "thanks for replying 🫶 first off, you look incredible. here's the thing — you're sleeping on 35–40k monthly by not using reddit, tumblr & discord. have you ever considered management for your OnlyFans?",
    timestamp: "4 days ago 3:00 PM",
    sender: "Creators Inc"
  }, {
    id: 4,
    type: "received",
    content: "maybe idk",
    timestamp: "3 days ago 11:45 AM",
    sender: "Jenna"
  }, {
    id: 5,
    type: "sent",
    content: "File sent ✅",
    timestamp: "3 days ago 12:00 PM",
    sender: "Creators Inc"
  }, {
    id: 6,
    type: "received",
    content: "ok this looks good but what do u guys do exactly?",
    timestamp: "2 days ago 3:20 PM",
    sender: "Jenna"
  }, {
    id: 7,
    type: "sent",
    content: "gotcha! in short, we handle everything: chatting, marketing, promo, DMCA/security, content guidance, and boosting your social presence. we have 24/7 expert teams, so all you need to focus on is content.",
    timestamp: "2 days ago 3:25 PM",
    sender: "Creators Inc"
  }, {
    id: 8,
    type: "received",
    content: "sounds cool. what if I don't grow though",
    timestamp: "Yesterday 1:15 PM",
    sender: "Jenna"
  }, {
    id: 9,
    type: "sent",
    content: "we've scaled creators from no social media presence to 40–70k/month. growth is guaranteed because we combine heavy ad spend with organic loops like Reddit, Discord, TikTok, and reposts.",
    timestamp: "Yesterday 1:20 PM",
    sender: "Creators Inc"
  }, {
    id: 10,
    type: "received",
    content: "ok that sounds really good actually",
    timestamp: "Today 11:30 AM",
    sender: "Jenna"
  }, {
    id: 11,
    type: "sent",
    content: "so wanna hop on a quick call to walk through it?",
    timestamp: "Today 11:35 AM",
    sender: "Creators Inc"
  }],
  31: [
  // Alina - Revenue Share Objection
  {
    id: 1,
    type: "sent",
    content: "Hi Alina, there's something important you need to know immediately.",
    timestamp: "1 week ago 2:30 PM",
    sender: "Creators Inc"
  }, {
    id: 2,
    type: "received",
    content: "what",
    timestamp: "5 days ago 4:45 PM",
    sender: "Alina"
  }, {
    id: 3,
    type: "sent",
    content: "thanks for getting back to me 🫶 first off, you look stunning! here's the thing, you've been killing it on IG, but you're sleeping on at least 35–40k monthly by not using Reddit, Tumblr & Discord. have you ever considered having management for your OnlyFans?",
    timestamp: "5 days ago 5:20 PM",
    sender: "Creators Inc"
  }, {
    id: 4,
    type: "sent",
    content: "File sent ✅",
    timestamp: "5 days ago 5:25 PM",
    sender: "Creators Inc"
  }, {
    id: 5,
    type: "received",
    content: "this looks interesting but like what's the deal",
    timestamp: "3 days ago 11:15 AM",
    sender: "Alina"
  }, {
    id: 6,
    type: "sent",
    content: "gotcha! we handle everything: chatting, marketing, promo, DMCA/security, content guidance, and boosting your social presence. we have 24/7 expert teams, so all you need to focus on is content.",
    timestamp: "3 days ago 11:20 AM",
    sender: "Creators Inc"
  }, {
    id: 7,
    type: "received",
    content: "sounds good but how much do u take?",
    timestamp: "Yesterday 2:30 PM",
    sender: "Alina"
  }, {
    id: 8,
    type: "sent",
    content: "we'll cover that on the call, way easier to explain live.",
    timestamp: "Yesterday 2:35 PM",
    sender: "Creators Inc"
  }],
  32: [
  // Bri - Growth Objection
  {
    id: 1,
    type: "sent",
    content: "Hi Bri, there's something important you need to know immediately.",
    timestamp: "2 days ago 1:20 PM",
    sender: "Creators Inc"
  }, {
    id: 2,
    type: "received",
    content: "ok what's up",
    timestamp: "2 days ago 4:30 PM",
    sender: "Bri"
  }, {
    id: 3,
    type: "sent",
    content: "thanks for replying 🫶 honestly you're gorgeous. but you're sleeping on 35–40k monthly by not using reddit, tumblr & discord. ever considered management for your OnlyFans?",
    timestamp: "2 days ago 5:15 PM",
    sender: "Creators Inc"
  }, {
    id: 4,
    type: "received",
    content: "not really no",
    timestamp: "Yesterday 10:45 AM",
    sender: "Bri"
  }, {
    id: 5,
    type: "sent",
    content: "File sent ✅",
    timestamp: "Yesterday 11:00 AM",
    sender: "Creators Inc"
  }, {
    id: 6,
    type: "received",
    content: "ok this looks good but what if I don't grow?",
    timestamp: "Today 9:15 AM",
    sender: "Bri"
  }, {
    id: 7,
    type: "sent",
    content: "fair point. we've taken ppl from 0 to 70k/month. growth's not optional, it happens with our mix of heavy ad spend + organic repost loops.",
    timestamp: "Today 9:20 AM",
    sender: "Creators Inc"
  }],
  33: [
  // Mia - Follow Up
  {
    id: 1,
    type: "sent",
    content: "Hi Mia, there's something important you need to know immediately.",
    timestamp: "1 week ago 11:30 AM",
    sender: "Creators Inc"
  }, {
    id: 2,
    type: "sent",
    content: "File sent ✅",
    timestamp: "1 week ago 11:35 AM",
    sender: "Creators Inc"
  }, {
    id: 3,
    type: "sent",
    content: "just checking in 🫡",
    timestamp: "3 days ago 2:15 PM",
    sender: "Creators Inc"
  }, {
    id: 4,
    type: "sent",
    content: "still there? a simple yay or nay will do 🤝",
    timestamp: "Today 12:00 PM",
    sender: "Creators Inc"
  }],
  12: [
  // Lexi - Interested
  {
    id: 1,
    type: "sent",
    content: "Hi Lexi, there's something important you need to know immediately.",
    timestamp: "3 days ago 10:00 AM",
    sender: "Creators Inc"
  }, {
    id: 2,
    type: "received",
    content: "what",
    timestamp: "3 days ago 2:30 PM",
    sender: "Lexi"
  }, {
    id: 3,
    type: "sent",
    content: "thanks for getting back to me 🫶 first off, you look amazing! here's the thing, you've been killing it on IG, but you're sleeping on at least 35–40k monthly by not using Reddit, Tumblr & Discord. have you ever considered having management for your OnlyFans?",
    timestamp: "3 days ago 3:15 PM",
    sender: "Creators Inc"
  }, {
    id: 4,
    type: "received",
    content: "umm maybe tell me more",
    timestamp: "2 days ago 9:45 AM",
    sender: "Lexi"
  }, {
    id: 5,
    type: "sent",
    content: "File sent ✅",
    timestamp: "2 days ago 10:00 AM",
    sender: "Creators Inc"
  }, {
    id: 6,
    type: "received",
    content: "what do you guys even do?",
    timestamp: "Yesterday 2:20 PM",
    sender: "Lexi"
  }, {
    id: 7,
    type: "sent",
    content: "gotcha. we handle literally everything: chatting, marketing, promo, dmca/security, boosting socials, content guidance. we've got 24/7 teams running it.",
    timestamp: "Yesterday 2:25 PM",
    sender: "Creators Inc"
  }],
  13: [
  // Tasha - Booked Call
  {
    id: 1,
    type: "sent",
    content: "Hi Tasha, there's something important you need to know immediately.",
    timestamp: "4 days ago 1:20 PM",
    sender: "Creators Inc"
  }, {
    id: 2,
    type: "received",
    content: "hey what's important?",
    timestamp: "4 days ago 4:30 PM",
    sender: "Tasha"
  }, {
    id: 3,
    type: "sent",
    content: "thanks for getting back to me 🫶 honestly you're stunning! but you're sleeping on 35–40k monthly by not using reddit, tumblr & discord. ever considered management for your OnlyFans?",
    timestamp: "3 days ago 9:45 AM",
    sender: "Creators Inc"
  }, {
    id: 4,
    type: "received",
    content: "yeah actually that sounds cool",
    timestamp: "3 days ago 2:15 PM",
    sender: "Tasha"
  }, {
    id: 5,
    type: "sent",
    content: "File sent ✅",
    timestamp: "3 days ago 2:20 PM",
    sender: "Creators Inc"
  }, {
    id: 6,
    type: "received",
    content: "ok this looks legit",
    timestamp: "3 days ago 3:00 PM",
    sender: "Tasha"
  }, {
    id: 7,
    type: "sent",
    content: "so if there's interest, I can walk you through exactly how it works on a quick call.",
    timestamp: "3 days ago 3:15 PM",
    sender: "Creators Inc"
  }, {
    id: 8,
    type: "received",
    content: "ok sure sounds good",
    timestamp: "Yesterday 1:30 PM",
    sender: "Tasha"
  }, {
    id: 9,
    type: "sent",
    content: "perfect, here's my calendar → https://calendly.com/creatorsinc/de5…",
    timestamp: "Yesterday 1:31 PM",
    sender: "Creators Inc"
  }],
  14: [
  // Zoe - Already Doing Good Objection
  {
    id: 1,
    type: "sent",
    content: "Hi Zoe, there's something important you need to know immediately.",
    timestamp: "4 days ago 10:00 AM",
    sender: "Creators Inc"
  }, {
    id: 2,
    type: "received",
    content: "??",
    timestamp: "4 days ago 2:30 PM",
    sender: "Zoe"
  }, {
    id: 3,
    type: "sent",
    content: "thanks for getting back to me 🫶 first off, you look incredible! here's the thing, you've been killing it on IG, but you're sleeping on at least 35–40k monthly by not using Reddit, Tumblr & Discord. have you ever considered having management for your OnlyFans?",
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
    timestamp: "Yesterday 3:00 PM",
    sender: "Zoe"
  }, {
    id: 6,
    type: "sent",
    content: "cool, how much are you at rn if you don't mind me asking?",
    timestamp: "Yesterday 3:05 PM",
    sender: "Creators Inc"
  }],
  15: [
  // Paige - Booked Call
  {
    id: 1,
    type: "sent",
    content: "Hi Paige, there's something important you need to know immediately.",
    timestamp: "1 week ago 2:30 PM",
    sender: "Creators Inc"
  }, {
    id: 2,
    type: "received",
    content: "what's up",
    timestamp: "5 days ago 4:45 PM",
    sender: "Paige"
  }, {
    id: 3,
    type: "sent",
    content: "thanks for replying 🫶 honestly you're gorgeous. but you're sleeping on 35–40k monthly by not using reddit, tumblr & discord. ever considered management for your OnlyFans?",
    timestamp: "5 days ago 5:20 PM",
    sender: "Creators Inc"
  }, {
    id: 4,
    type: "received",
    content: "maybe tell me more",
    timestamp: "4 days ago 11:15 AM",
    sender: "Paige"
  }, {
    id: 5,
    type: "sent",
    content: "File sent ✅",
    timestamp: "4 days ago 11:20 AM",
    sender: "Creators Inc"
  }, {
    id: 6,
    type: "received",
    content: "ok this looks really good",
    timestamp: "3 days ago 2:30 PM",
    sender: "Paige"
  }, {
    id: 7,
    type: "sent",
    content: "so if there's interest, I can walk you through exactly how it works on a quick call.",
    timestamp: "3 days ago 2:35 PM",
    sender: "Creators Inc"
  }, {
    id: 8,
    type: "received",
    content: "yeah that sounds good",
    timestamp: "2 days ago 10:45 AM",
    sender: "Paige"
  }, {
    id: 9,
    type: "sent",
    content: "great, here's my calendar → https://calendly.com/creatorsinc/demo7…",
    timestamp: "2 days ago 10:46 AM",
    sender: "Creators Inc"
  }],
  16: [
  // Carmen - Revenue Share Objection
  {
    id: 1,
    type: "sent",
    content: "Hi Carmen, there's something important you need to know immediately.",
    timestamp: "1 week ago 11:30 AM",
    sender: "Creators Inc"
  }, {
    id: 2,
    type: "received",
    content: "what",
    timestamp: "5 days ago 2:15 PM",
    sender: "Carmen"
  }, {
    id: 3,
    type: "sent",
    content: "thanks for getting back to me 🫶 first off, you look amazing! here's the thing, you've been killing it on IG, but you're sleeping on at least 35–40k monthly by not using Reddit, Tumblr & Discord. have you ever considered having management for your OnlyFans?",
    timestamp: "5 days ago 2:45 PM",
    sender: "Creators Inc"
  }, {
    id: 4,
    type: "sent",
    content: "File sent ✅",
    timestamp: "5 days ago 3:00 PM",
    sender: "Creators Inc"
  }, {
    id: 5,
    type: "received",
    content: "looks good but how much do u take?",
    timestamp: "3 days ago 10:45 AM",
    sender: "Carmen"
  }, {
    id: 6,
    type: "sent",
    content: "we'll cover that more on the call, easier to explain live.",
    timestamp: "3 days ago 10:50 AM",
    sender: "Creators Inc"
  }],
  17: [
  // Lara - Follow Up
  {
    id: 1,
    type: "sent",
    content: "Hi Lara, there's something important you need to know immediately.",
    timestamp: "1 week ago 2:30 PM",
    sender: "Creators Inc"
  }, {
    id: 2,
    type: "sent",
    content: "File sent ✅",
    timestamp: "1 week ago 2:35 PM",
    sender: "Creators Inc"
  }, {
    id: 3,
    type: "sent",
    content: "just checking in 🫡 cause i don't want u to miss this.",
    timestamp: "2 days ago 11:00 AM",
    sender: "Creators Inc"
  }],
  18: [
  // Dani - Growth Objection
  {
    id: 1,
    type: "sent",
    content: "Hi Dani, there's something important you need to know immediately.",
    timestamp: "1 week ago 1:20 PM",
    sender: "Creators Inc"
  }, {
    id: 2,
    type: "received",
    content: "what's that",
    timestamp: "5 days ago 4:30 PM",
    sender: "Dani"
  }, {
    id: 3,
    type: "sent",
    content: "thanks for replying 🫶 first off, you look incredible! here's the thing, you've been killing it on IG, but you're sleeping on at least 35–40k monthly by not using Reddit, Tumblr & Discord. have you ever considered having management for your OnlyFans?",
    timestamp: "5 days ago 5:15 PM",
    sender: "Creators Inc"
  }, {
    id: 4,
    type: "received",
    content: "idk feels sketchy",
    timestamp: "4 days ago 10:45 AM",
    sender: "Dani"
  }, {
    id: 5,
    type: "sent",
    content: "File sent ✅",
    timestamp: "4 days ago 11:00 AM",
    sender: "Creators Inc"
  }, {
    id: 6,
    type: "received",
    content: "idk man feels like a scam",
    timestamp: "3 days ago 2:15 PM",
    sender: "Dani"
  }, {
    id: 7,
    type: "sent",
    content: "understood. but we've scaled ppl with no socials into 6 figures. our systems guarantee growth.",
    timestamp: "3 days ago 2:20 PM",
    sender: "Creators Inc"
  }],
  19: [
  // Mya - Booked Call
  {
    id: 1,
    type: "sent",
    content: "Hi Mya, there's something important you need to know immediately.",
    timestamp: "1 week ago 10:00 AM",
    sender: "Creators Inc"
  }, {
    id: 2,
    type: "received",
    content: "what",
    timestamp: "5 days ago 2:30 PM",
    sender: "Mya"
  }, {
    id: 3,
    type: "sent",
    content: "thanks for getting back to me 🫶 first off, you look stunning! here's the thing, you've been killing it on IG, but you're sleeping on at least 35–40k monthly by not using Reddit, Tumblr & Discord. have you ever considered having management for your OnlyFans?",
    timestamp: "5 days ago 3:15 PM",
    sender: "Creators Inc"
  }, {
    id: 4,
    type: "received",
    content: "maybe yeah",
    timestamp: "4 days ago 9:45 AM",
    sender: "Mya"
  }, {
    id: 5,
    type: "sent",
    content: "File sent ✅",
    timestamp: "4 days ago 10:00 AM",
    sender: "Creators Inc"
  }, {
    id: 6,
    type: "received",
    content: "wow ok this looks really good",
    timestamp: "3 days ago 1:20 PM",
    sender: "Mya"
  }, {
    id: 7,
    type: "sent",
    content: "so if there's interest, I can walk you through exactly how it works on a quick call.",
    timestamp: "3 days ago 1:25 PM",
    sender: "Creators Inc"
  }, {
    id: 8,
    type: "received",
    content: "ok sure",
    timestamp: "3 days ago 3:30 PM",
    sender: "Mya"
  }, {
    id: 9,
    type: "sent",
    content: "perfect, here's my calendar → https://calendly.com/creatorsinc/demo8…",
    timestamp: "3 days ago 3:31 PM",
    sender: "Creators Inc"
  }],
  20: [
  // Taylor - Revenue Share Follow Up 
  {
    id: 1,
    type: "sent",
    content: "Hi Taylor, there's something important you need to know immediately.",
    timestamp: "1 week ago 10:00 AM",
    sender: "Creators Inc"
  }, {
    id: 2,
    type: "received",
    content: "??",
    timestamp: "5 days ago 2:30 PM",
    sender: "Taylor"
  }, {
    id: 3,
    type: "sent",
    content: "thanks for getting back to me 🫶 first off, you look incredible! here's the thing, you've been killing it on IG, but you're sleeping on at least 35–40k monthly by not using Reddit, Tumblr & Discord. have you ever considered having management for your OnlyFans?",
    timestamp: "5 days ago 3:15 PM",
    sender: "Creators Inc"
  }, {
    id: 4,
    type: "sent",
    content: "File sent ✅",
    timestamp: "5 days ago 3:20 PM",
    sender: "Creators Inc"
  }, {
    id: 5,
    type: "received",
    content: "idk, I already do good",
    timestamp: "4 days ago 11:00 AM",
    sender: "Taylor"
  }, {
    id: 6,
    type: "sent",
    content: "gotcha! I hope you don't mind me asking, how much are you currently making on OnlyFans?",
    timestamp: "4 days ago 11:15 AM",
    sender: "Creators Inc"
  }, {
    id: 7,
    type: "received",
    content: "like 8k a month",
    timestamp: "3 days ago 2:20 PM",
    sender: "Taylor"
  }, {
    id: 8,
    type: "sent",
    content: "that's solid! but imagine scaling that to 30-40k without changing your content style. the difference is platform expansion + our ad systems.",
    timestamp: "3 days ago 2:25 PM",
    sender: "Creators Inc"
  }, {
    id: 9,
    type: "received",
    content: "how much do u take tho",
    timestamp: "3 days ago 4:45 PM",
    sender: "Taylor"
  }, {
    id: 10,
    type: "sent",
    content: "we'll cover that on the call, it's way easier to explain live.",
    timestamp: "3 days ago 4:50 PM",
    sender: "Creators Inc"
  }],
  21: [
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
    content: "thanks for getting back to me 🫶 first off, you look amazing! here's the thing, you've been killing it on IG, but you're sleeping on at least 35–40k monthly by not using Reddit, Tumblr & Discord. have you ever considered having management for your OnlyFans?",
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
    content: "so if there's interest, I can walk you through exactly how it works on a quick call.",
    timestamp: "4 days ago 3:15 PM",
    sender: "Creators Inc"
  }, {
    id: 8,
    type: "received",
    content: "ok sure sounds good",
    timestamp: "Today 4:30 PM",
    sender: "Ines"
  }, {
    id: 9,
    type: "sent",
    content: "Perfect, here's my calendar → https://calendly.com/creatorsinc/de9…",
    timestamp: "Today 4:31 PM",
    sender: "Creators Inc"
  }],
  22: [
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
    content: "just checking in 🫡",
    timestamp: "1 week ago 2:30 PM",
    sender: "Creators Inc"
  }, {
    id: 3,
    type: "sent",
    content: "A simple yay or nay will do the work!",
    timestamp: "1 day ago",
    sender: "Creators Inc"
  }]
};

// Default to Victoria's conversation
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

  return (
    <div className="p-6">
      <div className="h-[calc(100vh-8rem)] flex gap-6">
        {/* Left Sidebar - Folders */}
        <Card className="w-64 bg-gradient-card border-border shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-white">Messages</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            {folders.map((folder) => (
              <Button
                key={folder.name}
                variant={folder.active ? "default" : "ghost"}
                className="w-full justify-between text-white"
                size="sm"
              >
                <span className="text-white">{folder.name}</span>
                <Badge variant="outline" className="text-xs text-white">
                  {folder.count}
                </Badge>
              </Button>
            ))}
            
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
                        <div className="font-medium text-sm truncate text-white">
                          {conversation.contact}
                        </div>
                        <div className="text-xs text-white">
                          {conversation.timestamp}
                        </div>
                      </div>
                      <div className="text-xs text-white mb-1">
                        {conversation.role}
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
                    <div className="font-medium text-white">{selectedConversation?.contact}</div>
                    <div className="text-sm text-white">
                      {selectedConversation?.role} • Online 5 min ago
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
                {currentMessages.map((message) => (
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
                ))}
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
                  <Textarea 
                    placeholder="Type your message..." 
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="min-h-20 pr-20 resize-none bg-muted text-foreground placeholder:text-muted-foreground border-border focus:border-primary"
                  />
                  <div className="absolute bottom-3 right-3 flex gap-1">
                    <Button variant="ghost" size="sm">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Smile className="h-4 w-4" />
                    </Button>
                    <Button size="sm" className="gap-2">
                      <Send className="h-4 w-4" />
                      Send
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-white/60">
                  <span>Press Enter to send, Shift+Enter for new line</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}