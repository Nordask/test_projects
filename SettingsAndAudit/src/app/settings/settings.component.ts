import { Component, OnInit } from '@angular/core';
import { Settings } from '../Interfaces';
import { SendFetchService } from '../send-fetch.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  message: string; // if http request failed, information about fail will write at that var

  constructor(private sendFetchService: SendFetchService, private modalService: NgbModal) { }

  ngOnInit() {
    this.fetchSettingsData();
  }

  fetchSettingsData() {
    this.sendFetchService.fetchData('settings').subscribe(
      (data) => {
        this.message = null;
        this.listOfSettings = Object.keys(data).map(i => data[i]);
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
    });
    
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }

  openDeleteFormModal() {
    const modalRef = this.modalService.open(DeleteModalComponent);
    modalRef.componentInstance.listOfSettings = this.listOfSettings;
    
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      this.listOfSettings = receivedEntry;
    });

    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }

  openUpdateFormModal() {
    const modalRef = this.modalService.open(UpdateModalComponent);
    modalRef.componentInstance.listOfSettings = this.listOfSettings;

    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      this.listOfSettings = receivedEntry;
    });
    
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }

  ngOnChanges() {
    //console.log('qqqq');
    //this.fetchSettingsData();
  }
}
