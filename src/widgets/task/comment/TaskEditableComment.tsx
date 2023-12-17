import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';

import styles from './TaskEditableComment.module.scss';
import { type TaskComment, TaskCommentCard, TaskCommentEditCard } from '@/enitities/task';
import { CheckIcon, CloseIcon, EditIcon, Loader2, TrashIcon, DeleteConfirm } from '@/shared/ui-kit';
import { TaskCommentSchema, taskCommentSchema } from './scheme';

type TaskEditableCommentProps = {
  comment: TaskComment;
  withControls?: boolean;
  deleteComment: (commentId: CommentId) => Promise<unknown>;
  editComment: (commentId: CommentId, message: string) => Promise<unknown>;
};

export const TaskEditableComment = (props: TaskEditableCommentProps) => {
  const { comment, withControls, deleteComment, editComment } = props;
  const [mode, setMode] = useState<'preview' | 'edit'>('preview');
  const { t } = useTranslation();

  const { handleSubmit, control, formState } = useForm<TaskCommentSchema>({
    resolver: zodResolver(taskCommentSchema),
  });
  const { errors, isSubmitting } = formState;

  const onSubmit: SubmitHandler<TaskCommentSchema> = async (data) => {
    await editComment(comment.id, data.message);
    setMode('preview');
  };

  return mode === 'preview' ? (
    <TaskCommentCard
      comment={comment}
      controls={
        withControls && (
          <>
            <EditIcon onClick={() => setMode('edit')} />
            <DeleteConfirm
              title={t('taskComment.controls.delete.title')}
              approveTitle={t('taskComment.controls.delete.approve')}
              cancelTitle={t('taskComment.controls.delete.cancel')}
              onApprove={() => deleteComment(comment.id)}>
              <TrashIcon />
            </DeleteConfirm>
          </>
        )
      }
    />
  ) : (
    <Controller
      name='message'
      control={control}
      defaultValue={comment.text}
      render={({ field }) => (
        <TaskCommentEditCard
          key={comment.id}
          user={comment.user}
          message={field.value}
          maxLength={600}
          onChange={field.onChange}
          errorMessage={errors.message?.message}
          controls={
            withControls &&
            (isSubmitting ? (
              <Loader2 />
            ) : (
              <>
                <CheckIcon
                  onClick={() => handleSubmit(onSubmit)()}
                  className={styles.taskEditableComment__saveButton}
                />
                <CloseIcon onClick={() => setMode('preview')} />
              </>
            ))
          }
        />
      )}
    />
  );
};
