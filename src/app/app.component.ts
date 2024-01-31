import { Component, inject, ViewChild, type OnInit, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { InstitutionService } from './services/institution/institution.service';
import { JCCPageComponent } from './pages/jccpage/jccpage.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Pandafit-Frontend';
  private readonly institutionService = inject(InstitutionService);
  private readonly usersService = inject(UserService);

  ngOnInit (): void { }
}
