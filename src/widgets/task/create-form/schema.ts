import { z } from 'zod';
import dayjs, { type Dayjs } from 'dayjs';
import { userSchema } from '@/enitities/user';

export type NewTaskSchema = z.infer<typeof newTaskSchema>;

export const newTaskSchema = z.object({
  title: z.string().max(60).nonempty(),
  description: z.string().max(1000).nonempty(),
  expiration_date: z.instanceof(dayjs as unknown as typeof Dayjs),
  performers: z.array(userSchema),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  status: z.enum(['BACKLOG', 'TODO', 'IN_PROGRESS', 'DONE', 'ARCHIVE']),
});
