import '@/shared/styles/styles.scss';
import '@/shared/styles/theme.scss';
import { I18n, Router } from '@/providers';
import { WideContainer } from '@/shared/ui-kit';

export const App = () => {
  return (
    <WideContainer>
      <I18n>
        <Router />
      </I18n>
    </WideContainer>
  );
};
