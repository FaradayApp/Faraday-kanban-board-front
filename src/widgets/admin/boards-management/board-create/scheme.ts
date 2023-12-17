import { z } from 'zod';

export type CreateBoardSchema = z.infer<typeof createBoardSchema>;

export const createBoardSchema = z.object({
  title: z.string().nonempty(),
});
