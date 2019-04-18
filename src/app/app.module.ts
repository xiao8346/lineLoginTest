import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LineLoginGetCodeComponent } from './line-login-get-code/line-login-get-code.component';
import { ListComponent } from './store/list/list.component';
import { EditorComponent } from './store/editor/editor.component';
import { APP_CONFIG, AppConfig } from './app.config';

@NgModule({
  declarations: [
    AppComponent,
    LineLoginGetCodeComponent,
    ListComponent,
    EditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: APP_CONFIG,
      useValue: AppConfig
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
