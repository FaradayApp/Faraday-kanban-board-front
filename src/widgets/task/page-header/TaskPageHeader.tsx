import styles from './TaskPageHeader.module.scss';
import { ArrowIcon, Heading } from '@/shared/ui-kit';

type TaskPageHeaderProps = {
  title?: string;
};

export const TaskPageHeader = ({ title }: TaskPageHeaderProps) => {
  return (
    <div className={styles.container}>
      <ArrowIcon />
      <Heading size='lg' children={title} />
    </div>
  );
};
