import { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { EditIcon, PageContainer } from '@/shared/ui-kit';
import { profileStore, boardStore, taskInfoStore } from '@/stores';
import {
  type EditTaskInfo,
  editTaskInfo,
  deleteTaskComment,
  editTaskComment,
} from '@/features/tasks';
import { TaskInfoForm, TaskPageHeader } from '@/widgets/task';

export const TaskInfoPage = observer(() => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const editTask = useCallback(
    async (data: EditTaskInfo) => {
      if (id) {
        const taskId = Number.parseInt(id);
        const newData = { ...taskInfoStore.taskInfo.data, ...data };
        await editTaskInfo(boardStore, taskInfoStore, taskId)(newData);
      }
    },
    [id]
  );

  const deleteComment = useCallback(async (commentId: CommentId) => {
    return deleteTaskComment(boardStore, taskInfoStore)(commentId);
  }, []);

  const editComment = useCallback(async (commentId: CommentId, message: string) => {
    return editTaskComment(boardStore, taskInfoStore)(commentId, message);
  }, []);

  const openEditTaskPage = () => {
    navigate('edit');
  };

  const data = taskInfoStore.taskInfo.data || null;

  return (
    <PageContainer
      header={
        <TaskPageHeader title={t('task.title')} options={<EditIcon onClick={openEditTaskPage} />} />
      }>
      {data && (
        <TaskInfoForm
          me={profileStore.profile.data}
          task={data}
          editTask={editTask}
          deleteComment={deleteComment}
          editComment={editComment}
        />
      )}
    </PageContainer>
  );
});
