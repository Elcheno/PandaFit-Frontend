import { Injectable, Type, inject } from '@angular/core';
import { ModalTemplateComponent } from '../../components/modal-template/modal-template.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';


@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private readonly modal = inject(ModalTemplateComponent);
  constructor() { }

  // openModal(component: Type<any>): void {
  //   this.modal.openModal(component);
  // }

  openModal(component: Type<any>): void {
    // this.modal.ngAfterViewInit();
    // this.modal = new ModalTemplateComponent();
    this.modal.openModal(SidebarComponent);
  }
}
