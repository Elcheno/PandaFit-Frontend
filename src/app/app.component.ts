import { Component, inject, type OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
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

  ngOnInit (): void {
    initFlowbite();
    void this.institutionService.getAll({
      page: 0,
      size: 10,
      sort: ['name']
    });

    void this.usersService.getAll({
      page: 0,
      size: 10,
      sort: ['email']
    });

    void this.usersService.getAllByInstitution({
      page: 0,
      size: 10,
      sort: ['email']
    },
    {
      id: '34fd6762-bc81-42ae-ac5f-d9f7a40c3e04',
      name: 'global1'
    });
  }
}
