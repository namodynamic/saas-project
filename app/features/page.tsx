import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Mic,
  Brain,
  BookOpen,
  Zap,
  Shield,
  Clock,
  TrendingUp,
  MessageSquare,
  Settings,
  Globe,
  Headphones,
  BarChart3,
  Smartphone,
} from "lucide-react";
import Link from "next/link";
import CTA from "@/components/CTA";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <section className="relative px-4 pt-20 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mt-10">
            <Badge variant="secondary" className="mb-4 px-4 py-2">
              <Zap className="mr-2" /> Comprehensive Features
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Everything You Need to{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Master Learning
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 sm:text-xl">
              Discover all the powerful features that make LearnAI the most
              comprehensive AI-powered learning platform
            </p>
            <div className="mt-10">
              <Button size="lg" className="px-8 py-3" asChild>
                <Link href="/dashboard">Try All Features</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Core Learning Features
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              The foundation of your learning experience
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <Mic className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>AI Voice Tutoring</CardTitle>
                <CardDescription>
                  Engage in natural conversations with AI tutors that understand
                  context and adapt to your learning style
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Real-time voice interaction</li>
                  <li>• Natural language processing</li>
                  <li>• Adaptive conversation flow</li>
                  <li>• Multiple voice personalities</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                  <Brain className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Custom AI Tutors</CardTitle>
                <CardDescription>
                  Create personalized tutors tailored to specific subjects,
                  teaching styles, and expertise levels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Subject specialization</li>
                  <li>• Personality customization</li>
                  <li>• Teaching style selection</li>
                  <li>• Expertise level adjustment</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                  <BookOpen className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Session Management</CardTitle>
                <CardDescription>
                  Comprehensive session tracking with history, notes, and
                  progress monitoring
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Session recording & playback</li>
                  <li>• Automatic transcription</li>
                  <li>• Progress tracking</li>
                  <li>• Learning objectives</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Advanced Capabilities
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Powerful tools for enhanced learning
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="text-center">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 mx-auto">
                  <BarChart3 className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle className="text-lg">Analytics & Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Detailed learning analytics, progress reports, and performance
                  insights
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 mx-auto">
                  <MessageSquare className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle className="text-lg">Smart Conversations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Context-aware conversations that remember your learning
                  history and preferences
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 mx-auto">
                  <Settings className="h-6 w-6 text-indigo-600" />
                </div>
                <CardTitle className="text-lg">Customization</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Extensive customization options for tutors, sessions, and
                  learning preferences
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-100 mx-auto">
                  <Globe className="h-6 w-6 text-teal-600" />
                </div>
                <CardTitle className="text-lg">Multi-Language</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Support for multiple languages and international learning
                  standards
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technical Features */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Technical Excellence
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Built with modern technology for reliability and performance
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-start space-x-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                <Shield className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  Enterprise Security
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Bank-level encryption, secure authentication, and privacy
                  protection
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                <Zap className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Lightning Fast</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Optimized performance with sub-second response times
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                <Smartphone className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Cross-Platform</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Works seamlessly across desktop, tablet, and mobile devices
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  24/7 Availability
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Learn anytime, anywhere with always-available AI tutors
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
                <TrendingUp className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  Scalable Infrastructure
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Built to handle millions of concurrent learning sessions
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
                <Headphones className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Premium Support</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Expert support team available to help with any questions
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTA
        badge="Start Learning Your Way"
        title="Ready to Experience All Features?"
        description="Start your free trial today and discover the power of AI-enhanced learning"
        image={{
          src: "/images/limit.svg",
          alt: "...",
          width: 400,
          height: 300,
        }}
        buttons={[
          {
            text: "Start Free Trial",
            href: "/dashboard",
            variant: "outline",
            icon: <Mic />,
          },
          {
            text: "Browse Companions",
            href: "/companions",
            variant: "primary",
          },
        ]}
        variant="gradient"
      />
    </div>
  );
}
