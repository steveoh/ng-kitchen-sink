export interface IAddress {
  address?: string;
  zone?: string | number;
}

export interface ILocation {
  x: number;
  y: number;
}

export interface IGeocodeResult {
  score: number;
  location: ILocation;
  locator: string;
  matchAddress: string;
  inputAddress: string;
  addressGrid: string;
  scoreDifference?: number;
  candidates?: any;
}

export interface ISearchResult {
  geometry: object;
  attributes: {};
}

export interface IWebApiResponse {
  result: IGeocodeResult | ISearchResult[];
  status: number;
  message?: string;
}

export class Address implements IAddress {
  constructor(public address?: string, public zone?: string | number) {}
}
