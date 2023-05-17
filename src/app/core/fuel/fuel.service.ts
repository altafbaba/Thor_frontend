import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from 'src/environments/environment';
import { map, Observable, switchMap, take, tap } from 'rxjs';
import { IFuel } from './fuel.type';

@Injectable({
  providedIn: 'root',
})
export class FuelService {
  private baseUrl = environment.baseUrl;

  private fuel: BehaviorSubject<IFuel> = new BehaviorSubject<IFuel>(null);
  private fuels: BehaviorSubject<IFuel[]> = new BehaviorSubject<IFuel[]>([]);

  constructor(private http: HttpClient) {}

  /**
   * getter for fuels
   */
  get fuels$(): Observable<IFuel[]> {
    return this.fuels.asObservable();
  }

  /**
   * getter for fuel
   */
  get fuel$(): Observable<IFuel> {
    return this.fuel.asObservable();
  }

  //get fuel
  getFuel() {
    return this.http.get<IFuel[]>(this.baseUrl + '/fuel').pipe(
      tap((ful: IFuel[]) => {
        this.fuels.next(ful);
      })
    );
  }

  //get by id
  getFuelById(id: string): Observable<IFuel> {
    return this.http.get<IFuel>(`${this.baseUrl}/fuel/${id}`).pipe(
      tap((ful) => {
        this.fuel.next(ful);
      })
    );
  }

  //create Fuel
  createFuel(fuel: IFuel): Observable<IFuel> {
    return this.fuels$.pipe(
      take(1),
      switchMap((ful) =>
        this.http.post(this.baseUrl + '/fuel', fuel).pipe(
          map((newFuel: any) => {
            this.fuels.next([...ful, newFuel]);
            return newFuel;
          })
        )
      )
    );
  }


//update Fuel
updateFuel(id:string,fuel:IFuel):Observable<IFuel>{
return this.fuels$.pipe(
  take(1),
  switchMap((ful)=>
  this.http.put<IFuel>(`${this.baseUrl}/fuel/${id}`,fuel).pipe(
    map((updateFuel)=>{
      const index = ful.findIndex((fuls)=> fuls._id === id);
      ful[index] = updateFuel;
      this.fuels.next(ful);
      this.fuel.next(updateFuel);
      return updateFuel
    })
  )
  )
)

}


  clrPrevData(){
    this.fuel.next(null)
  }

}
