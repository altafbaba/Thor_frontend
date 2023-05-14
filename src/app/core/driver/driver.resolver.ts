import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { catchError, Observable, of, throwError } from 'rxjs';
import { DriverService } from './driver.service';

@Injectable({
  providedIn: 'root'
})
export class DriverResolver implements Resolve<any> {
  constructor(private driverService : DriverService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.driverService.getDriver();
  }

}
@Injectable({
  providedIn: 'root'
})
export class createDriverResolver implements Resolve<any> {
  constructor(private driverService : DriverService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    this.driverService.clrPrevData()
    return of(true)
  }
  
}
@Injectable({
  providedIn: 'root'
})
export class editDriverResolver implements Resolve<any> {
  constructor(private driverService : DriverService,private _router: Router){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

    return this.driverService.getDriverById(route.paramMap.get('id')).pipe(
      
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
