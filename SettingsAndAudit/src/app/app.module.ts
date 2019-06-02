import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SettingsComponent } from './settings/settings.component';
import { AuditComponent } from './audit/audit.component';
import { SendFetchService } from './send-fetch.service';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AddModalComponent } from './add-modal/add-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    AuditComponent,
    AddModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [SendFetchService],
  bootstrap: [AppComponent],
  entryComponents: [AddModalComponent]
})
export class AppModule { }
