/* eslint-disable @typescript-eslint/dot-notation */
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment.development';
import { type IPage } from '../../model/interfaces/i-page';
import { type IPageable } from '../../model/interfaces/i-pageable';
import { type IUser } from '../../model/interfaces/i-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly http = inject(HttpClient);

  public async getAllMock (): Promise<any> {
    return await new Promise((resolve, _reject) => {
      resolve({ data: [] });
    });
  }

  public async getAll (pageParams: IPage): Promise<IPageable<IUser>> {
    return await new Promise<IPageable<IUser>>((resolve, reject) => {
      const pageable: any = {
        page: pageParams.page,
        size: pageParams.size,
        sort: pageParams.sort
      };

      this.http.get(env.api.url + env.api.users + '/page', { params: pageable })
        .subscribe({
          next: (res: any) => {
            const response: IPageable<IUser> = {
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
      this.http.get(env.api.url + env.api.users + id)
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
