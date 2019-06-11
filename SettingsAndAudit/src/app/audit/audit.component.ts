import { Component, OnInit } from '@angular/core';
import { Audit } from '../Interfaces';
import { SendFetchService } from '../send-fetch.service';
import { HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.css']
})
export class AuditComponent implements OnInit {
  auditData: Audit;
  listOfAudit: Audit[] = [];
  message: string;
  filterArgs = {title: 'dateTime'};

  constructor(private sendFetchSrvice: SendFetchService) { }

  column: string = 'dateTime';
  direction: number = 1;

  ngOnInit() {
    this.fetchAuditData();
  }

  fetchAuditData() {
    this.sendFetchSrvice.fetchData('audit').subscribe(
      (data) => {
        this.listOfAudit = null;
        console.log(data);
        this.listOfAudit = Object.keys(data).map(i => data[i]);
      },
      (err: HttpErrorResponse) => {
        if(err instanceof Error) {
          // client-side error
          this.message = `An error occured ${err.error.message}`;
        } else {
          this.message = `Backend returned err code ${err.status}, body was: ${err.message}`;
        }
      }
    );
  }

  sort(property, direction){ 
    this.column = property;
    this.direction = direction;
  };
}
