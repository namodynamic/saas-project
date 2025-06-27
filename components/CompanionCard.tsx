"use client";

import {
  addBookmark,
  getSessionCountForCompanion,
  removeBookmark,
} from "@/lib/actions/companion.actions";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { Clock, Mic, History } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { getSubjectColor } from "@/lib/utils";

interface CompanionCardProps {
  id: string;
  name: string;
  topic: string;
  subject: string;
  duration: number;
  color: string;
  bookmarked: boolean;
}

const CompanionCard = ({
  id,
  name,
  topic,
  subject,
  duration,
  color,
  bookmarked,
}: CompanionCardProps) => {
  const pathname = usePathname();
  const [sessionCount, setSessionCount] = useState<number | null>(null);
  const handleBookmark = async () => {
    if (bookmarked) {
      await removeBookmark(id, pathname);
    } else {
      await addBookmark(id, pathname);
    }
  };

  useEffect(() => {
    getSessionCountForCompanion(id).then(setSessionCount);
  }, [id]);

  return (
    <Card
      className="hover:shadow-lg transition-shadow"
      style={{ backgroundColor: color }}
    >
      <CardHeader>
        <div className="flex justify-between items-center">
          <div
            className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden"
            style={{ backgroundColor: getSubjectColor(subject) }}
          >
            <Image
              src={`/icons/${subject}.svg`}
              alt={subject}
              width={30}
              height={30}
            />
          </div>
          <Badge
            variant="secondary"
            className="capitalize !bg-black text-white"
          >
            {subject}
          </Badge>
        </div>
        <CardTitle className="text-lg">{name}</CardTitle>
        <CardDescription className="text-black line-clamp-2">
          {topic}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-sm text-black">
            <History className="h-4 w-4 mr-1" /> {sessionCount} sessions
          </div>
          <div className="flex items-center text-sm text-black">
            <Clock className="h-4 w-4 mr-1" />
            {duration} min
          </div>
        </div>
        <div className="flex gap-2">
          <Button size="sm" className="flex-1">
            <Link
              href={`/dashboard/session/${id}`}
              className="inline-flex items-center"
            >
              <Mic className="h-4 w-4 mr-2" />
              Start Session
            </Link>
          </Button>
          <Button size="sm" className="bg-black" onClick={handleBookmark}>
            <Image
              src={
                bookmarked
                  ? "/icons/bookmark-filled.svg"
                  : "/icons/bookmark.svg"
              }
              alt="bookmark"
              width={12.5}
              height={15}
            />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
export default CompanionCard;
