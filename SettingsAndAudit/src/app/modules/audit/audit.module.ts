import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuditComponent} from '@modules/audit/components/audit/audit.component';
import {AuditRoutingModule} from './audit.routing';
import { MatButtonModule, MatInputModule, MatCheckboxModule, MatTableModule, MatSortModule, MatIconModule, MatListModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [AuditComponent],
  imports: [
    CommonModule,
    AuditRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuditModule { }
