import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap, take, tap } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IDTO } from '../dto/dto.type';
import { IVehicle } from './vehicle.type';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private baseUrl = environment.baseUrl;

  private vehical: BehaviorSubject<IVehicle> = new BehaviorSubject<IVehicle>(
    null
  );
  private vehicals: BehaviorSubject<IVehicle[]> = new BehaviorSubject<
    IVehicle[]
  >([]);

  constructor(private http: HttpClient) {}

  /**
   * getter for customers
   */
  get vehicals$(): Observable<IVehicle[]> {
    return this.vehicals.asObservable();
  }

  /**
   * getter for customer
   */
  get vihecal$(): Observable<IVehicle> {
    return this.vehical.asObservable();
  }

  createVehical(vehicle: IVehicle): Observable<IVehicle> {
    console.log(vehicle);
    return this.vehicals$.pipe(
      take(1),
      switchMap((vech) =>
        this.http.post(this.baseUrl+'/vehicles', vehicle)
        .pipe(
          map((newVehical: IDTO) => {
            this.vehicals.next([...vech, newVehical.data]);
            return newVehical.data;
          })
      )

      )
    );
  }

  getVehical() {
    return this.http.get<IVehicle[]>(this.baseUrl +"/vehicles").pipe(
      tap((val: IVehicle[]) => {
        this.vehicals.next(val);
        console.log(this.vehicals);
      })
    );
  }
}
