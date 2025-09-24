import { Component, signal, inject, OnInit, DestroyRef } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { BackendErrorComponent } from '../../shared/error/backend-error/backend-error.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { NotificationSettingsService } from '../../../services/notification-settings.service';
import { ToggleComponent } from '../../shared/toggle/toggle.component';
import { type Notification } from '../../../types/notification.model';

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
        // next: (val) => {
        //   const settings = { ...val.settings };
        //   const settingKeys = Object.keys(settings);

        //   settingKeys.forEach((key) => {
        //     settings[key] = settings[key].map(
        //       (val: Notification) => val.isActive,
        //     );
        //   });

        //   this.notificationSettingsForm = new FormGroup({
        //     marketingAndPromotionalContent: new FormGroup({
        //       push: new FormControl(
        //         settings['marketingAndPromotionalContent'].find(
        //           (val: Notification) => val.type === 'Push',
        //         ).isActive,
        //       ),
        //       email: new FormControl(
        //         settings['marketingAndPromotionalContent'].find(
        //           (val: Notification) => val.type === 'Email',
        //         ).isActive,
        //       ),
        //       sms: new FormControl(
        //         settings['marketingAndPromotionalContent'].find(
        //           (val: Notification) => val.type === 'SMS',
        //         ).isActive,
        //       ),
        //     }),
        //     featureUpdates: new FormGroup({
        //       push: new FormControl(
        //         settings['featureUpdates'].find(
        //           (val: Notification) => val.type === 'Push',
        //         ).isActive,
        //       ),
        //       email: new FormControl(
        //         settings['featureUpdates'].find(
        //           (val: Notification) => val.type === 'Email',
        //         ).isActive,
        //       ),
        //       sms: new FormControl(
        //         settings['featureUpdates'].find(
        //           (val: Notification) => val.type === 'SMS',
        //         ).isActive,
        //       ),
        //     }),
        //     comments: new FormGroup({
        //       push: new FormControl(
        //         settings['comments'].find(
        //           (val: Notification) => val.type === 'Push',
        //         ).isActive,
        //       ),
        //       email: new FormControl(
        //         settings['comments'].find(
        //           (val: Notification) => val.type === 'Email',
        //         ).isActive,
        //       ),
        //       sms: new FormControl(
        //         settings['comments'].find(
        //           (val: Notification) => val.type === 'SMS',
        //         ).isActive,
        //       ),
        //     }),
        //     updatesFromFriends: new FormGroup({
        //       push: new FormControl(
        //         settings['updatesFromFriends'].find(
        //           (val: Notification) => val.type === 'Push',
        //         ).isActive,
        //       ),
        //       email: new FormControl(
        //         settings['updatesFromFriends'].find(
        //           (val: Notification) => val.type === 'Email',
        //         ).isActive,
        //       ),
        //       sms: new FormControl(
        //         settings['updatesFromFriends'].find(
        //           (val: Notification) => val.type === 'SMS',
        //         ).isActive,
        //       ),
        //     }),
        //     friendsRequests: new FormGroup({
        //       push: new FormControl(
        //         settings['friendsRequests'].find(
        //           (val: Notification) => val.type === 'Push',
        //         ).isActive,
        //       ),
        //       email: new FormControl(
        //         settings['friendsRequests'].find(
        //           (val: Notification) => val.type === 'Email',
        //         ).isActive,
        //       ),
        //       sms: new FormControl(
        //         settings['friendsRequests'].find(
        //           (val: Notification) => val.type === 'SMS',
        //         ).isActive,
        //       ),
        //     }),
        //   });

        //   // this.notificationSettingsForm.patchValue(settings);
        // },
        error: () => this.loadingStatus.set('error'),
        complete: () => this.loadingStatus.set('success'),
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  updateSettings(formGroupName: string, controlName: string) {
    const currentFormSettingValue = this.notificationSettingsForm
      .get(formGroupName)
      ?.get(controlName)?.value;

    this.notificationSettingsForm
      .get(formGroupName)
      ?.get(controlName)
      ?.setValue(!currentFormSettingValue);
  }

  onSubmit() {}
}
