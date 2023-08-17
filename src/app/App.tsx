import '@/shared/styles/styles.scss';
import '@/shared/styles/theme.scss';
import 'react-toastify/dist/ReactToastify.css';
import { I18nProvider, RouterProvider } from '@/providers';
import { WideContainer } from '@/shared/ui-kit';
import { ToastContainer } from 'react-toastify';

export const App = () => {
  return (
    <WideContainer>
      <I18nProvider>
        <RouterProvider />
        <ToastContainer />
      </I18nProvider>
    </WideContainer>
  );
};
