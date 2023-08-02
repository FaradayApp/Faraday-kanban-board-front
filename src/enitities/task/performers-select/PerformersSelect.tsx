import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';

import styles from './PerformersSelect.module.scss';
import { PerformersSelectStore } from './PerformersSelectStore';
import { User, UserShortCard } from '@/enitities/user';
import { SearchIcon, FloatingInput, CloseIcon, Text } from '@/shared/ui-kit';

type PerformersSelectProps = {
  selectedUsers: User[];
  onSelect: (user: User) => void;
  onRemove: (user: User) => void;
};

export const PerformersSelect = observer((props: PerformersSelectProps) => {
  const { t } = useTranslation();
  const [searchStore] = useState(() => new PerformersSelectStore());
  const { selectedUsers, onSelect, onRemove } = props;

  const showFoundedUsers = searchStore.foundedUsers.length > 0 && searchStore.search;
  const usersToShow = searchStore.foundedUsers.filter(
    (user) => !selectedUsers.find((selectedUser) => selectedUser.id === user.id)
  );

  return (
    <div className={styles.performersSelect}>
      {showFoundedUsers && (
        <div className={styles.performersSelect__foundUsersList}>
          {usersToShow.map((user) => (
            <div key={user.id} onClick={() => onSelect(user)}>
              <UserShortCard user={user} />
            </div>
          ))}
          {usersToShow.length === 0 && <Text tag='p'>{t('task.performers.notFound')}</Text>}
        </div>
      )}

      <FloatingInput
        value={searchStore.search}
        onChange={(event) => searchStore.searchUsers(event.target.value)}
        label={t('taskEdit.labels.workers')}
        controls={<SearchIcon />}
      />

      <div className={styles.performersSelect__selectedList}>
        {selectedUsers.map((user) => (
          <UserShortCard
            key={user.id}
            user={user}
            controls={<CloseIcon onClick={() => onRemove(user)} />}
          />
        ))}
      </div>
    </div>
  );
});
