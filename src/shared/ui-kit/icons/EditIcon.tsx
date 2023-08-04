import { IconProps } from './types';

export const EditIcon = (props: IconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={18}
    height={18}
    fill='none'
    cursor='pointer'
    {...props}>
    <path
      fill='#1C1C1E'
      d='M11.907 2.537a2.515 2.515 0 0 1 3.557 3.555L15 6.556 11.444 3l.463-.463Zm-1.19 1.19-7.704 7.705c-.26.26-.439.588-.516.947l-.685 3.199a.514.514 0 0 0 .61.61l3.2-.685c.358-.077.687-.256.946-.515l7.705-7.704-3.557-3.556Z'
    />
  </svg>
);
