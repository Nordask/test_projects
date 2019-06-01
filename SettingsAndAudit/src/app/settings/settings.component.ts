import { Component, OnInit } from '@angular/core';
import { Settings } from '../Interfaces';
import { SendFetchService } from '../send-fetch.service';
import { HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  
  settingsData: Settings;
  listOfSettings: Settings[];
  message: string;

  constructor(private sendFetchService: SendFetchService) { }
  
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

}
