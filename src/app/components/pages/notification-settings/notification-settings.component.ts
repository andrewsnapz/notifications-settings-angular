import { Component } from '@angular/core';

import { BackendErrorComponent } from '../../shared/error/backend-error/backend-error.component';

@Component({
  selector: 'app-notification-settings',
  imports: [BackendErrorComponent],
  templateUrl: './notification-settings.component.html',
  styleUrl: './notification-settings.component.scss',
})
export class NotificationSettingsComponent {}
