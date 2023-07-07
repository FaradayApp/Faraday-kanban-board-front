import TmpAavatar1 from '@/shared/assets/tmp_avatar1.png';
import TmpAavatar2 from '@/shared/assets/tmp_avatar2.png';
import TmpAavatar3 from '@/shared/assets/tmp_avatar3.png';
import { User } from '../../../stores/Users';


export const mockUsers: Record<string, User> = {
  '1': {
    id: '1',
    name: 'Арина Петрова',
    avatar: TmpAavatar1,
  },
  '2': {
    id: '2',
    name: 'Борис Васильев',
    avatar: TmpAavatar2,
  },
  '3': {
    id: '3',
    name: 'Виктория Кременская',
    avatar: TmpAavatar3,
  },
  '4': {
    id: '4',
    name: 'firstname lastname',
    avatar: '',
  },
}
