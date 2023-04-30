import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { VehicleService } from 'src/app/core/vehicle/vehicle.service';
import { IVehicle } from 'src/app/core/vehicle/vehicle.type';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.scss'],
})
export class VehicleFormComponent implements OnInit {
  Vehicle: IVehicle = null

  vForm: FormGroup = new FormGroup({
    vName: new FormControl('', [Validators.required]),
    vNumber: new FormControl('', [Validators.required]),
    loadCapacity: new FormControl('', [Validators.required]),
  });

  constructor(
    private vehicleService: VehicleService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.vehicleService.vehical$.subscribe((veh) => {
      if (veh) {
        this.Vehicle = veh;
        this.vForm.patchValue(veh);
        //console.log(veh)
        
      }
    });
  }

  save() {
    //updateVehicles
    this.vForm.markAllAsTouched();
    if (this.vForm.invalid) return;

    if (this.Vehicle) {
      this.vehicleService
        .updateVehical(this.Vehicle._id, this.vForm.value)
        .subscribe({
          error: (err) => {
            this.snackBar.open(err.message, 'close')._dismissAfter(3000);
          },
          next: (res) => {
            this.snackBar.open('Vehicle Updated', 'close')._dismissAfter(3000);
            this.router.navigateByUrl('/vehicle');
          },
        });
    }

    //createVehicles
    else {
      this.vehicleService.createVehical(this.vForm.value).subscribe({
        error: (err) => {
          this.snackBar.open(err.message, 'close')._dismissAfter(3000);
        },
        next: (res) => {
          this.snackBar.open('Vehicle Created', 'close')._dismissAfter(3000);
          
          this.router.navigateByUrl('/vehicle');
        },
      });
    }
  }
}
