import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import {tap} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.baseUrl;

  constructor( private http:HttpClient,private router:Router) { }

  signin(credential:any){
    let url = `${this.baseUrl}/login`;

   return this.http.post(url,credential).pipe(tap((res:any)=>{
 this.storeAccessToken(res.token)
    }))
  }
//access token store in localStorage
  storeAccessToken(accessToken:string){
    localStorage.setItem('loginToken',accessToken)

  }

  // get accessToken
  getAccessToken(){
  return  localStorage.getItem('loginToken')
  }

   //remove AccessToken
   deleteAccessToken(){
    localStorage.removeItem('loginToken')
   }

   //logout
   logout(){
    this.deleteAccessToken();
    this.router.navigateByUrl('login')
   }
}
