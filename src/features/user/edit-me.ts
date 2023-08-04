import { editMe } from '@/shared/api';
import { ProfileStore } from '@/stores';

export type ProfileData = {
  first_name: string;
  last_name: string;
  avatar: string;
};

export function editMyProfile(profileStore: ProfileStore) {
  return async function (data: ProfileData) {
    const updatedProfile = await editMe(data);
    profileStore.update(updatedProfile);
  };
}
