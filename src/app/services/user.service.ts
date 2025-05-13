import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { Plant } from '../models/plant.model';
import { CookieService } from 'ngx-cookie-service';

interface LoginResponse {
  access_token: string;
  token_type: string;
  user_role: string;
  user_email: string;
}

interface UpdateProfileResponse {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getProfile(): Observable<User> {
    const token = this.cookieService.get('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<User>(`${this.baseUrl}/utilisateurs/me`, { headers });
  }

  updateProfile(formData: FormData): Observable<UpdateProfileResponse> {
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.put<UpdateProfileResponse>(`${this.baseUrl}/utilisateurs/me`, formData, { headers });
  }

  proposerPlante(proposition: { name: string; type?: string; description: string; image_url?: string }): Observable<Plant> {
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.post<Plant>(`${this.baseUrl}/propositions`, proposition, { headers });
  }

  register(user: { nom: string; email: string; mot_de_passe: string; role?: string }): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/inscription`, user);
  }

  login(user: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, user);
  }

 isAdmin(): boolean {
  const role = this.cookieService.get('user_role');
  return role === 'admin';
}

  isLoggedIn(): boolean {
    return !!this.cookieService.get('token');
  }

  logout() {
    this.cookieService.delete('token');
    this.cookieService.delete('user_role');
  }

  updateProfilePicture(file: File): Observable<{ message: string; profilepic: string }> {
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const formData = new FormData();
    formData.append('file', file);

    return this.http.put<{ message: string; profilepic: string }>(
      `${this.baseUrl}/utilisateurs/me/photo`,
      formData,
      { headers }
    );
  }
}