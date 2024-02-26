import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Injectable, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ToastService } from '../modal/toast.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly authS = inject(AuthService);
  private readonly toastService = inject(ToastService);
  private readonly router = inject(Router);
  private readonly authService = inject(SocialAuthService);

  user!: SocialUser;
  loggedIn!: boolean;
  originalPath!: string;

  constructor() {
      this.authS.loadSessionData();
      
      if (!this.authS.sessionData() || this.authS.sessionData() === null) {
        this.authService.authState.subscribe((user) => {
          this.user = user;
          // this.loggedIn = (user != null);
          // if (this.loggedIn) {
          //   if (this.originalPath) {
          //     this.router.navigate([this.originalPath]);
          //     this.originalPath = '';
          //   } else
          //     this.router.navigate(['']);
          // } else {
          //   this.router.navigate(['/']);
          // }
          // console.log(user);
          this.login();
        });
      }
  }

  async refreshToken(): Promise<void> {
    return this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID)
  }

  async logOut(): Promise<void> {
    return await this.authS.logOut();
  }

  async getSrc(): Promise<string> {
    return await this.user.photoUrl;
  }

  public login (): void {
    this.authS.login({ email: this.user.email, uuid: this.user.id }).subscribe(
      (res: any) => {
        this.router.navigateByUrl('/institutions');
        this.toastService.showToast('Sesión iniciada correctamente', 'success');
      },
      (error) => {
        this.toastService.showToast('No existe el usuario', 'error');
      }
    );
  }
}
