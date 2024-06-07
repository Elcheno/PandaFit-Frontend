import { Component, inject, type OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AuthService } from './services/auth/auth.service';
import { StoreService } from './services/store/store.service';

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
  private readonly storeService = inject(StoreService);

  constructor() { }

  /**
   * Lifecycle hook called after component initialization.
   * Loads session data on initialization.
   */
  ngOnInit (): void {
    this.authService.loadSessionData();
  }
}
