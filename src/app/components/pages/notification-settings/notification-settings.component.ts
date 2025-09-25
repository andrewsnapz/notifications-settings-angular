import { Component, signal, inject, OnInit, DestroyRef } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { type Notification } from '../../../types/notification.model';
import { ToastComponent } from '../../shared/toast/toast.component';
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
    ToastComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './notification-settings.component.html',
  styleUrl: './notification-settings.component.scss',
})
export class NotificationSettingsComponent implements OnInit {
  private notificationSettingsService = inject(NotificationSettingsService);
  private destroyRef = inject(DestroyRef);

  loadingStatus = signal<'loading' | 'error' | 'success'>('loading');
  formStatus = signal<'none' | 'error' | 'success'>('none');

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
    const subscription = this.notificationSettingsService
      .loadNotificationSettings()
      .subscribe({
        next: (val) => {
          const settings = { ...val.settings };
          const controlNames = Object.keys(settings);

          controlNames.forEach((controlName) => {
            settings[controlName] = settings[controlName].reduce(
              (
                a: {
                  [type: string]: {};
                },
                c: Notification,
              ) => {
                const notificationType = c.type.toLowerCase();
                const isActive = c.isActive;
                a[notificationType] = isActive;
                return a;
              },
              {},
            );
          });

          this.notificationSettingsForm.patchValue({
            ...settings,
          });
        },
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

    this.notificationSettingsForm.markAsDirty();
    this.formStatus.set('none');
  }

  onSubmit() {
    // need to send id and
    const subscription = this.notificationSettingsService
      .putUpdatedNotificationSettings(this.notificationSettingsForm.value)
      .subscribe({
        complete: () => {
          this.formStatus.set('success');
          this.notificationSettingsForm.markAsPristine();
        },
        error: () => {
          this.formStatus.set('error');
        },
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
