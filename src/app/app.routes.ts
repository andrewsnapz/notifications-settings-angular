import { Routes } from '@angular/router';

import { NotificationSettingsComponent } from './components/pages/notification-settings/notification-settings.component';

export const routes: Routes = [
  {
    path: '',
    component: NotificationSettingsComponent,
    title: 'Notification Settings',
  },
];
