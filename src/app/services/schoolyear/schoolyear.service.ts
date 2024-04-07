import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment.development';
import { type IPage } from '../../model/interfaces/i-page';
import { ISchoolYear } from '../../model/interfaces/i-school-year';
import { AuthService } from '../auth/auth.service';
import { Observable, catchError, map, take, throwError } from 'rxjs';
import { IPageable } from '../../model/interfaces/i-pageable';
import { ToastService } from '../modal/toast.service';

/**
 * Service for handling school year data.
 */
@Injectable({
  providedIn: 'root'
})
export class SchoolyearService {
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);
  private readonly toastService = inject(ToastService);

  /**
   * Retrieves mock data for all school years.
   * @returns A promise that resolves to an array of school years.
   */
  public async getAllMock(): Promise<ISchoolYear[]> {
    return await new Promise((resolve, _reject) => {
      const data: ISchoolYear[] = [
        {
          id: '1',
          name: '1A',
          institutionId: '1'
        },
        {
          id: '2',
          name: '1B',
          institutionId: '1'
        }
      ]
      resolve(data);
    });
  }

  /**
   * Retrieves all school years by institution.
   * @param pageParams Page parameters for pagination.
   * @param id The ID of the institution.
   * @returns An observable of type `IPageable<ISchoolYear>` containing the paginated list of school years.
   */
  public getAllByInstitution(pageParams: IPage, id: any): Observable<IPageable<ISchoolYear>> {
    const sessionData = this.authService.sessionData();
    const token = sessionData?.token;

    return this.http.get<IPageable<ISchoolYear>>(env.api.url + env.api.institution + "/" + id + env.api.schoolyear +'/page', { params: pageParams as any, headers: { Authorization: token ?? "" } })  
    .pipe(
        catchError((error) => {
          const errorMessage = `Error al cargar los registros. ${error.message}`;
          this.toastService.showToast('Error al cargar los registros', 'error');
          return throwError(() => errorMessage);
        }),
        map((res: any) => {
          return res as IPageable<ISchoolYear>;
        }),
        take(1)
      );
  }

  public getAllInstitutionsFilteringByName(pageParams: IPage, name: string, id: string): Observable<IPageable<ISchoolYear>> {
    const sessionData = this.authService.sessionData();
    const token = sessionData?.token;

    console.log(name, id);
    

    const queryParams = {
      ...pageParams,
      name, // Add the name parameter for filtering
    };

    return this.http.get<IPageable<ISchoolYear>>(`http://localhost:8080/institution/${id}/schoolYear/name`, { params: queryParams as any, headers: { Authorization: token ?? "" } })
    .pipe(
      catchError((error) => {
        const errorMessage = `Error al cargar los registros. ${error.message}`;
        this.toastService.showToast('Error al cargar los registros', 'error');
        return throwError(() => errorMessage);
      }),
      map((res: any) => {
        return res as IPageable<ISchoolYear>;
      }),
      take(1)
    );
  }

  /**
   * Retrieves a school year by ID.
   * @param id The ID of the school year.
   * @returns An observable of type `ISchoolYear` containing the retrieved school year.
   */
  public getById(id: string): Observable<ISchoolYear> {
    const sessionData = this.authService.sessionData();
    const token = sessionData?.token;
    
    return this.http.get<ISchoolYear>(`${env.api.url}${env.api.institution}${env.api.schoolyear}/${id}`, { headers: { Authorization: token ?? "" } })
      .pipe(
        map((res: any) => {
          return res as ISchoolYear;
        }),
        take(1)
      )
  }

  /**
   * Creates a new school year.
   * @param schoolYear The school year data to be created.
   * @param id The ID of the institution.
   * @returns An observable of type `ISchoolYear` containing the created school year.
   */
  public create(schoolYear: any, id: any): Observable<ISchoolYear> {
    const sessionData = this.authService.sessionData();
    const token = sessionData?.token;

    const data: any = {
      name: schoolYear.name,
      institutionId: id
    };

    return this.http.post<ISchoolYear>(env.api.url + env.api.institution + env.api.schoolyear, data, { headers: { Authorization: token ?? "" } })
      .pipe(
        map((res: any) => {
          const response: ISchoolYear = {
            id: res.id,
            name: res.name,
            institutionId: res.institutionId
          }
          return response;
        }),
        take(1)
      )
  }

  /**
   * Updates an existing school year.
   * @param data The updated school year data.
   * @returns An observable of type `ISchoolYear` containing the updated school year.
   */
  public update(data: ISchoolYear): Observable<ISchoolYear> {
    const sessionData = this.authService.sessionData();
    const token = sessionData?.token;

    return this.http.put<ISchoolYear>(env.api.url + env.api.institution + env.api.schoolyear, data, { headers: { Authorization: token ?? "" } })
      .pipe(
        map((res: any) => {
          const response: ISchoolYear = {
            id: res.id,
            name: res.name,
            institutionId: res.institutionId
          }
          return response;
        }),
        take(1)
      )
  }

  /**
   * Deletes a school year.
   * @param data The school year data to be deleted.
   * @returns An observable of type `boolean` indicating the success of the deletion operation.
   */
  public delete(data: ISchoolYear): Observable<boolean> {
    const sessionData = this.authService.sessionData();
    const token = sessionData?.token;

    return this.http.delete<boolean>(env.api.url + env.api.institution + env.api.schoolyear, { body: data, headers: { Authorization: token ?? "" } })
      .pipe(
        map((res: boolean) => {
          return res;
        }),
        take(1)
      )
  }
}
