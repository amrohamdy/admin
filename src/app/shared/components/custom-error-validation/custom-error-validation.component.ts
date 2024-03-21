import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-error-validation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-error-validation.component.html',
  styleUrl: './custom-error-validation.component.scss'
})
export class CustomErrorValidationComponent {
  @Input() formSumitted: any
  @Input() ControlName: any
  @Input() formName: any
  @Input() errorType: any
}
