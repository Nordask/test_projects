import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from "@angular/forms";
import { Settings } from '../Interfaces';
import { SendFetchService } from '../send-fetch.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit{
  @Input() listOfSettings;
  selectedName: string;
  selectedSetting: Settings;

  constructor(private activeModal: NgbActiveModal, private sendFetchService:SendFetchService) { }

  deleteSetting() {
    this.sendFetchService.sendData(this.selectedSetting);
    this.activeModal.close('Modal Closed');
  }

  selected() {
    this.selectedSetting = {
      file: "settings",
      operation: "delete",
      name: this.selectedName,
      value: "",
      type: ""
    }
  } 

  ngOnInit() {
    this.selectedName = this.listOfSettings[0].name;
  }

}
