import clsx from 'clsx';
import { HTMLAttributes, PropsWithChildren } from 'react';
import styles from './Heading.module.scss';

type HeadingProps = HTMLAttributes<HTMLHeadingElement> &
  PropsWithChildren<{
    tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
    size?: 'xl' | 'lg' | 'md' | 'sm' | 'xsm';
    weight?: 'bold' | 'light' | 'normal' | 'regular';
  }>;

export const Heading = (props: HeadingProps) => {
  const { tag = 'h1', size = 'lg', weight = 'normal', className, ...otherProps } = props;
  const Component = tag;

  const classes = clsx(className, styles.heading, {
    [styles.heading_xl]: size === 'xl',
    [styles.heading_lg]: size === 'lg',
    [styles.heading_md]: size === 'md',
    [styles.heading_sm]: size === 'sm',
    [styles.heading_xsm]: size === 'xsm',
    [styles.heading_bold]: weight === 'bold',
    [styles.heading_light]: weight === 'light',
    [styles.heading_normal]: weight === 'normal',
    [styles.heading_regular]: weight === 'regular',
  });

  return <Component className={classes} {...otherProps} />;
};
