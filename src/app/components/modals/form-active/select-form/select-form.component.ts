import { Component, OnInit, inject } from '@angular/core';
import { IFormData } from '../../../../model/interfaces/i-form-data';
import { DialogRef } from '@angular/cdk/dialog';
import { FormService } from '../../../../services/form/form.service';
import { ButtonComponent } from '../../../button/button.component';

@Component({
  selector: 'app-select-form',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './select-form.component.html',
  styleUrl: './select-form.component.scss'
})
export class SelectFormComponent implements OnInit {
  private readonly formService = inject(FormService);

  public formulario!: IFormData;
  public formList!: IFormData[];

  constructor (
    public dialogRef: DialogRef<any>
  ) { }

  /**
   * Fetches all forms on initialization
   */
  ngOnInit(): void {
    this.formService.getAll({page: 0, size: 100, sort: ['name']}).subscribe((data: any) => {
      this.formList = data.content;
    });
  }

  /**
   * Handles the selection of a form
   * @param item The selected form item
   */
  public handlerSelectForm (item: any): void {
    const input = document.getElementById(item.id) as HTMLInputElement;
    if (input) input.checked = true;
    this.formulario = item;
  }

  /**
   * Closes the dialog
   */
  public closeModal (): void {
    this.dialogRef.close();
  }

  /**
   * Handles form submission
   */
  public onSubmit (): void {
    if (!this.formulario) return;
    this.dialogRef.close(this.formulario);
  }
}
