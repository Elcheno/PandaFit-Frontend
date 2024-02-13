import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { type IInstitution } from '../../model/interfaces/i-institution';
import { type IPageable } from '../../model/interfaces/i-pageable';
import { type IPage } from '../../model/interfaces/i-page';
import { Observable, map, take } from 'rxjs';
import { environment as env } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {
  private readonly http = inject(HttpClient);

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

  public getAll (pageParams?: IPage): Observable<IPageable<IInstitution>> {
    return this.http.get<IPageable<IInstitution>>(`${env.api.url}${env.api.institution}/page`, { params: pageParams as any })
      .pipe(
        map((res: any) => {
          const response: IPageable<IInstitution> = {
            page: res['number'],
            size: res['size'],
            sort: pageParams?.sort ?? ['name'],
            totalElements: res['totalElements'],
            totalPages: res['totalPages'],
            content: res['content']
          };
          return response;
        }),
        take(1)
      );
  }

  public getById (id: string): Observable<IInstitution> {
    return this.http.get<IInstitution>(`${env.api.url}${env.api.institution}/${id}`)
      .pipe(
        map((res: any) => {
          const response: IInstitution = { ...res };
          return response;
        }),
        take(1)
      );
  }

  public create (data: any): Observable<IInstitution> {
    return this.http.post<IInstitution>(`${env.api.url}${env.api.institution}`, data)
      .pipe(
        map((res: any) => {
          const response: IInstitution = { ...res };
          return response;
        }),
        take(1)
      );
  }

  public delete (data: any): Observable<IInstitution> {
    return this.http.delete<IInstitution>(`${env.api.url}${env.api.institution}`, { body: data })
    .pipe(
      map((res: any) => {
        const response: IInstitution = { ...res };
        return response;
      }),
      take(1)
    );
  }

  public update (data: any): Observable<IInstitution> {
    return this.http.put<IInstitution>(`${env.api.url}${env.api.institution}`, data)
      .pipe(
        map((res: any) => {
          const response: IInstitution = { ...res };
          return response;
        }),
        take(1)
      );
  }
}
