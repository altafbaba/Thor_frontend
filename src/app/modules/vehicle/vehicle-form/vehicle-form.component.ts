import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VehicleService } from 'src/app/core/vehicle/vehicle.service';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.scss'],
})
export class VehicleFormComponent implements OnInit {
  vForm: FormGroup = new FormGroup({
    vName: new FormControl('', [Validators.required]),
    vNumber: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
      Validators.minLength(10),
    ]),
  });

  constructor(
    private vehicalService: VehicleService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  save() {
    this.vForm.markAllAsTouched();

    if (this.vForm.invalid) return;

    this.vehicalService
      .createVehical(this.vForm.value)
      .subscribe((_) => this.snackBar.open('done', 'VehicalCreated'));
  }
}
