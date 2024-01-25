/* eslint-disable @typescript-eslint/dot-notation */
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment.development';
import { type IPage } from '../../model/interfaces/i-page';
import { type IPageable } from '../../model/interfaces/i-pageable';
import { type IUser } from '../../model/interfaces/i-user';
import { type IInstitution } from '../../model/interfaces/i-institution';
import { ITypeRole } from '../../model/type/i-type-role';

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

      this.http.get('http://localhost:8080/institution/users/page', { params: pageable })
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
            console.log(response);
            resolve(response);
          },
          error: (error) => {
            reject(error);
          }
        });
    });
  }

  public async getAllByInstitution (pageParams: IPage, institution: IInstitution): Promise<IPageable<IInstitution>> {
    return await new Promise<IPageable<IInstitution>>((resolve, reject) => {
      if (institution == null) { reject(new Error('Institution not found')); }
      const pageable: any = {
        page: pageParams.page,
        size: pageParams.size,
        sort: pageParams.sort
      };

      this.http.get('http://localhost:8080/institution/' + institution.id + '/users/page', { params: pageable })
        .subscribe({
          next: (res: any) => {
            const response: IPageable<IInstitution> = {
              page: res['number'],
              size: res['size'],
              sort: pageParams.sort,
              totalElements: res['totalElements'],
              totalPages: res['totalPages'],
              content: res['content']
            };
            console.log(response);
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
      this.http.get('http://localhost:8080/institution/users/' + id)
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

  public async create (user: IUser): Promise<IUser> {
    return await new Promise<IUser>((resolve, reject) => {
      console.log(user);
      const data: any = {
        email: user.email,
        password: user.password,
        // roles: user.role.map(role => ITypeRole[role]),
        roles: [
          'USER'
        ],
        institutionId: user.institutionId
      };

      console.log(data);
      console.log(data.roles);

      this.http.post('http://localhost:8080/institution/users', data)
        .subscribe({
          next: (res: any) => {
            if (res != null) {
              const userCreate: IUser = {
                id: res.id,
                email: res.email,
                password: res.password,
                role: res.role
              };
              console.log(res);
              resolve(userCreate);
            }
          },
          error: (error) => {
            reject(error);
          }
        });
    });
  }
}
