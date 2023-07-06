import { useEffect, useState } from 'react';

import styles from './Avatar.module.scss';
import DefaultAvatarSrc from '@/shared/assets/avatar.svg';

type AvatarProps = {
  size?: number;
  src?: string;
};

export const Avatar = (props: AvatarProps) => {
  const { size = 32, src } = props;
  const [loadedAvatar, setLoadedAvatar] = useState(DefaultAvatarSrc);

  useEffect(() => {
    if (src) {
      const downloadingImage = new Image();
      
      downloadingImage.onload = function () {
        setLoadedAvatar(src);
      };

      downloadingImage.src = src;
    }
  }, [src]);

  const sizeStyles = {
    height: size,
    width: size,
  };

  return (
    <div className={styles.avatar} style={sizeStyles}>
      <img src={loadedAvatar} alt='' style={sizeStyles} />
    </div>
  );
};
