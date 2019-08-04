import { Component, OnInit } from '@angular/core';
import { Setting } from '@core/classes/Setting';
import { SendFetchService } from '@core/services/send-fetch.service';
import { AddModalComponent } from '../add-modal/add-modal.component';
import { UpdateModalComponent } from '../update-modal/update-modal.component';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogConfig} from "@angular/material";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settingsData: Setting;
  listOfSettings: Setting[];
  displayedColumns: string[] = ['name', 'value', 'type', 'actions'];
  dataSource;

  constructor(private sendFetchService: SendFetchService, private dialog: MatDialog) { }

  ngOnInit() {
    this.fetchSettingsData();
  }

  fetchSettingsData() {
  this.sendFetchService.fetchData<Setting>('settings').subscribe((data) => {
      this.listOfSettings = <Setting[]>data;
      this.dataSource= new MatTableDataSource(this.listOfSettings);
    });
  }

  openAddFormModal() {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.listOfSettings;
    const dialogRef = this.dialog.open(AddModalComponent, dialogConfig);
    
    dialogRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      this.listOfSettings = receivedEntry;
      this.dataSource= new MatTableDataSource(this.listOfSettings);
    });
  }

  openDeleteFormModal(selectedName: string) {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = selectedName;
    const dialogRef = this.dialog.open(DeleteModalComponent, dialogConfig);

    dialogRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      this.listOfSettings = receivedEntry;
      this.dataSource= new MatTableDataSource(this.listOfSettings);
    });
  }

  openUpdateFormModal(name: string, value: string, type: string) {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {name: name, value: value, type:type};
    const dialogRef = this.dialog.open(UpdateModalComponent, dialogConfig);

    dialogRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      this.listOfSettings = receivedEntry;
      this.dataSource= new MatTableDataSource(this.listOfSettings);
    });
  }
}
