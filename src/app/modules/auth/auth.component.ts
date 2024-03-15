import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';


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


  constructor(private authServices:AuthService,private router:Router) { }

  ngOnInit(): void {

  }

  save(){
    console.log(this.aForm.value)
   this.authServices.signin(this.aForm.value).subscribe(()=>{
    this.router.navigateByUrl('/dashboard')
   }
   
   );

    
  }

}
