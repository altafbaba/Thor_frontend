import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/core/dashboard/dashboard.service';
import { IDashboard } from 'src/app/core/dashboard/dashboard.type';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  data : IDashboard

  constructor(private dashboardSerives:DashboardService) { }

  ngOnInit(): void {
    this.dashboardSerives.getDashboard().subscribe((val:any)=>{
      this.data = val
    })
    
  }

}
