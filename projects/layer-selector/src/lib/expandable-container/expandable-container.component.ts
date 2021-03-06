import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'agrc-expandable-container',
  template: `
    <div class="layer-selector" (mouseenter)="expanded = true" (mouseleave)="expanded = false" area-haspopup="true">
      <svg xmlns="http://www.w3.org/2000/svg" class="layer-selector__toggle" [ngClass]="expanded ? 'layer-selector--hidden' : ''" width="26" height="26" viewBox="0 0 26 26"><g fill="none" stroke="#555" stroke-width="3" stroke-miterlimit="9"><path transform="matrix(.95342 .30165 -.95342 .30165 0 -1026)" d="M1715 1701h10v10h-10zM1734 1709v11.2h-11.2M1744 1719v11.2h-11.2"/></g></svg>
      <form [ngClass]="!expanded ? 'layer-selector--hidden' : ''">
        <ng-content></ng-content>
      </form>
    </div>
  `,
  styles: []
})
export class ExpandableContainerComponent implements OnInit {
  expanded = false;

  constructor() {}

  ngOnInit() {}
}
