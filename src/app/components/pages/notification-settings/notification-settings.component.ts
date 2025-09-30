import { Component, signal, inject, OnInit, DestroyRef } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

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
    marketing: new FormGroup({
      push: new FormControl(false),
      email: new FormControl(false),
      sms: new FormControl(false),
    }),
    features: new FormGroup({
      push: new FormControl(false),
      email: new FormControl(false),
      sms: new FormControl(false),
    }),
    comments: new FormGroup({
      push: new FormControl(false),
      email: new FormControl(false),
      sms: new FormControl(false),
    }),
    friend_updates: new FormGroup({
      push: new FormControl(false),
      email: new FormControl(false),
      sms: new FormControl(false),
    }),
    friend_requests: new FormGroup({
      push: new FormControl(false),
      email: new FormControl(false),
      sms: new FormControl(false),
    }),
  });

  ngOnInit() {
    const subscription = this.notificationSettingsService
      .loadNotificationSettings()
      .subscribe({
        next: (val) => {
          this.notificationSettingsForm.patchValue(val);
        },
        error: () => this.loadingStatus.set('error'),
        complete: () => this.loadingStatus.set('success'),
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  renderNotificationOptions(controlName: string) {
    const loadedNotificationSettings =
      this.notificationSettingsService.loadedNotificationSettings();

    return Object.entries(loadedNotificationSettings[controlName]);
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
        next: (val) => {
          this.notificationSettingsForm.patchValue(val);
        },
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
