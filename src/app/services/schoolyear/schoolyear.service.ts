import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env, environment } from '../../../environments/environment.development';
import { type IPage } from '../../model/interfaces/i-page';
import { type IInstitution } from '../../model/interfaces/i-institution';
import { ISchoolYear } from '../../model/interfaces/i-school-year';
import { Observable, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SchoolyearService {
  private readonly http = inject(HttpClient);

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

  public async getAllByInstitution(pageParams: IPage, id: any): Promise<any> {
    return await new Promise((resolve, reject) => {
      const pageable: any = {
        page: pageParams.page,
        size: pageParams.size,
        sort: pageParams.sort
      };

      // this.http.get('http://localhost:8080/institution/' + institution.id + '/schoolYear/page', { params: pageable })
      this.http.get('http://localhost:8080/institution/' + id + '/schoolYear/page', { params: pageable })
        .subscribe({
          next: (data) => {
            // console.log(data);
            resolve(data);
          },
          error: (error) => {
            reject(error);
          }
        });
    });
  }

  public async getById(id: string): Promise<any> {
    return await new Promise((resolve, reject) => {
      this.http.get(env.api.url + env.api.schoolyear + id)
        .subscribe({
          next: (data) => {
            resolve(data);
          },
          error: (error) => {
            reject(error);
          }
        });
    });
  }

  public create(schoolYear: any, id:any): Observable<ISchoolYear> {
    const data: any = {
      name: schoolYear.name,
      institutionId: id
    };

    return this.http.post<ISchoolYear>(`${environment.api.url}${environment.api.institution}${environment.api.schoolyear}`, data)
      .pipe(
        map((res: any) => {
          const response: ISchoolYear = { ...res };
          return response;
        }),
        take(1)
      );
  }

  public update(data: ISchoolYear): Observable<any> {
    const dataUpdate: any = {
      id: data.id,
      name: data.name,
    }
    console.log(dataUpdate)
    return this.http.put<ISchoolYear>(`${environment.api.url}${environment.api.institution}${environment.api.schoolyear}`, dataUpdate)
      .pipe(
        map((res: any) => {
          const response: ISchoolYear = { ...res };
          return response;
        })
      );
  }

  public delete(data: ISchoolYear): Observable<ISchoolYear> {
    return this.http.delete<ISchoolYear>(`${environment.api.url}${environment.api.institution}${environment.api.schoolyear}`, { body: data })
      .pipe(
        map((res: any) => {
          const response: ISchoolYear = { ...res };
          return response;
        }),
        take(1)
      );
  }
}
