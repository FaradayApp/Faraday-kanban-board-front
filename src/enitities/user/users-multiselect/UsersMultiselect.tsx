import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';

import styles from './UsersMultiselect.module.scss';
import { UsersMultiselectStore } from './UsersMultiselectStore';
import { UserShortCard } from '@/enitities/user';
import { SearchIcon, FloatingInput, CloseIcon } from '@/shared/ui-kit';

type UsersMultiselectProps = {
  selectedUsers: UserId[];
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
};

export const UsersMultiselect = observer((props: UsersMultiselectProps) => {
  const { t } = useTranslation();
  const [searchStore] = useState(() => new UsersMultiselectStore());
  const { selectedUsers, onSelect, onRemove } = props;

  const showFoundedUsers = searchStore.foundedUsers.length > 0 && searchStore.search;

  return (
    <div className={styles.usersMultiselect}>
      {showFoundedUsers && (
        <div className={styles.usersMultiselect__foundUsersList}>
          {searchStore.foundedUsers.map((id) => (
            <div key={id} onClick={() => onSelect(id)}>
              <UserShortCard userId={id} />
            </div>
          ))}
        </div>
      )}

      <FloatingInput
        value={searchStore.search}
        onChange={(event) => searchStore.searchUsers(event.target.value)}
        label={t('taskEdit.labels.workers')}
        controls={<SearchIcon />}
      />

      <div className={styles.usersMultiselect__selectedList}>
        {selectedUsers.map((id) => (
          <UserShortCard
            key={id}
            userId={id}
            controls={<CloseIcon onClick={() => onRemove(id)} />}
          />
        ))}
      </div>
    </div>
  );
});
