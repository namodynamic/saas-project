"use server";

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "../supabase";
import { revalidatePath } from "next/cache";

export const createCompanion = async (formData: CreateCompanion) => {
  const { userId: author } = await auth();
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("companions")
    .insert({
      ...formData,
      author,
    })
    .select();

  if (error || !data) throw new Error(error?.message || "Something went wrong");

  return data[0];
};

export const getAllCompanions = async ({
  limit = 10,
  page = 1,
  subject,
  topic,
}: GetAllCompanions) => {
  const supabase = createSupabaseClient();

  const { userId } = await auth();

  let query = supabase.from("companions").select();

  if (subject && topic) {
    query = query
      .ilike("subject", `%${subject}%`)
      .or(`topic.ilike.%${topic}%, name.ilike.%${topic}%`);
  } else if (subject) {
    query = query.ilike("subject", `%${subject}%`);
  } else if (topic) {
    query = query.or(`topic.ilike.%${topic}%, name.ilike.%${topic}%`);
  }

  query = query.range((page - 1) * limit, page * limit - 1);

  const { data: companions, error } = await query;

  if (error) throw new Error(error?.message || "Something went wrong");

  // Get an array of companion IDs
  const companionIds = companions.map(({ id }) => id);

  // Get the bookmarks where user_id is the current user and companion_id is in the array of companion IDs
  const { data: bookmarks } = await supabase
    .from("bookmarks")
    .select()
    .eq("user_id", userId)
    .in("companion_id", companionIds);

  const marks = new Set(bookmarks?.map(({ companion_id }) => companion_id));

  // Add a bookmarked property to each companion
  companions.forEach((companion) => {
    companion.bookmarked = marks.has(companion.id);
  });

  return companions;
};

export const getCompanion = async (id: string) => {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("companions")
    .select()
    .eq("id", id);

  if (error) return console.error(error);

  return data[0];
};

export const addToSessionHistory = async (companionId: string) => {
  const { userId } = await auth();
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.from("session_history").insert({
    companion_id: companionId,
    user_id: userId,
    started_at: new Date().toISOString(),
  }).select().single();

  if (error) throw new Error(error.message);

  return data;
};

export const endSessionHistory = async (sessionId: string) => {
  const supabase = createSupabaseClient();
  const { error } = await supabase
    .from("session_history")
    .update({ ended_at: new Date().toISOString() })
    .eq("id", sessionId);

  if (error) throw new Error(error.message);
};

export const getRecentSessions = async (limit = 10) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("session_history")
    .select(`id, created_at, companions:companion_id (*)`)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);

  // return an array of session objects, each with a unique id and its companion
  return data.map(({ id, created_at, companions }) => ({
    sessionId: id,
    created_at,
    ...(Array.isArray(companions) ? companions[0] : companions),
  }));
};

export const getUserCompanions = async (userId: string) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("companions")
    .select()
    .eq("author", userId);

  if (error) throw new Error(error.message);

  return data;
};

export const getUserSessions = async (userId: string, limit = 10) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("session_history")
    .select(`id, started_at, ended_at, companions:companion_id (*)`)
    .eq("user_id", userId)
    .order("started_at", { ascending: true })
    .limit(limit);

  if (error) throw new Error(error.message);

  return data.map(({ id, started_at, ended_at, companions }) => ({
    sessionId: id,
    started_at,
    ended_at,
    ...(Array.isArray(companions) ? companions[0] : companions),
  }));
};

export const newCompanionPermissions = async () => {
  const { userId, has } = await auth();
  const supabase = createSupabaseClient();

  let limit = 0;

  if (has({ plan: "pro" })) {
    return true; // Pro users can create companions without limits
  } else if (has({ feature: "3_companion_limit" })) {
    limit = 3;
  } else if (has({ feature: "10_companion_limit" })) {
    limit = 3;
  }

  const { data, error } = await supabase
    .from("companions")
    .select("id", { count: "exact" })
    .eq("author", userId);

  if (error) throw new Error(error.message);

  const companionCount = data?.length;

  if (companionCount >= limit) {
    return false;
  } else {
    return true;
  }
};

export const getSessionCountForCompanion = async (companionId: string) => {
  const supabase = createSupabaseClient();
  const { count, error } = await supabase
    .from("session_history")
    .select("*", { count: "exact", head: true })
    .eq("companion_id", companionId);

  if (error) throw new Error(error.message);
  return count || 0;
};

export const getFeaturedCompanions = async (limit = 3) => {
  const supabase = createSupabaseClient();
  // Get all session_history rows (or a high limit)
  const { data: sessions, error } = await supabase
    .from("session_history")
    .select("companion_id");

  if (error) throw new Error(error.message);
  // Count sessions per companion_id
  const counts: Record<string, number> = {};
  sessions.forEach(({ companion_id }) => {
    counts[companion_id] = (counts[companion_id] || 0) + 1;
  });
  // Get top N companion_ids
  const topCompanionIds = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([id]) => id);

  if (topCompanionIds.length === 0) return [];
  // Fetch companion details
  const { data: companions, error: companionsError } = await supabase
    .from("companions")
    .select("*")
    .in("id", topCompanionIds);

  if (companionsError) throw new Error(companionsError.message);
  // Attach sessionCount to each companion
  return companions.map((companion) => ({
    ...companion,
    sessionCount: counts[companion.id] || 0,
  }));
};

// Bookmarks
export const addBookmark = async (companionId: string, path: string) => {
  const { userId } = await auth();
  if (!userId) return;
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.from("bookmarks").insert({
    companion_id: companionId,
    user_id: userId,
  });
  if (error) {
    throw new Error(error.message);
  }
  // Revalidate the path to force a re-render of the page
  revalidatePath(path);
  return data;
};

export const removeBookmark = async (companionId: string, path: string) => {
  const { userId } = await auth();
  if (!userId) return;
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("bookmarks")
    .delete()
    .eq("companion_id", companionId)
    .eq("user_id", userId);
  if (error) {
    throw new Error(error.message);
  }
  revalidatePath(path);
  return data;
};

export const getBookmarkedCompanions = async (userId: string) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("bookmarks")
    .select(`companions:companion_id (*)`)
    .eq("user_id", userId);
  if (error) {
    throw new Error(error.message);
  }
  return data.map(({ companions }) => companions);
};
