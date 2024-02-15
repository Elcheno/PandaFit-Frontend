import { Component, inject, type OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Pandafit-Frontend';

  private readonly authService = inject(AuthService);

  ngOnInit (): void {
    this.authService.login({ email: 'ruben@exmample.com' }).subscribe(
      (res: any) => {
        console.log(res);
      }
    );
  }
}
