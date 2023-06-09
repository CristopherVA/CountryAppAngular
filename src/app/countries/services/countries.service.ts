import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../interfaces/country.interface';
import { Observable, catchError, delay, map, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1'

  constructor(private httpClient: HttpClient) { }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(url)
  }

  public searchByAlphaCode(code: string): Observable<Country | null> {
    const url = `${this.apiUrl}/alpha/${code}`
    return this.httpClient.get<Country[]>(url)
      .pipe(
        map(countries => countries.length > 0 ? countries[0] : null),
        // delay(2000),
        catchError(err => of(null))
      )
  }

  public searchCapital(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${term}`
    return this.getCountriesRequest(url)
  }

  public searchRegion(region: string): Observable<Country[]> {
    // https://restcountries.com/v3.1/name/{name}
    const url = `${this.apiUrl}/region/${region}`
    return this.httpClient.get<Country[]>(url)
      .pipe(
        catchError(err => of([]))
      )
  }

  public searchCountry(term: string): Observable<Country[]> {
    // https://restcountries.com/v3.1/name/{name}
    const url = `${this.apiUrl}/name/${term}`
    return this.httpClient.get<Country[]>(url)
      .pipe(
        catchError(err => of([]))
      )
  }



}
