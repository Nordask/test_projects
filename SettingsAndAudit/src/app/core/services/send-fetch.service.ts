import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Audit } from '../classes/Audit';
import { Setting } from '../classes/Setting';

@Injectable({
  providedIn: 'root'
})
export class SendFetchService {

  constructor(private http: HttpClient) {}

  sendData<T>(data:T, fileName: string, operation: string): Observable<T[]> {
    const body = data;
    let params = new HttpParams().set('file', fileName).set('operation', operation);

    //--------------------put data------------------------------------------------

    return this.http.post('http://localhost:3000/post', body, {params: params})
            .map(data => {
              let listOfData: T[] = Object.keys(data).map(i => data[i]);
              return listOfData;
            })
            .catch((err: HttpErrorResponse) => {
              if(err instanceof Error) {
                // client-side error
                console.log(`An error occured ${err.error.message}`);
              } else {
                console.log(`Backend returned err code ${err.status}, body was: ${err.message}`);
              } 
              return [];
            });
  }

  fetchData<T>(fileName: string): Observable<T[]> { 
  
    //---------------------get data-----------------------------------------------
    const params = new HttpParams().set('file', fileName);

    return this.http.get<T[]>('http://localhost:3000/get', {params: params})
            .map(data => {
              let listOfData: T[] = Object.keys(data).map(i => data[i]);
              return listOfData;
            })
            .catch((err: HttpErrorResponse) => {
              if(err instanceof Error) {
                // client-side error
                console.log(`An error occured ${err.error.message}`);
              } else {
                console.log(`Backend returned err code ${err.status}, body was: ${err.message}`);
              } 
              return [];
            });
  }
} 