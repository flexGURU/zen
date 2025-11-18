/* tslint:disable */
/* eslint-disable */
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  private http = inject(HttpClient);
  private readonly apiUrl = environment.APIURL;

  getSensorData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/data`).pipe(
      catchError((error) => {
        console.error('Error fetching sensor data:', error);
        throw error;
      })
    );
  }
}
