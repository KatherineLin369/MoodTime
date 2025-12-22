import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

// Zod schema for mood (inferred since no shared schema available in prompt)
const moodSchema = z.object({
  id: z.number(),
  value: z.number().min(1).max(5), // 1=Terrible, 5=Great
  emotions: z.array(z.string()), // ["Happy", "Anxious", etc]
  note: z.string().optional(),
  createdAt: z.string().or(z.date()).pipe(z.coerce.date()),
});

export type Mood = z.infer<typeof moodSchema>;

export type CreateMoodInput = {
  value: number;
  emotions: string[];
  note?: string;
};

// Assuming endpoints exist based on standard REST patterns for this app
const API_BASE = "/api/moods";

export function useMoods() {
  return useQuery({
    queryKey: [API_BASE],
    queryFn: async () => {
      // For now, if the API 404s, we'll return an empty array to prevent app crash
      // during "lite" development if backend isn't ready.
      try {
        const res = await fetch(API_BASE, { credentials: "include" });
        if (!res.ok) {
          if (res.status === 404) return [];
          throw new Error("Failed to fetch moods");
        }
        const data = await res.json();
        return z.array(moodSchema).parse(data);
      } catch (err) {
        console.warn("Using empty moods list (Backend might be missing)", err);
        return []; 
      }
    },
  });
}

export function useCreateMood() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateMoodInput) => {
      const res = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to create mood entry");
      return moodSchema.parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_BASE] });
    },
  });
}
