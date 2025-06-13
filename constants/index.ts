import { Mic, Brain, BookOpen, Users, Zap, Star, Code, Calculator, Palette, Globe, TrendingUp, HandCoins, Earth, Binary } from "lucide-react";

export const subjects = [
  { value: "all", label: "All Subjects", icon: Globe },
  { value: "programming", label: "Programming", icon: Binary },
  { value: "maths", label: "Mathematics", icon: Calculator },
  { value: "science", label: "Science", icon: BookOpen },
  { value: "design", label: "Design", icon: Palette },
  { value: "business", label: "Business", icon: TrendingUp },
  { value: "history", label: "History", icon: Users },
  { value: "economics", label: "Economics", icon: HandCoins },
  { value: "coding", label: "Coding", icon: Code },
  { value: "language", label: "Language", icon: Earth },
]

export const subjectsColors = {
  science: "#E5D0FF",
  maths: "#FFDA6E",
  language: "#BDE7FF",
  coding: "#FFC8E4",
  history: "#FFECC8",
  economics: "#C8FFDF",
  business: "#FFC8E4",
  design: "#FFC8E4",
  programming: "#FFC8E4",
};

export const voices = {
  male: { casual: "2BJW5coyhAzSr8STdHbE", formal: "c6SfcYrb2t09NHXiT80T" },
  female: { casual: "ZIlrSGI4jZqobxRKprJz", formal: "sarah" },
};


export const features = [
  {
    icon: Mic,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    title: "AI Voice Agents",
    description: "Interactive voice tutoring sessions with AI agents specialized in your chosen topics",
  },
  {
    icon: Brain,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    title: "Custom Tutors",
    description: "Create personalized AI tutors with specific subjects, topics, and conversation styles",
  },
  {
    icon: BookOpen,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    title: "Session History",
    description: "Track your learning progress with detailed session history and bookmarks",
  },
  {
    icon: Users,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    title: "Community Tutors",
    description: "Access a vast library of community-created tutors across various subjects",
  },
  {
    icon: Zap,
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    title: "Real-time Learning",
    description: "Instant feedback and adaptive learning paths powered by advanced AI",
  },
  {
    icon: Star,
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    title: "Progress Tracking",
    description: "Comprehensive analytics and insights to monitor your learning journey",
  },
];
