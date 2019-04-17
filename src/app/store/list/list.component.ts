import { Component, OnInit } from '@angular/core';

import { StoreService } from '../../http';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.pug',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {

  entries: any[] = [
    { id: '111111', name: 'ddd', address: 'aaa', phone: '2299', principal: 'lin' },
  ];

  constructor(
    private storeService: StoreService
  ) { }

  ngOnInit() {
    this.readStores();
  }

  readStores() {
    this.storeService.readStores()
      .subscribe(data => {
        // this.entries = data;
      });
  }

  removeStore(entry) {
    console.log('entry', entry);

    if (!confirm('確定刪除嗎?')) { return; }

    this.storeService.removeStore(entry.id)
      .subscribe(data => {
        console.log('data', data);
        alert('店家: ' + data.name + '已刪除');
      })
  }

  trackByEntries(index: number, entry) { return entry.id; }
}
