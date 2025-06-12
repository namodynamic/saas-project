import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";
import { PricingTable } from "@clerk/nextjs";
import FeatureCards from "@/components/FeatureCard";
import { features } from "@/constants";

export default function LandingPage() {
  return (
    <main className="mt-10">
      <section className="relative px-4 pt-20 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4 px-4 py-2">
              🚀 AI-Powered Learning Platform
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
              Learn with{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Voice Tutors
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 sm:text-xl">
              Experience personalized learning with AI voice agents that adapt
              to your pace. Create custom tutors, track progress, and master any
              subject with interactive sessions.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Button size="lg" className="px-8 py-3" asChild>
                <Link href="/dashboard">
                  Start Learning <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-3">
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Powerful Features for Modern Learning
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Everything you need to create an engaging learning experience
            </p>
          </div>
          <FeatureCards features={features} />
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Choose Your Learning Plan
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Start free and upgrade as you grow
            </p>
          </div>
          <div className="mt-16">
            <PricingTable />
          </div>
        </div>
      </section>
    </main>
  );
}
