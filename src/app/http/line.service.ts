import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { APP_CONFIG, IAppConfig } from '../app.config';

export interface CreateLineLoginTokenParams {
  code: string;
  state: string;
}

@Injectable({
  providedIn: 'root'
})
export class LineService {
  private readonly LineLoginURL = 'https://access.line.me/oauth2/v2.1/authorize?';

  constructor(
    @Inject(APP_CONFIG) private appConfig: IAppConfig,
    private http: HttpClient
  ) { }

  getLineNotifyUrl() {
    const query = [
      'response_type=code',
      'client_id=' + '1565412044',
      'redirect_uri=' + encodeURIComponent(this.appConfig.lineLoginCallBackURL),
      'state=' + 'abcde',
      'scope=openid%20profile'
    ].join('&');


    return `${this.LineLoginURL}${query}`;
  }

  createLineLoginToken(code: string, params) {
    return this.http.post(`${this.appConfig.apiBaseUrl}/line-login-token`, params)
      .pipe(
        map(data => data['data']),
      );
  }
}
