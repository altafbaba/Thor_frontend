import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';


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
    CommonModule,SharedModule,FormsModule,RouterModule.forChild(rRrports)
  ]
})
export class ReportsModule { }
