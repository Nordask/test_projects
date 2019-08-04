import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Setting } from '@core/classes/Setting';
import { SendFetchService } from '@core/services/send-fetch.service';
import { SettingsFormsService } from '@modules/settings/services/settings-forms.service';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.css']
})
export class UpdateModalComponent implements OnInit {
  listOfSettings: Setting[];
  passEntry: EventEmitter<Setting[]> = new EventEmitter();
  settingsForm: FormGroup;
  settingsData: Setting;
  selectedName: string;

  constructor(private dialogRef: MatDialogRef<UpdateModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Setting,
              private sendFetchService: SendFetchService,
              private settingsFormService: SettingsFormsService) { 
    this.settingsForm = this.settingsFormService.getUpdateSettingForm();  
  }

  ngOnInit() {
    this.selectedName = this.data.name;
    this.settingsForm.controls['type'].setValue(this.data.type);
    this.settingsForm.controls['value'].setValue(this.data.value);
    this.settingsFormService.switchValidation(this.settingsForm.get('type').value);

    this.settingsForm.get('type').valueChanges.subscribe(item => {
      this.settingsForm = this.settingsFormService.switchValidation(item);
    });
  }

  updateSetting() {
    if(this.settingsFormService.isValid == true) {
      this.settingsData = {
        name: this.selectedName,
        value: this.settingsForm.controls.value.value,
        type: this.settingsForm.controls.type.value
      }
      this.sendFetchService.sendData<Setting>(this.settingsData, "settings", "update").subscribe((data) => {
        this.listOfSettings = data;
        this.passEntry.emit(this.listOfSettings);
      });

      this.dialogRef.close();
    }  
  }
 
  close() {
    this.dialogRef.close();
  }
}
