import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment.development';

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

  public async getAll (): Promise<any> {
    return await new Promise((resolve, reject) => {
      this.http.get(env.api.url + env.api.users + '/page')
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
