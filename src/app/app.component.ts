import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PageLayoutComponent } from './components/layout/page-layout/page-layout.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PageLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'notifications-settings';

  onActiveToggle() {}
  onDeactiveToggle() {}
}
