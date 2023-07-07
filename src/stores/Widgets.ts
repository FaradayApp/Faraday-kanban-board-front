import { makeAutoObservable } from 'mobx';

import { getWidgets } from '@/shared/api';

type WidgetId = string;

type Widget = {
  id: WidgetId;
  title: string;
  note: string;
  link: string;
};

class WidgetsStore {
  widgets: Record<WidgetId, Widget> = {};
  widgetForDelete: Widget | null = null;
  isNewWidgetModalOpen = false;

  constructor() {
    makeAutoObservable(this);
    this.load();
  }

  get widgetsList() {
    return Object.values(this.widgets);
  }

  async load() {
    const widgets = await getWidgets();
    this.widgets = widgets;
  }

  setWidgetForDelete(id: WidgetId) {
    this.widgetForDelete = this.widgets[id] ?? null;
  }

  cancelDelete() {
    this.widgetForDelete = null;
  }

  deleteWidget() {
    if (this.widgetForDelete?.id) {
      delete this.widgets[this.widgetForDelete?.id];
      this.widgetForDelete = null;
    }
  }

  openNewWidgetModal() {
    this.isNewWidgetModalOpen = true;
  }

  closeNewWidgetModal() {
    this.isNewWidgetModalOpen = false;
  }

  addNewWidget(link: string) {
    console.log(link);
  }
}

export const widgetsStore = new WidgetsStore();
