import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsuranceComponent } from './insurance.component';
import { InsuranceFormComponent } from './insurance-form/insurance-form.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateInsuranceResolver, editInsuranceResolver } from 'src/app/core/insurance/insurance.resolver';

const iRoute : Route[]=[
  {path:"",
  component:InsuranceComponent
  
},
{
  path:'iForm',
  resolve:[CreateInsuranceResolver],
  component:InsuranceFormComponent
},
{
  path:':id',
  resolve:[editInsuranceResolver],
  component:InsuranceFormComponent
}
]

@NgModule({
  declarations: [
    InsuranceComponent,
    InsuranceFormComponent
  ],
  imports: [
    CommonModule,RouterModule.forChild(iRoute),SharedModule,FormsModule,ReactiveFormsModule
  ]
})
export class InsuranceModule { }
