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

  checked = false;
  user!: SocialUser;
  loggedIn!: boolean;
  originalPath!: string;

  constructor(private authService: SocialAuthService,
    private router: Router) {
    //   this.loggedIn = false;
    // effect(() => {
    //   this.loggedIn = this.authS.sessionData() ? true : false;
    // })
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      if (this.loggedIn) {
        if (this.originalPath) {
          this.router.navigate([this.originalPath]);
          this.originalPath = '';
        } else
          this.router.navigate(['']);
      } else {
        this.router.navigate(['/']);
      }
      console.log(user);
      this.login();
    });

  }

  isAuth(): boolean {
    return this.loggedIn;
  }

  async refreshToken(): Promise<void> {
    return this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID)
  }

  async singOut(): Promise<void> {
    return await this.authService.signOut();
  }

  async getSrc(): Promise<string> {
    return await this.user.photoUrl;
  }

  public login (): void {
    this.authS.login({ email: this.user.email, uuid: this.user.idToken }).subscribe(
      (res: any) => {
        console.log(res);
        this.toastService.showToast('Sesión iniciada correctamente', 'success');
      }
    );
  }
}
