import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html'
})
export class ValidationComponent {
  @Input() public control: AbstractControl<unknown, unknown>;
}
