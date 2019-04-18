import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface StoreParams {
  name: string;
  address: string;
  phone: string;
  principal: string;
}

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(
    private http: HttpClient
  ) { }


  readStores(): Observable<any[]> {
    return this.http.get(`https://xiao-test-api.herokuapp.com/stores`)
      .pipe(
        map(data => data['data']),
      );
  }

  createStore(params: StoreParams) {
    return this.http.post(`https://xiao-test-api.herokuapp.com/stores`, params)
      .pipe(
        map(data => data['data'])
      );
  }

  readStore(sid: string) {
    return this.http.get(`https://xiao-test-api.herokuapp.com/stores/${sid}`)
      .pipe(
        map(data => data['data']),
      );
  }

  updateStore(sid: string, params: StoreParams) {
    return this.http.patch(`https://xiao-test-api.herokuapp.com/stores/${sid}`, params)
      .pipe(
        map(data => data['data']),
      );
  }

  removeStore(sid: string) {
    return this.http.delete(`https://xiao-test-api.herokuapp.com/stores/${sid}`)
      .pipe(
        map(data => data['data']),
      );
  }
}
