import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { DriverService } from 'src/app/core/driver/driver.service';
import { IDriver } from 'src/app/core/driver/driver.type';

@Component({
  selector: 'app-driver-from',
  templateUrl: './driver-from.component.html',
  styleUrls: ['./driver-from.component.scss'],
})
export class DriverFromComponent implements OnInit {
  driver: IDriver = null;

  dForm: FormGroup = new FormGroup({
    dFirstName: new FormControl('', [Validators.required]),
    dLastName: new FormControl('', [Validators.required]),
    dAddress: new FormControl('', [Validators.required]),
    dMobile: new FormControl('', [Validators.required]),
    dAdharCard: new FormControl('', [Validators.required]),
    dLicense: new FormControl('', [Validators.required]),
  });

  constructor(
    private driverService: DriverService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    //for edit auto fill
    this.driverService.driver$.subscribe((dri) => {
      if (dri) {
        this.driver = dri;
        this.dForm.patchValue(dri);
      }
     
    });
  }

  save() {
    this.dForm.markAllAsTouched();
    if (this.dForm.value.invalid) return;

    //driver update
    if (this.driver) {
      this.driverService
        .updateDriver(this.driver._id, this.dForm.value)
        .subscribe({
          error: (err) => {
            this.snackBar.open(err.message, 'close')._dismissAfter(3000);
          },
          next: (res) => {
            this.snackBar.open('driver Update', 'close')._dismissAfter(3000);
            this.router.navigateByUrl('/driver');
          },
        });
    }
    // create Driver
    else {
      this.driverService.createDriver(this.dForm.value).subscribe({
        error: (err) => {
          this.snackBar.open(err.message, 'close')._dismissAfter(3000);
        },
        next: (res) => {
          this.snackBar.open('Driver Created', 'close')._dismissAfter(3000);
          this.router.navigateByUrl('/driver');
        },
      });
    }
  }
}
