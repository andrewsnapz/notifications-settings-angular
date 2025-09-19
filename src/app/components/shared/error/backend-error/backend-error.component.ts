import { Component } from '@angular/core';

import { SadFaceComponent } from '../../svg/sad-face/sad-face.component';

@Component({
  selector: 'app-backend-error',
  imports: [SadFaceComponent],
  templateUrl: './backend-error.component.html',
  styleUrl: './backend-error.component.scss',
})
export class BackendErrorComponent {}
