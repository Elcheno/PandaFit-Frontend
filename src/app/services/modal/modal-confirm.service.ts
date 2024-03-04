import { Injectable, inject } from '@angular/core';
import { Dialog, type DialogRef } from '@angular/cdk/dialog';
import { ConfirmModalComponent } from '../../components/modals/confirm-modal/confirm-modal.component';

/**
 * Service for managing confirmation modal dialogs.
 */
@Injectable({
  providedIn: 'root'
})
export class ModalConfirmService {
  private readonly dialog = inject(Dialog);

  private dialogRef!: DialogRef<any, ConfirmModalComponent> | null;

  /**
   * Opens a confirmation modal dialog.
   * @param msg - Optional message to be displayed in the dialog.
   * @returns Promise resolving with the dialog reference.
   */
  public async open (msg?: string): Promise<DialogRef<any, ConfirmModalComponent>> {
    return await new Promise((resolve, _reject) => {
      this.dialogRef = this.dialog.open(ConfirmModalComponent, {
        maxWidth: '600px',
        width: '-webkit-fill-available',
        data: msg
      });
      resolve(this.dialogRef);
    });
  }

  /**
   * Closes the currently open confirmation modal dialog.
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
