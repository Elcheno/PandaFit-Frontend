import { Component, effect, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { ToastService } from '../../services/modal/toast.service';
import { SocialLoginModule } from '@abacritt/angularx-social-login';
import {  GoogleSigninButtonModule } from '@abacritt/angularx-social-login';

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
        this.toastService.showToast('Sesión iniciada correctamente', 'success');
      }
    );
  }

}
