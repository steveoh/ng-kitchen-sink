import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DartboardModule } from 'projects/dartboard/src/public-api';
import { LayerSelectorModule } from 'projects/layer-selector/src/public-api';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DartboardModule,
    LayerSelectorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
