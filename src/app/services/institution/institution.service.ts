import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { type IInstitution } from '../../model/interfaces/i-institution';
import { type IPageable } from '../../model/interfaces/i-pageable';
import { type IPage } from '../../model/interfaces/i-page';
import { Observable, catchError, map, of, take, throwError } from 'rxjs';
import { environment as env } from '../../../environments/environment.development';
import { AuthService } from '../auth/auth.service';
import { ToastService } from '../modal/toast.service';
import { StoreService } from '../store/store.service';

/**
 * Service for managing institutions.
 */
@Injectable({
  providedIn: 'root'
})
export class InstitutionService {
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);
  private readonly toastService = inject(ToastService);
  private readonly storeService = inject(StoreService);

  /**
   * Retrieves mock institutions for testing.
   * @param page - The page number for pagination.
   * @returns Promise resolving with paginated institution data.
   */
  public async getAllMock (page?: number): Promise<IPageable<IInstitution>> {
    return await new Promise((resolve, _reject) => {
      if (page !== undefined) {
        if (page === 0) {
          setTimeout(() => {
            const data: IPageable<IInstitution> = {
              page: 0,
              size: 10,
              sort: ['name'],
              totalElements: 12,
              totalPages: 2,
              content: [
                {
                  id: '1',
                  name: 'Institution 1',
                },
                {
                  id: '2',
                  name: 'Institution 2',
                },
                {
                  id: '3',
                  name: 'Institution 3',
                },
                {
                  id: '4',
                  name: 'Institution 4',
                },
                {
                  id: '5',
                  name: 'Institution 5',
                },
                {
                  id: '6',
                  name: 'Institution 6',
                },
                {
                  id: '7',
                  name: 'Institution 7',
                },
                {
                  id: '8',
                  name: 'Institution 8',
                },
                {
                  id: '9',
                  name: 'Institution 9',
                },
                {
                  id: '10',
                  name: 'Institution 10',
                },
              ]
            };
            resolve(data);
          }, 1000);
        } else {
          setTimeout(() => {
            const data: IPageable<IInstitution> = {
              page: 1,
              size: 10,
              sort: ['name'],
              totalElements: 12,
              totalPages: 2,
              content: [
                {
                  id: '11',
                  name: 'Institution 11',
                },
                {
                  id: '12',
                  name: 'Institution 12',
                }
              ]
            };
            resolve(data);
          }, 1000);
        }
      } else {
        setTimeout(() => {
          const data: IPageable<IInstitution> = {
            page: 0,
            size: 10,
            sort: ['name'],
            totalElements: 3,
            totalPages: 1,
            content: [
              {
                id: '1',
                name: 'Institution 1',
              },
              {
                id: '2',
                name: 'Institution 2',
              },
              {
                id: '3',
                name: 'Institution 3',
              }
            ]
          };
          resolve(data);
        }, 1000);
      }
    });
  }

  /**
   * Retrieves all institutions from the server.
   * @param pageParams - Pagination parameters for the request.
   * @returns Observable of paginated institution data.
   */
  public getAll (pageParams?: IPage): Observable<IPageable<IInstitution>> {
    const cacheData = this.storeService.institutionStore.getData();
    if (!(this.storeService.institutionStore.rehidrate() || this.storeService.institutionStore.reload()) && cacheData) return of(cacheData);

    const sessionData = this.authService.sessionData();
    const token = sessionData?.token;

    return this.http.get<IPageable<IInstitution>>(`${env.api.url}${env.api.institution}/page`, { params: pageParams as any, headers: { Authorization: token ?? "" } })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const errorMessage = `Error al cargar los registros. ${error.message}`
          this.toastService.showToast('Error al cargar los registros', 'error');
          return throwError(() => errorMessage);
        }),
        map((res: any) => {
          const response: IPageable<IInstitution> = {
            page: res['number'],
            size: res['size'],
            sort: pageParams?.sort ?? ['name'],
            totalElements: res['totalElements'],
            totalPages: res['totalPages'],
            content: res['content']
          };
          this.storeService.institutionStore.setData(response);          
          return response;
        }),
        take(1)
      );
  }

  public filterByName(name: string, pageParams?: IPage): Observable<IPageable<IInstitution>> {
    const sessionData = this.authService.sessionData();
    const token = sessionData?.token;
  
    const queryParams = {
      ...pageParams,
      name, // Add the name parameter for filtering
    };

    return this.http.get<IPageable<IInstitution>>(`${env.api.url}${env.api.institution}/page/name`, {
      params: queryParams as any,
      headers: { Authorization: token ?? "" },
    })
    .pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle errors gracefully
        const errorMessage = `Error al cargar los registros. ${error.message}`;
        this.toastService.showToast('Error al cargar los registros', 'error');
        return throwError(() => errorMessage);
      }),
      map((res: any) => {
        // Map the response to your IPageable interface
        const response: IPageable<IInstitution> = {
          page: res['number'],
          size: res['size'],
          sort: queryParams?.sort ?? ['name'],
          totalElements: res['totalElements'],
          totalPages: res['totalPages'],
          content: res['content'],
        };
        return response;
      }),
      take(1) // Ensure only one emission
    );
  }
  

  /**
   * Retrieves a single institution by its ID.
   * @param id - The ID of the institution to retrieve.
   * @returns Observable of the retrieved institution.
   */
  public getById (id: string): Observable<IInstitution> {
    const sessionData = this.authService.sessionData();
    const token = sessionData?.token;

    return this.http.get<IInstitution>(`${env.api.url}${env.api.institution}/${id}`, { headers: { Authorization: token ?? "" } })
      .pipe(
        map((res: any) => {
          const response: IInstitution = { ...res };
          return response;
        }),
        take(1)
      );
  }

  /**
   * Creates a new institution.
   * @param data - Data for the new institution.
   * @returns Observable of the created institution.
   */
  public create (data: any): Observable<IInstitution> {
    const sessionData = this.authService.sessionData();
    const token = sessionData?.token;

    return this.http.post<IInstitution>(`${env.api.url}${env.api.institution}`, data, { headers: { Authorization: token ?? "" } })
      .pipe(
        map((res: any) => {
          const response: IInstitution = { ...res };
          return response;
        }),
        take(1)
      );
  }

  /**
   * Deletes an institution.
   * @param data - Data of the institution to delete.
   * @returns Observable of the deleted institution.
   */
  public delete (data: any): Observable<IInstitution> {
    const sessionData = this.authService.sessionData();
    const token = sessionData?.token;

    return this.http.delete<IInstitution>(`${env.api.url}${env.api.institution}`, { body: data , headers: { Authorization: token ?? "" } })
    .pipe(
      map((res: any) => {
        const response: IInstitution = { ...res };
        return response;
      }),
      take(1)
    );
  }

  /**
   * Updates an institution.
   * @param data - Data of the institution to update.
   * @returns Observable of the updated institution.
   */
  public update (data: any): Observable<IInstitution> {
    const sessionData = this.authService.sessionData();
    const token = sessionData?.token;

    return this.http.put<IInstitution>(`${env.api.url}${env.api.institution}`, data, { headers: { Authorization: token ?? "" } })
      .pipe(
        map((res: any) => {
          const response: IInstitution = { ...res };
          return response;
        }),
        take(1)
      );
  }
}
