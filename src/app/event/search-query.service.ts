import { Injectable } from '@angular/core';
import { HttpParams, HttpClient, HttpResponse } from '@angular/common/http';
import { catchError } from '../../../node_modules/rxjs/operators';
import { Observable } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchQueryService {

  lang: string = "en_US";
  format: string = "json";
  baseUrl: string = "https://geocode-maps.yandex.ru/1.x/";
  constructor(private http: HttpClient) {
  }

  getQuery(query: string, lang?: string, format?: string): Observable<ActionResponse> {
    if (lang != null)
      this.lang = lang;
    if (format != null)
      this.format = format;

    const options = { params: new HttpParams().set('lang', this.lang).set('format', this.format).set('geocode', query) };

    return this.http.get<ActionResponse>(this.baseUrl, options);
  }
}

export interface ActionResponse {
  response: Response;
}

export interface Response {
  GeoObjectCollection: GeoObjectCollection;
}

export interface GeoObjectCollection {
  metaDataProperty: GeoObjectCollectionMetaDataProperty;
  featureMember: FeatureMember[];
}

export interface FeatureMember {
  GeoObject: GeoObject;
}

export interface GeoObject {
  metaDataProperty: GeoObjectMetaDataProperty;
  description: string;
  name: string;
  boundedBy: BoundedBy;
  Point: Point;
}

export interface Point {
  pos: string;
}

export interface BoundedBy {
  Envelope: Envelope;
}

export interface Envelope {
  lowerCorner: string;
  upperCorner: string;
}

export interface GeoObjectMetaDataProperty {
  GeocoderMetaData: GeocoderMetaData;
}

export interface GeocoderMetaData {
  kind: string;
  text: string;
  precision: string;
  Address: Address;
  AddressDetails: AddressDetails;
}

export interface Address {
  country_code: string;
  formatted: string;
  Components: Component[];
}

export interface Component {
  kind: string;
  name: string;
}

export interface AddressDetails {
  Country: Country;
}

export interface Country {
  AddressLine: string;
  CountryNameCode: string;
  CountryName: string;
  AdministrativeArea: AdministrativeArea;
}

export interface AdministrativeArea {
  AdministrativeAreaName: string;
  SubAdministrativeArea?: SubAdministrativeArea;
  Locality?: AdministrativeAreaLocality;
}

export interface AdministrativeAreaLocality {
  LocalityName: string;
  Thoroughfare: LocalityThoroughfare;
}

export interface LocalityThoroughfare {
  ThoroughfareName: string;
  Premise: Premise;
}

export interface Premise {
  PremiseName: string;
}

export interface SubAdministrativeArea {
  SubAdministrativeAreaName: string;
  Locality: SubAdministrativeAreaLocality;
}

export interface SubAdministrativeAreaLocality {
  DependentLocality: LocalityDependentLocality;
}

export interface LocalityDependentLocality {
  DependentLocalityName: string;
  DependentLocality?: DependentLocalityDependentLocality;
  Thoroughfare?: DependentLocalityThoroughfare;
}

export interface DependentLocalityDependentLocality {
  DependentLocalityName: string;
}

export interface DependentLocalityThoroughfare {
  ThoroughfareName: string;
}

export interface GeoObjectCollectionMetaDataProperty {
  GeocoderResponseMetaData: GeocoderResponseMetaData;
}

export interface GeocoderResponseMetaData {
  request: string;
  found: string;
  results: string;
}
