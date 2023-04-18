import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
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