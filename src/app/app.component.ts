import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Map from 'arcgis-js-api/Map';
import MapView from 'arcgis-js-api/views/MapView';
import { Observable } from 'rxjs';

@Component({
  selector: 'agrc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {
  findResult: string;
  apiKey = 'AGRC-16E793E2220676';
  quadWord = '??';
  mapView: any;

  @ViewChild('mapViewNode', { static: true }) private mapViewEl: ElementRef;
  view: any;

  ngOnInit() {
    this.initializeMap();
  }

  async initializeMap() {
    this.mapView = new MapView({
      container: this.mapViewEl.nativeElement,
      center: [-112, 40],
      zoom: 10,
      map: new Map()
    });
  }

  onFind($event: Observable<any>): void {
    this.findResult = '';
    $event.subscribe({
      next: (result: string) =>
        (this.findResult = JSON.stringify(result, null, 2)),
      error: (error: string) => (this.findResult = error)
    });
  }
}
