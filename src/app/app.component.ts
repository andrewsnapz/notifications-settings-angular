import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ToggleComponent } from './components/shared/toggle/toggle.component';
import { PageLayoutComponent } from './components/layout/page-layout/page-layout.component';
import { GridComponent } from './components/layout/grid/grid.component';
import { GridItemComponent } from './components/layout/grid/grid-item/grid-item.component';
import { ToastComponent } from './components/shared/toast/toast.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ToggleComponent,
    PageLayoutComponent,
    GridComponent,
    GridItemComponent,
    ToastComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'notifications-settings';

  onActiveToggle() {}
  onDeactiveToggle() {}
}
