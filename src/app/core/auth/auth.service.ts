import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable, catchError, of, switchMap, tap, throwError } from 'rxjs';
import { UserService } from '../user/user.service';
import { IPermissions, IUser } from '../user/user.type';
// import { tokenNotExpired } from 'angular2-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.baseUrl;
  private authenticated: boolean = false;

  private currentUser: IUser | undefined = {
    "_id": "65fd53ca16c2012bd77cf896",
    "uName": "altaf",
    "role":"Admin",
    "permissions": [
      IPermissions.Admin
    ]
  };


  constructor(
    private http: HttpClient,
    private router: Router,
    private userServices: UserService
  ) {}


  get user()
  {
    return this.currentUser;
  }
  
  storeAccessToken(babatoken: string) {
    localStorage.setItem('babatoken', babatoken);
  }

  getaccessToken(): string {
    return localStorage.getItem('babatoken') ?? '';
  }

  // signin(credential: any): Observable<any> {
  //   if (this.accessToken) {
  //     return throwError('user is already logged');
  //   }
  //   return this.http.post(this.baseUrl + '/login', credential).pipe(
  //     switchMap((res: any) => {
  //       this.accessToken = res.babatoken;

  //       this.userServices.user = res.user;

  //       return of(res);
  //     })
  //   );
  // }

  signin(credential: any){
    let url = `${this.baseUrl}/login`;

    return this.http.post(url, credential).pipe(
      tap((x:any)=>{
        this.storeAccessToken(x.Authorization)
        this.currentUser = x.user;
      })
    )

  }

  

  signinUsingToken(){
    let url = `${this.baseUrl}/login/signToken`;

    return this.http.post(url,{}).pipe(
      tap((x:any)=>{
        this.storeAccessToken(x.Authorization)
        this.currentUser = x.user;
      })
    )
  }


  // statusCheck(): Observable<boolean> {
  //   if (this.authenticated) {
  //     return of(true);
  //   }
  //   if (this.accessToken) {
  //     return this.signInusingToken();
  //   } else !this.accessToken;
  //   {
  //     return of(false);
  //   }
  // }

  // getAuthorizationToken() {
  //   let val = localStorage.getItem('babatoken');
  //   return val ? val : '';
  // }

  //remove AccessToken
  deleteAccessToken() {
    localStorage.removeItem('babatoken');
  }

  //logout
  logout() {
    this.deleteAccessToken();
    this.router.navigateByUrl('login');
  }

  checkRole(role: 'Admin' | 'Standard'): Observable<boolean> {
    return this.userServices.user$.pipe(
      switchMap((val) => {
        console.log(val);
        if (val.role != role) return of(false);
        return of(true);
      })
    );
  }

  getUserRoles()
  {
    return this.currentUser ? this.currentUser.permissions : [];
  }

}
