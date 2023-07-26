import '@/shared/styles/styles.scss';
import '@/shared/styles/theme.scss';
import { I18nProvider, RouterProvider } from '@/providers';
import { WideContainer } from '@/shared/ui-kit';

export const App = () => {
  return (
    <WideContainer>
      <I18nProvider>
        <RouterProvider />
      </I18nProvider>
    </WideContainer>
  );
};
