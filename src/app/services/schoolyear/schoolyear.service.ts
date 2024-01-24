import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment.development';

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

  public async getAll (): Promise<any> {
    return await new Promise((resolve, reject) => {
      this.http.get(env.api.url + env.api.schoolyear + '/page')
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
