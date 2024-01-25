import { Component, inject, type OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { InstitutionService } from './services/institution/institution.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Pandafit-Frontend';

  private readonly institutionService = inject(InstitutionService);

  ngOnInit (): void {
    initFlowbite();
    void this.institutionService.getAll(1);
  }
}
