import { Component, OnInit } from '@angular/core';
import { Settings } from '../Interfaces';
import { SendFetchService } from '../send-fetch.service';
import { HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AddModalComponent } from '../add-modal/add-modal.component';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { UpdateModalComponent } from '../update-modal/update-modal.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settingsData: Settings;
  listOfSettings: Settings[];
  message: string;

  constructor(private sendFetchService: SendFetchService, private modalService: NgbModal) { }
  
  /*
  sendSettingsData() {
    this.settingsData = {
      file: "settings",
      operation: "add",
      name: "string",
      value: "string",
      type: "string"
    }
    console.log(this.sendFetchService.sendData(this.settingsData));
    //window.location.reload();
  }  
  */

  ngOnInit() {
    this.fetchSettingsData();
  }

  fetchSettingsData() {
    this.sendFetchService.fetchData('settings').subscribe(
      (data) => {
        this.message = null;
        //this.people = Object.values(data.headers);
        this.listOfSettings = Object.keys(data).map(i => data[i]);
        console.log(this.listOfSettings);
        //console.log(data.body); when we use { observe: 'response'}
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
    
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }

  openDeleteFormModal() {
    const modalRef = this.modalService.open(DeleteModalComponent);
    modalRef.componentInstance.listOfSettings = this.listOfSettings;
    
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }

  openUpdateFormModal() {
    const modalRef = this.modalService.open(UpdateModalComponent);
    modalRef.componentInstance.listOfSettings = this.listOfSettings;
    
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }

}
