import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  aForm:FormGroup = new FormGroup(
    {
      uName: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
}
  )

  constructor() { }

  ngOnInit(): void {

  }

  save(){
    console.log(this.aForm.value);
    
  }

}
