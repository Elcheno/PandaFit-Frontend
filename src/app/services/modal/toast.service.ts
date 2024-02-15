import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, InjectionToken, Injector, inject } from '@angular/core';
import { ToastComponent } from '../../components/toast/toast.component';

export const DATA_TOAST = new InjectionToken<string>('DATA_TOAST');

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private readonly overlay = inject(Overlay);

  private toast!: OverlayRef;

  constructor() { }

  public showToast(msg: string, type: string = 'success') {
    if (this.toast) { this.toast.dispose(); }

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
        providers: [{ provide: DATA_TOAST, useValue: { msg, type } }]
      })
    );

    overlay.attach(toastPortal);
    this.toast = overlay;

    setTimeout(() => overlay.dispose(), 3000);

  }
}
