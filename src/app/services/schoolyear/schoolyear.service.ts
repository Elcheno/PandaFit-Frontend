import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env, environment } from '../../../environments/environment.development';
import { type IPage } from '../../model/interfaces/i-page';
import { type IInstitution } from '../../model/interfaces/i-institution';
import { ISchoolYear } from '../../model/interfaces/i-school-year';

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

  public async getAllByInstitution(pageParams: IPage, institution: IInstitution): Promise<any> {
    return await new Promise((resolve, reject) => {
      const pageable: any = {
        page: pageParams.page,
        size: pageParams.size,
        sort: pageParams.sort
      };

      // this.http.get('http://localhost:8080/institution/' + institution.id + '/schoolYear/page', { params: pageable })
      this.http.get('http://localhost:8080/institution/' + 'a81e752b-a9bb-4652-8f6a-3369b4abcd04' + '/schoolYear/page', { params: pageable })
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

  public async create(schoolYear: any): Promise<ISchoolYear> {
    return await new Promise<ISchoolYear>((resolve, reject) => {
      const data: any = {
        name: schoolYear.name,
        institutionId: 'a81e752b-a9bb-4652-8f6a-3369b4abcd04'
      };

      this.http.post(environment.api.url + environment.api.institution + environment.api.schoolyear, data)
        .subscribe({
          next: (res: any) => {
            if (res != null) {
              const schoolYearCreate: ISchoolYear = {
                id: res.id,
                name: res.name,
                institutionId: res.institutionId
              };
              resolve(schoolYearCreate);
            }
          },
          error: (error) => {
            reject(error);
          }
        });
    });
  }

  public async update(data: ISchoolYear): Promise<any> {
    return await new Promise<any>((resolve, reject) => {
      console.log(data);
      this.http.put(environment.api.url + environment.api.institution + environment.api.schoolyear, data)
        .subscribe({
          next: (res: any) => {
            if (res != null) {
              const schoolYearCreate: ISchoolYear = {
                id: data.id,
                name: res.name,
              };
              resolve(schoolYearCreate);
            }
          },
          error: (error) => {
            reject(error);
          }
        });
    });
  }


  public async delete(data: any): Promise<any> {
    return await new Promise((resolve, reject) => {
      this.http.delete(env.api.url + env.api.schoolyear, { body: data })
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
}
