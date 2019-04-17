import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { StoreService } from '../../http';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.pug',
  styleUrls: ['./editor.component.less']
})
export class EditorComponent implements OnInit, OnDestroy {
  private onQuery: Subscription;

  sid: string;
  name: string;
  address: string;
  phone: string;
  principal: string;


  constructor(
    private storeService: StoreService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.onQuery = this.route.paramMap
      .pipe(map(params => this.sid = params.get('sid')))
      .subscribe(() => {
        if (this.sid) {
          this.readStore(this.sid);
        }
      })
  }

  ngOnDestroy() {
    this.onQuery.unsubscribe();
  }

  readStore(sid: string) {
    this.storeService.readStore(sid)
      .subscribe(data => {
        this.name = data.name;
        this.address = data.address;
        this.phone = data.phone;
        this.principal = data.principal;
      });
  }

  updateStore(sid: string, params) {
    this.storeService.updateStore(sid, params)
      .subscribe(data => {
        console.log('data', data);
        alert('更新成功');
      }, err => alert('更新失敗'))
  }

  createStore(params) {
    this.storeService.createStore(params)
      .subscribe(data => {
        console.log('data', data);
        alert('建立成功');
      }, err => alert('建立失敗'))
  }

  save() {
    console.log('save');
    const params = {
      name: this.name,
      address: this.address,
      phone: this.phone,
      principal: this.principal,
    };

    if (this.sid) {
      this.updateStore(this.sid, params)
    } else {
      this.createStore(params);
    }
  }
}
