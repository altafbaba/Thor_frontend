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
  vehicle: IVehicle = null

  vForm: FormGroup = new FormGroup({
    vName: new FormControl('', [Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    vNumber: new FormControl('', [Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    loadCapacity: new FormControl('', [Validators.required,Validators.maxLength(12)]),
  });

  constructor(
    private vehicleService: VehicleService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    //for edit auto fill
    this.vehicleService.vehical$.subscribe((veh) => {
      if (veh) {
        this.vehicle = veh;
        this.vForm.patchValue(veh);
      }
      
    });
  }

  save() {
    this.vForm.markAllAsTouched();
    if (this.vForm.value.invalid) return;
//updateVehicles
    if (this.vehicle) {
      this.vehicleService
        .updateVehical(this.vehicle._id, this.vForm.value)
        .subscribe({
          // error: (err) => {
          //   this.snackBar.open(err.message, 'close')._dismissAfter(3000);
          // },
          next: (res) => {
            this.openSnackBar('Success', 'close');
            this.router.navigateByUrl('/vehicle');
          },
        });
    }

    //createVehicles
    else {
      this.vehicleService.createVehical(this.vForm.value).subscribe({
        // error: (err) => {
        //   this.snackBar.open(err.message, 'close')._dismissAfter(3000);
        // },
        next: (res) => {
          this.openSnackBar('Success', 'close');
          
          this.router.navigateByUrl('/vehicle');
        },
      });
    }
  }


  openSnackBar(type: 'Error' | 'Info' | 'Success', msg: string) {
    this.snackBar.open(msg, 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass:
        type == 'Error'
          ? 'text-red-500'
          : type == 'Info'
          ? 'text-blue-500'
          : 'text-green-500',
    });
  }
}
