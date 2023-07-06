import { useCallback } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  login: z.string().min(3),
  password: z.string().min(3),
});

type FormSchema = z.infer<typeof schema>;
export type LoginFn = (data: FormSchema) => Promise<unknown>;

export const useAuthForm = (login?: LoginFn) => {
  const { register, handleSubmit, formState } = useForm<FormSchema>({
    resolver: zodResolver(schema),
  });

  const { errors, isValid, isDirty } = formState;
  
  const onSubmit: SubmitHandler<FormSchema> = useCallback((data) => login?.(data), [login]);

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isValid,
    isDirty,
  };
};
