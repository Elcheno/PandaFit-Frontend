/* eslint-disable @typescript-eslint/consistent-type-imports */
import { type AfterViewInit, ChangeDetectorRef, Component, type Type, ViewChild, ViewContainerRef } from '@angular/core';
import { Modal, type ModalOptions, type modalPlacement } from 'flowbite';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-modal-template',
  standalone: true,
  imports: [],
  templateUrl: './modal-template.component.html',
  styleUrl: './modal-template.component.scss'
})
export class ModalTemplateComponent implements AfterViewInit {
  @ViewChild('crudmodals') crudmodals!: any;
  @ViewChild('modal', { read: ViewContainerRef }) viewContainerRef!: ViewContainerRef;
  // SidebarComponente: Type<any> = SidebarComponent;
  // @ViewChild('crud-modal') crudModal: any;

  constructor (private readonly changeDetectorRef: ChangeDetectorRef) { }

  ngAfterViewInit (): void {
    // this.generateComponent();
    this.changeDetectorRef.detectChanges();
  }

  generateComponent (component: Type<any>): void {
    this.viewContainerRef.clear();
    const componentRef = this.viewContainerRef.createComponent<any>(component);
    componentRef.changeDetectorRef.detectChanges();
  }

  public openModal (component: Type<any>): void {
    this.generateComponent(component);
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
      }
    };

    // instance options object
    const instanceOptions = {
      id: 'modalEl',
      override: true
    };
    const modal = new Modal(this.crudmodals.nativeElement as HTMLElement, options, instanceOptions);
    modal.show();
  }

  public setComponent (component: Type<any>): void {
    this.generateComponent(component);
  }

  openTest (): void {
    this.openModal(SidebarComponent);
  }
}
