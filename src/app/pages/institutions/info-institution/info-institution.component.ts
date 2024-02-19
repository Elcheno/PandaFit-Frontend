import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { InstitutionService } from '../../../services/institution/institution.service';
import { IInstitution } from '../../../model/interfaces/i-institution';

@Component({
  selector: 'app-info-institution',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './info-institution.component.html',
  styleUrl: './info-institution.component.scss'
})
export class InfoInstitutionComponent implements OnInit {
  private readonly router = inject(ActivatedRoute);
  private readonly institutionService = inject(InstitutionService);

  private institutionId!: string;

  public institution!: IInstitution;


  constructor () {}

  ngOnInit(): void {
    // console.log(this.router)
    this.router.queryParamMap.subscribe((params) => {
      this.institutionId = params.get('id') ?? '';
      if (this.institutionId) {
        this.institutionService.getById(this.institutionId).subscribe((res) => {
          this.institution = res;
        });
      }
    });

  }
}
