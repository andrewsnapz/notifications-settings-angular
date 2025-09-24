import { Component, signal, inject, OnInit, DestroyRef } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { BackendErrorComponent } from '../../shared/error/backend-error/backend-error.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { NotificationSettingsService } from '../../../services/notification-settings.service';
import { ToggleComponent } from '../../shared/toggle/toggle.component';

@Component({
  selector: 'app-notification-settings',
  imports: [
    BackendErrorComponent,
    ButtonComponent,
    ToggleComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './notification-settings.component.html',
  styleUrl: './notification-settings.component.scss',
})
export class NotificationSettingsComponent implements OnInit {
  private notificationSettingsService = inject(NotificationSettingsService);
  private destroyRef = inject(DestroyRef);

  loadingStatus = signal<'loading' | 'error' | 'success'>('loading');

  // on ngOnInit, will set these values based on 'api' call
  notificationSettingsForm = new FormGroup({
    marketingAndPromotionalContent: new FormGroup({
      push: new FormControl(false),
      email: new FormControl(false),
      sms: new FormControl(false),
    }),
    featureUpdates: new FormGroup({
      push: new FormControl(false),
      email: new FormControl(false),
      sms: new FormControl(false),
    }),
    comments: new FormGroup({
      push: new FormControl(false),
      email: new FormControl(false),
      sms: new FormControl(false),
    }),
    updatesFromFriends: new FormGroup({
      push: new FormControl(false),
      email: new FormControl(false),
      sms: new FormControl(false),
    }),
    friendsRequests: new FormGroup({
      push: new FormControl(false),
      email: new FormControl(false),
      sms: new FormControl(false),
    }),
  });

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

  updateSettings() {
    this.notificationSettingsForm
      .get('marketingAndPromotionalContent')
      ?.get('push')
      ?.setValue(false);

    console.log(this.notificationSettingsForm);
  }

  onSubmit() {}
}
