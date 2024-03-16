import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs';
// import { tokenNotExpired } from 'angular2-jwt';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private router: Router) {}

  // signin(credential){
  //   return this.http.post(this.baseUrl + '/login',credential).pipe(tap((res)=>{
  //     return (res.);
  //   }))
  // }

  signin(credential: any) {
    let url = `${this.baseUrl}/login`;

    return this.http.post(url, credential).pipe(
      tap((res: any) => {
        this.storeAccessToken(res.babatoken);
      })
    );
  }
  // access token store in localStorage
  // storeAccessToken(accessToken:string){
  //   localStorage.setItem('babatoken',accessToken)

  // }

  // get accessToken
  getAccessToken() {
    return localStorage.getItem('babatoken');
  }

  //access token store in localStorage
  storeAccessToken(babatoken: string) {
    localStorage.setItem('babatoken', babatoken);
  }

  getAuthorizationToken() {
    let val = localStorage.getItem('babatoken');
    return val ? val : '';
  }

  //remove AccessToken
  deleteAccessToken() {
    localStorage.removeItem('babatoken');
  }

  //logout
  logout() {
    this.deleteAccessToken();
    this.router.navigateByUrl('login');
  }

  // isLoggedIn() {
  //   return tokenNotExpired();
  // }

//   get currentUser(){
// let token = localStorage.getItem('babatoken');
// if(!token) return null


//     return
//   }
}
