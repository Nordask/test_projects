import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Setting } from '@core/classes/Setting';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SendFetchService } from '@core/services/send-fetch.service';
import { SettingsFormsService } from '@modules/settings/services/settings-forms.service';

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.css']
})
export class UpdateModalComponent implements OnInit {
  listOfSettings: Setting[];
  @Input() updatedObj: Setting;
  @Output() passEntry: EventEmitter<Setting[]> = new EventEmitter();
  settingsForm: FormGroup;
  settingsData: Setting;
  selectedName: string;

  constructor(private activeModal: NgbActiveModal, 
              private sendFetchService: SendFetchService,
              private settingsFormService: SettingsFormsService) { 
    this.settingsForm = this.settingsFormService.getUpdateSettingForm();  
  }

  ngOnInit() {
    this.selectedName = this.updatedObj.name;
    this.settingsForm.controls['type'].setValue(this.updatedObj.type);
    this.settingsForm.controls['value'].setValue(this.updatedObj.value);

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
      this.sendFetchService.sendData(this.settingsData, "settings", "update").subscribe((data) => {
        this.listOfSettings = <Setting[]>data;
        this.passEntry.emit(this.listOfSettings);
      });

      this.activeModal.close('Modal Closed');
    }  
  }
 
  closeModal() {
    this.activeModal.close('Modal Closed');
  }
}
