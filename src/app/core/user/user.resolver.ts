import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { catchError, Observable, of, throwError } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<any> {
  constructor(private userServices: UserService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.userServices.getUser();
  }
}

@Injectable({
  providedIn: 'root'
})
export class createUserResolver implements Resolve<any> {
  constructor(private userServices: UserService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    this.userServices.clrPrevData()
    return of(true)
  }
}

@Injectable({
  providedIn: 'root'
})
export class editUserResolver implements Resolve<any> {
  constructor(private userServices: UserService,private _router: Router) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.userServices.getUserById(route.paramMap.get('id')).pipe(
      catchError(
        //   ID not found
        (error) => {
          // Log the error
          console.error(error);

          // Get the parent url
          const parentUrl = state.url.split('/').slice(0, -1).join('/');

          // Navigate to there
          this._router.navigateByUrl(parentUrl);

          // Throw an error
          return throwError(error);
        }
      )
    )
  }
}