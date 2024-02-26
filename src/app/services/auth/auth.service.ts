import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, catchError, map, take } from 'rxjs';
import { environment as env } from '../../../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  public sessionData = signal<any>(null);

  public uuid: string = '12345';

  public setSessionData (data: any): void {
    this.sessionData.set(data);
  }

  public loadSessionData (): void {
    const sessionData = window.localStorage.getItem('sessionData');
    if (sessionData) {
      this.setSessionData(JSON.parse(sessionData));
    }
  }

  public login (data: any): Observable<any> {
    const body: any = {
      email: data.email,
      uuid: data.uuid
    }
    return this.http.post<any>('http://localhost:8080/login', body)
      .pipe(
        catchError((error) => {
          return error;
        }),
        map((res: any) => {
          this.setSession(res);
          return res;
        }),
        take(1)
      )
  }

  public async logOut (): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        try {
          // this.setSessionData(null);
          this.sessionData.set(null);
          window.localStorage.removeItem('sessionData');
          this.router.navigateByUrl('/login');
          resolve();
        } catch (error) {
          reject(error);
        }
      }, 1000);
    });
  }

  public setSession (data: any): void {
    try {
      const user = {
        email: data.email,
        token: data.token,
        roles: data.roles
      };
      this.setSessionData(user);
      window.localStorage.setItem('sessionData', JSON.stringify(user));
    } catch (error) {
      console.error(error);
    }
  }
}
