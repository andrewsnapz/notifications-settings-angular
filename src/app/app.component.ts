import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ToggleComponent } from './components/shared/toggle/toggle.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToggleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'notifications-settings';

  onActiveToggle() {}
  onDeactiveToggle() {}
}
