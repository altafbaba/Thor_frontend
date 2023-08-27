import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from 'src/environments/environment';
import { IMaintenance } from './maintenance.type';
import { map, Observable, switchMap, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MaintenanceService {
  private baseUrl = environment.baseUrl;

  private maintenance: BehaviorSubject<IMaintenance> =
    new BehaviorSubject<IMaintenance>(null);
  private maintenances: BehaviorSubject<IMaintenance[]> = new BehaviorSubject<
    IMaintenance[]
  >([]);

  constructor(private http: HttpClient) {}

  /**
   * getter for maintenances
   */
  get maintenances$(): Observable<IMaintenance[]> {
    return this.maintenances.asObservable();
  }

  /**
   * getter for maintenance
   */
  get maintenance$(): Observable<IMaintenance> {
    return this.maintenance.asObservable();
  }

  //get maintenance
  getmaintenance() {
    return this.http.get<IMaintenance[]>(this.baseUrl + '/maintenance').pipe(
      tap((man: IMaintenance[]) => {
        this.maintenances.next(man);
      })
    );
  }

  //get last 3 maintenance 

  getDetailsmaintenance() {
    return this.http.get<IMaintenance[]>(this.baseUrl + '/maintenance/details').pipe(
      tap((man: IMaintenance[]) => {
        this.maintenances.next(man);
      })
    );
  }

  //get by id
  getmaintenancebyid(id: string): Observable<IMaintenance> {
    return this.http
      .get<IMaintenance>(`${this.baseUrl}/maintenance/${id}`)
      .pipe(
        tap((man) => {
          this.maintenance.next(man);
        })
      );
  }

  // createMaintenance
  createMaintenance(maintenance: IMaintenance): Observable<IMaintenance> {
    return this.maintenances$.pipe(
      take(1),
      switchMap((man) =>
        this.http.post(this.baseUrl + '/maintenance', maintenance).pipe(
          map((newMaintenance: any) => {
            this.maintenances.next([...man, newMaintenance]);
            return newMaintenance;
          })
        )
      )
    );
  }

  //update Maintenance
  updateMaintenance(
    id: string,
    maintenance: IMaintenance
  ): Observable<IMaintenance> {
    return this.maintenances$.pipe(
      take(1),
      switchMap((man) =>
        this.http
          .put<IMaintenance>(`${this.baseUrl}/maintenance/${id}`, maintenance)
          .pipe(
            map((updateman) => {
              const index = man.findIndex((mans) => mans._id === id);
              man[index] = updateman;
              this.maintenances.next(man);
              this.maintenance.next(updateman);
              return updateman;
            })
          )
      )
    );
  }

clrPrevData(){
  this.maintenance.next(null)
}

}
