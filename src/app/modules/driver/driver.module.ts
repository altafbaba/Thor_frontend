import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriverComponent } from './driver.component';
import { DriverFromComponent } from './driver-from/driver-from.component';
import { Route, RouterModule } from '@angular/router';

const dRoute: Route[] = [
  {
    path: '',
    component: DriverComponent,
  },

  {
    path: 'dForm',
    component: DriverFromComponent,
  },
];

@NgModule({
  declarations: [DriverComponent, DriverFromComponent],
  imports: [CommonModule, RouterModule.forChild(dRoute)],
})
export class DriverModule {}
