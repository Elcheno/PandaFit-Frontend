import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormActiveService {

  private readonly http = inject(HttpClient);

  constructor() { }

  public formActive (formActive: any): Observable<any> {
    return this.http.post<any>('http://localhost:8080/active', formActive)
      .pipe(
        map((res: any) => {
          console.log(res);
          return res;
        }),
        take(1)
      )
  }
}
