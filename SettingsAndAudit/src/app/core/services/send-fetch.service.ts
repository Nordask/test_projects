import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Audit } from '../interfaces/AuditInterface';
import { Settings } from '../interfaces/SettingsInterface';

@Injectable({
  providedIn: 'root'
})
export class SendFetchService {

  constructor(private http: HttpClient) {}

  sendData(data:Settings | Audit, fileName: string, operation: string) {
    const body = data;
    let params = new HttpParams().set('file', fileName).set('operation', operation);

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
