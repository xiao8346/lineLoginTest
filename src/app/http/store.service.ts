import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { APP_CONFIG, IAppConfig } from '../app.config';

export interface StoreParams {
  name: string;
  address: string;
  phone: string;
  principal: string;
}

@Injectable({
  providedIn: 'root',
})
export class StoreService {

  constructor(
    @Inject(APP_CONFIG) private appConfig: IAppConfig,
    private http: HttpClient
  ) { }


  readStores(): Observable<any[]> {
    return this.http.get(`${this.appConfig.apiBaseUrl}/stores`)
      .pipe(
        map(data => data['data']),
      );
  }

  createStore(params: StoreParams) {
    return this.http.post(`${this.appConfig.apiBaseUrl}/stores`, params)
      .pipe(
        map(data => data['data'])
      );
  }

  readStore(sid: string) {
    return this.http.get(`${this.appConfig.apiBaseUrl}/stores/${sid}`)
      .pipe(
        map(data => data['data']),
      );
  }

  updateStore(sid: string, params: StoreParams) {
    return this.http.patch(`${this.appConfig.apiBaseUrl}/stores/${sid}`, params)
      .pipe(
        map(data => data['data']),
      );
  }

  removeStore(sid: string) {
    return this.http.delete(`${this.appConfig.apiBaseUrl}/stores/${sid}`)
      .pipe(
        map(data => data['data']),
      );
  }
}
