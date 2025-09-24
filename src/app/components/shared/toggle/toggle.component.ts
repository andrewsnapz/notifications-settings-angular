import { Component, input, OnInit, output, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-toggle',
  standalone: true,
  templateUrl: './toggle.component.html',
  styleUrl: './toggle.component.scss',
  imports: [ReactiveFormsModule],
})
export class ToggleComponent {
  id = input.required<string>();
  size = input<'sm' | 'md'>('sm');
  labelActiveText = input.required<string>();
  labelDeactiveText = input.required<string>();
  isLabelHidden = input.required<boolean>();
  // defaultToggled = input<boolean>(false);
  isToggled = input.required<boolean>();
  isDisabled = input.required<boolean>();

  onToggle = output();

  onToggleChange() {
    this.onToggle.emit();
  }
}

/*
  toggle functionalities
    - isToggled: input
    - isDisabled: input
    - what to do if the the toggle is toggled (func) -> must change isToggled
    - what to do if the toggle is un-toggled (func) -> must change isToggled
*/
