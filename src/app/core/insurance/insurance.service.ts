import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IInsurance } from './insurance.type';
import { map, Observable, switchMap, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InsuranceService {
  private baseUrl = environment.baseUrl;

  private insurance: BehaviorSubject<IInsurance> =
    new BehaviorSubject<IInsurance>(null);
  private insurances: BehaviorSubject<IInsurance[]> = new BehaviorSubject<
    IInsurance[]
  >([]);

  constructor(private http: HttpClient) {}

  /**
   * getter for insurances
   */
  get insurances$(): Observable<IInsurance[]> {
    return this.insurances.asObservable();
  }

  /**
   * getter for insurance
   */
  get insurance$(): Observable<IInsurance> {
    return this.insurance.asObservable();
  }

  //get insurance
  getInsurance() {
    return this.http.get<IInsurance[]>(this.baseUrl + '/insurance').pipe(
      tap((ince: IInsurance[]) => {
        this.insurances.next(ince);
      })
    );
  }

  //get by id
  getInsuranceById(id: string): Observable<IInsurance> {
    return this.http.get<IInsurance>(`${this.baseUrl}/insurance/${id}`).pipe(
      tap((inc) => {
        this.insurance.next(inc);
      })
    );
  }

  //create insurance
  createInsurance(insurance: string): Observable<IInsurance> {
    return this.insurances$.pipe(
      take(1),
      switchMap((ince) =>
        this.http.post(this.baseUrl + '/insurance', insurance).pipe(
          map((newInce: any) => {
            this.insurances.next([...ince, newInce]);
            return newInce;
          })
        )
      )
    );
  }

  //update insurance
  updateInsurance(id: string, insurance: string): Observable<IInsurance> {
    return this.insurances$.pipe(
      take(1),
      switchMap((ince) =>
        this.http
          .put<IInsurance>(`${this.baseUrl}/insurance/${id}`, insurance)
          .pipe(
            map((updateInce) => {
              const index = ince.findIndex((inces) => inces._id === id);
              ince[index] = updateInce;
              this.insurances.next(ince);
              this.insurance.next(updateInce);
              return updateInce;
            })
          )
      )
    );
  }


  clrPrevData(){
    this.insurance.next(null)
  }
}
