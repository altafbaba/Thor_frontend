import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/user/user.service';
import { IUser } from 'src/app/core/user/user.type';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  user: IUser = null;

  uForm: FormGroup = new FormGroup({
    uName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    uRole: new FormControl('', [Validators.required]),
  });

  constructor(
    private snackBar: MatSnackBar,
    private userServices: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //auto fill for update
    this.userServices.user$.subscribe((usr) => {
      if (usr) {
        this.user = usr;
        this.uForm.patchValue(usr);
      }
    });
  }

  save() {
    this.uForm.markAllAsTouched();
    if (this.uForm.invalid) return;

    //update user
    if (this.user) {
      this.userServices.userUpdate(this.user._id, this.uForm.value).subscribe({
        error: (err) => {
          this.snackBar.open(err.message, 'close')._dismissAfter(3000);
        },
        next: (res) => {
          this.snackBar.open('User Update', 'close')._dismissAfter(3000);
          this.router.navigateByUrl('/user');
        },
      });
    }

//user create

    else{
      this.userServices.createUser(this.uForm.value).subscribe({
        error: (err) => {
          this.snackBar.open(err.message, 'close')._dismissAfter(3000);
        },
        next: (res) => {
          this.snackBar
            .open('user Created', 'close')
            ._dismissAfter(3000);
            this.router.navigateByUrl('/user');
        },
      })
      console.log(this.uForm.value);
      
    }
  }
}
