import { useNavigate } from 'react-router-dom';
import styles from './TaskPageHeader.module.scss';
import { ArrowIcon, Heading } from '@/shared/ui-kit';

type TaskPageHeaderProps = {
  title?: string;
};

export const TaskPageHeader = ({ title }: TaskPageHeaderProps) => {
  const navigate = useNavigate();

  const goToBoardPage = () => {
    navigate('/board');
  };

  return (
    <div className={styles.container}>
      <ArrowIcon onClick={goToBoardPage} />
      <Heading size='lg' children={title} />
    </div>
  );
};
