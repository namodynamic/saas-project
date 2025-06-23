import { Button } from "@/components/ui/button";
import { ArrowLeft, Settings } from "lucide-react";
import Link from "next/link";
import CompanionComponent from "@/components/CompanionComponent";
import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getCompanion, isBookmarked } from "@/lib/actions/companion.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getSubjectColor } from "@/lib/utils";
import Image from "next/image";
import BookmarkButton from "@/components/BookmarkButton";

interface CompanionSessionPageProps {
  params: Promise<{ id: string }>;
}

const SessionPage = async ({ params }: CompanionSessionPageProps) => {
  const { id } = await params;
  const companion = await getCompanion(id);
  const user = await currentUser();

  if (!user) redirect("/sign-in");
  if (!companion) redirect("/companions");

  const { name, subject, topic, duration } = companion;

  const bookmarked = await isBookmarked(id, user.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pt-16">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Button variant="ghost" asChild className="mb-4">
              <Link href="/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div
                      className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden"
                      style={{ backgroundColor: getSubjectColor(subject) }}
                    >
                      <Image
                        src={`/icons/${subject}.svg`}
                        alt={subject}
                        width={35}
                        height={35}
                      />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold">{name}</h1>
                      <p className="text-gray-600">{topic}</p>
                      {/*Todo: Add tags */}
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant="secondary">JavaScript</Badge>
                        <Badge variant="secondary">React</Badge>
                        <Badge variant="secondary">Node.js</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="items-start text-xl max-md:hidden">
                    {duration} minutes
                    <div className="flex flex-wrap gap-2 items-center space-x-2">
                      <BookmarkButton
                        companionId={id}
                        initialBookmarked={bookmarked}
                        path={`/dashboard/session/${id}`}
                      />
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <CompanionComponent
              {...companion}
              companionId={id}
              userName={user.firstName!}
              userImage={user.imageUrl!}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default SessionPage;
