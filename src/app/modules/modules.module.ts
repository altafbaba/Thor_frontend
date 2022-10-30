import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MaterialCustomModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaintenanceFormComponent } from './maintenance-form/maintenance-form.component';

@NgModule({
  declarations: [
    MaintenanceFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialCustomModule,
  ],
})
export class ModulesModule {}
