import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment.development';
import { type IPage } from '../../model/interfaces/i-page';
import { type IInstitution } from '../../model/interfaces/i-institution';

@Injectable({
  providedIn: 'root'
})
export class SchoolyearService {
  private readonly http = inject(HttpClient);

  public async getAllMock (): Promise<any> {
    return await new Promise((resolve, _reject) => {
      resolve({ data: [] });
    });
  }

  public async getAllByInstitution (pageParams: IPage, institution: IInstitution): Promise<any> {
    return await new Promise((resolve, reject) => {
      const pageable: any = {
        page: pageParams.page,
        size: pageParams.size,
        sort: pageParams.sort
      };

      this.http.get('http://localhost:8080/institution/' + institution.id + '/schoolYear/page', { params: pageable })
        .subscribe({
          next: (data) => {
            console.log(data);
            resolve(data);
          },
          error: (error) => {
            reject(error);
          }
        });
    });
  }

  public async getById (id: string): Promise<any> {
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

  public async create (data: any): Promise<any> {
    return await new Promise((resolve, reject) => {
      this.http.post(env.api.url + env.api.schoolyear, { body: data })
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

  public async update (data: any): Promise<any> {
    return await new Promise((resolve, reject) => {
      this.http.put(env.api.url + env.api.schoolyear, { body: data })
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

  public async delete (data: any): Promise<any> {
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
