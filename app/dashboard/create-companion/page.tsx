import Link from "next/link";
import CompanionForm from "@/components/CompanionForm";
import { newCompanionPermissions } from "@/lib/actions/companion.actions";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const CreateCompanion = async () => {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const canCreateCompanion = await newCompanionPermissions();

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pt-16">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {canCreateCompanion ? (
            <article className="w-full gap-4 flex flex-col">
              <div className="mb-8">
                <Button variant="ghost" asChild className="mb-4">
                  <Link href="/dashboard">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Dashboard
                  </Link>
                </Button>
                <h1 className="text-3xl font-bold text-gray-900">
                  Create AI Companion
                </h1>
                <p className="text-gray-600 mt-2">
                  Design your personalized AI tutor with custom expertise and
                  personality
                </p>
              </div>

              <CompanionForm />
            </article>
          ) : (
            <article className="companion-limit text-center py-12 max-w-2xl mx-auto">
              <div className="mb-8">
                <Image
                  src="/images/limit.svg"
                  alt="Companion limit reached"
                  width={360}
                  height={230}
                  className="mx-auto"
                />
              </div>

              <div className="space-y-4">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                  Upgrade your plan
                </div>

                <h1 className="text-2xl font-bold text-gray-900">
                  You&apos;ve Reached Your Limit
                </h1>

                <p className="text-gray-600 max-w-md mx-auto">
                  You have reached your companion limit. Upgrade your plan to
                  create more companions and access premium features.
                </p>

                <Link
                  href="/subscription"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  Upgrade My Plan
                </Link>
              </div>
            </article>
          )}
        </div>
      </main>
    </div>
  );
};

export default CreateCompanion;
