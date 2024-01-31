import { DOCUMENT } from '@angular/common';
import { Component, Inject, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @ViewChild('sidebar') sidebar: any;
  @ViewChild('overlay') overlay: any;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  public toggleSidebar(): void {
    this.sidebar.nativeElement.classList.toggle('transform-none');
    this.overlay.nativeElement.classList.toggle('hidden');
    this.overlay.nativeElement.classList.toggle('fixed');
    this.document.body.classList.toggle('overflow-hidden');
  }
}
