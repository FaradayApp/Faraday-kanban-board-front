import { useTranslation } from 'react-i18next';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PropsWithChildren, useState } from 'react';

import styles from './BoardEdit.module.scss';
import { Board, ChangeBoard } from '@/enitities/admin';
import { Modal, CloseIcon, Text, Button, FloatingTextAreaAuto } from '@/shared/ui-kit';
import { type ChangeBoardSchema, changeBoardSchema } from './scheme';

type BoardEditProps = PropsWithChildren<{
  board: Board;
  onEdit: (data: ChangeBoard) => Promise<unknown>;
}>;

export const BoardEdit = (props: BoardEditProps) => {
  const [isOpen, open] = useState(false);
  const { board, onEdit, children } = props;
  const { t } = useTranslation();
  const { handleSubmit, control, formState } = useForm<ChangeBoardSchema>({
    resolver: zodResolver(changeBoardSchema),
  });
  const { errors, isSubmitting } = formState;
  const { title } = errors;

  const onSubmit: SubmitHandler<ChangeBoardSchema> = async (data) => {
    await onEdit({ ...data, boardId: board.id });
    open(false);
  };

  return (
    <>
      <div className={styles.boardEdit__icon} onClick={() => open(true)}>{children}</div>

      <Modal isOpen={isOpen} onClose={() => open(false)}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.boardEdit}>
          <div className={styles.boardEdit__closeIcon} onClick={() => open(false)}>
            <CloseIcon />
          </div>

          <div className={styles.boardEdit__body}>
            <div className={styles.boardEdit__message}>
              <Text size='md' tag='p'>
                {t('widgetsManagement.editModal.title')}
              </Text>
            </div>

            <Controller
              name='title'
              control={control}
              defaultValue={board.title}
              render={({ field }) => (
                <FloatingTextAreaAuto
                  value={field.value}
                  onChange={(event) => field.onChange(event.target.value)}
                  label={t('widgetsManagement.editModal.placeholders.note')}
                  errorMessage={title?.message}
                />
              )}
            />
          </div>
          <Button disabled={isSubmitting} as='secondary' className={styles.boardEdit__button}>
            {t('widgetsManagement.editModal.buttons.submit')}
          </Button>
        </form>
      </Modal>
    </>
  );
};
