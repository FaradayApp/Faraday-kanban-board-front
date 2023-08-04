import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './PageHeader.module.scss';
import { ArrowIcon, Heading } from '@/shared/ui-kit';

type PageHeaderProps = {
  title?: string;
  options?: ReactNode;
  controls?: ReactNode;
  navigationFn?: () => void;
};

export const PageHeader = (props: PageHeaderProps) => {
  const { title, options, controls, navigationFn } = props;
  const navigate = useNavigate();

  const goToBoardPage = () => {
    navigationFn ? navigationFn() : navigate(-1);
  };

  return (
    <div className={styles.pageHeader}>
      <ArrowIcon onClick={goToBoardPage} />
      <Heading size='lg' children={title} />
      {options}
      <div className={styles.pageHeader__controls}>{controls}</div>
    </div>
  );
};
