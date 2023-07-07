import clsx from 'clsx';
import { useMemo } from 'react';
import { Listbox } from '@headlessui/react';

import styles from './FloatingSelect.module.scss';
import { SelectArrow, Text } from '@/shared/ui-kit';

export type SelectOption = {
  label: string;
  value: string;
};

type OptionValue = SelectOption['value'];

type FloatingSelectProps<T> = {
  label: string;
  value: OptionValue | null;
  options: T[];
  onChange: (option: OptionValue | null) => void;
};

export const FloatingSelect = <T extends SelectOption>(props: FloatingSelectProps<T>) => {
  const { label, options, value, onChange } = props;

  const buttonClasses = clsx(styles.select__button, {
    [styles.select__button_filled]: !!value,
  });

  const selectedOption = useMemo(() => {
    return options.find((option) => option.value === value) || null;
  }, [options, value]);

  return (
    <Listbox as='div' value={value} onChange={onChange} className={styles.select}>
      <Listbox.Button className={buttonClasses}>
        {({ open }) => (
          <>
            <label className={styles.select__label}>{label}</label>
            <Text tag='span' size='md' className={styles.select__selectedOption}>
              {selectedOption?.label}
            </Text>
            <div
              className={clsx(styles.select__arrow, {
                [styles.select__arrow_open]: open,
              })}>
              <SelectArrow />
            </div>
          </>
        )}
      </Listbox.Button>

      <Listbox.Options as='div' className={styles.select__options}>
        {options.map((option) => (
          <Listbox.Option
            as='p'
            value={option.value}
            key={option.value}
            className={clsx(styles.select__option, {
              [styles.select__option_active]: option.value === value,
            })}>
            {option.label}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
};
