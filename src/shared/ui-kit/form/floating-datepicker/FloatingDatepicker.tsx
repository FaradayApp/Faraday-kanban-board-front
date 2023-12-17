import { ChangeEvent, InputHTMLAttributes, useId, useRef } from 'react';
import clsx from 'clsx';

import styles from './FloatingDatepicker.module.scss';
import { CalendarIcon, Text } from '@/shared/ui-kit';
import dayjs, { type Dayjs } from 'dayjs';

type FloatingDetepickerProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> & {
  label: string;
  value: Dayjs;
  onChange: (newValue: Dayjs | undefined) => void;
  isInvalid?: boolean;
  errorMessage?: string;
};

export const FloatingDetepicker = (props: FloatingDetepickerProps) => {
  const id = useId();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { label, value, errorMessage, isInvalid, onChange, ...inputProps } = props;

  const containerClasses = clsx(styles.floatingDatepicker, {
    [styles.floatingDatepicker_invalid]: isInvalid || errorMessage,
    [styles.floatingDatepicker_unfilled]: !value,
    [styles.floatingDatepicker_filled]: !!value,
  });

  const onDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      onChange(dayjs(event.target.value));
    } else {
      onChange(undefined);
    }
  };

  const openDatePicker = () => {
    inputRef.current?.showPicker();
  };

  return (
    <label htmlFor={id} className={containerClasses} onClick={openDatePicker}>
      {value && (
        <Text tag='p' size='md' className={styles.date}>
          {value.format('DD.MM.YYYY')}
        </Text>
      )}

      <input
        type='date'
        id={id}
        ref={inputRef}
        placeholder={label}
        className={styles.datepicker}
        aria-invalid={!!errorMessage || isInvalid}
        aria-errormessage={errorMessage}
        onChange={onDateChange}
        {...inputProps}
      />

      <div className={styles.label}>{label}</div>

      <div className={styles.floatingDatepicker__icon}>
        <CalendarIcon />
      </div>
    </label>
  );
};
