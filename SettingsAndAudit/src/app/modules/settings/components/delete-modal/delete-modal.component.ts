import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Setting } from '@core/classes/Setting';
import { SendFetchService } from '@core/services/send-fetch.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent{
  listOfSettings;
  @Input() name: string;
  @Output() passEntry: EventEmitter<Setting[]> = new EventEmitter();
  selectedName: string;
  selectedSetting: Setting;

  constructor(private activeModal: NgbActiveModal, private sendFetchService:SendFetchService) { }

  deleteSetting() {
    this.selected();
    //if(confirm("Вы уверены, что хотите удалить настроку " + this.name)) {
    this.sendFetchService.sendData(this.selectedSetting, "settings", "delete").subscribe((data) => {
      this.listOfSettings = <Setting[]>data;
      this.passEntry.emit(this.listOfSettings);
    });

      this.activeModal.close('Modal Closed');

  }

  selected() {
    this.selectedSetting = {
      name: this.name,
      value: "",
      type: ""
    }
  }

  cancel() {
    this.activeModal.close('Modal Closed');  
  }
}
