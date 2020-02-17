import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'agrc-layer-selector-item',
  template: `
    <div class="layer-selector-item radio checkbox">
      <label class="layer-selector--item">
        <input class="layer-selector-item-input"
          type="{{layerType === 'baselayer' ? 'radio' : 'checkbox'}}"
          name="{{layerType}}"
          value="{{id}}"
          [checked]="selected"
          (change)="onInputChange()" /> {{id}}
      </label>
    </div>
  `,
  styles: []
})
export class LayerSelectorItemComponent {
  @Input()
  id: string;
  @Input()
  layerType: string;
  @Input()
  selected: boolean;
  @Output()
  onChange = new EventEmitter<LayerSelectorItemComponent>();

  constructor() {}

  onInputChange() {
    console.log('onInputChange', this.id, this.selected);

    this.onChange.emit(this);
  }
}
