import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Plant } from '../models/plant.model';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PlantService {
  private baseUrl = 'http://127.0.0.1:8000';

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.cookieService.get('token');
    console.log('PlantService sending token:', token);
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

  uploadImage(file: File): Observable<{ image_url: string }> {
    const formData = new FormData();
    formData.append('file', file);
    console.log('Uploading image:', file.name, 'Size:', file.size);
    return this.http.post<{ image_url: string }>(`${this.baseUrl}/upload-image`, formData, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Image upload error:', error);
        console.log('Error response:', error.error);
        return throwError(() => new Error(error.error.detail || 'Failed to upload image'));
      })
    );
  }

  proposePlant(plant: { name: string; type?: string; description: string; image_url?: string }): Observable<Plant> {
    const payload = {
      name: plant.name,
      type: plant.type || null,
      description: plant.description,
      image_url: plant.image_url || null
    };
    console.log('Sending payload to /propositions:', payload);
    return this.http.post<Plant>(`${this.baseUrl}/propositions`, payload, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Propose plant error:', error);
        console.log('Error response:', error.error);
        if (error.status === 401) {
          this.router.navigate(['/login']);
          return throwError(() => new Error('Session expired. Please log in again.'));
        }
        return throwError(() => new Error(error.error.detail || 'Failed to submit proposition'));
      })
    );
  }

  getUserPropositions(): Observable<Plant[]> {
    return this.http.get<Plant[]>(`${this.baseUrl}/propositions/me`, {
      headers: this.getAuthHeaders()
    }).pipe(
      map(propositions => propositions.map(prop => ({
        ...prop,
        image_url: prop.image_url ? `${this.baseUrl}${prop.image_url}` : null
      }))),
      catchError((error: HttpErrorResponse) => {
        console.error('Get user propositions error:', error);
        console.log('Error response:', error.error);
        if (error.status === 401) {
          this.router.navigate(['/login']);
          return throwError(() => new Error('Session expired. Please log in again.'));
        }
        return throwError(() => new Error(error.error.detail || 'Failed to fetch propositions'));
      })
    );
  }

  createPlant(plant: { name: string; type?: string; description: string; image_url?: string }): Observable<Plant> {
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