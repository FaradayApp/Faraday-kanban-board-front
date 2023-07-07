import { useTranslation } from 'react-i18next';

import styles from './WidgetNew.module.scss';
import { Modal, TextArea, CloseIcon, Text } from '@/shared/ui-kit';

type WidgetNewProps = {
  isOpen: boolean;
  onCancel: () => void;
  onAddWidget: (link: string) => void;
};

export const WidgetNew = (props: WidgetNewProps) => {
  const { isOpen, onCancel } = props;
  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <div className={styles.widgetNew}>
        <div className={styles.widgetNew__closeIcon} onClick={onCancel}>
          <CloseIcon />
        </div>

        <div className={styles.widgetNew__message}>
          <Text size='md' tag='p'>
            {t('widgetsManagement.addWidgetModal.message')}
          </Text>
        </div>
        <TextArea placeholder={t('widgetsManagement.addWidgetModal.placeholders.link')} />
      </div>
    </Modal>
  );
};
