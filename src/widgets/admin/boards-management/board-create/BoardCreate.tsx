import { useTranslation } from 'react-i18next';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import styles from './BoardCreate.module.scss';
import { CreateBoard } from '@/enitities/admin';
import { Modal, CloseIcon, Text, Button, FloatingTextArea } from '@/shared/ui-kit';
import { type CreateBoardSchema, createBoardSchema } from './scheme';

type BoardCreateProps = {
  isOpen: boolean;
  onCancel: () => void;
  onCreate: (data: CreateBoard) => void;
};

export const BoardCreate = (props: BoardCreateProps) => {
  const { isOpen, onCancel, onCreate } = props;
  const { t } = useTranslation();
  const { handleSubmit, register, formState } = useForm<CreateBoardSchema>({
    resolver: zodResolver(createBoardSchema),
  });
  const { errors, isSubmitting } = formState;
  const { title } = errors;

  const onSubmit: SubmitHandler<CreateBoardSchema> = (data) => onCreate(data);

  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.boardCreate}>
        <div className={styles.boardCreate__closeIcon} onClick={onCancel}>
          <CloseIcon />
        </div>

        <div className={styles.boardCreate__body}>
          <div className={styles.boardCreate__message}>
            <Text size='md' tag='p'>
              {t('widgetsManagement.addWidgetModal.message')}
            </Text>
          </div>
          <FloatingTextArea
            {...register('title')}
            label={t('widgetsManagement.addWidgetModal.placeholders.title')}
            errorMessage={title?.message}
          />
        </div>
        <Button disabled={isSubmitting} as='secondary' className={styles.boardCreate__button}>
          {t('widgetsManagement.buttons.addWidget')}
        </Button>
      </form>
    </Modal>
  );
};
