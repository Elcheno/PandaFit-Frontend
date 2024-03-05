import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-formulary',
  standalone: true,
  imports: [RouterOutlet, RouterLinkActive, RouterLink],
  templateUrl: './formulary.component.html',
  styleUrl: './formulary.component.scss'
})
export class FormularyComponent implements AfterViewInit, OnInit {

  private readonly routerService = inject(Router);

  ngOnInit(): void {
    const route = this.routerService.url.split('/')[2];
    
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
    const menuBackdrop = document.querySelector('#menu-backdrop') as HTMLDivElement;
    const menuItems = document.querySelectorAll('#menu li');

    menuItems.forEach((item) => {
      item.addEventListener('click', () => {
        const { left, top, width, height } = item.getBoundingClientRect();

        if (menuBackdrop) {
          menuBackdrop.style.setProperty('--left', `${left}px`);
          menuBackdrop.style.setProperty('--top', `${top}px`);
          menuBackdrop.style.setProperty('--width', `${width}px`);
          menuBackdrop.style.setProperty('--height', `${height}px`);
        }
      })
    })
  }

}
