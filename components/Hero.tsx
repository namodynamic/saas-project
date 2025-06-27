"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative px-4 pt-20 pb-32 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="text-center">
          <div
            className={cn(
              "transition-all duration-1000 ease-out",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            )}
          >
            <Badge
              variant="secondary"
              className="mb-6 px-6 py-2 text-sm font-medium bg-gradient-to-r from-blue-100 to-purple-100 border-0"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Learning Revolution
            </Badge>
          </div>

          <div
            className={cn(
              "transition-all duration-1000 ease-out delay-200",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            )}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-gray-900 mb-8">
              Learn with{" "}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent animate-gradient">
                AI Voice Tutors
              </span>
            </h1>
          </div>

          <div
            className={cn(
              "transition-all duration-1000 ease-out delay-400",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            )}
          >
            <p className="mx-auto mt-6 max-w-3xl text-xl md:text-2xl text-gray-600 leading-relaxed">
              Experience the future of education with AI tutors that adapt to
              your learning style, provide instant feedback, and make complex
              topics simple to understand.
            </p>
          </div>

          <div
            className={cn(
              "transition-all duration-1000 ease-out delay-600",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            )}
          >
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button
                size="lg"
                className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                asChild
              >
                <Link href="/dashboard">
                  Start Learning Free <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 text-lg font-semibold border-2 hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 bg-transparent"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div
            className={cn(
              "transition-all duration-1000 ease-out delay-800",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            )}
          >
            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  2K+
                </div>
                <div className="text-gray-600">Active Learners</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">10K+</div>
                <div className="text-gray-600">Sessions Completed</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  4.9★
                </div>
                <div className="text-gray-600">User Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;
