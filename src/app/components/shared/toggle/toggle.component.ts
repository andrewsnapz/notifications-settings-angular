import {
  Component,
  computed,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-toggle',
  imports: [],
  templateUrl: './toggle.component.html',
  styleUrl: './toggle.component.scss',
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

  toggleClasses = computed(() => ({
    toggleControl: {
      toggle: true,
      ['toggle-deactive']: !this.isToggled(),
      ['toggle-active']: this.isToggled(),
      [`toggle-${this.size()}`]: true,
    },
    toggleBall: {
      ['toggle-ball']: true,
      ['toggle-ball-disabled']: this.isDisabled(),
      ['toggle-ball-deactive']: !this.isToggled(),
      ['toggle-ball-active']: this.isToggled(),
      [`toggle-ball-${this.size()}`]: true,
    },
    label: {
      ['visually-hidden']: this.isLabelHidden(),
    },
  }));
  component: any;

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
