import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { catchError, Observable, of, throwError } from 'rxjs';
import { MaintenanceService } from './maintenance.service';

@Injectable({
  providedIn: 'root',
})
export class MaintenanceResolver implements Resolve<any> {
  constructor(private maintenaceServices: MaintenanceService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.maintenaceServices.getmaintenance();
  }
}



@Injectable({
  providedIn: 'root',
})
export class createMaintenanceResolver implements Resolve<any> {
  constructor(private maintenaceServices: MaintenanceService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    this.maintenaceServices.clrPrevData()
    return of(true)
  }
}


@Injectable({
  providedIn: 'root'
})
export class editMaintenanceResolver implements Resolve<any> {
  constructor(private maintenaceServices: MaintenanceService ,private _router: Router ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

    
    return this.maintenaceServices.getmaintenancebyid(route.paramMap.get('id')).pipe(
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

