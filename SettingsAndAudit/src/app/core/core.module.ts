import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from './services/login.service';
import { SendFetchService } from './services/send-fetch.service';
import { AuthGuardService } from './services/auth-guard.service';

@NgModule({
  declarations: [],
  providers: [
    LoginService,
    SendFetchService,
    AuthGuardService
  ],
  imports: [
    CommonModule,
  ]
})
export class CoreModule { }
