import { Component, OnInit, ViewChild } from '@angular/core';
import { Audit } from '@core/classes/Audit';
import { SendFetchService } from '@core/services/send-fetch.service';
import {MatTableDataSource, MatSort } from '@angular/material';


@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.css']
})
export class AuditComponent implements OnInit {
  auditData: Audit;
  listOfAudit: Audit[] = [];
  message: string;
  displayedColumns: string[] = ['dateTime', 'host', 'event', 'description', 'result'];
  dataSource;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  filterValues = {
    dateTime: '',
    host: '',
    event: '',
    description: ''
  };

  constructor(private sendFetchService: SendFetchService) { }

  column: string = 'dateTime';
  direction: number = 1;

  ngOnInit() {
    this.fetchAuditData();   
  }

  fetchAuditData() {
    this.sendFetchService.fetchData<Audit>('audit').subscribe((data) => {
      this.listOfAudit = data;
      this.dataSource= new MatTableDataSource(this.listOfAudit);
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = this.tableFilter();
    });  
  }

  tableFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function(data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.dateTime.toLowerCase().indexOf(searchTerms.dateTime) !== -1
        && data.host.toString().toLowerCase().indexOf(searchTerms.host) !== -1
        && data.event.toLowerCase().indexOf(searchTerms.event) !== -1
        && data.description.toLowerCase().indexOf(searchTerms.description) !== -1;
    }
    return filterFunction;
  }

  doFilter(value:string, columnName: string) {
    this.filterValues[columnName] = value;
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }  
}
