import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Settings } from '../Interfaces';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SendFetchService } from '../send-fetch.service';

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.css']
})
export class UpdateModalComponent implements OnInit {
  @Input() listOfSettings: Settings[];
  settingsForm: FormGroup;
  settingsData: Settings;

  constructor(private activeModal: NgbActiveModal, private sendFetchService: SendFetchService) { 
    this.settingsForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      value: new FormControl("", [Validators.required]),
      type: new FormControl("", [Validators.required, Validators.pattern("^(Строка|Число|Дата)$")])
    });  
    console.log(this.listOfSettings);
  }

  ngOnInit() {
    console.log(this.listOfSettings);
  }

  addSetting() {
    if(this.settingsForm.valid == true) {
      this.settingsData = {
        file: "settings",
        operation: "add",
        name: this.settingsForm.controls.name.value,
        value: this.settingsForm.controls.value.value,
        type: this.settingsForm.controls.type.value
      }
      console.log(this.sendFetchService.sendData(this.settingsData));
      console.log(this.settingsData);
      console.log(this.listOfSettings);
    }  
      
    this.activeModal.close('Modal Closed');
  }
 
  closeModal() {
    this.activeModal.close('Modal Closed');
  }
}
