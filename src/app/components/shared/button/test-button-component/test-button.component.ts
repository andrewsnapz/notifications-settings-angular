import { Component } from '@angular/core';

import { ButtonComponent } from '../button.component';

@Component({
  selector: 'app-test-button',
  standalone: true,
  template: '<button appButton type="primary" size="md">test button</button>',
  imports: [ButtonComponent],
})
export class TestButtonComponent {}
