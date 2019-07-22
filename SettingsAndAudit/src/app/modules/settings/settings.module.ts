import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SettingsComponent} from '@modules/settings/components/settings/settings.component';
import {AddModalComponent} from '@modules/settings/components/add-modal/add-modal.component';
import {UpdateModalComponent} from '@modules/settings/components/update-modal/update-modal.component';
import {SettingsRoutingModule} from './settings.routing';
import { MatButtonModule, MatInputModule, MatCheckboxModule, MatSelectModule, MatTableModule, MatIconModule, MatListModule} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [SettingsComponent, AddModalComponent, UpdateModalComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    AddModalComponent,
    UpdateModalComponent]
})
export class SettingsModule { }
