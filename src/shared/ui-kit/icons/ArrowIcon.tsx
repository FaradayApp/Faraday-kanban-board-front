import { IconProps } from './types';

export const ArrowIcon = (props: IconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={24}
    height={24}
    cursor='pointer'
    fill='none'
    {...props}>
    <path fill='#1C1B1F' d='M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2Z' />
  </svg>
);
