import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Plant } from '../models/plant.model';
import { User } from '../models/user.model';

export interface Proposition {
  id: number;
  name: string;
  type?: string;
  description: string;
  image_url?: string;
  statut: 'pending' | 'approved' | 'rejected';
  utilisateur_id: number;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:8000/admin';
  private propositions$ = new BehaviorSubject<Proposition[]>([]);
  private plants$ = new BehaviorSubject<Plant[]>([]);

  constructor(private http: HttpClient) {
    // Initialize with mock data or fetch from API
    this.fetchPropositions();
    this.fetchPlants();
  }

  // Reactive getters for components to subscribe to
  getPropositions(): Observable<Proposition[]> {
    return this.propositions$.asObservable();
  }

  getPlants(): Observable<Plant[]> {
    return this.plants$.asObservable();
  }

  // Fetch propositions from API
  fetchPropositions(): void {
    this.http.get<Proposition[]>(`${this.apiUrl}/propositions?skip=0&limit=10`)
      .pipe(
        tap(propositions => this.propositions$.next(propositions)),
        catchError(this.handleError)
      )
      .subscribe();
  }

  // Fetch plants from API
  fetchPlants(): void {
    this.http.get<Plant[]>(`${this.apiUrl}/plants?skip=0&limit=10`)
      .pipe(
        tap(plants => this.plants$.next(plants)),
        catchError(this.handleError)
      )
      .subscribe();
  }

  // Approve a proposition
  approveProposition(propositionId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/propositions/${propositionId}/approve`, {})
      .pipe(
        tap(() => {
          // Update local state after successful API call
          const currentPropositions = this.propositions$.value;
          const proposition = currentPropositions.find(p => p.id === propositionId);
          if (proposition) {
            proposition.statut = 'approved';
            this.propositions$.next(currentPropositions.filter(p => p.statut !== 'approved'));
            // Optionally refetch plants to include the newly approved plant
            this.fetchPlants();
          }
        }),
        catchError(this.handleError)
      );
  }

  // Reject a proposition
  rejectProposition(propositionId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/propositions/${propositionId}/reject`, {})
      .pipe(
        tap(() => {
          const currentPropositions = this.propositions$.value;
          const proposition = currentPropositions.find(p => p.id === propositionId);
          if (proposition) {
            proposition.statut = 'rejected';
            this.propositions$.next(currentPropositions.filter(p => p.statut !== 'rejected'));
          }
        }),
        catchError(this.handleError)
      );
  }

  // Delete a plant
  deletePlant(plantId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/plants/${plantId}`)
      .pipe(
        tap(() => {
          const currentPlants = this.plants$.value;
          this.plants$.next(currentPlants.filter(plant => plant.id !== plantId));
        }),
        catchError(this.handleError)
      );
  }

  // Fetch users
  fetchUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/utilisateurs?skip=0&limit=10`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Error handling
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    let errorMessage = 'An unexpected error occurred';
    if (error.status === 401) {
      errorMessage = 'Unauthorized: Please log in again';
    } else if (error.status === 403) {
      errorMessage = 'Forbidden: You do not have permission';
    } else if (error.status === 404) {
      errorMessage = 'Resource not found';
    }
    return throwError(() => new Error(errorMessage));
  }
}