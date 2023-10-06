import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardCardComponent } from './dashboard-card/dashboard-card.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgxChartsModule } from '@swimlane/ngx-charts';

const dRoute :Route[]=[
  {path:"",
  component:DashboardComponent

},
{
  path:"dcard",
  component:DashboardCardComponent

}
]

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardCardComponent
  ],
  imports: [
    CommonModule,SharedModule,NgApexchartsModule,RouterModule.forChild(dRoute),SharedModule,NgxChartsModule
  ]
})
export class DashboardModule { }
