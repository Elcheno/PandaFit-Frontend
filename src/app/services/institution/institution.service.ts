import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {
  private readonly http = inject(HttpClient);

  public async getAll (): Promise<any> {
    return await new Promise((resolve, reject) => {
      this.http.get(environment.api.url + environment.api.institutions + '/page')
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

  public async getInstitutionById (id: string): Promise<any> {
    return await new Promise((resolve, reject) => {
      this.http.get(environment.api.url + environment.api.institutions + id)
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
