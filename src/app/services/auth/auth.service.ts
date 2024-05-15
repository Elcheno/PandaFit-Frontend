import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, catchError, map, take } from 'rxjs';
import { environment as env } from '../../../environments/environment.development';
import { Router } from '@angular/router';
import { throwError, of } from 'rxjs';
import {  tap, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  public sessionData = signal<any>(null);

  public uuid: string = '12345';

  public userData: any;

  constructor( http: HttpClient,  router: Router) {
    this.loadUserData();
  }

  public setUserData(data: any): void {
    this.userData = data;
  }

  public loadUserData(): void {
    const userData = window.localStorage.getItem('userData');
    if (userData) {
      this.setUserData(JSON.parse(userData));
    }
  }

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
        //  console.log('resprimero');
        //  console.log(res);
          if (!res?.token) {
            return null;
          }
          this.setSession(res);
        //  console.log('res');
        //  console.log(res);
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

  public setSession(data: any): void {
    try {
      const user = {
        id: data.id,
        email: data.email,
        token: data.token,
        roles: data.roles,
        //institutionId: data.institution.id
      };
      
      // Store the session data
      this.setSessionData(user);
      window.localStorage.setItem('sessionData', JSON.stringify(user));
      
      // Fetch user data
      this.http.get<any>(`${env.api.url}institution/users/${data.id}`).subscribe(
        (userData: any) => {
          // Construct UserResponseDTO object from userData
          const userResponse: any = {
            id: userData.id,
            email: userData.email,
            password: userData.password,
            institutionId: userData.institutionId,
            institutionName: userData.institutionName,
            inputsId: userData.inputsId,
            outputsId: userData.outputsId,
            formsId: userData.formsId,
            role: userData.role
          };
  
          // Store user data in AuthService
          this.setUserData(userResponse);
        //  console.log('userData: institutoID:',userResponse.institutionId,  'institutoName:',userResponse.institutionName);
          // Store user data in local storage
          window.localStorage.setItem('userData', JSON.stringify(userResponse));
        },
        (error) => {
        //  console.error('Error fetching user data:', error);
        }
      );
    } catch (error) {
      console.error(error);
    }
  }

  public getUserRole(): string {
    return this.userData?.roles || ''; 
  }

  // Método para obtener el institutionId del usuario
  getInstitutionId(): string | null {
    // Obtener los datos del usuario del localStorage
    const userDataString = localStorage.getItem('userData');

    // Verificar si hay datos almacenados
    if (userDataString) {
      // Parsear los datos del usuario
      const userData = JSON.parse(userDataString);
      
      // Obtener y devolver el institutionId
      return userData.institutionId;
    } else {
      // Si no hay datos almacenados, devolver null
      return null;
    }
  }

  getInstitutionName(): string | null {
    // Obtener los datos del usuario del localStorage
    const userDataString = localStorage.getItem('userData');

    // Verificar si hay datos almacenados
    if (userDataString) {
      // Parsear los datos del usuario
      const userData = JSON.parse(userDataString);
      
      // Obtener y devolver el institutionId
      return userData.institutionName;
    } else {
      // Si no hay datos almacenados, devolver null
      return null;
    }
  }
}
