import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { type IPage } from '../../model/interfaces/i-page';
import { type IPageable } from '../../model/interfaces/i-pageable';
import { type IUser } from '../../model/interfaces/i-user';
import { type IInstitution } from '../../model/interfaces/i-institution';
import { ITypeRole } from '../../model/type/i-type-role';
import { environment } from '../../../environments/environment.development';
import { Observable, map, take } from 'rxjs';
import { AuthService } from '../auth/auth.service';

/**
 * Service for managing user-related operations.
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);

  /**
   * Fetches mock user data.
   * @param page - Page number.
   * @returns Promise resolving with mock user data.
   */
  public async getAllMock (page: number): Promise<any> {
    return await new Promise((resolve, _reject) => {
      setTimeout(() => {
        if (page === 0) {
          const response: IPageable<IUser> = {
            page: 0,
            size: 10,
            sort: ['email'],
            totalElements: 16,
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
            totalElements: 16,
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
              }
            ]
          };
          resolve(response);
        }
      }, 1000);
    });
  }

  /**
   * Fetches all users.
   * @param pageParams - Page parameters.
   * @returns Observable emitting pageable user data.
   */
  public getAll (pageParams?: IPage): Observable<IPageable<IUser>> {
    const sessionData = this.authService.sessionData();
    const token = sessionData?.token;

    return this.http.get<IPageable<IUser>>(`${environment.api.url}${environment.api.institution}${environment.api.users}/page`, { params: pageParams as any, headers: { Authorization: token ?? "" } })
      .pipe(
        map((res: any) => {
          const response: IPageable<IUser> = {
            page: res['number'],
            size: res['size'],
            sort: pageParams?.sort ?? ['email'],
            totalElements: res['totalElements'],
            totalPages: res['totalPages'],
            content: res['content']
          };
          return response;
        }),
        take(1)
      );
  }

  /**
   * Fetches all users belonging to a specific institution.
   * @param institutionId - ID of the institution.
   * @param pageParams - Page parameters.
   * @returns Observable emitting pageable user data.
   */
  public getAllByInstitution (institutionId: string, pageParams?: IPage, ): Observable<IPageable<IUser>> {
    const sessionData = this.authService.sessionData();
    const token = sessionData?.token;

    return this.http.get<IPageable<IUser>>(`${environment.api.url}${environment.api.institution}/${institutionId}${environment.api.users}/page`, { params: pageParams as any, headers: { Authorization: token ?? "" } })
      .pipe(
        map((res: any) => {
          const response: IPageable<IUser> = {
            page: res['number'],
            size: res['size'],
            sort: pageParams?.sort ?? ['email'],
            totalElements: res['totalElements'],
            totalPages: res['totalPages'],
            content: res['content']
          };
          return response;
        }),
        take(1)
      );
  }

  /**
   * Fetches a user by ID.
   * @param id - User ID.
   * @returns Observable emitting user data.
   */
  public getById (id: string): Observable<IUser> {
    const sessionData = this.authService.sessionData();
    const token = sessionData?.token;

    return this.http.get<IUser>(`${environment.api.url}${environment.api.institution}${environment.api.users}/${id}`, { headers: { Authorization: token ?? "" } })
      .pipe(
        map((res: any) => {
          const response: IUser = {
            id: res.id,
            email: res.email,
            password: res.password,
            role: res.role
          };
          return response;
        }),
        take(1)
      );
  }

  /**
   * Creates a new user.
   * @param user - User data to create.
   * @returns Observable emitting created user data.
   */
  public create (user: IUser): Observable<IUser> {
    const sessionData = this.authService.sessionData();
    const token = sessionData?.token;

    const data: any = {
      email: user.email,
      password: user.password,
      roles: user.role.map(role => ITypeRole[role]),
      institutionId: user.institutionId
    };

    return this.http.post<IUser>(`${environment.api.url}${environment.api.institution}${environment.api.users}`, data, { headers: { Authorization: token ?? "" } })
      .pipe(
        map((res: any) => {
          const response: IUser = { ...res };
          return response;
        }),
        take(1)
      );
  }

  /**
   * Deletes a user.
   * @param data - User data to delete.
   * @returns Observable emitting a boolean indicating success or failure.
   */
  public delete (data: IUser): Observable<boolean> {
    const sessionData = this.authService.sessionData();
    const token = sessionData?.token;

    return this.http.delete<boolean>(`${environment.api.url}${environment.api.institution}${environment.api.users}`, { body: data, headers: { Authorization: token ?? "" } })
      .pipe(
        map((res: boolean) => {
          return res;
        }),
        take(1)
      );
  }

  /**
   * Updates a user.
   * @param data - User data to update.
   * @returns Observable emitting updated user data.
   */
  public update (data: IUser): Observable<IUser> {
    const sessionData = this.authService.sessionData();
    const token = sessionData?.token;

    const dataUpdate: any = {
      id: data.id,
      email: data.email,
      password: data.password,
    }
    return this.http.put<IUser>(`${environment.api.url}${environment.api.institution}${environment.api.users}`, dataUpdate, { headers: { Authorization: token ?? "" } })
      .pipe(
        map((res: any) => {
          const response: IUser = { ...res };
          return response;
        })
      );
  }
}
