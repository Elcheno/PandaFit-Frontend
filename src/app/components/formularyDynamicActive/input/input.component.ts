import { Component, Input } from '@angular/core';

export interface IInputField <T> {
  type: string;
  unit: string;
  text?: string;
  value?: T;
  required?: boolean;
  disabled?: boolean;
}

@Component({
  selector: 'inputField',
  standalone: true,
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  @Input() data!: IInputField<any>; 
}
