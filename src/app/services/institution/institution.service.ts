/* eslint-disable @typescript-eslint/dot-notation */
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment.development';
import { type IInstitution } from '../../model/interfaces/i-institution';
import { type IPageable } from '../../model/interfaces/i-pageable';
import { type IPage } from '../../model/interfaces/i-page';

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {
  private readonly http = inject(HttpClient);

  public async getAllMock (): Promise<IInstitution[]> {
    return await new Promise((resolve, _reject) => {
      const data: IInstitution[] = [];
      resolve(data);
    });
  }

  public async getAll (pageParams: IPage): Promise<IPageable<IInstitution>> {
    return await new Promise<IPageable<IInstitution>>((resolve, reject) => {
      const pageable: any = {
        page: pageParams.page,
        size: pageParams.size,
        sort: pageParams.sort
      };

      this.http.get(env.api.url + env.api.institutions + 'page', { params: pageable })
        .subscribe({
          next (res: any) {
            console.log(res);
            const response: IPageable<IInstitution> = {
              page: res['number'],
              size: res['size'],
              sort: pageParams.sort,
              totalElements: res['totalElements'],
              totalPages: res['totalPages'],
              content: res['content']
            };
            resolve(response);
          },
          error: (error) => {
            reject(error);
          }
        });
    });
  }

  public async getById (id: string): Promise<any> {
    return await new Promise((resolve, reject) => {
      this.http.get(env.api.url + env.api.institutions + id)
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
      this.http.post(env.api.url + env.api.institutions, data)
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
      this.http.delete(env.api.url + env.api.institutions, { body: data })
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
      this.http.put(env.api.url + env.api.institutions, { body: data })
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
