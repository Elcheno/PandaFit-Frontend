import { Component, inject, type OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AuthService } from './services/auth/auth.service';
import { ToastService } from './services/modal/toast.service';
import { LoginService } from './services/login/login.service';

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

  logout() {
    this.loginS.loggedIn = false;
    sessionStorage.removeItem('user');
    this.loginS.singOut;
    this.router.navigateByUrl('/RefrshComponent', { skipLocationChange: true }).then(() => this.router.navigate(["/"]));
  }

  constructor(private loginS: LoginService) { }

  ngOnInit (): void {
    this.authService.loadSessionData();
    this.toastService.showToast('Esto es un toast', 'success');
  }
}
