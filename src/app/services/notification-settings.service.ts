import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';

import { type NotificationSettings } from '../types/notification.model';

/*
  what the form is supposed to do:
  - show what options the user currently as selected
  - batch selection, if the user selects new changes, enable a button that updates backend with new changes.
*/

@Injectable({ providedIn: 'root' })
export class NotificationSettingsService {
  private httpClient = inject(HttpClient);
  private notificationSettings = signal<NotificationSettings>({});

  loadedNotificationSettings = this.notificationSettings.asReadonly();

  private fetchNotificationSettings(url: string) {
    return this.httpClient.get(url);
  }

  private updateNotificationSettings(url: string, body: any) {
    return this.httpClient.put(url, body);
  }

  loadNotificationSettings() {
    return this.fetchNotificationSettings(
      'https://www.greatfrontend.com/api/projects/challenges/account/notifications',
    ).pipe(
      map((response: any) => response.preferences),
      tap({
        next: (response) => {
          this.notificationSettings.set(response);
        },
      }),
    );
  }

  putUpdatedNotificationSettings(body: any) {
    return this.updateNotificationSettings(
      'https://www.greatfrontend.com/api/projects/challenges/account/notifications',
      { preferences: body },
    ).pipe(
      map((response: any) => {
        if (response?.error) {
          throw Error('Invalid notifications preferences.');
        }
        return response.preferences;
      }),
      tap({
        next: (response) => {
          this.notificationSettings.set(response);
        },
      }),
    );
  }
}
