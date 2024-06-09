import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { MultiSelectComponent } from '../multi-select/multi-select.component';
import { ISchoolYear } from '../../../model/interfaces/i-school-year';
import { SchoolyearService } from '../../../services/schoolyear/schoolyear.service';
import { InstitutionService } from '../../../services/institution/institution.service'; // Asegúrate de importar el servicio aquí
import { forkJoin, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-schoolyear-selector',
  standalone: true,
  imports: [MultiSelectComponent],
  templateUrl: './schoolyear-selector.component.html',
  styleUrls: ['./schoolyear-selector.component.scss']
})
export class SchoolyearSelectorComponent implements OnInit, OnChanges {
  @Input() selectedInstitutions: { id: string, name: string }[] = [];
  @Input() selectedSizes: { id: string, name: string }[] = [];
  @Output() selectedSizesUpdated = new EventEmitter<{ id: string, name: string }[]>();
  @Output() jsonGenerated = new EventEmitter<any>();
  schoolyears: ISchoolYear[] = [];
  options: { id: string, name: string, institutionNmae?: string }[] = [];

  constructor(
    private schoolYearService: SchoolyearService,
    private institutionService: InstitutionService // Inyecta el servicio de instituciones
  ) {}

  ngOnInit() {
    if (this.selectedInstitutions.length > 0) {
      this.loadSchoolyears();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedInstitutions'] && !changes['selectedInstitutions'].firstChange) {
      this.loadSchoolyears();
    }
  }

  loadSchoolyears(): void {
    if (this.selectedInstitutions.length === 0) {
      this.options = [];
      return;
    }

    // Primero, obtenemos los IDs de las instituciones
    const institutionObservables = this.selectedInstitutions.map(institution =>
      this.institutionService.filterByName(institution.name).pipe(
        catchError(error => {
          console.error(`Error al cargar la institución ${institution.name}:`, error);
          return of(null); // Retornar null en caso de error
        })
      )
    );

    forkJoin(institutionObservables).pipe(
      switchMap(institutions => {
        // Filtrar los resultados nulos
        const validInstitutions = institutions.filter(inst => inst && inst.content);
        const institutionIds = validInstitutions.flatMap(inst => inst!.content.map(i => i.id));

        // Ahora, obtenemos los años escolares utilizando los IDs
        const schoolyearObservables = institutionIds.map(id => {
          if (id !== undefined) {
            return this.schoolYearService.getAllByInstitution({ page: 0, size: 100 }, encodeURIComponent(id)).pipe(
              catchError(error => {
                console.error(`Error al cargar los registros para la institución ${id}:`, error);
                return of({ content: [] }); // Retornar un array vacío en caso de error
              })
            );
          }
          return of({ content: [] });
        });

        return forkJoin(schoolyearObservables);
      })
    ).subscribe(responses => {
      this.schoolyears = responses.flatMap(response => response.content);
      this.options = this.schoolyears.map(schoolyear => ({ id: schoolyear.id!, name: schoolyear.name }));
      console.log(this.schoolyears);
    });
  }

  handleJsonGenerated(json: any) {
    this.jsonGenerated.emit(json);
    console.log('Generated JSON:', json);
  }

  toggleSize(size: { id: string, name: string }, event: Event) {
    event.preventDefault();
    event.stopPropagation();

    const index = this.selectedSizes.findIndex(s => s.id === size.id);
    if (index >= 0) {
      this.selectedSizes.splice(index, 1);
    } else {
      this.selectedSizes.push(size);
    }

    this.selectedSizesUpdated.emit([...this.selectedSizes]);
    this.emitJson();
  }

  emitJson() {
    const json = {
      input: {
        field: 'curso',
        type: 'multiple',
        body: this.selectedSizes.map(size => size.id)
      }
    };
    this.jsonGenerated.emit(json);
    console.log('Generated JSON:', json);
  }
}