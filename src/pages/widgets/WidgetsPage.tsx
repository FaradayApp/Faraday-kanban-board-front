import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import styles from './WidgetsPage.module.scss';
import { widgetsStore } from '@/stores';
import { Button, PageContainer } from '@/shared/ui-kit';
import {
  WidgetsPageHeader,
  WidgetCard,
  WidgetDelete,
  WidgetNew,
} from '@/widgets/widgets-management';

export const WidgetsPage = observer(() => {
  const { t } = useTranslation();

  return (
    <PageContainer header={<WidgetsPageHeader />}>
      <div className={styles.addWidget}>
        <Button as='secondary' onClick={() => widgetsStore.openNewWidgetModal()}>
          {t('widgetsManagement.buttons.addWidget')}
        </Button>
      </div>

      <div className={styles.widgetsList}>
        {widgetsStore.widgetsList.map((widget) => (
          <WidgetCard
            {...widget}
            key={widget.link}
            select={() => widgetsStore.setWidgetForDelete(widget.id)}
          />
        ))}
      </div>

      <WidgetDelete
        isOpen={!!widgetsStore?.widgetForDelete?.id}
        onApprove={() => widgetsStore.deleteWidget()}
        onCancel={() => widgetsStore.cancelDelete()}
      />

      <WidgetNew
        isOpen={widgetsStore.isNewWidgetModalOpen}
        onCancel={() => widgetsStore.closeNewWidgetModal()}
        onAddWidget={(link) => widgetsStore.addNewWidget(link)}
      />
    </PageContainer>
  );
});
