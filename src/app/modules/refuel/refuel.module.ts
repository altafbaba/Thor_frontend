import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RefuelComponent } from './refuel.component';
import { RefuelFormComponent } from './refuel-form/refuel-form.component';
import { Route, RouterModule } from '@angular/router';

const rRoute: Route[] = [
  { path: '', component: RefuelComponent },

  {
    path: 'rForm',
    component: RefuelFormComponent,
  },
];

@NgModule({
  declarations: [RefuelComponent, RefuelFormComponent],
  imports: [CommonModule, RouterModule.forChild(rRoute)],
})
export class RefuelModule {}
