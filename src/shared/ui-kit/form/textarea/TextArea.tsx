import clsx from 'clsx';
import { forwardRef } from 'react';
import TextareaAutosize, { type TextareaAutosizeProps } from 'react-textarea-autosize';

import styles from './TextArea.module.scss';

export const TextArea = forwardRef<HTMLTextAreaElement, TextareaAutosizeProps>((props, ref) => {
  const { className, ...textareaProps } = props;
  const classes = clsx(className, styles.textarea);

  return <TextareaAutosize ref={ref} className={classes} {...textareaProps} />;
});
