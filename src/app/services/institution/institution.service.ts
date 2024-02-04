/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/dot-notation */
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { type IInstitution } from '../../model/interfaces/i-institution';
import { type IPageable } from '../../model/interfaces/i-pageable';
import { type IPage } from '../../model/interfaces/i-page';

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

  public async getAll (pageParams: IPage): Promise<IPageable<IInstitution>> {
    return await new Promise<IPageable<IInstitution>>((resolve, reject) => {
      const pageable: any = {
        page: pageParams.page,
        size: pageParams.size,
        sort: pageParams.sort
      };

      this.http.get('http://localhost:8080/institution/' + 'page', { params: pageable })
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
      this.http.get('http://localhost:8080/institution/' + id)
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
      this.http.post('http://localhost:8080/institution', data)
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
      console.log(data);
      this.http.delete('http://localhost:8080/institution', { body: data })
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
      this.http.put('http://localhost:8080/institution', data)
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
