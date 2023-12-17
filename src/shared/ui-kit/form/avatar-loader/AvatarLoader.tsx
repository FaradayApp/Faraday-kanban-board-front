import { useFilePicker } from 'use-file-picker';

import { Avatar, CloseIcon, Text } from '@/shared/ui-kit';
import styles from './AvatarLoader.module.scss';
import { useEffect } from 'react';

type AvatarValue = {
  src: string;
  file: File | null;
};

type AvatarLoaderProps = {
  title: string;
  value: AvatarValue;
  onChange: (value: AvatarValue) => void;
};

export const AvatarLoader = (props: AvatarLoaderProps) => {
  const { title, value, onChange } = props;

  const [openFileSelector, { filesContent, plainFiles, clear }] = useFilePicker({
    readAs: 'DataURL',
    accept: 'image/*',
    multiple: true,
    limitFilesConfig: { max: 1 },
    maxFileSize: 50,
  });

  useEffect(() => {
    onChange({ src: filesContent[0]?.content, file: plainFiles[0] });
  }, [filesContent, onChange, plainFiles]);

  return (
    <div className={styles.avatarLoader}>
      <div className={styles.avatarLoader__avatar}>
        <Avatar size={128} src={filesContent[0]?.content || value.src} />
        <CloseIcon className={styles.avatarLoader__clearButton} onClick={clear} />
      </div>
      <div className={styles.avatarLoader__loadButton} onClick={openFileSelector}>
        <Text tag='p'>{title}</Text>
      </div>
    </div>
  );
};
