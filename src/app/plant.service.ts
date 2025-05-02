import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Plant } from './models/plant.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlantService {
  private apiUrl = 'localhost:3000/plants';

  constructor(private http: HttpClient) {}

  getPlants(): Observable<Plant[]> {
    return this.http.get<Plant[]>(this.apiUrl);
  }
}
