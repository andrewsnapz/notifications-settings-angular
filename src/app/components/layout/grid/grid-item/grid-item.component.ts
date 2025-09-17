import { Component, input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-grid-item',
  imports: [NgClass],
  templateUrl: './grid-item.component.html',
  styleUrl: './grid-item.component.scss',
})
export class GridItemComponent {
  colMobile = input<number>(4);
  colTablet = input<number>(6);
  colDesktop = input<number>(12);
}
