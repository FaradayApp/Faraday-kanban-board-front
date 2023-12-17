import clsx from 'clsx';
import { HTMLAttributes, PropsWithChildren } from 'react';

import styles from './Text.module.scss';

type TextProps = HTMLAttributes<HTMLSpanElement> &
  PropsWithChildren<{
    tag: 'p' | 'span';
    size?: 'sm' | 'md' | 'xsm';
    weight?: 'bold' | 'light' | 'normal' | 'regular';
  }>;

export const Text = (props: TextProps) => {
  const { tag = 'p', size = 'md', weight = 'normal', className, ...otherProps } = props;
  const TextComponent = tag;

  const classes = clsx(className, styles.text, {
    [styles.text_md]: size === 'md',
    [styles.text_sm]: size === 'sm',
    [styles.text_xsm]: size === 'xsm',

    [styles.text_bold]: weight === 'bold',
    [styles.text_light]: weight === 'light',
    [styles.text_normal]: weight === 'normal',
    [styles.text_regular]: weight === 'regular',
  });

  return <TextComponent className={classes} {...otherProps} />;
};
