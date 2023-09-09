import { Component, Inject, OnInit } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { MaintenanceService } from 'src/app/core/maintenance/maintenance.service';
import { IMaintenance } from 'src/app/core/maintenance/maintenance.type';

@Component({
  selector: 'app-maintenance-card',
  templateUrl: './maintenance-card.component.html',
  styleUrls: ['./maintenance-card.component.scss'],
})
export class MaintenanceCardComponent implements OnInit {
  fullMaintenanceData: IMaintenance;
  MaintenanceData = [];

  constructor(
    private MaintenanceServices: MaintenanceService,
    @Inject(MAT_DIALOG_DATA) public data: IMaintenance
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    
    
  }
  ngAfterContentInit(){
    this.MaintenanceServices.getDetailsmaintenance(this.data.vNumber).subscribe((res) => {
      this.MaintenanceData = res;
      console.log(this.MaintenanceData);
    });
  }
 
}
