import { InputHTMLAttributes, PropsWithChildren, forwardRef, useId } from 'react';
import clsx from 'clsx';

import styles from './FloatingTextArea.module.scss';

export type FloatingTextAreaProps = Omit<InputHTMLAttributes<HTMLTextAreaElement>, 'placeholder'> &
  PropsWithChildren<{
    label: string;
    isInvalid?: boolean;
    errorMessage?: string;
  }>;

export const FloatingTextArea = forwardRef<HTMLTextAreaElement, FloatingTextAreaProps>(
  (props, ref) => {
    const id = useId();
    const { label, className, isInvalid, errorMessage, ...textareaProps } = props;

    const classes = clsx(className, styles.floatingTeaxArea, {
      [styles.floatingTeaxArea_invalid]: isInvalid || errorMessage,
    });

    return (
      <div className={classes}>
        <textarea
          id={id}
          ref={ref}
          aria-invalid={!!errorMessage || isInvalid}
          aria-errormessage={errorMessage}
          className={styles.textarea}
          placeholder={label}
          {...textareaProps}
        />
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      </div>
    );
  }
);
