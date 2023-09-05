import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { Router } from '@angular/router';
import { InsuranceService } from 'src/app/core/insurance/insurance.service';
import { IInsurance } from 'src/app/core/insurance/insurance.type';
import { VehicleService } from 'src/app/core/vehicle/vehicle.service';

@Component({
  selector: 'app-insurance-form',
  templateUrl: './insurance-form.component.html',
  styleUrls: ['./insurance-form.component.scss'],
})
export class InsuranceFormComponent implements OnInit {
  insurances: IInsurance = null;
  vehicles = [];

  iForm: FormGroup = new FormGroup({
    iName: new FormControl('', [Validators.required,Validators.maxLength(255),Validators.minLength(2)]),
    iNumber: new FormControl('', [Validators.required,Validators.maxLength(255),Validators.minLength(2)]),
    startDate: new FormControl('', [Validators.required,Validators.maxLength(255),Validators.minLength(2)]),
    endDate: new FormControl('', [Validators.required,Validators.maxLength(255),Validators.minLength(2)]),
    iAmount: new FormControl('', [Validators.required,Validators.maxLength(255),Validators.minLength(2)]),
    vNumber: new FormControl('', [Validators.required,Validators.maxLength(255),Validators.minLength(2)]),
  });

  constructor(
    private VehiclesServices: VehicleService,
    private insuranceServices: InsuranceService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
// auto fill for update

this.insuranceServices.insurance$.subscribe((inc)=>{
  if(inc){
    this.insurances = inc
    this.iForm.patchValue(inc)
  }
})


    //get vehicles
    this.VehiclesServices.getVehical().subscribe();
    this.VehiclesServices.vehicals$.subscribe((veh) => {
      this.vehicles = veh;
    });
  }

  save() {
    this.iForm.markAllAsTouched();
    if (this.iForm.invalid) return;

    //update Insurance
    if (this.insurances) {
      this.insuranceServices
        .updateInsurance(this.insurances._id, this.iForm.value)
        .subscribe({
          error: (err) => {
            this.snackBar.open(err.message, 'close')._dismissAfter(3000);
          },
          next: (res) => {
            this.snackBar.open('Insurance Update', 'close')._dismissAfter(3000);
            this.router.navigateByUrl('/insurance');
          },
        });
    }

    //create
    else {
      this.insuranceServices.createInsurance(this.iForm.value).subscribe({
        error: (err) => {
          this.snackBar.open(err.message, 'close')._dismissAfter(3000);
        },
        next: (res) => {
          this.snackBar.open('Insurance Created', 'close')._dismissAfter(3000);
          this.router.navigateByUrl('/insurance');
        },
      });
    }
  }
}
