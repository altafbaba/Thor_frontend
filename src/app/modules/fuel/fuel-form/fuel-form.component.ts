import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FuelService } from 'src/app/core/fuel/fuel.service';
import { IFuel } from 'src/app/core/fuel/fuel.type';

@Component({
  selector: 'app-fuel-form',
  templateUrl: './fuel-form.component.html',
  styleUrls: ['./fuel-form.component.scss'],
})
export class FuelFormComponent implements OnInit {
  fuel: IFuel = null;

  fForm: FormGroup = new FormGroup({
    fType: new FormControl('', [Validators.required]),
    driverName: new FormControl('', [Validators.required]),
    petrolPumpName: new FormControl('', [Validators.required]),
    area: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),

  });

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private fuelServices: FuelService
  ) {}

  ngOnInit(): void {
    //for edit auto fill
    this.fuelServices.fuel$.subscribe((ful) => {
      if (ful) {
        this.fuel = ful;
        this.fForm.patchValue(ful);
      }
      
       
    });
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
    else{
      this.fuelServices.createFuel(this.fForm.value).subscribe({
        error: (err) => {
          this.snackBar.open(err.message, 'close')._dismissAfter(5000);
        },
        next: (res) => {
          this.snackBar.open('fuel Created', 'close')._dismissAfter(3000);
          
          this.router.navigateByUrl('/fuel');
        },

      })

    }
  }
}
