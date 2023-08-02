import { z } from 'zod';

export type UserSchema = z.infer<typeof userSchema>;

export const userSchema = z.object({
  id: z.number(),
  username: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  avatar: z.string(),
});
