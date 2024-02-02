import { Component, Input } from '@angular/core';

@Component({
  selector: 'buttonComp',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() public text!: string;
  @Input() public buttonStyle!: string;
  @Input() public buttonType!: string;
}
