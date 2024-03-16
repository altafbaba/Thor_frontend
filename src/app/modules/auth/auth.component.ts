import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  showAlert: boolean = false;

  aForm:FormGroup = new FormGroup(
    {
      uName: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
}
  )



  constructor(private authServices:AuthService,private router:Router,private snackBar: MatSnackBar,) { }

  ngOnInit(): void {

  }

  save(){
    console.log(this.aForm.value)
   this.authServices.signin(this.aForm.value).subscribe(()=>{
    this.router.navigateByUrl('/dashboard')
   }
   
   );

    
  }

  openSnackBar(type: 'Error' | 'Info' | 'Success', msg: string) {
    this.snackBar.open(msg, 'close', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      panelClass:
        type == 'Error'
          ? 'text-red-500'
          : type == 'Info'
          ? 'text-blue-500'
          : 'text-green-500',
    });
  }

  login(){

    if (this.aForm.invalid) return;

    // this.aForm.disable();

    //    // Hide the alert
    //    this.showAlert = false;

    try{
      this.authServices.signin(this.aForm.value).subscribe(()=>{
        this.router.navigateByUrl('/dashboard')
      },(res)=>{

// Re-enable the form
this.aForm.enable();

        // // Reset the form
        this.aForm.reset()

        this.openSnackBar('Error', "Wrong user or password");
      })

    }
catch(err){
  throwError(err)

}
  }

}
