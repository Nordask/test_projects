import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Audit } from '@core/classes/Audit';
import { SendFetchService } from '@core/services/send-fetch.service';
import { HttpErrorResponse } from '@angular/common/http';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { FormControl } from "@angular/forms";


@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.css']
})
export class AuditComponent implements OnInit, AfterViewInit {
  auditData: Audit;
  listOfAudit: Audit[] = [];
  message: string;
  displayedColumns: string[] = ['dateTime', 'host', 'event', 'description', 'result'];
  dataSource;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  dateTimeFilter = new FormControl('');
  hostFilter = new FormControl('');
  eventFilter = new FormControl('');
  descriptionFilter = new FormControl('');

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

    this.dateTimeFilter.valueChanges
      .subscribe(
        dateTime => {
          this.filterValues.dateTime = dateTime;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.hostFilter.valueChanges
      .subscribe(
        host => {
          this.filterValues.host = host;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.eventFilter.valueChanges
      .subscribe(
        event => {
          this.filterValues.event = event;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.descriptionFilter.valueChanges
      .subscribe(
        description => {
          this.filterValues.description = description;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )   
  }

  ngAfterViewInit() {

  }

  fetchAuditData() {
    this.sendFetchService.fetchData('audit').subscribe((data) => {
      this.listOfAudit = <Audit[]>data;
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
}
