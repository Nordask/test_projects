import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { AuditComponent } from './audit/audit.component';

const routes: Routes = [
  {path: "settings", component: SettingsComponent},
  {path: "audit", component: AuditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
