import { Component, inject, type OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { InstitutionService } from './services/institution/institution.service';
import { JCCPageComponent } from './pages/jccpage/jccpage.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

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

  ngOnInit (): void {
    initFlowbite();
    void this.institutionService.getAll({
      page: 0,
      size: 10,
      sort: ['name']
    });
  }
}
