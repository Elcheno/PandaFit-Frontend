import { Injectable, Type, inject } from '@angular/core';
import { ModalTemplateComponent } from '../../components/modal-template/modal-template.component';
import { CreateInstitutionModalComponent } from '../../components/modals/create-institution-modal/create-institution-modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modal = inject(ModalTemplateComponent)

  constructor() { 
    this.modal.openModal(CreateInstitutionModalComponent);
  }

  openModal(component: Type<any>): void {
    this.modal.openModal(CreateInstitutionModalComponent);
  }
}
