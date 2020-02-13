import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { IAddress, IGeocodeResult, ISearchResult, IWebApiResponse } from 'dartboard/public-api';
import * as querystring from 'querystring';
import { Observable, of, throwError } from 'rxjs';
import { catchError, mergeMap, pluck, timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DartboardService {
  errorMessage: string;
  baseUrl = 'https://api.mapserv.utah.gov/api/v1/';

  constructor(private http: HttpClient) {}

  find(
    model: IAddress,
    props: any
  ): Observable<IGeocodeResult | ISearchResult[]> {
    const geocodeUrl = `${this.baseUrl}geocode/${model.address}/${
      model.zone
    }?${querystring.stringify(props)}`;

    props.predicate = `zip5=${model.zone}`;
    const zipUrl = `${
      this.baseUrl
    }search/sgid10.boundaries.zipcodes/shape@envelope?${querystring.stringify(
      props
    )}`;

    props.predicate = `name='${model.zone}'`;
    const cityUrl = `${
      this.baseUrl
    }search/sgid10.boundaries.municipalities/shape@envelope?${querystring.stringify(
      props
    )}`;

    let requestUrl = cityUrl;

    if (model.address) {
      requestUrl = geocodeUrl;
    } else if (/(^\d{5})-?(\d{4})?$/.test(model.zone.toString())) {
      requestUrl = zipUrl;
    }

    return this.http.get<IWebApiResponse>(requestUrl).pipe(
      timeout(8000),
      catchError(this.handleError),
      pluck('result'),
      mergeMap((item: IGeocodeResult | ISearchResult[]) => {
        if (item instanceof Array && item.length === 0) {
          return throwError('No results found');
        }

        return of(item);
      }),
      catchError((error: string) => {
        this.errorMessage = error;

        return throwError(error);
      })
    );
  }

  private handleError(err: HttpErrorResponse): Observable<string> {
    this.errorMessage = err.message;

    if (err.error) {
      this.errorMessage = err.error.message;
    }

    return throwError(this.errorMessage);
  }
}
