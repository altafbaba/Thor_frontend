import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaintenanceComponent } from './maintenance.component';
import { MaintenaceFormComponent } from './maintenace-form/maintenace-form.component';
import { Route, RouterModule } from '@angular/router';

const mRoutes: Route[] = [
  {
    path: '',
    component: MaintenanceComponent,
  },
  {
    path: 'mForm',
    component: MaintenaceFormComponent,
  },
];

@NgModule({
  declarations: [MaintenanceComponent, MaintenaceFormComponent],
  imports: [CommonModule, RouterModule.forChild(mRoutes)],
})
export class MaintenanceModule {}
