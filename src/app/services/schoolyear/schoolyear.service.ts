import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment.development';
import { type IPage } from '../../model/interfaces/i-page';
import { ISchoolYear } from '../../model/interfaces/i-school-year';
import { AuthService } from '../auth/auth.service';
import { Observable, map, take } from 'rxjs';
import { IPageable } from '../../model/interfaces/i-pageable';

@Injectable({
  providedIn: 'root'
})
export class SchoolyearService {
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);

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

  public getAllByInstitution(pageParams: IPage, id: any): Observable<IPageable<ISchoolYear>> {
    const sessionData = this.authService.sessionData();
    const token = sessionData?.token;

    return this.http.get<IPageable<ISchoolYear>>(env.api.url + env.api.institution + "/" + id + env.api.schoolyear +'/page', { params: pageParams as any, headers: { Authorization: token ?? "" } })
      .pipe(
        map((res: any) => {
          return res as IPageable<ISchoolYear>;
        }),
        take(1)
      );
  }

  public getById(id: string): Observable<ISchoolYear> {
    const sessionData = this.authService.sessionData();
    const token = sessionData?.token;
    
    return this.http.get<ISchoolYear>(env.api.url + env.api.schoolyear + id, { headers: { Authorization: token ?? "" } })
      .pipe(
        map((res: any) => {
          return res as ISchoolYear;
        }),
        take(1)
      )
  }

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
