import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Subscription } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';

import { StoreService, StoreParams } from '../../http';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.pug',
  styleUrls: ['./editor.component.less']
})
export class EditorComponent implements OnInit, OnDestroy {
  private onQuery: Subscription;

  sid: string;
  form: FormGroup;

  readStoreLoading: boolean;

  constructor(
    private storeService: StoreService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.initForm();

    this.onQuery = this.route.paramMap
      .pipe(
        tap(params => this.sid = params.get('sid'))
      )
      .subscribe(() => {
        this.form.reset();

        if (this.sid) {
          this.readStore(this.sid);
        }
      })
  }

  ngOnDestroy() {
    this.onQuery.unsubscribe();
  }

  initForm() {
    this.form = this.formBuilder.group({
      name: [void 0, [Validators.required]],
      address: [void 0, [Validators.required]],
      phone: [void 0, [Validators.required]],
      principal: [void 0, [Validators.required]],
    });
  }

  readStore(sid: string) {
    this.readStoreLoading = true;
    
    this.storeService.readStore(sid)
      .pipe(finalize(() => this.readStoreLoading = false))
      .subscribe(data => {
        if (data) {
          if (data.name !== void 0) { this.form.get('name').setValue(data.name); }
          if (data.address !== void 0) { this.form.get('address').setValue(data.address); }
          if (data.phone !== void 0) { this.form.get('phone').setValue(data.phone); }
          if (data.principal !== void 0) { this.form.get('principal').setValue(data.principal); }
        }
      });
  }

  updateStore(sid: string, params: StoreParams) {
    this.storeService.updateStore(sid, params)
      .subscribe(data => {
        console.log('data', data);
        alert('更新成功');
      }, err => alert('更新失敗'))
  }

  createStore(params: StoreParams) {
    this.storeService.createStore(params)
      .subscribe(data => {
        alert('建立成功');
        this.router.navigate(['/store-editor', data._id])
      }, err => alert('建立失敗'))
  }

  save() {
    const params = {
      name: this.form.get('name').value,
      address: this.form.get('address').value,
      phone: this.form.get('phone').value,
      principal: this.form.get('principal').value,
    };

    if (this.sid) {
      this.updateStore(this.sid, params)
    } else {
      this.createStore(params);
    }
  }
}
