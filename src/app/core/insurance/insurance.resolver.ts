import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { catchError, Observable, of, throwError } from 'rxjs';
import { InsuranceService } from './insurance.service';

@Injectable({
  providedIn: 'root'
})
export class InsuranceResolver implements Resolve<any> {

  constructor(private insuranceServices:InsuranceService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    
    return this.insuranceServices.getInsurance();
  }
}


@Injectable({
  providedIn: 'root'
})
export class CreateInsuranceResolver implements Resolve<any> {

  constructor(private insuranceServices:InsuranceService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    
     this.insuranceServices.clrPrevData()
    return of(true)
  }
}


@Injectable({
  providedIn: 'root'
})
export class editInsuranceResolver implements Resolve<any> {
  constructor(private insuranceServices:InsuranceService ,private _router: Router ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

    
    return this.insuranceServices.getInsuranceById(route.paramMap.get('id')).pipe(
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
