import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { IGeocodeResult, ISearchResult } from 'dartboard/public-api';
import { Observable, of } from 'rxjs';

import { Address } from './dartboard';
import { DartboardService } from './dartboard.service';

@Component({
  selector: 'agrc-dartboard[apiKey]',
  templateUrl: './dartboard.component.html',
  styleUrls: ['./dartboard.component.styl'],
  encapsulation: ViewEncapsulation.None
})
export class DartboardComponent {
  @Input()
  wkid = 26912;
  @Input()
  apiKey: string;
  @Input()
  requireStreet = true;
  @Input()
  showStreet = true;
  @Output()
  geocode = new EventEmitter<Observable<IGeocodeResult | ISearchResult[]>>();

  model = new Address();
  errorMessage: string;

  constructor(private webApiService: DartboardService) {}

  onSubmit(): void {
    const props: any = {
      apiKey: this.apiKey,
      wkid: this.wkid
    };

    this.webApiService.find(this.model, props).subscribe({
      next: response => this.geocode.emit(of(response)),
      error: e => (this.errorMessage = e)
    });
  }
}
