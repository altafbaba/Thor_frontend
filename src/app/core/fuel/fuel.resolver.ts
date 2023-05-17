import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { catchError, Observable, of, throwError } from 'rxjs';
import { FuelService } from './fuel.service';

@Injectable({
  providedIn: 'root'
})
export class FuelResolver implements Resolve<any> {
  constructor(private fuelServices:FuelService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {


    return this.fuelServices.getFuel();
  }
}


@Injectable({
  providedIn: 'root'
})
export class createFuelResolver implements Resolve<any> {
  constructor(private fuelServices:FuelService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

this.fuelServices.clrPrevData();
return of(true)
    
  }
}


@Injectable({
  providedIn: 'root',
})
export class editFuelResolver implements Resolve<any> {
  constructor(
    private fuelServices:FuelService,
    private _router: Router
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.fuelServices.getFuelById
      (route.paramMap.get('id'))
      .pipe(
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
      );
  }
}