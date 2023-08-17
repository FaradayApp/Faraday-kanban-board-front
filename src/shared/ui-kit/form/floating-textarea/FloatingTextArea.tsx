import { InputHTMLAttributes, PropsWithChildren, forwardRef, useId, useState } from 'react';
import clsx from 'clsx';
import TextareaAutosize from 'react-textarea-autosize';

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

    const classes = clsx(className, styles.floatingTextArea, {
      [styles.floatingTextArea_invalid]: isInvalid || errorMessage,
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

export const FloatingTextAreaAuto = forwardRef<HTMLTextAreaElement, FloatingTextAreaProps>(
  (props, ref) => {
    const id = useId();
    const [height, setHeight] = useState(54);
    const { label, className, isInvalid, errorMessage, value, onChange } = props;

    const classes = clsx(className, styles.floatingTextAreaAuto, {
      [styles.floatingTextAreaAuto_invalid]: isInvalid || errorMessage,
    });

    return (
      <div className={classes} style={{ height: height + 32 }}>
        <TextareaAutosize
          id={id}
          ref={ref}
          onHeightChange={setHeight}
          aria-invalid={!!errorMessage || isInvalid}
          aria-errormessage={errorMessage}
          className={styles.textarea}
          placeholder={label}
          rows={1}
          value={value}
          onChange={onChange}
        />
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      </div>
    );
  }
);
