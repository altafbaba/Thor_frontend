import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaintenanceService } from 'src/app/core/maintenance/maintenance.service';
import { IMaintenance } from 'src/app/core/maintenance/maintenance.type';

@Component({
  selector: 'app-maintenance-card',
  templateUrl: './maintenance-card.component.html',
  styleUrls: ['./maintenance-card.component.scss'],
})
export class MaintenanceCardComponent implements OnInit {
  fullMaintemamceData: IMaintenance;
  MaintemamceData = [];

  constructor(
    private MaintenanceServices: MaintenanceService,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  ngOnInit(): void {
    this.MaintenanceServices.getDetailsmaintenance().subscribe((res) => {
      this.MaintemamceData = res;
      console.log(this.MaintemamceData);

    
    });
  }
}
