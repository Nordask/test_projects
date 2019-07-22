import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '@modules/login/components/login/login.component'
import {LoginRoutingModule} from './login.routing';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule, MatInputModule, } from "@angular/material";

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule
  ]
})
export class LoginModule { }
