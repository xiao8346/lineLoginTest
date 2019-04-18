import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

export interface CreateLineLoginTokenParams {
  code: string;
  state: string;
}

@Injectable({
  providedIn: 'root'
})
export class LineService {

  constructor(private http: HttpClient) { }

  getLineNotifyUrl() {
    const URL = 'https://access.line.me/oauth2/v2.1/authorize?';

    const query = [
      'response_type=code',
      'client_id=' + '1565412044',
      'redirect_uri=' + encodeURIComponent('http://localhost:3000/get-code'),
      'state=' + 'abcde',
      'scope=openid%20profile'
    ].join('&');


    return `https://access.line.me/oauth2/v2.1/authorize?${query}`;
  }

  createLineLoginToken(code: string, params) {
    return this.http.post(`https://xiao-test-api.herokuapp.com/line-login-token`, params)
      .pipe(
        map(data => data['data']),
      );
  }
}
