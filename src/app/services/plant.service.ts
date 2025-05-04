import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Plant } from '../models/plant.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlantService {
  private baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  getPlants(): Observable<Plant[]> {
    return this.http.get<Plant[]>(this.baseUrl);
  }
}
