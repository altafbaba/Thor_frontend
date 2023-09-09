import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports.component';
import { Route, RouterModule } from '@angular/router';


const rRrports :Route[]=[
  { path: "",
  component:ReportsComponent
}
]

@NgModule({
  declarations: [
    ReportsComponent
  ],
  imports: [
    CommonModule,RouterModule.forChild(rRrports)
  ]
})
export class ReportsModule { }
