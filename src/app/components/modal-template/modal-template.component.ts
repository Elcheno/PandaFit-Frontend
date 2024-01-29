import { AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, Type, ViewChild } from '@angular/core';
import { DynamicModalDirective } from './dynamic-modal.directive';
// import { CreateInstitutionModalComponent } from '../modals/create-institution-modal/create-institution-modal.component';
import { Modal, ModalOptions, modalPlacement } from 'flowbite';

@Component({
  selector: 'app-modal-template',
  standalone: true,
  imports: [DynamicModalDirective],
  templateUrl: './modal-template.component.html',
  styleUrl: './modal-template.component.scss',
})
export class ModalTemplateComponent implements AfterViewInit {

  @ViewChild(DynamicModalDirective) dynamic!: DynamicModalDirective
  // @ViewChild('crud-modal') crudModal: any;

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    // this.generateComponent(CreateInstitutionModalComponent);
    this.changeDetectorRef.detectChanges();
  }

  generateComponent(component: Type<any>): void {
    const viewContainerRef = this.dynamic.viewContainerRef;
    const componentRef = viewContainerRef.createComponent(component);
  }

  openModal(component: Type<any>): void {
    this.generateComponent(component);
    const $targetEl = document.getElementById('crud-modal');

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

}
