import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SettingsComponent } from './settings/settings.component';
import { AuditComponent } from './audit/audit.component';
import { SendFetchService } from './send-fetch.service';

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    AuditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [SendFetchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
