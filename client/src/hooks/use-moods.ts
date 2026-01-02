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
  mood: number;
  emotion?: string;
  note?: string;
};

// Assuming endpoints exist based on standard REST patterns for this app
const API_BASE = "/api/moods";

export function useMoods() {
  return useQuery({
    queryKey: [API_BASE],
    queryFn: async () => {
      const res = await fetch(API_BASE, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch moods");
      return z.array(moodSchema.extend({
        mood: z.number(),
        emotion: z.string().optional(),
        note: z.string().optional(),
      })).parse(await res.json());
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
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_BASE] });
    },
  });
}
