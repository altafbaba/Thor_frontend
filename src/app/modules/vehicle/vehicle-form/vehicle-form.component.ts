import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { VehicleService } from 'src/app/core/vehicle/vehicle.service';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.scss'],
})
export class VehicleFormComponent implements OnInit {
  vForm: FormGroup = new FormGroup({
    vName: new FormControl('', [Validators.required]),
    vNumber: new FormControl('', [Validators.required]),
    loadCapacity:new FormControl('', [Validators.required]),
  });

  constructor(
    private vehicalService: VehicleService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  save() {
    this.vForm.markAllAsTouched();

    if (this.vForm.invalid) return;

    this.vehicalService.createVehical(this.vForm.value).subscribe({
      error: (err) => {
        this.snackBar.open(err.message, 'close')._dismissAfter(3000);
      },
      next: (res) => {
        this.snackBar.open('save', 'close')._dismissAfter(3000);
        console.log(res);
        this.router.navigateByUrl('/vehicle');
      },
    });
  }
}
