import { forwardRef, useState } from 'react';
import { FloatingInput, FloatingInputProps } from '../floating-input/FloatingInput';
import { EyeIcon } from '../..';

export const FloatingPasswordInput = forwardRef<HTMLInputElement, Omit<FloatingInputProps, 'type'>>(
  (props, ref) => {
    const [visible, toggleVisibility] = useState(false);

    return (
      <FloatingInput
        ref={ref}
        type={visible ? 'text' : 'password'}
        controls={<EyeIcon onClick={() => toggleVisibility((visible) => !visible)} />}
        {...props}
      />
    );
  }
);
