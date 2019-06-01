import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders, HttpResponse, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Settings, Audit } from './Interfaces';

@Injectable({
  providedIn: 'root'
})
export class SendFetchService {

  constructor(private http: HttpClient) {}

  sendData(data:Settings | Audit)/*: Observable<Object>*/ {
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

  fetchData(fileName: string): Observable<Object> { 
    //---------------------get data-----------------------------------------------
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, file, POST, GET",
      /*'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, GET,PUT,POST,DELETE,PATCH,OPTIONS',*/
      'file': fileName}); 
    let options = {headers: headers};
    const params = new HttpParams().set('file', fileName);
    //console.log(params);

    return this.http
               .get<Settings[]|Audit[]>('http://localhost:3000/get', {params: params});
  }
}
