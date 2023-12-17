import { z } from 'zod';

export const editProfileSchema = z.object({
  first_name: z.string().nonempty(),
  last_name: z.string().nonempty(),
  avatar: z.object({
    src: z.string(),
    file: z.instanceof(File).nullable(),
  }),
});

export type EditProfileSchema = z.infer<typeof editProfileSchema>;
