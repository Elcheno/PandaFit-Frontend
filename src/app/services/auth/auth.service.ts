import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, catchError, map, sequenceEqual, take } from 'rxjs';
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
    return this.http.post<any>(`${env.api.url}${env.api.login}`, body)
      .pipe(
        catchError((error) => {
          return error;
        }),
        map((res: any) => {
          if (!res?.token) {
            return null;
          }
          this.setSession(res);
          return res;
        }),
        take(1)
      )
  }

  public async logOut (): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      try {
        this.setSessionData(null);
        window.localStorage.removeItem('sessionData');
        this.router.navigateByUrl('/login');
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  public setSession(data: any): void {
    try {
      const user = {
        id: data.id,
        email: data.email,
        token: data.token,
        roles: data.roles,
      };

      this.setSessionData(user);
      window.localStorage.setItem('sessionData', JSON.stringify(user));
      
    } catch (error) {
      console.error(error);
    }
  }

  public getRole(): string {
    const sessionData = this.sessionData();
    if (!sessionData) {
      if (env.dev) return 'ROLE_ADMIN';
      this.logOut().catch(error => console.error(error));
    }
        
    if (sessionData.roles[0].authority === 'ROLE_ADMIN') {
      return 'ROLE_ADMIN';
    } else {
      return 'ROLE_USER';
    }
  }

}
