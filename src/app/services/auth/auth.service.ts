import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public sessionData = signal(null);

  constructor() {}

  public setSessionData(data: any) {
    this.sessionData.set(data);
  }

  public async login(): Promise<any> {
    return await new Promise((resolve, reject) => {

      setTimeout(() => {
        try {
          const user = {
            email: 'usuario@example.com',
            password: 'usuario'
          }
          this.setSessionData(user);
          window.localStorage.setItem('sessionData', JSON.stringify(user));
          resolve(user);
          
        } catch (error) {
          reject(error);

        }
      }, 1000);
    });
  }

  public async logOut(): Promise<void> {
    return await new Promise((resolve, reject) => {

      setTimeout(() => {
        try {
          this.setSessionData(null);
          window.localStorage.removeItem('sessionData');
          resolve();

        } catch (error) {
          reject(error);

        }
      }, 1000);
    });
  } 

}
