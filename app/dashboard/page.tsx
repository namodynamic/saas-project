import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Brain,
  Clock,
  Plus,
  Search,
  Star,
  TrendingUp,
  Filter,
} from "lucide-react";
import Link from "next/link";
import CompanionCard from "@/components/CompanionCard";
import {
  getBookmarkedCompanions,
  getUserCompanions,
  getUserSessions,
} from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import RecentSessionsCard from "@/components/RecentSessionCard";
import BookmarkedCompanionList from "@/components/BookmarkedCompanionList";
import ProgressTracker from "@/components/ProgressTracker";
import QuickStats from "@/components/QuickStats";
import { differenceInSeconds } from "date-fns";

const Dashboard = async () => {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  const companions = await getUserCompanions(user.id);
  const recentSessions = await getUserSessions(user.id, 10);
  const bookmarkedCompanions = await getBookmarkedCompanions(user.id);

  const allSessions = await getUserSessions(user.id);

  const subjectCounts: Record<string, number> = {};
  allSessions.forEach((s) => {
    if (s.subject)
      subjectCounts[s.subject] = (subjectCounts[s.subject] || 0) + 1;
  });
  const totalSessions = allSessions.length;
  const subjects = Object.entries(subjectCounts).map(([subject, count]) => ({
    subject,
    percent: totalSessions ? Math.round((count / totalSessions) * 100) : 0,
  }));

  const now = new Date();
  const oneWeekAgo = new Date(now);
  oneWeekAgo.setDate(now.getDate() - 7);
  const twoWeeksAgo = new Date(now);
  twoWeeksAgo.setDate(now.getDate() - 14);

  const sessionsThisWeek = allSessions.filter((s) => {
    const date = new Date(s.started_at || s.created_at);
    return date >= oneWeekAgo && date <= now;
  });

  const sessionsLastWeek = allSessions.filter((s) => {
    const date = new Date(s.started_at || s.created_at);
    return date >= twoWeeksAgo && date < oneWeekAgo;
  });

  const totalSessionsThisWeek = sessionsThisWeek.length;
  const totalSessionsLastWeek = sessionsLastWeek.length;

  const totalSecondsThisWeek = sessionsThisWeek.reduce((sum, s) => {
    if (s.started_at && s.ended_at) {
      return (
        sum + differenceInSeconds(new Date(s.ended_at), new Date(s.started_at))
      );
    }
    return sum;
  }, 0);

  const totalSecondsLastWeek = sessionsLastWeek.reduce((sum, s) => {
    if (s.started_at && s.ended_at) {
      return (
        sum + differenceInSeconds(new Date(s.ended_at), new Date(s.started_at))
      );
    }
    return sum;
  }, 0);

  const hoursThisWeek = totalSecondsThisWeek / 3600;
  const hoursLastWeek = totalSecondsLastWeek / 3600;

  const sessionDiff = totalSessionsThisWeek - totalSessionsLastWeek;
  const hoursDiff = hoursThisWeek - hoursLastWeek;

  const formattedHoursThisWeek =
    hoursThisWeek >= 1
      ? `${Math.floor(hoursThisWeek)}h ${Math.round((hoursThisWeek % 1) * 60)}m`
      : `${Math.round(hoursThisWeek * 60)}m`;

  const formattedHoursDiff =
    hoursDiff >= 0
      ? `+${hoursDiff.toFixed(1)} from last week`
      : `${hoursDiff.toFixed(1)} from last week`;

  const formattedSessionDiff =
    sessionDiff >= 0
      ? `+${sessionDiff} from last week`
      : `${sessionDiff} from last week`;

  const uniqueTutors = new Set(allSessions.map((s) => s.companion_id)).size;

  function calculateStreak(
    allSessions: { started_at?: string; created_at?: string }[]
  ): number {
    const dates = Array.from(
      new Set(
        allSessions
          .map((s) =>
            s.started_at
              ? new Date(s.started_at).toISOString().slice(0, 10)
              : null
          )
          .filter(Boolean)
      )
    )
      .filter((date) => date !== null)
      .sort((a, b) => ((a ?? "") > (b ?? "") ? -1 : 1));

    if (dates.length === 0) return 0;

    let streak = 1;
    let prev = dates[0] ? new Date(dates[0]) : null;

    for (let i = 1; i < dates.length; i++) {
      const curr = dates[i]?.length ? new Date(dates[i]) : null;
      if (!curr || !prev) break;
      const diff = (prev.getTime() - curr.getTime()) / (1000 * 60 * 60 * 24);

      if (diff === 1) {
        streak++;
        prev = curr;
      } else if (diff > 1) {
        break;
      }
    }

    const today = new Date().toISOString().slice(0, 10);
    if (dates[0] !== today) streak = 0;

    return streak;
  }

  const streakDays = calculateStreak(allSessions);

  const goals = [
    {
      label: "Complete 10 sessions",
      value: `${sessionsThisWeek.length}/10`,
      completed: sessionsThisWeek.length >= 10,
    },
    {
      label: "Study 10 hours",
      value: `${formattedHoursThisWeek}/10h`,
      completed: hoursThisWeek >= 36000,
    },
    {
      label: "Try 2 new tutors",
      value: `${uniqueTutors}/2`,
      completed: uniqueTutors >= 2,
    },
    {
      label: "Maintain streak",
      value: streakDays === 1 ? "1 day" : `${streakDays} days`,
      completed: streakDays >= 7,
    },
  ];

  const stats = [
    {
      label: "Total Sessions",
      value: totalSessions,
      icon: <Clock className="h-4 w-4 text-muted-foreground" />,
      subtext: formattedSessionDiff,
    },
    {
      label: "Learning Hours",
      value: formattedHoursThisWeek,
      icon: <TrendingUp className="h-4 w-4 text-muted-foreground" />,
      subtext: formattedHoursDiff,
    },
    {
      label: "Active Tutors",
      value: recentSessions.length,
      icon: <Brain className="h-4 w-4 text-muted-foreground" />,
      subtext: `Across ${subjects.length} subjects`,
    },
    {
      label: "Streak",
      value: streakDays === 1 ? "1 day" : `${streakDays} days`,
      icon: <Star className="h-4 w-4 text-muted-foreground" />,
      subtext: "Keep it up!",
    },
  ];

  return (
    <main className="pt-16">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user.firstName}!
          </h1>
          <p className="text-gray-600 mt-2">
            Continue your learning journey with AI tutors
          </p>
        </div>

        <QuickStats stats={stats} />

        <Tabs defaultValue="tutors" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-md:grid-cols-2 gap-5 mb-10">
            <TabsTrigger value="tutors">My Companions</TabsTrigger>
            <TabsTrigger value="sessions">Recent Sessions</TabsTrigger>
            <TabsTrigger className="bg-muted h-8" value="bookmarks">
              Bookmarks
            </TabsTrigger>
            <TabsTrigger className="bg-muted h-8" value="progress">
              Progress
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tutors" className="space-y-6 pt-5">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input placeholder="Search tutors..." className="pl-10" />
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button asChild>
                  <Link href="/dashboard/create-companion">
                    <Plus className="h-4 w-4 mr-1" />
                    Create Companion
                  </Link>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companions.map((companion) => (
                <CompanionCard
                  key={companion.id}
                  {...companion}
                  color={getSubjectColor(companion.subject)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sessions" className="space-y-6 pt-5">
            {recentSessions.length === 0 ? (
              <div className="text-center text-gray-500">
                You have no recent sessions.
              </div>
            ) : (
              <RecentSessionsCard companions={recentSessions} />
            )}
          </TabsContent>

          <TabsContent value="bookmarks" className="space-y-6 pt-5">
            {bookmarkedCompanions.length === 0 ? (
              <div className="text-center text-gray-500">
                You have no bookmarks yet.
              </div>
            ) : (
              <BookmarkedCompanionList companions={bookmarkedCompanions} />
            )}
          </TabsContent>

          <TabsContent value="progress" className="space-y-6 pt-5">
            <ProgressTracker subjects={subjects} goals={goals} />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default Dashboard;
