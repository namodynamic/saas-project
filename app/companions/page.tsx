import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Plus } from "lucide-react";
import SearchInput from "@/components/SearchInput";
import {
  getAllCompanions,
  getFeaturedCompanions,
} from "@/lib/actions/companion.actions";
import CompanionCard from "@/components/CompanionCard";
import { getSubjectColor } from "@/lib/utils";
import SubjectFilter from "@/components/SubjectFilter";
import CTA from "@/components/CTA";

const CompanionsPage = async ({ searchParams }: SearchParams) => {
  const filters = await searchParams;
  const subject = filters.subject ? filters.subject : "";
  const topic = filters.topic ? filters.topic : "";

  const companions = await getAllCompanions({ subject, topic });

  const featuredCompanions = await getFeaturedCompanions();

  return (
    <main className="min-h-screen  mt-10 md:mt-20">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="mx-auto relative max-w-7xl mb-10">
        <section className="relative px-4 pt-20 pb-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4 px-4 py-2">
              🤖 AI Companions Library
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Meet Your{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Learning Companions
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 sm:text-xl">
              Discover hundreds of specialized AI tutors created by our
              community. Find the perfect companion for your learning journey.
            </p>
          </div>
        </section>

        <section className="px-4 pb-8 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-8">
            <SearchInput />
            <div className="flex gap-3">
              <SubjectFilter />
            </div>
          </div>
        </section>

        <div className="px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="all" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="all">
                All Companions ({companions.length})
              </TabsTrigger>
              <TabsTrigger value="featured">Featured Companions</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {companions.map((companion) => (
                  <CompanionCard
                    key={companion.id}
                    {...companion}
                    color={getSubjectColor(companion.subject)}
                  />
                ))}
              </div>

              {companions.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No companions found
                  </h3>
                  <p className="text-gray-600">
                    Try adjusting your search or filters to find more
                    companions.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="featured" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredCompanions.map((companion) => (
                  <CompanionCard
                    key={companion.id}
                    {...companion}
                    sessionCount={companion.sessionCount}
                    color={getSubjectColor(companion.subject)}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <CTA
        badge="Can't Find the Perfect Companion?"
        title="Build and Personalize Your Learning Companion"
        description="Pick a name, subject, voice, & personality - and start learning through voice conversations that feel natural and fun."
        image={{ src: "/images/limit.svg", alt: "...", width: 400, height: 300 }}
        buttons={[
          {
            text: "Build a New Companion",
            href: "/dashboard/create-companion",
            variant: "secondary",
            icon: <Plus />,
          },
          { text: "Start Learning", href: "/dashboard", variant: "primary" },
        ]}
        variant="light"
      />
    </main>
  );
};

export default CompanionsPage;
