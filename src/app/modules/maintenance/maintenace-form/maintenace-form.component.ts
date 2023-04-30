import { Component, OnInit } from '@angular/core';
import { VehicleService } from 'src/app/core/vehicle/vehicle.service';

@Component({
  selector: 'app-maintenace-form',
  templateUrl: './maintenace-form.component.html',
  styleUrls: ['./maintenace-form.component.scss'],
})
export class MaintenaceFormComponent implements OnInit {
vehicles = []

  constructor(private VehiclesServices:VehicleService) {}

  ngOnInit(): void {
this.VehiclesServices.vehicals$.subscribe((veh)=>{
  this.vehicles = veh
  console.log(veh)
})


  }
  save() {}
}
