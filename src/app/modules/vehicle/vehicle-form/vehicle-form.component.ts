import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.scss'],
})
export class VehicleFormComponent implements OnInit {
  vForm: FormGroup = new FormGroup({
    vName: new FormControl(),
    vNumber: new FormControl(),
  });

  constructor() {}

  ngOnInit(): void {}

  save() {
    console.log(this.vForm.value);
  }
}
