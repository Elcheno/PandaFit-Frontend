import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstitutionService } from '../../../services/institution/institution.service';
import { IInstitution } from '../../../model/interfaces/i-institution';
import { MultiSelectComponent } from '../multi-select/multi-select.component';

@Component({
  selector: 'app-institution-selector',
  standalone: true,
  imports: [CommonModule, MultiSelectComponent],
  templateUrl: './institution-selector.component.html',
  styleUrls: ['./institution-selector.component.scss']
})

export class InstitutionSelectorComponent implements OnInit {
  @Input() selectedSizes: { id: string, name: string }[] = [];
  @Output() selectedSizesUpdated = new EventEmitter<{ id: string, name: string }[]>();
  @Output() jsonGenerated = new EventEmitter();
  institutions: IInstitution[] = [];
  options: { id: string, name: string }[] = [];

  constructor(private institutionService: InstitutionService) {}

  ngOnInit() {
    this.loadInstitutions();
  }

  loadInstitutions(): void {
    this.institutionService.getAll().subscribe(response => {
      this.institutions = response.content;
      this.options = this.institutions
        .filter(inst => inst.id !== undefined)
        .map(inst => ({ id: inst.id as string, name: inst.name }));
      console.log(this.institutions);
    });
  }

  handleJsonGenerated(json: any) {
    this.jsonGenerated.emit(json);
    console.log('Generated JSON:', json);
  }
}