import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plant } from '../models/plant.model';
import { User } from '../models/user.model';

// Interface for statistics
interface Stats {
  plantes: number;
  propositions: number;
  users: number;
}

// Interface for plant proposition (aligned with backend PropositionPlanteResponse)
interface Proposition {
  id: number;
  name: string;
  description: string;
  image_url: string | null;
  utilisateur_id: number;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:8000'; // FastAPI backend URL
  private token: string | null = null; // Store JWT token

  constructor(private http: HttpClient) {}

  // Set JWT token for authenticated requests
  setToken(token: string): void {
    this.token = token;
  }

  // Get headers with Authorization token
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });
  }

  // Get current user (for role verification)
  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/utilisateurs/me`, { headers: this.getHeaders() });
  }

  // Get statistics (derived from endpoint responses)
  getStats(): Observable<Stats> {
    return new Observable<Stats>(observer => {
      // Fetch all required data
      Promise.all([
        this.http.get<any[]>(`${this.apiUrl}/plantes`, { headers: this.getHeaders() }).toPromise(),
        this.http.get<any[]>(`${this.apiUrl}/admin/propositions`, { headers: this.getHeaders() }).toPromise(),
        this.http.get<any[]>(`${this.apiUrl}/admin/utilisateurs`, { headers: this.getHeaders() }).toPromise()
      ])
        .then(([plantes, propositions, users]) => {
          observer.next({
            plantes: plantes?.length || 0,
            propositions: propositions?.length || 0,
            users: users?.length || 0
          });
          observer.complete();
        })
        .catch(error => observer.error(error));
    });
  }

  // Get all propositions
  getPropositions(): Observable<Proposition[]> {
    return this.http.get<Proposition[]>(`${this.apiUrl}/admin/propositions`, { headers: this.getHeaders() });
  }

  // Validate a proposition
  validateProposition(id: number): Observable<Plant> {
    return this.http.post<Plant>(`${this.apiUrl}/admin/propositions/${id}/valider`, {}, { headers: this.getHeaders() });
  }

  // Get all users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/admin/utilisateurs`, { headers: this.getHeaders() });
  }
}