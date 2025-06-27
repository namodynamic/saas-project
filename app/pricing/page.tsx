import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { PricingTable } from "@clerk/nextjs"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">

      <section className="relative px-4 pt-20 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4 px-4 py-2">
              💰 Simple, Transparent Pricing
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Choose Your{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Learning Plan
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 sm:text-xl">
              Start free and upgrade as you grow. All plans include our core AI tutoring features with no hidden fees.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <PricingTable />
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Can I change my plan anytime?</h3>
              <p className="text-gray-600">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we&apos;ll
                prorate any billing differences.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">What happens if I exceed my session limit?</h3>
              <p className="text-gray-600">
                On the Starter plan, you&apos;ll be notified when approaching your limit. You can upgrade to either Core or Pro for
                unlimited conversations or wait for your monthly reset.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Is there a free trial?</h3>
              <p className="text-gray-600">
                Yes! The Basic plan is completely free but limited to 10 conversations/month and 3 Active companions.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">How does billing work?</h3>
              <p className="text-gray-600">
                All plans are billed monthly or annually. Annual billing includes a 20% discount. You can cancel anytime
                with no cancellation fees.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Ready to Start Learning?</h2>
          <p className="mt-4 text-xl text-blue-100">
            Join thousands of learners already using Converso to learn with AI.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="px-8 py-3" asChild>
              <Link href="/sign-up">Start Free Today</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-3 text-black border-white hover:bg-white hover:text-blue-600"
              asChild
            >
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  )
}
