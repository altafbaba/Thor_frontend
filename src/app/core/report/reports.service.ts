import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  private selectedSeason:BehaviorSubject<any> = new BehaviorSubject<any>(null)

  constructor() { }

  selectedSeason$:Observable<any> = this.selectedSeason.asObservable()

  setSelectedSeason(season: string) {
    this.selectedSeason.next(season);
  }

}
