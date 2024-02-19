import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, InjectionToken, Injector, OnInit, inject, signal } from '@angular/core';
import { ToastComponent } from '../../components/toast/toast.component';

export const DATA_TOAST = new InjectionToken<string>('DATA_TOAST');

export interface IToast  {
  id?: number
  msg: string
  type: "success" | "error"
}

@Injectable({
  providedIn: 'root'
})
export class ToastService implements OnInit {
  private readonly overlay = inject(Overlay);

  public toastList$ = signal<any>([]);

  private toast!: OverlayRef;

  constructor() {
    const overlay = this.overlay.create({
      positionStrategy: this.overlay
        .position()
        .global()
        .end()
        .bottom(),
    });

    const toastPortal = new ComponentPortal(
      ToastComponent,
      null,
      Injector.create({
        providers: [{ provide: DATA_TOAST, useValue: this.toastList$ }]
      })
    );
    overlay.attach(toastPortal);
    console.log(this.toastList$())
  }

  ngOnInit(): void { }

  public showToast(msg: string, type: string = 'success') {

    let id = Math.round((Math.random() * 9000) + 1000);

    this.toastList$.set([
      ...this.toastList$(),
      { id, msg, type }
    ]);

    setTimeout(() => {
      this.toastList$.set(this.toastList$().filter((toast: any) => toast.id !== id))
    }, 3000);



  }
}
