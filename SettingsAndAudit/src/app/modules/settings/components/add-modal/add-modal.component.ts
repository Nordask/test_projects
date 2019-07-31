import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Setting } from '@core/classes/Setting';
import { SendFetchService } from '@core/services/send-fetch.service';
import { SettingsFormsService } from '@modules/settings/services/settings-forms.service';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.css'],
  providers: [SettingsFormsService]
})
export class AddModalComponent implements OnInit{
  @Input() listOfSettings: Setting[];
  @Output() passEntry: EventEmitter<Setting[]> = new EventEmitter();
  settingsForm: FormGroup;
  settingsData: Setting;
  message: string;

  constructor(public activeModal: NgbActiveModal,
              private sendFetchService: SendFetchService,
              private settingsFormsService: SettingsFormsService) { 
    this.settingsForm = this.settingsFormsService.getAddSettingForm();
  }

  ngOnInit() { 
    this.settingsForm.get('type').valueChanges.subscribe(item => {
      this.settingsForm = this.settingsFormsService.switchValidation(item);  
    });
  }

  addSetting() {
    if(this.settingsFormsService.isValid == true) {
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
          type: this.settingsForm.controls.type.value
        }

        this.sendFetchService.sendData(this.settingsData, "settings", "add").subscribe((data) => {
          this.listOfSettings = <Setting[]>data;
          this.passEntry.emit(this.listOfSettings);
        });
        this.activeModal.close('Modal Closed');
      }  
    }    
  }
 
  closeModal() {
    this.activeModal.close('Modal Closed');
  }
}
