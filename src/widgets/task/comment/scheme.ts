import { z } from 'zod';

export type TaskCommentSchema = z.infer<typeof taskCommentSchema>;

export const taskCommentSchema = z.object({
  message: z.string().max(600).nonempty(),
});
