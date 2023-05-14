import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MaintenanceService } from 'src/app/core/maintenance/maintenance.service';
import { IMaintenance } from 'src/app/core/maintenance/maintenance.type';
import { VehicleService } from 'src/app/core/vehicle/vehicle.service';

@Component({
  selector: 'app-maintenace-form',
  templateUrl: './maintenace-form.component.html',
  styleUrls: ['./maintenace-form.component.scss'],
})
export class MaintenaceFormComponent implements OnInit {
  maintenance: IMaintenance = null;
  vehicles = [];
  mForm: FormGroup = new FormGroup({
    vNumber: new FormControl('', [Validators.required]),
    mType: new FormControl('', [Validators.required]),
    mDate: new FormControl('', [Validators.required]),
    garageName: new FormControl('', [Validators.required]),
    mPart: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
  });

  constructor(
    private VehiclesServices: VehicleService,
    private maintenanceServices: MaintenanceService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    //get vehicles
    this.VehiclesServices.vehicals$.subscribe((veh) => {
      this.vehicles = veh;
      
    });

    // auto fill for update
this.maintenanceServices.maintenance$.subscribe((man)=>{
  if(man){
    this.maintenance = man
    this.mForm.patchValue(man)
  }
})

  }
  save() {
    this.mForm.markAllAsTouched();
   if (this.mForm.value.invalid) return;

    //update maintenance
    if (this.maintenance) {
      this.maintenanceServices
        .updateMaintenance(this.maintenance.id, this.mForm.value)
        .subscribe({
          error: (err) => {
            this.snackBar.open(err.message, 'close')._dismissAfter(3000);
          },
          next: (res) => {
            this.snackBar
              .open('Maintenance Update', 'close')
              ._dismissAfter(3000);
            this.router.navigateByUrl('/maintenance');
          },
        });
    }
    //create maintenance
    else {
      this.maintenanceServices.createMaintenance(this.mForm.value).subscribe({
        error: (err) => {
          this.snackBar.open(err.message, 'close')._dismissAfter(3000);
        },
        next: (res) => {
          this.snackBar
            .open('Maintenance Created', 'close')
            ._dismissAfter(3000);
            this.router.navigateByUrl('/maintenance');
        },
      });
    }
    
  }
  
}
