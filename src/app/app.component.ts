import { Component, inject, type OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AuthService } from './services/auth/auth.service';
import { ToastService } from './services/modal/toast.service';

/**
 * Root component of the application.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly toastService = inject(ToastService);
  private readonly router = inject(Router);


  /**
   * Logs out the user.
   */
  // logout() {
  //   this.loginS.loggedIn = false;
  //   sessionStorage.removeItem('user');
  //   this.loginS.logOut().then(() => this.toastService.showToast('Sesión cerrada correctamente', 'success'));
  //   this.router.navigateByUrl('/RefrshComponent', { skipLocationChange: true }).then(() => this.router.navigate(["/"]));
  // }


  constructor() { }

  /**
   * Lifecycle hook called after component initialization.
   * Loads session data on initialization.
   */
  ngOnInit (): void {
    this.authService.loadSessionData();
    // this.toastService.showToast('Esto es un toast', 'success');
  }
}
