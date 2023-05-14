import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fuel-form',
  templateUrl: './fuel-form.component.html',
  styleUrls: ['./fuel-form.component.scss']
})
export class FuelFormComponent implements OnInit {

  fForm : FormGroup = new FormGroup({
    fType: new FormControl('', [Validators.required]),
    driverName: new FormControl('', [Validators.required]),
    petrolPumpName: new FormControl('', [Validators.required]),
    area: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),

  })

  constructor( private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
  }

  save(){

  }

}
