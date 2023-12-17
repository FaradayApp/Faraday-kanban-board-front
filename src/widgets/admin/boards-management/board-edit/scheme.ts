import { z } from 'zod';

export type ChangeBoardSchema = z.infer<typeof changeBoardSchema>;

export const changeBoardSchema = z.object({
  title: z.string().nonempty(),
});
