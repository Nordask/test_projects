import { Component, OnInit } from '@angular/core';
import { Settings } from '../core/interfaces/SettingsInterface';
import { SendFetchService } from '../core/services/send-fetch.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddModalComponent } from '../add-modal/add-modal.component';
import { UpdateModalComponent } from '../update-modal/update-modal.component';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settingsData: Settings;
  listOfSettings: Settings[];
  message: string; // if http request failed, information about fail will write at that var
  displayedColumns: string[] = ['name', 'value', 'type', 'actions'];
  dataSource;

  constructor(private sendFetchService: SendFetchService, private modalService: NgbModal) { }

  ngOnInit() {
    this.fetchSettingsData();
    console.log(this.listOfSettings)
  }

  fetchSettingsData() {
    this.sendFetchService.fetchData('settings').subscribe(
      (data) => {
        this.message = null;
        this.listOfSettings = Object.keys(data).map(i => data[i]);
        this.dataSource= new MatTableDataSource(this.listOfSettings);
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

  openAddFormModal() {
    const modalRef = this.modalService.open(AddModalComponent);
    modalRef.componentInstance.listOfSettings = this.listOfSettings;

    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      this.listOfSettings = receivedEntry;
      this.dataSource= new MatTableDataSource(this.listOfSettings);
    });
    
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }

  deleteSetting(selectedName: string) {
    let selectedSetting = {
      name: selectedName,
      value: "",
      type: ""
    }
    
    if(confirm("Вы уверены, что хотите удалить настроку " + selectedName)) {
      this.sendFetchService.sendData(selectedSetting, "settings", "delete").subscribe((data) => {
        this.message = null;
        this.listOfSettings = Object.keys(data).map(i => data[i]);
        this.dataSource = new MatTableDataSource(this.listOfSettings);
      },
      (err: HttpErrorResponse) => {
        if(err instanceof Error) {
          // client-side error
          this.message = `An error occured ${err.error.message}`;
        } else {
          this.message = `Backend returned err code ${err.status}, body was: ${err.message}`;
        }
      });
    }
  }

  openUpdateFormModal(name: string, value: string, type: string) {
    let updatedObj: Settings = {name: name, value: value, type:type};
    const modalRef = this.modalService.open(UpdateModalComponent);
    modalRef.componentInstance.updatedObj = updatedObj;
    //modalRef.componentInstance.listOfSettings = this.listOfSettings;

    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      this.listOfSettings = receivedEntry;
      this.dataSource= new MatTableDataSource(this.listOfSettings);
    });
    
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }
}
