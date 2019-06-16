import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Settings, Audit } from './Interfaces';

@Injectable({
  providedIn: 'root'
})
export class SendFetchService {

  constructor(private http: HttpClient) {}

  sendData(data:Settings | Audit, fileName: string, operation: string)/*: Observable<Object>*/ {
    const body = data;
    let params = new HttpParams().set('file', fileName).set('operation', operation);
    console.log(body)

    //--------------------put data------------------------------------------------

    return this.http.post('http://localhost:3000/post', body, {params: params})
  }

  fetchData(fileName: string): Observable<Object> { 
    //---------------------get data-----------------------------------------------
    const params = new HttpParams().set('file', fileName);

    return this.http
               .get<Settings[]|Audit[]>('http://localhost:3000/get', {params: params});
  }
}
