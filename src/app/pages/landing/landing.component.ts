import { Component } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';


@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {

}
