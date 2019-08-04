import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { Setting } from '@core/classes/Setting';
import { SendFetchService } from '@core/services/send-fetch.service';
import { SettingsFormsService } from '@modules/settings/services/settings-forms.service';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.css'],
  providers: [SettingsFormsService]
})
export class AddModalComponent implements OnInit{
  listOfSettings: Setting[];
  passEntry: EventEmitter<Setting[]> = new EventEmitter();
  settingsForm: FormGroup;
  settingsData: Setting;
  message: string;

  constructor(private dialogRef: MatDialogRef<AddModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Setting[],
              private sendFetchService: SendFetchService,
              private settingsFormsService: SettingsFormsService) { 
    this.settingsForm = this.settingsFormsService.getAddSettingForm();
  }

  ngOnInit() {
    this.listOfSettings = this.data;
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

        this.sendFetchService.sendData<Setting>(this.settingsData, "settings", "add").subscribe((data) => {
          this.listOfSettings = data;
          this.passEntry.emit(this.listOfSettings);
        });
        this.dialogRef.close();
      }  
    }    
  }
 
  close() {
    this.dialogRef.close();
  }
}
