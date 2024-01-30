import { Injectable, type Type, inject } from '@angular/core';
import { ModalTemplateComponent } from '../../components/modal-template/modal-template.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { AppComponent } from '../../app.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private readonly modal = inject(ModalTemplateComponent);
  // private readonly appComponent = inject(AppComponent);
  // private readonly viewContainerRef = inject(ViewContainerRef);

  // openModal(component: Type<any>): void {
  //   this.modal.openModal(component);
  // }

  openModal (component: Type<any>): void {
    this.modal.openTest();
  }
}
