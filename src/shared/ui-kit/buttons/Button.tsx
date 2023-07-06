import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import styles from './Button.module.scss';
import clsx from 'clsx';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & PropsWithChildren<{
  as?: 'primary' | 'secondary';
}>;

export const Button = (props: ButtonProps) => {
  const { className, as = 'primary', ...otherProps } = props;

  const buttonClasses = clsx(className, styles.button, {
    [styles.button_primary]: as === 'primary',
    [styles.button_secondary]: as === 'secondary',
  });

  return <button className={buttonClasses} {...otherProps} />;
};
