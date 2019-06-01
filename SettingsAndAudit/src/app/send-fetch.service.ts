import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders, HttpResponse, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Settings, Audit } from './Interfaces';

@Injectable({
  providedIn: 'root'
})
export class SendFetchService {

  constructor(private http: HttpClient) {}

  sendData(data:Settings | Audit): Observable<Object> {
    const body = data;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'});
    let options = {headers: headers}; 

    //--------------------put data------------------------------------------------
    /*
    console.log(data);
    console.log(JSON.stringify(data));
    return this.http.post<Object>('http://localhost:3000/post', body, options);
    */
    
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", 'http://localhost:3000/post', true); // false for synchronous request
    xmlHttp.setRequestHeader("Content-type", "application/json");
    console.log(JSON.stringify(data));
    xmlHttp.send(JSON.stringify(data));
  }

  fetchData(): Observable<Object> { 
    //---------------------get data-----------------------------------------------
    
    return this.http
               .get<Settings[]|Audit[]>('http://localhost:3000/get');
  }
}
