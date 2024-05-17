import { Component, OnInit, inject } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { AuthService } from '../../services/auth/auth.service';


@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent implements OnInit {

  private readonly authService = inject(AuthService);

  public isLogged: boolean = false;

  constructor() { }

  ngOnInit(): void {
    const sessionData = this.authService.sessionData();
    this.isLogged = sessionData?.token ? true : false;
  }

}
