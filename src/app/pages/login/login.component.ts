import { Component, effect, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly authService = inject(AuthService);

  public logginStatus: boolean;

  constructor () {
    this.logginStatus = false;
    effect(() => {
      this.logginStatus = this.authService.sessionData() ? true : false;
    })
  }

  public login (): void {
    this.authService.login({ email: 'admin@example.com', uuid: '12345' }).subscribe(
      (res: any) => {
        console.log(res);
      }
    );
  }

}
