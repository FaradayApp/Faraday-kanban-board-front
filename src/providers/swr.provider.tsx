import { PropsWithChildren } from 'react';
import { SWRConfig } from 'swr';

const options = {
  revalidateOnFocus: false,
};

export const SwrProvider = (props: PropsWithChildren) => {
  return <SWRConfig value={options} {...props} />;
};
