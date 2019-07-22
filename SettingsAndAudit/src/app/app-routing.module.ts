import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuardService} from "./core/services/auth-guard.service";
import {APP_ROUTING_ENUM} from "./app-routing.enum";
import {APP_ROUTING_TITLE_ENUM} from "./app-routing-title.enum";

const routes: Routes = [
  //{path: 'login', component: LoginComponent},
  {
    path: APP_ROUTING_ENUM.LOGIN,
    data: { title: APP_ROUTING_TITLE_ENUM.LOGIN },
    loadChildren: '@modules/login/login.module#LoginModule'
  },
  {
    path: APP_ROUTING_ENUM.SETTINGS,
    data: { title: APP_ROUTING_TITLE_ENUM.SETTINGS },
    loadChildren: '@modules/settings/settings.module#SettingsModule',
    canActivate: [AuthGuardService]
  },
  {
    path: APP_ROUTING_ENUM.AUDIT,
    data: { title: APP_ROUTING_TITLE_ENUM.AUDIT },
    loadChildren: '@modules/audit/audit.module#AuditModule',
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
