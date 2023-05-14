import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuelComponent } from './fuel.component';
import { Route, RouterModule } from '@angular/router';
import { FuelFormComponent } from './fuel-form/fuel-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const fRoute : Route[]=[
  {
    path:"",
    component:FuelComponent
  },
  {
    path:'fForm',
    component:FuelFormComponent
  }
]

@NgModule({
  declarations: [
    FuelComponent,
    FuelFormComponent
  ],
  imports: [
    CommonModule,SharedModule,ReactiveFormsModule,FormsModule,RouterModule.forChild(fRoute)
  ]
})
export class FuelModule { }
