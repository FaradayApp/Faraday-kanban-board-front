import { ChangeEvent, ChangeEventHandler, forwardRef, useState } from 'react';
import clsx from 'clsx';

import styles from './withSymbolsCounter.module.scss';
import { Text } from '@/shared/ui-kit';

type WrapperProps = {
  value?: string;
  defaultValue?: string;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  maxSymbols: number;
};

export function withSymbolsCounter<T>(Component: React.JSXElementConstructor<T>) {
  return forwardRef((props: Pick<T, keyof T> & WrapperProps, ref) => {
    const { maxSymbols, onChange, ...otherProps } = props;
    const [symbols, setSymbols] = useState((props.value || props.defaultValue || '').length);

    const onValueChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onChange?.(event);
      setSymbols(event.target.value.length);
    };

    const isInvalid = symbols > maxSymbols;

    const counterClasses = clsx(styles.container__counter, {
      [styles.container__counter_warning]: isInvalid,
    });

    const componentProps = { ...otherProps, isInvalid } as Pick<T, keyof T>;

    return (
      <div className={styles.container}>
        <Component ref={ref} {...componentProps} onChange={onValueChange} />
        {props.maxSymbols && (
          <Text tag='span' size='xsm' className={counterClasses}>
            {`${symbols}/${props.maxSymbols}`}
          </Text>
        )}
      </div>
    );
  });
}
