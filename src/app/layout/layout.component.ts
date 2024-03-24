import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth/auth.service';
import { IUser } from '../core/user/user.type';
import { Observable, Subject, filter, takeUntil } from 'rxjs';
import { UserService } from '../core/user/user.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  user: IUser;
  // user$: Observable<IUser> = undefined;
  private unsubscribeAll: Subject<any> = new Subject<any>();
  // users: IUser[] = [];
  constructor(
    private authSerices: AuthService,
    private router: Router,
    private userServices: UserService
  ) {}

  ngOnInit(): void {
    // this.userServices.getUser().subscribe((use) => {
    //   this.users = use;
    //   console.log(this.users);

    //   this.user$ = this.userServices.user$;
    // });



    //user change
    this.userServices.user$.pipe(takeUntil(this.unsubscribeAll)).subscribe((use:IUser)=>{
      if (use != null)  this.user = use
    })
console.log(this.user);

  }

 

  logout() {
    this.authSerices.logout();
  }

  checkRole(role: 'Admin' | 'Standard') {
    return this.authSerices.checkRole(role);
  }

}
