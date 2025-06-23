import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { cn, getSubjectColor } from "@/lib/utils";
import Image from "next/image";
import { formatDistanceToNow, differenceInSeconds } from "date-fns";

interface CompanionListProps {
  companions?: Companion[];
  classNames?: string;
}

const RecentSessionsCard = ({ companions, classNames }: CompanionListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Learning Sessions</CardTitle>
        <CardDescription>
          Your latest tutoring sessions and progress
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className={cn("space-y-4", classNames)}>
          {companions?.map(
            ({ id, subject, topic, name, started_at, ended_at }, idx) => {
              // duration
              let durationStr = "";
              const start = started_at ? new Date(started_at) : null;
              const end = ended_at ? new Date(ended_at) : null;

              if (
                start &&
                end &&
                !isNaN(start.getTime()) &&
                !isNaN(end.getTime())
              ) {
                const totalSeconds = differenceInSeconds(end, start);
                const hours = Math.floor(totalSeconds / 3600);
                const minutes = Math.floor((totalSeconds % 3600) / 60);
                const seconds = totalSeconds % 60;

                if (hours) durationStr += `${hours}h `;
                if (minutes) durationStr += `${minutes}m `;
                if (seconds || (!hours && !minutes))
                  durationStr += `${seconds}s`;
                durationStr = durationStr.trim();
              }

              // relative date
              const relativeDate = ended_at
                ? formatDistanceToNow(new Date(ended_at), { addSuffix: true })
                : "";

              return (
                <div
                  key={`${id}-${idx}`}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
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
                      <p className="font-medium">{topic}</p>
                      <p className="text-sm text-gray-600">with {name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{durationStr}</p>
                    <p className="text-sm text-gray-600">{relativeDate}</p>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentSessionsCard;
