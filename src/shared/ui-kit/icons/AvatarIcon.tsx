import { IconProps } from './types';

export const AvatarIcon = (props: IconProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={22} height={22} viewBox='0 0 22 22' fill='none' {...props}>
    <circle cx={11} cy={11} r={10.5} fill='#F1F1F1' stroke='#fff' />
    <path
      fill='#C3C2C9'
      d='M15.87 15.313a.366.366 0 0 1-.323.187H6.453a.366.366 0 0 1-.323-.188.361.361 0 0 1 0-.374 5.658 5.658 0 0 1 3.145-2.541 3.375 3.375 0 1 1 3.45 0 5.658 5.658 0 0 1 3.145 2.54.361.361 0 0 1 0 .376Z'
    />
  </svg>
);
