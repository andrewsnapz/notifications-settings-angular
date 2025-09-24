import { Component, input, OnInit, output, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-toggle',
  standalone: true,
  templateUrl: './toggle.component.html',
  styleUrl: './toggle.component.scss',
  imports: [ReactiveFormsModule],
})
export class ToggleComponent implements OnInit {
  id = input.required<string>();
  size = input<'sm' | 'md'>('sm');
  labelActiveText = input.required<string>();
  labelDeactiveText = input.required<string>();
  isLabelHidden = input.required<boolean>();
  defaultToggled = input<boolean>(false);
  isDisabled = input.required<boolean>();

  onActiveToggle = output();
  onDeactiveToggle = output();

  isToggled = signal(false);

  ngOnInit() {
    this.isToggled.set(this.defaultToggled());
  }

  onToggleChange() {
    if (this.isToggled()) {
      this.onDeactiveToggle.emit();
    } else {
      this.onActiveToggle.emit();
    }
    this.isToggled.update((prev) => !prev);
  }
}

/*
  toggle functionalities
    - isToggled: input
    - isDisabled: input
    - what to do if the the toggle is toggled (func) -> must change isToggled
    - what to do if the toggle is un-toggled (func) -> must change isToggled
*/
