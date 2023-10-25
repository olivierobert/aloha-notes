import { React } from 'react';

export const handleClickTab = (event: React.MouseEvent<HTMLDivElement>) => {
  const container = event.currentTarget.closest('.note-editor__tab')
  const target = event.target as HTMLButtonElement;
  const pane = target.dataset.target;

  if (pane) {
    const activeTab = container?.querySelector('.note-editor__tab-item.active');
    const activePane = container?.querySelector('.note-editor__tab-pane.active');

    if (activeTab && activePane) {
      activeTab.classList.remove('active');
      activePane.classList.remove('active');
    }

    target.classList.add('active');
    container?.querySelector(`.note-editor__tab-pane[data-pane="${pane}"]`)?.classList.add('active');
  }
};
