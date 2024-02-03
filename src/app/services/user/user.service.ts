import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { type IPage } from '../../model/interfaces/i-page';
import { type IPageable } from '../../model/interfaces/i-pageable';
import { type IUser } from '../../model/interfaces/i-user';
import { type IInstitution } from '../../model/interfaces/i-institution';
import { ITypeRole } from '../../model/type/i-type-role';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly http = inject(HttpClient);

  public async getAllMock (page: number): Promise<any> {
    return await new Promise((resolve, _reject) => {
      setTimeout(() => {
        if (page === 0) {
          const response: IPageable<IUser> = {
            page: 0,
            size: 10,
            sort: ['email'],
            totalElements: 20,
            totalPages: 2,
            content: [
              {
                id: '1',
                email: 'ruben@example.com',
                role: [ITypeRole.USER]
              },
              {
                id: '2',
                email: 'miguel@example.com',
                role: [ITypeRole.USER]
              },
              {
                id: '3',
                email: 'fer@example.com',
                role: [ITypeRole.USER]
              },
              {
                id: '4',
                email: 'damian@example.com',
                role: [ITypeRole.USER]
              },
              {
                id: '5',
                email: 'pedro@example.com',
                role: [ITypeRole.USER]
              },
              {
                id: '6',
                email: 'jose@example.com',
                role: [ITypeRole.USER]
              },
              {
                id: '7',
                email: 'manuel@example.com',
                role: [ITypeRole.USER]
              },
              {
                id: '8',
                email: 'carlos@example.com',
                role: [ITypeRole.USER]
              },
              {
                id: '9',
                email: 'pedri@example.com',
                role: [ITypeRole.USER]
              },
              {
                id: '10',
                email: 'facundo@example.com',
                role: [ITypeRole.USER]
              }
            ]
          };
          resolve(response);
        } else {
          const response: IPageable<IUser> = {
            page: 1,
            size: 10,
            sort: ['email'],
            totalElements: 20,
            totalPages: 2,
            content: [
              {
                id: '11',
                email: 'manolo@example.com',
                role: [ITypeRole.USER]
              },
              {
                id: '12',
                email: 'firmento@example.com',
                role: [ITypeRole.USER]
              },
              {
                id: '13',
                email: 'fernando@example.com',
                role: [ITypeRole.USER]
              },
              {
                id: '14',
                email: 'couthino@example.com',
                role: [ITypeRole.USER]
              },
              {
                id: '15',
                email: 'samuel@example.com',
                role: [ITypeRole.USER]
              },
              {
                id: '16',
                email: 'borja@example.com',
                role: [ITypeRole.USER]
              },
              {
                id: '17',
                email: 'federico@example.com',
                role: [ITypeRole.USER]
              },
              {
                id: '18',
                email: 'daniel@example.com',
                role: [ITypeRole.USER]
              },
              {
                id: '19',
                email: 'sara@example.com',
                role: [ITypeRole.USER]
              },
              {
                id: '20',
                email: 'maria@example.com',
                role: [ITypeRole.USER]
              }
            ]
          };
          resolve(response);
        }
      }, 1000);
    });
  }

  public async getAll (pageParams: IPage): Promise<IPageable<IUser>> {
    return await new Promise<IPageable<IUser>>((resolve, reject) => {
      const pageable: any = {
        page: pageParams.page,
        size: pageParams.size,
        sort: pageParams.sort
      };

      this.http.get(environment.api.url + environment.api.institution + environment.api.users + '/page', { params: pageable })
        .subscribe({
          next: (res: any) => {
            if (res === null) return;
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

      this.http.get(environment.api.url + environment.api.institution + '/' + institution.id + environment.api.users + '/page', { params: pageable })
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
      this.http.get(environment.api.url + environment.api.institution + environment.api.users + '/' + id)
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
      const data: any = {
        email: user.email,
        password: user.password,
        roles: user.role.map(role => ITypeRole[role]),
        institutionId: user.institutionId
      };
      console.log(data);

      this.http.post(environment.api.url + environment.api.institution + environment.api.users, data)
        .subscribe({
          next: (res: any) => {
            if (res != null) {
              const userCreate: IUser = {
                id: res.id,
                email: res.email,
                password: res.password,
                role: res.role
              };
              resolve(userCreate);
            }
          },
          error: (error) => {
            reject(error);
          }
        });
    });
  }

  public async delete (data: IUser): Promise<any> {
    return await new Promise<any>((resolve, reject) => {
      this.http.delete(environment.api.url + environment.api.institution + environment.api.users, { body: data })
        .subscribe({
          next: (res) => {
            resolve(res);
          },
          error: (error) => {
            reject(error);
          }
        });
    });
  }

  public async update (data: IUser): Promise<any> {
    return await new Promise<any>((resolve, reject) => {
      console.log(data);
      this.http.put(environment.api.url + environment.api.institution + environment.api.users, data)
        .subscribe({
          next: (res: any) => {
            if (res != null) {
              const userCreate: IUser = {
                id: res.id,
                email: res.email,
                password: res.password,
                role: res.role
              };
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
