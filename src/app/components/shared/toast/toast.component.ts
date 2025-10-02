import { Component, input } from '@angular/core';

@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent {
  type = input.required<'success' | 'failure'>();
  title = input.required<string>();
  message = input.required<string>();
}
