import { IconProps } from './types';

export const SearchIcon = (props: IconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={20}
    height={20}
    fill='none'
    viewBox='0 0 24 24'
    {...props}>
    <path
      stroke='#000'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='m15 15 6 6m-11-4a7 7 0 1 1 0-14 7 7 0 0 1 0 14Z'
    />
  </svg>
);
