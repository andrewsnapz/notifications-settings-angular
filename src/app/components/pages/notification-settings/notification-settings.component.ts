import { Component } from '@angular/core';

import { BackendErrorComponent } from '../../shared/error/backend-error/backend-error.component';
import { ButtonComponent } from '../../shared/button/button.component';

@Component({
  selector: 'app-notification-settings',
  imports: [BackendErrorComponent, ButtonComponent],
  templateUrl: './notification-settings.component.html',
  styleUrl: './notification-settings.component.scss',
})
export class NotificationSettingsComponent {}
