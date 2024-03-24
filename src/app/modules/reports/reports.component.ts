import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ReportsService } from 'src/app/core/report/reports.service';



@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent {
 
 
  allDetails: string;
  btns: string[] = ['Maintenance','Fuel', 'Insurance', ];

 
  constructor(private ReportServices:ReportsService) { }

  ngOnInit(){
   
   
    
  }


}
