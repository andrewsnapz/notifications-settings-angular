import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

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
    ['featureUpdates']: [],
    ['friendsRequests']: [],
    ['marketingAndPromotionalContent']: [],
    ['updatesFromFriends']: [],
  });

  loadedNotificationTypes = this.notificationTypes.asReadonly();
  loadedNotificationSettings = this.notificationSettings.asReadonly();

  private fetchNotificationSettings(url: string) {
    return this.httpClient.get(url);
  }

  private updateNotificationSettings(url: string, body: any) {
    return this.httpClient.put(url, body);
  }

  loadNotificationSettings() {
    return this.fetchNotificationSettings(
      'http://localhost:4200/api/notification-settings',
    ).pipe(
      tap({
        next: (response: any) => {
          this.notificationTypes.set(response['types']);
          this.notificationSettings.set(response['settings']);
        },
      }),
    );
  }

  putUpdatedNotificationSettings(body: any) {
    const reformattedUpdatedForm = { ...this.notificationSettings() };
    reformattedUpdatedForm['comments'] = reformattedUpdatedForm['comments'].map(
      (setting) => {
        const type = setting.type.toLowerCase();
        return { ...setting, isActive: body['comments'][type] };
      },
    );
    reformattedUpdatedForm['featureUpdates'] = reformattedUpdatedForm[
      'featureUpdates'
    ].map((setting) => {
      const type = setting.type.toLowerCase();
      return { ...setting, isActive: body['featureUpdates'][type] };
    });
    reformattedUpdatedForm['friendsRequests'] = reformattedUpdatedForm[
      'friendsRequests'
    ].map((setting) => {
      const type = setting.type.toLowerCase();
      return { ...setting, isActive: body['friendsRequests'][type] };
    });

    reformattedUpdatedForm['marketingAndPromotionalContent'] =
      reformattedUpdatedForm['marketingAndPromotionalContent'].map(
        (setting) => {
          const type = setting.type.toLowerCase();
          return {
            ...setting,
            isActive: body['marketingAndPromotionalContent'][type],
          };
        },
      );

    reformattedUpdatedForm['updatesFromFriends'] = reformattedUpdatedForm[
      'updatesFromFriends'
    ].map((setting) => {
      const type = setting.type.toLowerCase();
      return { ...setting, isActive: body['updatesFromFriends'][type] };
    });

    return this.updateNotificationSettings(
      'http://localhost:4200/api/notification-settings',
      reformattedUpdatedForm,
    );
  }
}
