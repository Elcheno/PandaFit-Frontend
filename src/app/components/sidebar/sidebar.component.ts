import { DOCUMENT } from '@angular/common';
import { Component, Inject, ViewChild, effect, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { ToastService } from '../../services/modal/toast.service';
import { LoginService } from '../../services/login/login.service';
import { environment as env } from '../../../environments/environment.development';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @ViewChild('sidebar') sidebar: any;
  @ViewChild('overlay') overlay: any;

  private readonly authService = inject(AuthService);
  // private readonly loginService = inject(LoginService);
  private readonly toastService = inject(ToastService);

  public logginStatus: boolean;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.logginStatus = false;
    effect(() => {
      this.logginStatus = env.dev
        ? true
        : this.authService.sessionData() ? true : false;
    })
  }

  public toggleSidebar(): void {
    this.sidebar.nativeElement.classList.toggle('transform-none');
    this.overlay.nativeElement.classList.toggle('hidden');
    this.overlay.nativeElement.classList.toggle('fixed');
    this.document.body.classList.toggle('overflow-hidden');
  }

  public logout(): void {
    this.authService.logOut()
      .then(() => this.toastService.showToast('Sesión cerrada correctamente', 'success'));
    
  }
}
