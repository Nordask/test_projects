import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Settings } from '@core/interfaces/SettingsInterface';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SendFetchService } from '@core/services/send-fetch.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.css']
})
export class UpdateModalComponent implements OnInit {
  //@Input() listOfSettings: Settings[];
  listOfSettings: Settings[];
  @Input() updatedObj: Settings;
  @Output() passEntry: EventEmitter<Settings[]> = new EventEmitter();
  settingsForm: FormGroup;
  settingsData: Settings;
  selectedName: string;
  message: string;

  constructor(private activeModal: NgbActiveModal, private sendFetchService: SendFetchService) { 
    this.settingsForm = new FormGroup({
      //name: new FormControl("", [Validators.required]),
      value: new FormControl("", [Validators.required]),
      type: new FormControl("", [Validators.required, Validators.pattern("^(Строка|Число|Дата)$")])
    });  
  }

  ngOnInit() {
    console.log(this.updatedObj.name)
    this.selectedName = this.updatedObj.name;
    this.settingsForm.controls['type'].setValue(this.updatedObj.type);
    this.settingsForm.controls['value'].setValue(this.updatedObj.value);

    this.settingsForm.get('type').valueChanges.subscribe(item => {
      switch(item) {
        case 'Строка':
            this.settingsForm.controls["value"].clearValidators();
            this.settingsForm.controls["value"].setValidators([Validators.required]);
            this.settingsForm.controls["value"].updateValueAndValidity();
        break;

        case 'Число':
            this.settingsForm.controls["value"].clearValidators();
            this.settingsForm.controls["value"].setValidators([Validators.required, Validators.pattern("[0-9]*$")]);
            this.settingsForm.controls["value"].updateValueAndValidity();
        break;

        case 'Дата':
            this.settingsForm.controls["value"].clearValidators();
            this.settingsForm.controls["value"].setValidators([Validators.required, Validators.pattern("^[0-9]{1,2}\.[0-9]{1,2}\.[0-9]{4}$")]);
            this.settingsForm.controls["value"].updateValueAndValidity();
        break;
        default:
      }
    });
  }

  updateSetting() {
    if(this.settingsForm.valid == true) {
      this.settingsData = {
        name: this.selectedName,
        value: this.settingsForm.controls.value.value,
        type: this.settingsForm.controls.type.value
      }
      this.sendFetchService.sendData(this.settingsData, "settings", "update").subscribe((data) => {
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
 
  closeModal() {
    this.activeModal.close('Modal Closed');
  }
}
