import { DOCUMENT } from '@angular/common';
import { Component, Inject, ViewChild, effect, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { ToastService } from '../../services/modal/toast.service';
import { LoginService } from '../../services/login/login.service';
import { environment as env } from '../../../environments/environment.development';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @ViewChild('sidebar') sidebar: any;
  @ViewChild('overlay') overlay: any;

  private readonly authService = inject(AuthService);
  private readonly toastService = inject(ToastService);

  /**
   * Indicates the login status.
   */
  public logginStatus: boolean;
  
  public userRole!: string;

  constructor(@Inject(DOCUMENT) private document: Document,  authService: AuthService) {
    this.logginStatus = false;
    effect(() => {
      this.logginStatus = env.dev
        ? true
        : this.authService.sessionData() ? true : false;

      const userDataString = this.authService.sessionData()
      if (userDataString) {
        this.userRole = userDataString.roles;
        // Verifica si el array tiene al menos un elemento
        if (this.userRole && this.userRole.length > 0) {
            this.userRole = Object.values(this.userRole[0])[0];
        } else {
            console.error('El array de roles está vacío');
        }
    } else {
        console.error('No se encontraron datos de usuario en el almacenamiento local');
    }
      
    });
  }

  /**
   * Toggles the sidebar visibility.
   */
  public toggleSidebar(): void {
    this.sidebar.nativeElement.classList.toggle('transform-none');
    this.overlay.nativeElement.classList.toggle('hidden');
    this.overlay.nativeElement.classList.toggle('fixed');
    this.document.body.classList.toggle('overflow-hidden');
  }

  /**
   * Logs out the user.
   */
  public logout(): void {
    this.authService.logOut()
      .then(() => this.toastService.showToast('Sesión cerrada correctamente', 'success'));
    
  }
}
