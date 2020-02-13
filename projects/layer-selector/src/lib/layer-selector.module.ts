import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { LayerSelectorComponent } from './layer-selector.component';
import { ConditionalWrapperComponent } from './conditional-wrapper/conditional-wrapper.component';
import { ExpandableContainerComponent } from './expandable-container/expandable-container.component';


@NgModule({
  declarations: [LayerSelectorComponent, ConditionalWrapperComponent, ExpandableContainerComponent],
  imports: [BrowserModule],
  exports: [LayerSelectorComponent]
})
export class LayerSelectorModule { }
