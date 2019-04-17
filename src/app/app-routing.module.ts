import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LineLoginGetCodeComponent } from './line-login-get-code/line-login-get-code.component';
import { ListComponent } from './store/list/list.component';
import { EditorComponent } from './store/editor/editor.component';


const routes: Routes = [
  {
    path: 'get-code',
    component: LineLoginGetCodeComponent,
  },
  {
    path: 'store-list',
    component: ListComponent,
  },
  {
    path: 'store-editor/_new',
    component: EditorComponent,
  },
  {
    path: 'store-editor/:sid',
    component: EditorComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
