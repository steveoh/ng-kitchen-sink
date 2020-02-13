import { Component, Input } from '@angular/core';

@Component({
  selector: 'agrc-conditional-wrapper',
  template: `
    <agrc-expandable-container *ngIf="condition; else unwrapped">
      <ng-content *ngTemplateOutlet="unwrapped"></ng-content>
    </agrc-expandable-container>
    <ng-template #unwrapped>
      <ng-content></ng-content>
    </ng-template>
  `
})
export class ConditionalWrapperComponent {
  @Input()
  condition: boolean;
}
