import { Component, ElementRef, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'agrc-layer-selector[apiKey]',
  templateUrl: './layer-selector.component.html',
  styleUrls: [
    './layer-selector.component.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class LayerSelectorComponent implements OnInit {
  @Input()
  apiKey: string;
  makeExpandable: true;

  constructor(private me: ElementRef) { }

  ngOnInit() {
  }

}
