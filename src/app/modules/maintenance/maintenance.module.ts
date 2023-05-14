import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaintenanceComponent } from './maintenance.component';
import { MaintenaceFormComponent } from './maintenace-form/maintenace-form.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { createMaintenanceResolver, editMaintenanceResolver } from 'src/app/core/maintenance/maintenance.resolver';

const mRoutes: Route[] = [
  {
    path: '',
    component: MaintenanceComponent,
  },
  {
    path: 'mForm',
    resolve:[createMaintenanceResolver],
    component: MaintenaceFormComponent,
  },
  {
    path:":id",
    resolve:[editMaintenanceResolver],
    component:MaintenaceFormComponent
  }
];

@NgModule({
  declarations: [MaintenanceComponent, MaintenaceFormComponent],
  imports: [CommonModule, SharedModule,ReactiveFormsModule,FormsModule
    , RouterModule.forChild(mRoutes)],
})
export class MaintenanceModule {}
