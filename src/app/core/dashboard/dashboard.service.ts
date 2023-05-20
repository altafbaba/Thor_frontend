import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getDashboard() {
    return this.http.get(`${this.baseUrl}/dashboard`);
  }
}

