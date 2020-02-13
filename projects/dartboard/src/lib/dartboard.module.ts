import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { DartboardComponent } from './dartboard.component';



@NgModule({
  declarations: [DartboardComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  exports: [DartboardComponent]
})
export class DartboardModule {}
