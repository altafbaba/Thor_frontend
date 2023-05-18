import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  selected = "";

  uForm: FormGroup = new FormGroup({
    uName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
   uRole: new FormControl('', [Validators.required]),

  })

  constructor() { }

  ngOnInit(): void {
  }

  save(){
    console.log(this.uForm.value)
  }

}
