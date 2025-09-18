import { Component, HostBinding, input } from '@angular/core';

@Component({
  selector: 'app-grid-item',
  template: `<ng-content />`,
  styleUrl: './grid-item.component.scss',
})
export class GridItemComponent {
  colMobile = input(4);
  colTablet = input(6);
  colDesktop = input(12);

  @HostBinding('class')
  get hostClasses(): string {
    return `col-mobile-${this.colMobile()} col-tablet-${this.colTablet()} col-desktop-${this.colDesktop()}`;
  }
}
