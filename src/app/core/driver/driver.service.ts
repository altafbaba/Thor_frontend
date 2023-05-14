import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from 'src/environments/environment';
import { IDriver } from './driver.type';
import { map, Observable, switchMap, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DriverService {
  private baseUrl = environment.baseUrl;

  private driver: BehaviorSubject<IDriver> = new BehaviorSubject<IDriver>(null);
  private drivers: BehaviorSubject<IDriver[]> = new BehaviorSubject<IDriver[]>(
    []
  );

  constructor(private http: HttpClient) {}

  /**
   * getter for drivers
   */
  get drivers$(): Observable<IDriver[]> {
    return this.drivers.asObservable();
  }

  /**
   * getter for driver
   */
  get driver$(): Observable<IDriver> {
    return this.driver.asObservable();
  }

  //get driver
  getDriver() {
    return this.http.get<IDriver[]>(this.baseUrl + '/driver').pipe(
      tap((dri: IDriver[]) => {
        this.drivers.next(dri);
      })
    );
  }

  //get driver by id
  getDriverById(id: string): Observable<IDriver> {
    return this.http.get<IDriver>(`${this.baseUrl}/driver/${id}`).pipe(
      tap((dri) => {
        this.driver.next(dri);
      })
    );
  }

  //create Driver
  createDriver(driver: IDriver): Observable<IDriver> {
    return this.drivers$.pipe(
      take(1),
      switchMap((driv) =>
        this.http.post(this.baseUrl + '/driver', driver).pipe(
          map((newDriver: any) => {
            this.drivers.next([...driv, newDriver]);
            return newDriver;
          })
        )
      )
    );
  }

  //update Driver
  updateDriver(id: string, driver: IDriver): Observable<IDriver> {
    return this.drivers$.pipe(
      take(1),
      switchMap((dri) =>
        this.http.put<IDriver>(`${this.baseUrl}/driver/${id}`, driver).pipe(
          map((updatedri) => {
            const index = dri.findIndex((driv) => driv.id === id);
            dri[index] = updatedri;
            this.drivers.next(dri);
            this.driver.next(updatedri);
            return updatedri;
          })
        )
      )
    );
  }

  clrPrevData() {
    this.driver.next(null);
  }
}
