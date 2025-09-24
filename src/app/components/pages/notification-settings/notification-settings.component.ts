import { Component, signal, inject, OnInit, DestroyRef } from '@angular/core';

import { BackendErrorComponent } from '../../shared/error/backend-error/backend-error.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { NotificationSettingsService } from '../../../services/notification-settings.service';
import { ToggleComponent } from '../../shared/toggle/toggle.component';

@Component({
  selector: 'app-notification-settings',
  imports: [BackendErrorComponent, ButtonComponent, ToggleComponent],
  templateUrl: './notification-settings.component.html',
  styleUrl: './notification-settings.component.scss',
})
export class NotificationSettingsComponent implements OnInit {
  private notificationSettingsService = inject(NotificationSettingsService);
  private destroyRef = inject(DestroyRef);

  loadingStatus = signal<'loading' | 'error' | 'success'>('loading');

  loadedNotificationTypes =
    this.notificationSettingsService.loadedNotificationTypes;

  loadedNotificationSettings =
    this.notificationSettingsService.loadedNotificationSettings;

  ngOnInit() {
    this.loadingStatus.set('loading');

    const subscription = this.notificationSettingsService
      .loadNotificationSettings()
      .subscribe({
        error: () => this.loadingStatus.set('error'),
        complete: () => this.loadingStatus.set('success'),
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
