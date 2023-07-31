import { z } from 'zod';

export type TaskInfoSchema = z.infer<typeof taskInfoSchema>;

export const taskInfoSchema = z.object({
  description: z.string().max(1000).nonempty(),
  status: z.enum(['BACKLOG', 'TODO', 'IN_PROGRESS', 'DONE', 'ARCHIVE']),
});
