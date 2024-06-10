import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstitutionService } from '../../services/institution/institution.service';
import { IInstitution } from '../../model/interfaces/i-institution';
import { FilterModalComponent } from '../../components/filter-modal/filter-modal.component';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule, FilterModalComponent],
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  institutions: IInstitution[] = [];
  selectedInstitutions: Set<string> = new Set();
  selectAll: boolean = false;
  dropdownOpen: boolean = false;
  showModal = false;
  selectedSizes: { id: string, name: string }[] = []; // Mover el estado a ReportComponent

  constructor(private institutionService: InstitutionService) {}

  ngOnInit(): void {
    this.loadInstitutions();
  }

  loadInstitutions(): void {
    this.institutionService.getAll().subscribe(response => {
      this.institutions = response.content;
      // console.log(this.institutions);
    });
  }

  toggleSelectAll(): void {
    this.selectAll = !this.selectAll;
    if (this.selectAll) {
      this.institutions.forEach(inst => this.selectedInstitutions.add(inst.id!));
    } else {
      this.selectedInstitutions.clear();
    }
  }

  toggleInstitutionSelection(id: string): void {
    if (this.selectedInstitutions.has(id)) {
      this.selectedInstitutions.delete(id);
    } else {
      this.selectedInstitutions.add(id);
    }

    this.selectAll = this.selectedInstitutions.size === this.institutions.length;
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  updateSelectedSizes(sizes: any) {
    this.selectedSizes = sizes;
  }
  
}