import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import * as _ from 'lodash';

import { StoreService } from '../../http';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.pug',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit, OnDestroy {
  onQuery: Subscription;

  entries: any[] = [];
  isShowDeleteBtn: boolean;

  aaa: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,

    private storeService: StoreService
  ) { }

  ngOnInit() {
    // 監控 page, limit 變化
    this.onQuery = this.route.queryParams
      .pipe(
        map(() => this.getQueryParams()),
        debounceTime(0),
        // 沒這行目前好像 navigate 同一個 query string 也不會 subscribe，可能可以刪除
        distinctUntilChanged((x, y) => _.isEqual(x, y)),
        tap(options => {
          const queryParams: any = {};

          if (options.aaa) {
            queryParams.aaa = options.aaa;
          }

          this.router.navigate(['store-list'], { queryParams });
        })
      )
      .subscribe(options => this.readStores(options));

    // // 監控 page, limit 變化
    // this.onQuery = this.paging.pageChange
    // .pipe(
    //   map(() => this.getQueryOptions()),
    //   debounceTime(0),
    //   distinctUntilChanged((x, y) => _.isEqual(x, y)),
    //   tap(options => {
    //     const queryParams: any = {};

    //     if (options.limit !== this.DEFAULT_LIMIT) {
    //       queryParams.limit = options.limit;
    //     }

    //     if (options.page !== this.DEFAULT_PAGE) {
    //       queryParams.page = options.page;
    //     }

    //     queryParams.patientId = this.patientId;

    //     this.router.navigate([], { queryParams });
    //   })
    // )
    // .subscribe(options => this.readData(options));
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.onQuery.unsubscribe();
  }

  getQueryParams() {
    return {
      aaa: this.aaa
    };
  }

  changeValue(value: number) {
    this.aaa = value;
    this.router.navigate(['store-list'], { queryParams: { aaa: this.aaa } });
  }

  readStores(options: any) {
    this.storeService.readStores()
      .subscribe(data => {
        this.entries = data;
      });
  }

  removeStore(entry) {
    if (!confirm('確定刪除嗎?')) { return; }

    this.storeService.removeStore(entry._id)
      .subscribe(data => {
        const index = _.findIndex(this.entries, { _id: entry._id });

        if (index > -1) {
          alert('店家: ' + data.name + '已刪除');
          this.entries.splice(index, 1);
        }
      });
  }

  gotoEditor(sid?: string) {
    if (sid) {
      this.router.navigate(['/store-editor', sid]);
    } else {
      this.router.navigate(['/store-editor/_new']);
    }
  }

  trackByEntries(index: number, entry) { return entry.id; }
}
