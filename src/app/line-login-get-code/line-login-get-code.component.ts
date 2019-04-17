import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { LineService } from '../http';

@Component({
  selector: 'app-line-login-get-code',
  templateUrl: './line-login-get-code.component.pug',
  styleUrls: ['./line-login-get-code.component.less']
})
export class LineLoginGetCodeComponent implements OnInit {
  onQueryParamsChange: Subscription;

  code: string;
  token: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,

    private lineService: LineService,
  ) { }

  ngOnInit() {
    this.onQueryParamsChange = this.route
      .queryParams
      .subscribe(params => {
        const code = params['code'];
        const state = params['state'];
        this.code = code;
        console.log('token', this.token);
        console.log('code', this.code);
        if (code && state) {
          this.createLineLoginToken(code);
        }
      })

  }

  getLineNotifyUrl() {
    window.location.href = this.lineService.getLineNotifyUrl();
  }

  createLineLoginToken(code: string) {
    const params = {
      redirectUri: 'http://localhost:3000/get-code',
      code
    };

    return this.lineService.createLineLoginToken(code, params)
      .subscribe(token => {
        console.log('token', token);
        // localStorage.setItem('token', token);
        this.token = token;
      }, err => console.error('createLineLoginToken err', err));
  }

}
