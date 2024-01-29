import { AfterViewInit, ChangeDetectorRef, Component, Injectable, Type, ViewChild } from '@angular/core';
import { DynamicModalDirective } from './dynamic-modal.directive';
import { Modal, ModalOptions, modalPlacement } from 'flowbite';

import { SidebarComponent } from '../sidebar/sidebar.component';
import { TableInstitutionComponent } from '../table-institution/table-institution.component';
import { ModalService } from '../../services/modal/modal.service';

@Component({
  selector: 'app-modal-template',
  standalone: true,
  imports: [DynamicModalDirective],
  templateUrl: './modal-template.component.html',
  styleUrl: './modal-template.component.scss',
})
export class ModalTemplateComponent implements AfterViewInit {

  @ViewChild(DynamicModalDirective) dynamic!: DynamicModalDirective;
  SidebarComponente: Type<any> = SidebarComponent;
  // @ViewChild('crud-modal') crudModal: any;

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    // this.generateComponent();
    this.changeDetectorRef.detectChanges();
  }

  generateComponent(component: Type<any>): void {
    const viewContainerRef = this.dynamic.viewContainerRef;

    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent<any>(component);
    componentRef.changeDetectorRef.detectChanges();
  }

  public openModal(component: Type<any>): void {    
    this.generateComponent(component);
    const $targetEl = document.getElementById('crud-modals');

    const options: ModalOptions = {
      placement: 'bottom-right' as modalPlacement,
      backdrop: 'dynamic',
      backdropClasses: 'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
      closable: true,
      onHide: () => {
        console.log('modal is hidden');
      },
      onShow: () => {
        console.log('modal is shown');
      },
      onToggle: () => {
        console.log('modal has been toggled');
      },
    };

    // instance options object
    const instanceOptions = {
      id: 'modalEl',
      override: true
    };
    const modal = new Modal($targetEl, options, instanceOptions);
    modal.show();
  }

  public setComponent(component: Type<any>): void {
    this.generateComponent(component);
  }

}
