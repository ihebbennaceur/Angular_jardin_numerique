import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../models/user.model';
import { Plant } from '../components/home/home.component';


@Injectable({
  providedIn: 'root'
})


export class UserService {

  private baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}


  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/utilisateurs/me`);
  }


  updateProfile(data: FormData): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/utilisateurs/me`, data);
  }

  proposerPlante(plante: Plant): Observable<Plant> {
    return this.http.post<Plant>(`${this.baseUrl}/propositions`, plante);
  }
  

register(user: { nom: string; email: string; mot_de_passe: string; role?: string }): Observable<User> {
  return this.http.post<User>(`${this.baseUrl}/inscription`, user);
}


  login(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/connexion`, user);
  }  




}
