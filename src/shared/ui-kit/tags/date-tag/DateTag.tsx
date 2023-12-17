import styles from './DateTag.module.scss';
import { Text } from '@/shared/ui-kit/typography';
import { ClockIcon } from '@/shared/ui-kit/icons';

type DateTagProps = {
  date: string;
};

export const DateTag = ({ date }: DateTagProps) => {
  return (
    <div className={styles.dateTag}>
      <ClockIcon />
      <Text tag='span' size='xsm'>
        {date}
      </Text>
    </div>
  );
};
