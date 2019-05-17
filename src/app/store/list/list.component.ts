import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import * as _ from 'lodash';

import { StoreService } from '../../http';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.pug',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {

  entries: any[] = [];
  isShowDeleteBtn: boolean;

  constructor(
    private router: Router,
    private storeService: StoreService
  ) { }

  ngOnInit() {
    this.readStores();
  }

  readStores() {
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
