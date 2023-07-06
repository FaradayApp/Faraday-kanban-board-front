import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';

import styles from './UsersMultiselect.module.scss';
import { UserShortCard } from '..';
import { SearchIcon, FloatingInput, CloseIcon } from '@/shared/ui-kit';

type UserInfo = {
  id: string;
  name: string;
  avatar?: string;
};

type UsersMultiselectProps = {
  selectedUsers: UserInfo[];
  foundedUsers: UserInfo[];
  searchValue: string;

  onChange: (search: string) => void;
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
};

export const UsersMultiselect = observer((props: UsersMultiselectProps) => {
  const { t } = useTranslation();
  const { selectedUsers, foundedUsers, searchValue, onChange, onSelect, onRemove } = props;

  const showFoundedUsers = foundedUsers.length > 0 && searchValue;

  return (
    <div className={styles.usersMultiselect}>
      {showFoundedUsers && (
        <div className={styles.usersMultiselect__foundUsersList}>
          {foundedUsers.map((user) => (
            <div key={user.id} onClick={() => onSelect(user.id)}>
              <UserShortCard name={user.name} />
            </div>
          ))}
        </div>
      )}

      <FloatingInput
        value={searchValue}
        onChange={(event) => onChange(event.target.value)}
        label={t('taskEdit.labels.workers')}
        controls={<SearchIcon />}
      />

      <div className={styles.usersMultiselect__selectedList}>
        {selectedUsers.map((user) => (
          <UserShortCard
            key={user.id}
            name={user.name}
            controls={<CloseIcon onClick={() => onRemove(user.id)} />}
          />
        ))}
      </div>
    </div>
  );
});
