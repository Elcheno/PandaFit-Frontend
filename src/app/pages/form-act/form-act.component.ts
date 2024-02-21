import { Component, OnInit, inject } from '@angular/core';
import { SearchEntityComponent } from '../../components/search-entity/search-entity.component';
import { ButtonComponent } from '../../components/button/button.component';
import { ModalService } from '../../services/modal/modal.service';
import { ActivatedRoute } from '@angular/router';
import { ISchoolYear } from '../../model/interfaces/i-school-year';
import { SchoolyearService } from '../../services/schoolyear/schoolyear.service';
import { FormActiveComponent } from '../../components/modals/form-active/form-active.component';

@Component({
  selector: 'app-form-act',
  standalone: true,
  imports: [SearchEntityComponent, ButtonComponent],
  templateUrl: './form-act.component.html',
  styleUrl: './form-act.component.scss'
})
export class FormActComponent implements OnInit {
  private readonly modalService = inject(ModalService);
  private readonly routeActive = inject(ActivatedRoute);
  private readonly schoolYearService = inject(SchoolyearService);

  public schoolyear!: ISchoolYear;

  constructor() {}

  ngOnInit (): void {

    this.routeActive.queryParams.subscribe((params) => {
      const id = params['schoolyear'];
      if (!id) return;
      this.schoolYearService.getById(id).subscribe((res) => {
        if (!res) return;
        this.schoolyear = res;
        console.log(this.schoolyear);
      });
    });

  }

  public search (value: string): void {
    console.log(value);
  }

  public async openForm (): Promise<void> {
    (await this.modalService.open(FormActiveComponent, this.schoolyear)).closed.subscribe((res: any) => {
      console.log(res);
    })
  }

}
