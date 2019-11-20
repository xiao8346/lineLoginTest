import { Injectable } from '@angular/core';

export interface ITokenInfo {
  exp: number;
  iat: number;
}

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  get token() {
    try {
      return localStorage.getItem('token');
    } catch (err) {
      console.error('TokenService　token　err', err);
    }
  }

  get tokenInfo(): ITokenInfo {
    if (!this.token) { return; }

    try {
      const payload = this.token.split('.')[1];

      return JSON.parse(atob(payload));
    } catch (error) {
      console.log('tokenInfo error', error);
    }
  }

  get isLogin() {
    const { exp } = this.tokenInfo || {};

    if (exp) {
      const now = Date.now();

      return !!this.token && (exp > now);
    }
  }
}


