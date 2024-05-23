import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { InstitutionService } from '../../../services/institution/institution.service';
import { IInstitution } from '../../../model/interfaces/i-institution';

@Component({
  selector: 'app-info-institution',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './info-institution.component.html',
  styleUrl: './info-institution.component.scss'
})
export class InfoInstitutionComponent implements OnInit, AfterViewInit {
  private readonly router = inject(ActivatedRoute);
  private readonly routerService = inject(Router);
  private readonly institutionService = inject(InstitutionService);

  private institutionId!: string;

  public institution!: IInstitution;


  constructor () {}

  ngOnInit(): void {
    this.router.queryParamMap.subscribe((params) => {
      this.institutionId = params.get('id') ?? '';
      if (this.institutionId) {
        this.institutionService.getById(this.institutionId).subscribe((res) => {
          this.institution = res;
        });
      }
    });

    

    const route = this.routerService.url.split('/')[3].split('?')[0];
    

    const item = document.getElementById(route);
    const menuBackdrop = document.querySelector('#menu-backdrop') as HTMLDivElement;
    
    if (menuBackdrop && item) {
      const { left, top, width, height } = item.getBoundingClientRect();
      menuBackdrop.style.setProperty('--left', `${left}px`);
      menuBackdrop.style.setProperty('--top', `${top}px`);
      menuBackdrop.style.setProperty('--width', `${width}px`);
      menuBackdrop.style.setProperty('--height', `${height}px`);
    }

  }

  ngAfterViewInit(): void {
    const menuItems = document.querySelectorAll('#menu li');
    const menuBackdrop = document.querySelector('#menu-backdrop') as HTMLDivElement;

    menuItems.forEach((item) => {
      item.addEventListener('click', () => {
        const { left, top, width, height } = item.getBoundingClientRect();

        if (menuBackdrop) {
          menuBackdrop.style.setProperty('--left', `${left}px`);
          menuBackdrop.style.setProperty('--top', `${top}px`);
          menuBackdrop.style.setProperty('--width', `${width}px`);
          menuBackdrop.style.setProperty('--height', `${height}px`);
        }
      });
    })
  }
  
}
