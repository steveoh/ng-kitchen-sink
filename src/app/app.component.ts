import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'agrc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent {
  findResult: string;
  apiKey = 'AGRC-16E793E2220676';

  onFind($event: Observable<any>): void {
    this.findResult = '';
    $event.subscribe({
      next: (result: string) =>
        (this.findResult = JSON.stringify(result, null, 2)),
      error: (error: string) => (this.findResult = error)
    });
  }
}
