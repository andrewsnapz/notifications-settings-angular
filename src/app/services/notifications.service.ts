import { Injectable, signal } from '@angular/core';

/*
  what the form is supposed to do:
  - show what options the user currently as selected
  - batch selection, if the user selects new changes, enable a button that updates backend with new changes.
*/

@Injectable({ providedIn: 'root' })
export class NotificationsService {
  // private notificationSettings= signal<>;
}
