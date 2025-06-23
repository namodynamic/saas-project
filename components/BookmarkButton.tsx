"use client";

import { useState, useTransition } from "react";
import { addBookmark, removeBookmark } from "@/lib/actions/companion.actions";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";

interface BookmarkButtonProps {
  companionId: string;
  initialBookmarked: boolean;
  path: string;
}

export default function BookmarkButton({ companionId, initialBookmarked, path }: BookmarkButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [bookmarked, setBookmarked] = useState(initialBookmarked);

  const handleBookmark = () => {
    startTransition(async () => {
      if (bookmarked) {
        await removeBookmark(companionId, path);
        setBookmarked(false);
      } else {
        await addBookmark(companionId, path);
        setBookmarked(true);
      }
    });
  };

  return (
    <Button variant="outline" size="sm" onClick={handleBookmark} disabled={isPending}>
      <Bookmark className={`h-4 w-4 ${bookmarked ? "fill-yellow-400" : ""}`} />
    </Button>
  );
}