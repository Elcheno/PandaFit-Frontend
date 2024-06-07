import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { IInstitution } from '../../../model/interfaces/i-institution';
import { SchoolyearService } from '../../../services/schoolyear/schoolyear.service';
import { LoaderSpinnerComponent } from '../../loader-spinner/loader-spinner.component';

@Component({
  selector: 'app-answer-institution',
  standalone: true,
  imports: [LoaderSpinnerComponent],
  templateUrl: './answer-institution.component.html',
  styleUrl: './answer-institution.component.scss'
})
export class AnswerInstitutionComponent implements OnInit {

  private schoolYearService = inject(SchoolyearService);

  public data!: any;

  constructor (
    public dialogRef: DialogRef<boolean>,
    @Inject(DIALOG_DATA) public institution?: IInstitution
  ) { }

  ngOnInit (): void {
    this.schoolYearService.getAllByInstitution(
      { page: 0, size: 100, sort: ['name'] },
      this.institution?.id
    ).subscribe((res) => {
      this.data = res.content;
    });
  }

  /**
   * Cancels the action and closes the dialog.
   */
  public cancel (): void {
    this.dialogRef.close();
  }

  public handlerSubmit (item: any): void {
    this.dialogRef.close(item);
  }
}
