import clsx from 'clsx';
import { Listbox } from '@headlessui/react';

import styles from './FloatingSelect.module.scss';
import { SelectArrow, Text } from '@/shared/ui-kit';

export type SelectOption = {
  label: string;
  value: string;
};

type FloatingSelectProps = {
  label: string;
  value: SelectOption | null;
  options: SelectOption[];
  onChange: (option: SelectOption | null) => void;
};

export const FloatingSelect = (props: FloatingSelectProps) => {
  const { label, options, value, onChange } = props;

  const buttonClasses = clsx(styles.select__button, {
    [styles.select__button_filled]: !!value,
  });

  return (
    <Listbox as='div' value={value} onChange={onChange} className={styles.select}>
      <Listbox.Button className={buttonClasses}>
        {({ open }) => (
          <>
            <label className={styles.select__label}>{label}</label>
            <Text tag='span' size='md' className={styles.select__selectedOption}>
              {value?.label}
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
            value={option}
            key={option.value}
            className={({ selected }) =>
              clsx(styles.select__option, {
                [styles.select__option_active]: selected,
              })
            }>
            {option.label}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
};
