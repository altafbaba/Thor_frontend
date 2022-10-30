import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaintenanceComponent } from './maintenance.component';
import { MaintenaceFormComponent } from './maintenace-form/maintenace-form.component';



@NgModule({
  declarations: [
    MaintenanceComponent,
    MaintenaceFormComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MaintenanceModule { }
