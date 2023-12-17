import { z } from 'zod';

export const registrationSchema = z.object({
  username: z.string().nonempty(),
  password: z.string().nonempty(),
  first_name: z.string().nonempty(),
  last_name: z.string().nonempty(),
});

export type RegistrationSchema = z.infer<typeof registrationSchema>;
