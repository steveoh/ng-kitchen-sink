import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { LayerSelectorComponent } from './layer-selector.component';
import { ConditionalWrapperComponent } from './conditional-wrapper/conditional-wrapper.component';
import { ExpandableContainerComponent } from './expandable-container/expandable-container.component';
import { LayerSelectorItemComponent } from './layer-selector-item/layer-selector-item.component';


@NgModule({
  declarations: [LayerSelectorComponent, ConditionalWrapperComponent, ExpandableContainerComponent, LayerSelectorItemComponent],
  imports: [BrowserModule],
  exports: [LayerSelectorComponent]
})
export class LayerSelectorModule { }
