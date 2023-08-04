import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';

import { PageContainer, PageHeader } from '@/shared/ui-kit';
import { profileStore } from '@/stores';
import { EditProfileForm } from '@/widgets/profile';
import { useCallback } from 'react';
import { ProfileData, editMyProfile } from '@/features/user';

export const EditProfilePage = observer(() => {
  const { t } = useTranslation();

  const profile = profileStore.profile.data;

  const editProfile = useCallback(async (data: ProfileData) => {
    await editMyProfile(profileStore)(data);
  }, []);

  return (
    <PageContainer header={<PageHeader title={t('editProfile.title')} />}>
      {profile && <EditProfileForm me={profile} editProfile={editProfile} />}
    </PageContainer>
  );
});
