import clsx from 'clsx';
import { LinkHTMLAttributes, PropsWithChildren } from 'react';

import styles from './Link.module.scss';
import { CopyIcon } from '@/shared/ui-kit';
import { copyText } from '@/shared/lib/copy-text';
import { successNotification } from '@/shared/lib/notify';
import { useTranslation } from 'react-i18next';

type LinkProps = LinkHTMLAttributes<HTMLAnchorElement> &
  PropsWithChildren<{
    href: string;
    children?: string;
    withCopy?: boolean;
    withCopyNotification?: boolean;
  }>;

export const Link = (props: LinkProps) => {
  const { t } = useTranslation();
  const { className, withCopy, withCopyNotification, ...linkProps } = props;
  const linkClasses = clsx(className, styles.container__link);

  const copy = () => {
    copyText(linkProps.href);
    if (withCopyNotification) {
      successNotification(t('common.copied'));
    }
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
