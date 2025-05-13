import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plant } from '../models/plant.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class PlantService {
  private baseUrl = 'http://127.0.0.1:8000';
  constructor(private http: HttpClient,private cookieService: CookieService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.cookieService.get('token');
    console.log('PlantService sending token:', token); // Debug
    if (!token) {
      console.error('No token found in cookies');
      throw new Error('No authentication token available');
    }
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getPlants(): Observable<Plant[]> {
    return this.http.get<Plant[]>(`${this.baseUrl}/plantes`);
  }

  addPlant(plant: { name: string; type?: string; description: string; image_url?: string }): Observable<Plant> {
    return this.http.post<Plant>(`${this.baseUrl}/plantes`, plant, {
      headers: this.getAuthHeaders()
    });
  }

  deletePlant(plantId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/admin/plantes/${plantId}`, {
      headers: this.getAuthHeaders()
    });
  }
}