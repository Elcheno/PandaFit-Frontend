import { Component } from '@angular/core';

@Component({
  selector: 'app-formulary-dynamic-active-success',
  standalone: true,
  imports: [],
  templateUrl: './formulary-dynamic-active-success.component.html',
  styleUrl: './formulary-dynamic-active-success.component.scss'
})
export class FormularyDynamicActiveSuccessComponent {

  public load: boolean = false;

  ngOnInit(): void {
    setTimeout(() => {
      this.load = true;
    }, 500);
  }


}
