import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { getSubjectColor } from "@/lib/utils";
import { Clock, Play } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

interface CompanionListProps {
  companions?: Companion[];
  classNames?: string;
}

const BookmarkedCompanionList = ({ companions }: CompanionListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bookmarked Tutors</CardTitle>
        <CardDescription>Your saved tutors for quick access</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {companions?.map(({ id, subject, name, duration }) => (
            <div
              key={id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div
                  className="size-[52px] flex items-center justify-center rounded-lg"
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
                  <p className="font-medium">{name}</p>
                  <p className="text-sm text-gray-600">{subject}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center text-sm text-gray-700">
                  <Clock className="h-4 w-4 mr-1 " />
                  {duration}
                </div>
                <Link href={`/dashboard/session/${id}`}>
                <Button size="sm">
                  <Play className="h-4 w-4" />
                </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
export default BookmarkedCompanionList;
