import styles from './TaskEditableComment.module.scss';
import { type TaskComment, TaskCommentCard, TaskCommentEditCard } from '@/enitities/task';
import { CheckIcon, CloseIcon, EditIcon, TrashIcon } from '@/shared/ui-kit';
import { useState } from 'react';

type TaskEditableCommentProps = {
  comment: TaskComment;
  withControls?: boolean;
  deleteComment: (commentId: number) => void;
};

export const TaskEditableComment = (props: TaskEditableCommentProps) => {
  const { comment, deleteComment } = props;
  const [mode, setMode] = useState<'preview' | 'edit'>('preview');

  return mode === 'preview' ? (
    <TaskCommentCard
      comment={comment}
      controls={
        <>
          <EditIcon onClick={() => setMode('edit')} />
          <TrashIcon onClick={() => deleteComment(comment.id)} />
        </>
      }
    />
  ) : (
    <TaskCommentEditCard
      key={comment.id}
      user={comment.user}
      message={comment.text}
      maxLength={600}
      onChange={() => ({})}
      controls={
        <>
          <CheckIcon className={styles.taskEditableComment__saveButton} />
          <CloseIcon onClick={() => setMode('preview')} />
        </>
      }
    />
  );
};
