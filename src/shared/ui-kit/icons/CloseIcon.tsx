import { IconProps } from './types';

export const CloseIcon = (props: IconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={12}
    height={12}
    cursor='pointer'
    fill='none'
    {...props}>
    <path stroke='#D7D9EC' strokeLinecap='round' strokeWidth={1.5} d='m1 1 10 10M11 1 1 11' />
  </svg>
);
