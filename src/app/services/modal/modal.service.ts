import { Injectable, inject } from '@angular/core';
import { Dialog, type DialogRef } from '@angular/cdk/dialog';
import { type ComponentType } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private readonly dialog = inject(Dialog);

  private dialogRef!: DialogRef<any> | null;

  public async open (component: ComponentType<any>, data?: any): Promise<DialogRef<any>> {
    return await new Promise((resolve, _reject) => {
      this.dialogRef = this.dialog.open(component, {
        width: '100vw',
        data
      });
      resolve(this.dialogRef);
    });
  }

  public async close (): Promise<void> {
    await new Promise<void>((resolve, _reject) => {
      this.dialogRef?.close();
      this.dialogRef = null;
      resolve();
    });
  }
}
