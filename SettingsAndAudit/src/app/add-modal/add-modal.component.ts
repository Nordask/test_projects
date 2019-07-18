import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Settings } from '../Interfaces';
import { SendFetchService } from '../send-fetch.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.css']
})
export class AddModalComponent implements OnInit{
  @Input() listOfSettings: Settings[];
  @Output() passEntry: EventEmitter<Settings[]> = new EventEmitter();
  settingsForm: FormGroup;
  settingsData: Settings;
  message: string;
  type: string;

  constructor(private activeModal: NgbActiveModal, private sendFetchService: SendFetchService) { 
    this.settingsForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      value: new FormControl("", [Validators.required]),
      type: new FormControl("", [Validators.required, Validators.pattern("^(Строка|Число|Дата)$")])
    });
  }

  ngOnInit() {
    console.log(this.listOfSettings);
    this.settingsForm.get('type').valueChanges.subscribe(item => {
      switch(item) {
        case 'Строка':
            this.settingsForm.controls["value"].clearValidators();
            this.settingsForm.controls["value"].setValidators([Validators.required]);
            this.settingsForm.controls["value"].updateValueAndValidity();
        break;

        case 'Число':
            this.settingsForm.controls["value"].clearValidators();
            this.settingsForm.controls["value"].setValidators([Validators.pattern("[0-9]*$")]);
            this.settingsForm.controls["value"].updateValueAndValidity();
        break;

        case 'Дата':
            this.settingsForm.controls["value"].clearValidators();
            this.settingsForm.controls["value"].setValidators([Validators.pattern("^[0-9]{1,2}\.[0-9]{1,2}\.[0-9]{4}$")]);
            this.settingsForm.controls["value"].updateValueAndValidity();
        break;
        default:
      }
    });
  }

  addSetting() {
    if(this.settingsForm.valid == true) {
      this.message = null;
      // Setting name must be unique
      let doubleCheck = this.listOfSettings.filter(item => {
        return item.name == this.settingsForm.controls.name.value;
      });
      if(doubleCheck.length > 0) {
        this.message = 'Настройка с таким именем уже существует!';
      } else {
        this.settingsData = {
          name: this.settingsForm.controls.name.value,
          value: this.settingsForm.controls.value.value,
          type: this.type
        }

        this.sendFetchService.sendData(this.settingsData, "settings", "add").subscribe((data) => {
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
  }
 
  closeModal() {
    this.activeModal.close('Modal Closed');
  }
}
