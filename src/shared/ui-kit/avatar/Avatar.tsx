import { useEffect, useState } from 'react';

import styles from './Avatar.module.scss';
import { AvatarIcon } from '..';

type AvatarProps = {
  size?: number;
  src?: string;
};

export const Avatar = (props: AvatarProps) => {
  const { size = 32, src } = props;
  const [loadedAvatar, setLoadedAvatar] = useState('');

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
      {loadedAvatar ? (
        <img src={loadedAvatar} alt='' style={sizeStyles} />
      ) : (
        <AvatarIcon {...sizeStyles} />
      )}
    </div>
  );
};
