import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs';

import {
  type NotificationType,
  type NotificationSettings,
} from '../types/notification.model';

/*
  what the form is supposed to do:
  - show what options the user currently as selected
  - batch selection, if the user selects new changes, enable a button that updates backend with new changes.
*/

@Injectable({ providedIn: 'root' })
export class NotificationSettingsService {
  private httpClient = inject(HttpClient);
  private notificationTypes = signal<NotificationType[]>([]);
  private notificationSettings = signal<NotificationSettings>({
    comments: [],
    ['feature-updates']: [],
    ['friends-requests']: [],
    ['marketing-and-promotional-content']: [],
    ['updates-from-friends']: [],
  });

  loadedNotificationTypes = this.notificationTypes.asReadonly();
  loadedNotificationSettings = this.notificationSettings.asReadonly();

  private fetchNotificationSettings(url: string) {
    return this.httpClient.get(url);
  }

  loadNotificationSettings() {
    return this.fetchNotificationSettings(
      'http://localhost:4200/api/notification-settings',
    ).pipe(
      map((response: any) => {
        return response['notification-settings'];
      }),
      tap({
        next: (response) => {
          this.notificationTypes.set(response['types']);
          this.notificationSettings.set(response['settings']);
        },
      }),
    );
  }
}
