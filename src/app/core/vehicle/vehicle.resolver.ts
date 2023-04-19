import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { catchError, Observable, of, throwError } from 'rxjs';
import { VehicleService } from './vehicle.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleResolver implements Resolve<any> {
  constructor(private vehicleServices:VehicleService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

    return this.vehicleServices.getVehical();
  }
}

@Injectable({
  providedIn: 'root'
})
export class createVehicleResolver implements Resolve<any> {
  constructor(private vehicleServices:VehicleService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

    this.vehicleServices.clrPrevData()
    return of(true)
  }
}

@Injectable({
  providedIn: 'root'
})
export class editVehicleResolver implements Resolve<any> {
  constructor(private vehicleServices:VehicleService, private _router: Router){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

    
    return this.vehicleServices.getVehicalById(route.paramMap.get('id')).pipe(
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