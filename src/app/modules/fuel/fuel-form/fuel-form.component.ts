import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DriverService } from 'src/app/core/driver/driver.service';
import { FuelService } from 'src/app/core/fuel/fuel.service';
import { IFuel } from 'src/app/core/fuel/fuel.type';
import { VehicleService } from 'src/app/core/vehicle/vehicle.service';
import { IVehicle } from 'src/app/core/vehicle/vehicle.type';

@Component({
  selector: 'app-fuel-form',
  templateUrl: './fuel-form.component.html',
  styleUrls: ['./fuel-form.component.scss'],
})
export class FuelFormComponent implements OnInit {
  fuel: IFuel = null;
  drivers = [];
  vehicles= [];

  fForm: FormGroup = new FormGroup({
    fType: new FormControl('', [Validators.required]),
    dName: new FormControl('', [Validators.required]),
    petrolPumpName: new FormControl('', [Validators.required]),
    area: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    vName: new FormControl('', [Validators.required]),
    
  });

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private fuelServices: FuelService,
    private DriverSerives: DriverService,
    private VehicleSerives:VehicleService
  ) {}

  ngOnInit(): void {
    //for edit auto fill
    this.fuelServices.fuel$.subscribe((ful) => {
      if (ful) {
        this.fuel = ful;
        this.fForm.patchValue(ful);
      }
    });

//get Driver
this.DriverSerives.getDriver().subscribe((dri)=>{
  this.drivers = dri
  console.log(this.drivers);
})

//get Vehicle
this.VehicleSerives.getVehical().subscribe((veh)=>{
  this.vehicles = veh
  console.log(this.vehicles);
  
})

  }

  save() {
    this.fForm.markAllAsTouched();
    if (this.fForm.invalid) return;

    //update fuel
    if (this.fuel) {
      this.fuelServices.updateFuel(this.fuel._id, this.fForm.value).subscribe({
        error: (err) => {
          this.snackBar.open(err.message, 'close')._dismissAfter(3000);
        },
        next: (res) => {
          this.snackBar.open('fuel Updated', 'close')._dismissAfter(3000);
          this.router.navigateByUrl('/fuel');
        },
      });
    }
    //create Fuel
    else {
      this.fuelServices.createFuel(this.fForm.value).subscribe({
        error: (err) => {
          this.snackBar.open(err.message, 'close')._dismissAfter(5000);
        },
        next: (res) => {
          this.snackBar.open('fuel Created', 'close')._dismissAfter(3000);

          this.router.navigateByUrl('/fuel');
        },
      });
    }
    console.log(this.fForm.value)
  }
}
