import { Component, effect, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { ToastService } from '../../services/modal/toast.service';
import { SocialLoginModule } from '@abacritt/angularx-social-login';
import {  GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SocialLoginModule, GoogleSigninButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly toastService = inject(ToastService);
  private readonly loginService = inject(LoginService);

  public logginStatus: boolean;

  constructor () {
    this.logginStatus = false;
    effect(() => {
      this.logginStatus = this.authService.sessionData() ? true : false;
    })
  }

  public login (): void {
    this.authService.login({ email: 'admin@example.com', uuid: 'admin' }).subscribe(
      (res: any) => {
        
        this.toastService.showToast('Sesión iniciada correctamente', 'success');
      }
    );
  }

}
