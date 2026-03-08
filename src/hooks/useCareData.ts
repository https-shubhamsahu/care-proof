/**
 * useCareData.ts
 *
 * All Supabase data hooks for CareProof.
 * Uses @tanstack/react-query for caching, refetching, and loading states.
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import type { Tables, TablesInsert } from "@/integrations/supabase/types";

export type CareEntry = Tables<"care_entries">;
export type CareScore = Tables<"care_scores">;
export type CareValuation = Tables<"care_valuations">;
export type CommunityStats = Tables<"community_stats">;

// ── Query keys ──────────────────────────────────────────────────────────────

export const QUERY_KEYS = {
    careEntries: (userId: string) => ["care_entries", userId] as const,
    careScore: (userId: string) => ["care_scores", userId] as const,
    careValuation: (userId: string) => ["care_valuations", userId] as const,
    communityStats: () => ["community_stats"] as const,
};

// ── Care Entries ─────────────────────────────────────────────────────────────

export function useCareEntries() {
    const { user } = useAuth();
    return useQuery({
        queryKey: QUERY_KEYS.careEntries(user?.id ?? ""),
        enabled: !!user,
        queryFn: async () => {
            const { data, error } = await supabase
                .from("care_entries")
                .select("*")
                .eq("user_id", user!.id)
                .order("date", { ascending: false })
                .order("created_at", { ascending: false });
            if (error) throw error;
            return data as CareEntry[];
        },
    });
}

// ── Insert a single care entry ────────────────────────────────────────────────

export function useAddCareEntry() {
    const { user } = useAuth();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (entry: Omit<TablesInsert<"care_entries">, "user_id">) => {
            if (!user) throw new Error("Not authenticated");
            const { data, error } = await supabase
                .from("care_entries")
                .insert({ ...entry, user_id: user.id })
                .select()
                .single();
            if (error) throw error;
            return data as CareEntry;
        },
        onSuccess: () => {
            // Invalidate all related queries so they refetch fresh data
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.careEntries(user!.id) });
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.careScore(user!.id) });
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.careValuation(user!.id) });
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.communityStats() });
        },
    });
}

// ── Upload evidence file to Supabase Storage ────────────────────────────────

export async function uploadEvidenceFile(
    userId: string,
    file: File
): Promise<{ path: string; url: string } | null> {
    const ext = file.name.split(".").pop() ?? "bin";
    const path = `${userId}/${Date.now()}.${ext}`;

    const { error } = await supabase.storage
        .from("care-evidence")
        .upload(path, file, { upsert: false });

    if (error) {
        console.error("Storage upload error:", error);
        return null;
    }

    const { data } = supabase.storage.from("care-evidence").getPublicUrl(path);
    return { path, url: data.publicUrl };
}

// ── Care Score ────────────────────────────────────────────────────────────────

export function useCareScore() {
    const { user } = useAuth();
    return useQuery({
        queryKey: QUERY_KEYS.careScore(user?.id ?? ""),
        enabled: !!user,
        queryFn: async () => {
            const { data, error } = await supabase
                .from("care_scores")
                .select("*")
                .eq("user_id", user!.id)
                .maybeSingle();
            if (error) throw error;
            return data as CareScore | null;
        },
    });
}

// ── Care Valuation ────────────────────────────────────────────────────────────

export function useCareValuation() {
    const { user } = useAuth();
    return useQuery({
        queryKey: QUERY_KEYS.careValuation(user?.id ?? ""),
        enabled: !!user,
        queryFn: async () => {
            const { data, error } = await supabase
                .from("care_valuations")
                .select("*")
                .eq("user_id", user!.id)
                .maybeSingle();
            if (error) throw error;
            return data as CareValuation | null;
        },
    });
}

// ── Community Stats ───────────────────────────────────────────────────────────

export function useCommunityStats() {
    return useQuery({
        queryKey: QUERY_KEYS.communityStats(),
        queryFn: async () => {
            const { data, error } = await supabase
                .from("community_stats")
                .select("*")
                .limit(1)
                .maybeSingle();
            if (error) throw error;
            return data as CommunityStats | null;
        },
        staleTime: 5 * 60 * 1000, // 5-minute cache for community stats
    });
}
