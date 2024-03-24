import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { FuelComponent } from './fuel/fuel.component';
import { InsuranceComponent } from './insurance/insurance.component';


const rRrports :Route[]=[
  { path: "",
  component:ReportsComponent
}
]

@NgModule({
  declarations: [
    ReportsComponent,
    MaintenanceComponent,
    FuelComponent,
    InsuranceComponent
  ],
  imports: [
    CommonModule,SharedModule,FormsModule,ReactiveFormsModule,RouterModule.forChild(rRrports)
  ]
})
export class ReportsModule { }
