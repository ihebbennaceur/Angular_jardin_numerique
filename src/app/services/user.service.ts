import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { Plant } from '../components/home/home.component';

interface LoginResponse {
  access_token: string;
  token_type: string;
}

interface UpdateProfileResponse {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://127.0.0.1:8000'; 

  constructor(private http: HttpClient) {}

  getProfile(): Observable<User> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<User>(`${this.baseUrl}/utilisateurs/me`, { headers });
  }
  
  
  updateProfile(formData: FormData): Observable<UpdateProfileResponse> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.put<UpdateProfileResponse>(`${this.baseUrl}/utilisateurs/me`, formData, { headers });
  }

  
  proposerPlante(plante: Plant): Observable<Plant> {
    return this.http.post<Plant>(`${this.baseUrl}/propositions`, plante);
  }

  register(user: { nom: string; email: string; mot_de_passe: string; role?: string }): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/inscription`, user);
  }

  login(user: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, user);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }
  
}
