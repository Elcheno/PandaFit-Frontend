import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  checked = false;
  user!: SocialUser;
  loggedIn!: boolean;
  originalPath!: string;

  constructor(private authService: SocialAuthService,
    private router: Router) {
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
}
