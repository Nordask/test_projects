import { Component, OnInit } from '@angular/core';
import { Setting } from '@core/classes/Setting';
import { SendFetchService } from '@core/services/send-fetch.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AddModalComponent } from '../add-modal/add-modal.component';
import { UpdateModalComponent } from '../update-modal/update-modal.component';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settingsData: Setting;
  listOfSettings: Setting[];
  displayedColumns: string[] = ['name', 'value', 'type', 'actions'];
  dataSource;

  constructor(private sendFetchService: SendFetchService, private modalService: NgbModal) { }

  ngOnInit() {
    this.fetchSettingsData();
  }

  fetchSettingsData() {
  this.sendFetchService.fetchData('settings').subscribe((data) => {
      this.listOfSettings = <Setting[]>data;
      this.dataSource= new MatTableDataSource(this.listOfSettings);
    });
  }

  openAddFormModal() {
    let modalOption: NgbModalOptions = {};
    modalOption.backdrop = 'static';
    modalOption.keyboard = false;
    const modalRef = this.modalService.open(AddModalComponent, modalOption);
    modalRef.componentInstance.listOfSettings = this.listOfSettings;

    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      this.listOfSettings = receivedEntry;
      this.dataSource= new MatTableDataSource(this.listOfSettings);
    });
    
    modalRef.result.then((result) => {
    }).catch((error) => {
      console.log(error);
    });
  }

  openDeleteFormModal(selectedName: string) {
    let modalOption: NgbModalOptions = {};
    modalOption.backdrop = 'static';
    modalOption.keyboard = false;
    const modalRef = this.modalService.open(DeleteModalComponent, modalOption);
    modalRef.componentInstance.name = selectedName;
    
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      this.listOfSettings = receivedEntry;
      this.dataSource= new MatTableDataSource(this.listOfSettings);
    });
    
    modalRef.result.then((result) => {
    }).catch((error) => {
      console.log(error);
    });
  }

  openUpdateFormModal(name: string, value: string, type: string) {
    let modalOption: NgbModalOptions = {};
    modalOption.backdrop = 'static';
    modalOption.keyboard = false;
    let updatedObj: Setting = {name: name, value: value, type:type};
    const modalRef = this.modalService.open(UpdateModalComponent, modalOption);
    modalRef.componentInstance.updatedObj = updatedObj;

    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      this.listOfSettings = receivedEntry;
      this.dataSource= new MatTableDataSource(this.listOfSettings);
    });
    
    modalRef.result.then((result) => {
    }).catch((error) => {
      console.log(error);
    });
  }
}
