import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Audit } from '../Interfaces';
import { SendFetchService } from '../send-fetch.service';
import { HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.css']
})
export class AuditComponent implements OnInit, AfterViewInit {
  auditData: Audit;
  listOfAudit: Audit[] = [];
  message: string;
  filterArgs = {title: 'dateTime'};
  displayedColumns: string[] = ['dateTime', 'host', 'event', 'description', 'result'];
  dataSource;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private sendFetchSrvice: SendFetchService) { }

  column: string = 'dateTime';
  direction: number = 1;

  ngOnInit() {
    this.fetchAuditData();
  }

  ngAfterViewInit() {

  }

  fetchAuditData() {
    this.sendFetchSrvice.fetchData('audit').subscribe(
      (data) => {
        this.listOfAudit = null;
        console.log(data);
        this.listOfAudit = Object.keys(data).map(i => data[i]);
        this.dataSource= new MatTableDataSource(this.listOfAudit);
        this.dataSource.sort = this.sort;
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

  /*
  sort(property, direction){ 
    this.column = property;
    this.direction = direction;
  };
  */
}
