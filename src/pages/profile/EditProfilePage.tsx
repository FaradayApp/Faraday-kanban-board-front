import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';

import { PageContainer, PageHeader } from '@/shared/ui-kit';
import { profileStore } from '@/stores';
import { EditProfileForm } from '@/widgets/profile';
import { ProfileData, editMyProfile } from '@/features/user';
import { useOpenBoardPage } from '@/features/navigation';

export const EditProfilePage = observer(() => {
  const { t } = useTranslation();
  const { openBoardPage } = useOpenBoardPage();

  const profile = profileStore.profile.data;

  const editProfile = useCallback(async (data: ProfileData) => {
    await editMyProfile(profileStore)(data);
  }, []);

  return (
    <PageContainer
      loading={profileStore.profile.isPending}
      header={<PageHeader title={t('editProfile.title')} navigationFn={openBoardPage} />}>
      {profile && <EditProfileForm me={profile} editProfile={editProfile} />}
    </PageContainer>
  );
});
