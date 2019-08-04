import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { Setting } from '@core/classes/Setting';
import { SendFetchService } from '@core/services/send-fetch.service';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit{
  listOfSettings;
  name: string;
  passEntry: EventEmitter<Setting[]> = new EventEmitter();
  selectedName: string;
  selectedSetting: Setting;

  constructor(private dialogRef: MatDialogRef<DeleteModalComponent>,
              private sendFetchService:SendFetchService,
              @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit() {
    this.name = this.data;
  }

  deleteSetting() {
    this.selected();
    //if(confirm("Вы уверены, что хотите удалить настроку " + this.name)) {
    this.sendFetchService.sendData<Setting>(this.selectedSetting, "settings", "delete").subscribe((data) => {
      this.listOfSettings = data;
      this.passEntry.emit(this.listOfSettings);
    });

      this.dialogRef.close();
  }

  selected() {
    this.selectedSetting = {
      name: this.name,
      value: "",
      type: ""
    }
  }

  cancel() {
    this.dialogRef.close(); 
  }
}
