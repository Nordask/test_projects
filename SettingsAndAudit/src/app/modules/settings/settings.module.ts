import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SettingsComponent} from '@modules/settings/components/settings/settings.component';
import {AddModalComponent} from '@modules/settings/components/add-modal/add-modal.component';
import {UpdateModalComponent} from '@modules/settings/components/update-modal/update-modal.component';
import {DeleteModalComponent} from '@modules/settings/components/delete-modal/delete-modal.component';
import {SettingsRoutingModule} from './settings.routing';
import { MatButtonModule, MatInputModule, MatSelectModule, MatTableModule, MatIconModule, MatListModule, MatDialogModule } from "@angular/material";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [SettingsComponent,
                 AddModalComponent,
                 UpdateModalComponent,
                 DeleteModalComponent
                ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  entryComponents: [
    AddModalComponent,
    UpdateModalComponent,
    DeleteModalComponent]
})
export class SettingsModule { }
