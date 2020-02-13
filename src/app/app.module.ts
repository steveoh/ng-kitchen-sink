import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DartboardModule } from 'projects/dartboard/src/public-api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DartboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
