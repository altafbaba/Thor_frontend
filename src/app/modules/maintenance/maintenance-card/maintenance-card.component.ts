import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaintenanceService } from 'src/app/core/maintenance/maintenance.service';
import { IMaintenance } from 'src/app/core/maintenance/maintenance.type';

@Component({
  selector: 'app-maintenance-card',
  templateUrl: './maintenance-card.component.html',
  styleUrls: ['./maintenance-card.component.scss']
})
export class MaintenanceCardComponent implements OnInit {

 fullMaintemamceData:IMaintenance

  constructor(private MaintenanceServices:MaintenanceService, @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit(): void {
    this.MaintenanceServices.getmaintenancebyid(this.data).subscribe((res)=>{
      this.fullMaintemamceData = res
      console.log(this.data,this.fullMaintemamceData);
    })
    
    
    
    
  }

}
