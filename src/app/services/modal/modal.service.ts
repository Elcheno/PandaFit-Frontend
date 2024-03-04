import { Injectable, inject } from '@angular/core';
import { Dialog, type DialogRef } from '@angular/cdk/dialog';
import { type ComponentType } from '@angular/cdk/portal';

/**
 * Service for managing modal dialogs.
 */
@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private readonly dialog = inject(Dialog);

  private dialogRef!: DialogRef<any> | null;

  /**
   * Opens a modal dialog.
   * @param component - The component to be rendered inside the dialog.
   * @param data - Optional data to be passed to the component.
   * @returns Promise resolving with the dialog reference.
   */
  public async open (component: ComponentType<any>, data?: any): Promise<DialogRef<any>> {
    return await new Promise((resolve, _reject) => {
      this.dialogRef = this.dialog.open(component, {
        maxWidth: '600px',
        width: '-webkit-fill-available',
        data
      });
      resolve(this.dialogRef);
    });
  }

  /**
   * Closes the currently open modal dialog.
   * @returns Promise resolving when the dialog is closed.
   */
  public async close (): Promise<void> {
    await new Promise<void>((resolve, _reject) => {
      this.dialogRef?.close();
      this.dialogRef = null;
      resolve();
    });
  }
}
