import clsx from 'clsx';
import { LinkHTMLAttributes, PropsWithChildren } from 'react';

import styles from './Link.module.scss';
import { CopyIcon } from '@/shared/ui-kit';
import { copyText } from '@/shared/lib/copy-text';

type LinkProps = LinkHTMLAttributes<HTMLAnchorElement> &
  PropsWithChildren<{
    href: string;
    children?: string;
    withCopy?: boolean;
  }>;

export const Link = (props: LinkProps) => {
  const { className, withCopy, ...linkProps } = props;
  const linkClasses = clsx(className, styles.container__link);

  const copy = () => {
    copyText(linkProps.href);
  };

  return (
    <div className={styles.container}>
      <a className={linkClasses} {...linkProps}>
        {props.children || props.href}
      </a>
      {withCopy && <CopyIcon onClick={copy} className={styles.container__copyIcon} />}
    </div>
  );
};
