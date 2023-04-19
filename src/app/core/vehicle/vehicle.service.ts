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
  get vehical$(): Observable<IVehicle> {
    return this.vehical.asObservable();
  }

  //getVehicalById
  getVehicalById(_id: string): Observable<IVehicle> {
    return this.http.get<IVehicle>(`${this.baseUrl}/vehicla/${_id}`).pipe(
      tap((veh) => {
        this.vehical.next(veh);
      })
    );
  }

  // createVehical
  createVehical(vehicle: IVehicle): Observable<IVehicle> {
    console.log(vehicle);
    return this.vehicals$.pipe(
      take(1),
      switchMap((vech) =>
        this.http.post(this.baseUrl + '/vehicles', vehicle).pipe(
          map((newVehical: any) => {
            // console.log(newVehical);
            this.vehicals.next([...vech, newVehical]);
            return newVehical;
          })
        )
      )
    );
  }
  //get Vehical
  getVehical() {
    return this.http.get<IVehicle[]>(this.baseUrl + '/vehicles').pipe(
      tap((val: IVehicle[]) => {
        this.vehicals.next(val);
      })
    );
  }

  
//update Vehical
  updateVehical(_id: string, vehical: IVehicle): Observable<IVehicle> {
    return this.vehicals$.pipe(
      take(1),
      switchMap((vehs) =>
        this.http.put<IVehicle>(`${this.baseUrl}/vehical/${_id}`, vehical).pipe(
          map((updateveh) =>
          {
            const index = vehs.findIndex((veh)=> veh._id === _id);

            vehs[index] = updateveh;

            this.vehicals.next(vehs);
            console.log(vehs)
            this.vehical.next(updateveh);
            console.log(updateveh)
            return updateveh;
          })
        )
      )
    );
  }

  clrPrevData(){
    this.vehical.next(null)
  }

}
