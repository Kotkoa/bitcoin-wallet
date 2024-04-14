import type { FC } from 'react';

import Image from 'next/image';

import avatarImage from '/src/assets/avatar.png';

import styles from '/src/components/avatar/avatar.module.css';

export const Avatar: FC = () => {
  return (
    <Image
      src={avatarImage}
      width={90}
      height={90}
      loading="lazy"
      className={styles.imageAvatar}
      alt="Picture of the author"
    />
  );
};
