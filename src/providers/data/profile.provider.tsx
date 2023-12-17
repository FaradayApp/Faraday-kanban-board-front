import { profileStore } from '@/stores';
import { PropsWithChildren, useEffect } from 'react';

export const ProfileProvider = (props: PropsWithChildren) => {
  useEffect(() => {
    profileStore.init();
  }, []);

  return props.children;
};
