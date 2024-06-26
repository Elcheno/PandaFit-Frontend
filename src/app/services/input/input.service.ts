import { Injectable, inject } from '@angular/core';
import { IInputData } from '../../model/interfaces/i-input-data';
import { IInputType } from '../../model/interfaces/i-input-type';
import { HttpClient } from '@angular/common/http';
import { type IPageable } from '../../model/interfaces/i-pageable';
import { IPage } from '../../model/interfaces/i-page';
import { Observable, map, of, take } from 'rxjs';
import { environment as env } from '../../../environments/environment.development';
import { AuthService } from '../auth/auth.service';
import { StoreService } from '../store/store.service';


/**
 * Service for managing input data.
 */
@Injectable({
  providedIn: 'root'
})
export class InputService {

  /**
   * Example data for testing purposes.
   */
  private _mockData: IInputData[] = [
    {
      id: '1',
      name: 'Peso',
      description: 'Inserte peso en kgs',
      type: IInputType.NUMBER,
      decimal: true,
      decimals: 2,
      unit: 'kgs'
    },
    {
      id: '2',
      name: 'Altura',
      description: 'Inserte altura en cms',
      type: IInputType.NUMBER,
      decimal: false,
      decimals: 0,
      unit: 'cms'
    },
    {
      id: '3',
      name: 'Fumador',
      description: 'Indique si fuma',
      type: IInputType.BOOLEAN,
      decimal: false,
      decimals: 0,
      unit: ''
    },
    {
      id: '4',
      name: 'Deporte',
      description: 'Indique si practica deporte',
      type: IInputType.BOOLEAN,
      decimal: false,
      decimals: 0,
      unit: ''
    },
  ]

  /**
   * Getter for mock data.
   * @returns The mock data array.
   */
  get mockData(): IInputData[] {
    return this._mockData;
  }

  /**
   * Setter for mock data.
   * @param value - The new value for mock data.
   */
  set mockData(value: IInputData[]) {
    this._mockData = value;
  }

  /**
   * Searches for an input data by its ID.
   * @param id - The ID of the input data to search for.
   * @returns The found input data or undefined if not found.
   */
  searchInput(id: number | undefined): IInputData | undefined {
    return this._mockData.find(input => input.id === id)
  }

  // Hacer servicio completo

  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);
  private readonly storeService = inject(StoreService);

  /**
   * Retrieves all input data paginated.
   * @param pageParams - Pagination parameters for the request.
   * @returns Observable of paginated input data.
   */
  public getAll(pageParams?: IPage): Observable<IPageable<IInputData>> {
    const sessionData = this.authService.sessionData();
    const token = sessionData?.token;


    const cacheData = this.storeService.inputStore.getData();
    if (!(this.storeService.inputStore.rehidrate() || this.storeService.inputStore.reload()) && cacheData) return of(cacheData);

    return this.http.get<IPageable<IInputData>>(`${env.api.url}${env.api.form}${env.api.input}/page`, { params: pageParams as any, headers: { Authorization: token ?? "" } })
      .pipe(
        map((res: any) => {
          const response: IPageable<IInputData> = {
            page: res['number'],
            size: res['size'],
            sort: pageParams?.sort ?? ['name'],
            totalElements: res['totalElements'],
            totalPages: res['totalPages'],
            content: res['content'].map((input: IInputData) => ({ ...input , type: IInputType[input.type].toString()}))
          };
          this.storeService.inputStore.setData(response);
          return response;
        }),
        take(1)
      );
  }

  public getAllFilteringByName(pageParams: IPage, name: string): Observable<IPageable<IInputData>> {
    const sessionData = this.authService.sessionData();
    const token = sessionData?.token;    

    const queryParams = {
      ...pageParams,
      name, // Add the name parameter for filtering
    };
    
    return this.http.get<IPageable<IInputData>>(`${env.api.url}${env.api.form}/page${env.api.input}/name`, { params: queryParams as any, headers: { Authorization: token ?? "" } })
    .pipe(
      map((res: any) => {
        const response: IPageable<IInputData> = {
          page: res['number'],
          size: res['size'],
          sort: pageParams?.sort ?? ['name'],
          totalElements: res['totalElements'],
          totalPages: res['totalPages'],
          content: res['content'].map((input: IInputData) => ({ ...input , type: IInputType[input.type].toString()}))
        };
        return response;
      }),
      take(1)
    );
  }

  /**
   * Retrieves an input data by its ID.
   * @param id - The ID of the input data to retrieve.
   * @returns Observable of the retrieved input data.
   */
  public getById (id: string): Observable<IInputData> {
    const sessionData = this.authService.sessionData();
    const token = sessionData?.token;

    return this.http.get<IInputData>(`${env.api.url}${env.api.form}${env.api.input}/${id}`, { headers: { Authorization: token ?? "" } })
      .pipe(
        map((res: any) => {
          const response: IInputData = { ...res , type: IInputType[res.type].toString()};
          return response;
        }),
        take(1)
      );
  }

  /**
   * Creates a new input data.
   * @param input - The new input data to create.
   * @returns Observable of the created input data.
   */
  public create(input: IInputData): Observable<IInputData> {
    const sessionData = this.authService.sessionData();
    const token = sessionData?.token;
  
    const data: any = {
      name: input.name,
      description: input.description,
      type: IInputType[input.type],
      decimal: input.decimal,
      decimals: input.decimals,
      unit: input.unit,

      userOwnerId: sessionData.id
    };

    return this.http.post<IInputData>(`${env.api.url}${env.api.form}${env.api.input}`, data, { headers: { Authorization: token ?? "" } })
      .pipe(
        map((res: any) => {
          const response: IInputData = { ...res , type: IInputType[res.type].toString()};
          return response;
        }),
        take(1)
      );
  };

  /**
   * Deletes an input data.
   * @param data - The data of the input data to delete.
   * @returns Observable of the deleted input data.
   */
  public delete (data: any): Observable < IInputData > {
    const sessionData = this.authService.sessionData();
    const token = sessionData?.token;

    return this.http.delete<IInputData>(`${env.api.url}${env.api.form}${env.api.input}`, { body: data, headers: { Authorization: token ?? "" } })
      .pipe(
        map((res: any) => {
          const response: IInputData = { ...res , type: IInputType[res.type].toString()};
          return response;
        }),
        take(1)
      );
}

  /**
   * Updates an input data.
   * @param data - The data of the input data to update.
   * @returns Observable of the updated input data.
   */
  public update(data: any): Observable < IInputData > {
    const sessionData = this.authService.sessionData();
    const token = sessionData?.token;

    return this.http.put<IInputData>(`${env.api.url}${env.api.form}${env.api.input}`, data, { headers: { Authorization: token ?? "" } })
      .pipe(
        map((res: any) => {
          const response: IInputData = { ...res , type: IInputType[res.type].toString()};
          return response;
        }),
        take(1)
      );
}

}
