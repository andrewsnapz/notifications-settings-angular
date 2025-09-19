import { Component, input, output, HostBinding } from '@angular/core';

@Component({
  selector: 'button[appButton]',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  type = input<'primary' | 'secondary'>('primary');
  size = input<'sm' | 'md' | 'lg' | 'xl' | '2xl'>('md');

  @HostBinding('class')
  get buttonClasses(): string {
    return `button button-${this.size()} button-${this.type()}`;
  }
}
