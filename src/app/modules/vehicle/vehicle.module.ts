import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleComponent } from './vehicle.component';
import { RouterModule, Routes } from '@angular/router';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { createVehicleResolver, editVehicleResolver } from 'src/app/core/vehicle/vehicle.resolver';

const VRoutes: Routes = [
  {
    path: '',
    resolve:[createVehicleResolver],
    component: VehicleComponent,
  },
  {
    path: 'form',
    resolve:[createVehicleResolver],
    component: VehicleFormComponent,
  },
  {
    path:':id',
    resolve:[editVehicleResolver],
    component:VehicleFormComponent,
  }
];

@NgModule({
  declarations: [VehicleComponent, VehicleFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(VRoutes),
  ],
})
export class VehicleModule {}
