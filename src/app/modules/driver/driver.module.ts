import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriverComponent } from './driver.component';
import { DriverFromComponent } from './driver-from/driver-from.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { createDriverResolver, editDriverResolver } from 'src/app/core/driver/driver.resolver';
import { editVehicleResolver } from 'src/app/core/vehicle/vehicle.resolver';

const dRoute: Route[] = [
  {
    path: '',
    component: DriverComponent,
  },

  {
    path: 'dForm',
   resolve:[createDriverResolver],
    component: DriverFromComponent,
  },
  {
    path:':id',
    resolve:[editDriverResolver],
    component: DriverFromComponent

  }
];

@NgModule({
  declarations: [DriverComponent, DriverFromComponent],
  imports: [CommonModule,SharedModule,FormsModule,ReactiveFormsModule, RouterModule.forChild(dRoute)],
})
export class DriverModule {}
