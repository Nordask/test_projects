import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { AuditComponent } from './audit/audit.component';
import { LoginComponent } from './login/login.component';
import {AuthGuardService} from "./core/services/auth-guard.service";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: "settings", component: SettingsComponent, canActivate: [AuthGuardService]},
  {path: "audit", component: AuditComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
