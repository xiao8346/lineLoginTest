import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { LineService } from '../http';

@Component({
  selector: 'app-line-login-get-code',
  templateUrl: './line-login-get-code.component.pug',
  styleUrls: ['./line-login-get-code.component.less']
})
export class LineLoginGetCodeComponent implements OnInit, OnDestroy {
  onQueryParamsChange: Subscription;

  code: string;
  token: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,

    private lineService: LineService,
  ) { }

  ngOnInit() {
    this.token = localStorage.getItem('token');

    this.onQueryParamsChange = this.route
      .queryParams
      .subscribe(params => {
        const code = params['code'];
        const state = params['state'];
        this.code = code;
        if (code && state) {
          this.createLineLoginToken(code);
        }
      });

  }

  ngOnDestroy() {
    this.onQueryParamsChange.unsubscribe();
  }

  getLineNotifyUrl() {
    window.location.href = this.lineService.getLineNotifyUrl();
  }

  createLineLoginToken(code: string) {
    const params = {
      redirectUri: 'http://localhost:3000/get-code',
      code
    };

    this.lineService.createLineLoginToken(code, params)
      .subscribe(tokenInfo => {
        console.log('token', tokenInfo);
        if (tokenInfo && tokenInfo.id_token) {
          localStorage.setItem('token', tokenInfo.id_token);
          this.token = tokenInfo;
          this.router.navigate(['/get-code']);
        }
      }, err => console.error('createLineLoginToken err', err));
  }

  removeToken() {
    if (!confirm('刪除token?')) { return; }

    localStorage.removeItem('token');

    this.router.navigate(['/']);
  }
}
