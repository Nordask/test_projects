import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from "@angular/forms";
import { Settings } from '../Interfaces';
import { SendFetchService } from '../send-fetch.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit{
  @Input() listOfSettings;
  @Input() name;
  @Output() passEntry: EventEmitter<Settings[]> = new EventEmitter();
  selectedName: string;
  selectedSetting: Settings;
  message: string;

  constructor(private activeModal: NgbActiveModal, private sendFetchService:SendFetchService) { }

  deleteSetting() {
    this.selected();
    if(confirm("Вы уверены, что хотите удалить настроку " + this.name)) {
      this.sendFetchService.sendData(this.selectedSetting, "settings", "delete").subscribe((data) => {
        this.message = null;
        this.listOfSettings = Object.keys(data).map(i => data[i]);
        this.passEntry.emit(this.listOfSettings);
      },
      (err: HttpErrorResponse) => {
        if(err instanceof Error) {
          // client-side error
          this.message = `An error occured ${err.error.message}`;
        } else {
          this.message = `Backend returned err code ${err.status}, body was: ${err.message}`;
        }
      });

      this.activeModal.close('Modal Closed');
    } 
  }

  selected() {
    this.selectedSetting = {
      name: this.name,
      value: "",
      type: ""
    }
  } 

  ngOnInit() {

  }
}
