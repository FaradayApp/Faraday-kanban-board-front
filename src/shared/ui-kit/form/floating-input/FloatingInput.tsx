import { InputHTMLAttributes, PropsWithChildren, ReactNode, forwardRef, useId } from 'react';
import clsx from 'clsx';

import styles from './FloatingInput.module.scss';

export type FloatingInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'placeholder'> &
  PropsWithChildren<{
    label: string;
    type?: 'text' | 'password';
    controls?: ReactNode;
    isInvalid?: boolean;
    errorMessage?: string;
  }>;

export const FloatingInput = forwardRef<HTMLInputElement, FloatingInputProps>((props, ref) => {
  const id = useId();
  const { label, controls, className, isInvalid, errorMessage, ...otherProps } = props;

  const containerClasses = clsx(className, styles.floatingInput, {
    [styles.floatingInput_invalid]: isInvalid,
  });

  return (
    <div className={containerClasses}>
      <input
        id={id}
        ref={ref}
        placeholder={label}
        className={styles.floatingInput__input}
        aria-invalid={isInvalid}
        aria-errormessage={errorMessage}
        {...otherProps}
      />
      <label htmlFor={id} className={styles.floatingInput__label}>
        {label}
      </label>
      {controls && <div className={styles.floatingInput__controls}>{controls}</div>}
    </div>
  );
});
