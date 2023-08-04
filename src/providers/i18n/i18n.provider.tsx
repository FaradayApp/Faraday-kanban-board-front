import { PropsWithChildren } from 'react';
import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { I18nextProvider, initReactI18next } from 'react-i18next';

i18n.use(Backend).use(initReactI18next).init({
  lng: 'ru',
  fallbackLng: 'ru',
});

export const I18nProvider = (props: PropsWithChildren) => (
  <I18nextProvider i18n={i18n} defaultNS={'translation'} {...props} />
);
