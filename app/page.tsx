import { Badge } from "@/components/ui/badge";
import { BookAudio } from "lucide-react";
import { PricingTable } from "@clerk/nextjs";
import FeatureCards from "@/components/FeatureCard";
import { features } from "@/constants";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";

export default function LandingPage() {
  return (
    <main className="mt-10">
      <Hero />

      <section className="px-4 py-24 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <Badge
              variant="secondary"
              className="mb-4 px-4 py-2 bg-blue-100 text-blue-800 border-0"
            >
              Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Powerful Features for{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Modern Learning
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to accelerate your learning journey with
              cutting-edge AI technology
            </p>
          </div>
          <FeatureCards features={features} />
        </div>
      </section>

      <Testimonials />

      <section className="px-4 py-24 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <Badge
              variant="secondary"
              className="mb-4 px-4 py-2 bg-purple-100 text-purple-800 border-0"
            >
              Pricing
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Simple,{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Transparent Pricing
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Start free and scale as you grow. No hidden fees, no surprises.
            </p>
          </div>
          <div className="mt-16">
            <PricingTable />
          </div>
        </div>
      </section>
      <CTA
        badge="Ready to Transform Your Learning?"
        title="Build and Personalize Your Learning Companion"
        description="Pick a name, subject, voice, & personality - and start learning through voice conversations that feel natural and fun."
        image={{ src: "/images/cta.svg", alt: "...", width: 400, height: 300 }}
        buttons={[
          {
            text: "Start Learning Today",
            href: "/dashboard",
            variant: "secondary",
            icon: <BookAudio />,
          },
          {
            text: "Browse Companions",
            href: "/companions",
            variant: "primary",
          },
        ]}
        variant="gradient"
      />
    </main>
  );
}
