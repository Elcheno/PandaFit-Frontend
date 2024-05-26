import { Component, OnInit, inject } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [ButtonComponent, RouterLink],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent implements OnInit {

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  public isLogged: boolean = false;

  constructor() { }

  ngOnInit(): void {
    const sessionData = this.authService.sessionData();
    this.isLogged = sessionData?.token ? true : false;
  }

  public handlerDashboard(): void {
    const role = this.authService.getRole();

    if (role === 'ROLE_ADMIN') {
      this.router.navigateByUrl('/dashboard/institutions');
    } else {
      this.router.navigateByUrl('/dashboard/answers/schoolyears');
    }
  }

}
