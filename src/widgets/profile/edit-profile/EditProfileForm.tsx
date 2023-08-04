import { useTranslation } from 'react-i18next';
import { useForm, type SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import styles from './EditProfileForm.module.scss';
import { AvatarLoader, Button, FloatingInput } from '@/shared/ui-kit';
import { type User } from '@/enitities/user';
import { type ProfileData } from '@/features/user';
import { EditProfileSchema, editProfileSchema } from './schema';

type EditProfileFormProps = {
  me: User;
  editProfile: (data: ProfileData) => Promise<unknown>;
};

export const EditProfileForm = (props: EditProfileFormProps) => {
  const { me, editProfile } = props;
  const { t } = useTranslation();
  const { register, handleSubmit, control, formState } = useForm<EditProfileSchema>({
    resolver: zodResolver(editProfileSchema),
  });

  const { errors, isSubmitting } = formState;
  const { first_name, last_name } = errors;

  const onSubmit: SubmitHandler<EditProfileSchema> = async (data) => {
    editProfile({
      ...me,
      ...data,
      avatar: data.avatar.src || '',
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.editProfileForm__fields}>
        <Controller
          name='avatar'
          control={control}
          defaultValue={{ src: me.avatar, file: null }}
          render={({ field }) => (
            <AvatarLoader
              title={t('editProfile.labels.avatar')}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />

        <FloatingInput
          {...register('first_name')}
          defaultValue={me.first_name}
          label={t('editProfile.labels.firstName')}
          errorMessage={first_name?.message}
        />

        <FloatingInput
          {...register('last_name')}
          defaultValue={me.last_name}
          label={t('editProfile.labels.lastName')}
          errorMessage={last_name?.message}
        />

        <Button disabled={isSubmitting} type='submit'>
          {t('editProfile.buttons.submit')}
        </Button>
      </div>
    </form>
  );
};
