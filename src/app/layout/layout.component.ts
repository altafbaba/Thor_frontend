import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth/auth.service';
import { IUser } from '../core/user/user.type';
import { Observable, filter } from 'rxjs';
import { UserService } from '../core/user/user.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {

  users:[]=[]
  constructor(private authSerices:AuthService,private router: Router, private userServices:UserService) {}

  ngOnInit(): void {
    

  
   
  }

  logout(){
    this.authSerices.logout();
  }

  
}
