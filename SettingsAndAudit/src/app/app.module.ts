import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatInputModule, MatCheckboxModule,
  MatSelectModule} from "@angular/material";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SettingsComponent } from './settings/settings.component';
import { AuditComponent } from './audit/audit.component';
import { SendFetchService } from './send-fetch.service';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AddModalComponent } from './add-modal/add-modal.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { UpdateModalComponent } from './update-modal/update-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    AuditComponent,
    AddModalComponent,
    DeleteModalComponent,
    UpdateModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule
  ],
  providers: [SendFetchService],
  bootstrap: [AppComponent],
  entryComponents: [
    AddModalComponent,
    DeleteModalComponent,
    UpdateModalComponent]
})
export class AppModule { }
