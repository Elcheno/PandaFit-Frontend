import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {
  private http = inject(HttpClient);

  public async getAll(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/institutions')
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
