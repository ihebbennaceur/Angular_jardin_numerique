import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Pipe } from '@angular/core'; 
import { TitleCasePipe } from '@angular/common';
import { LowerCasePipe } from '@angular/common';




interface Proposition {
  id: number;
  name: string;
  type: string | null;
  description: string;
  image_url: string | null;
  statut: string;
  utilisateur_id: number;
}

@Component({
  selector: 'app-admin-propositions',
  standalone: true,
  imports: [NgFor, NgIf, TitleCasePipe , LowerCasePipe],
  templateUrl: './admin-propositions.component.html',
  styleUrls: ['./admin-propositions.component.css']
})
export class AdminPropositionsComponent implements OnInit {
  private apiUrl = 'http://localhost:8000/admin/propositions';
   propositions: Proposition[] = [];
  filteredPropositions: Proposition[] = [];
  isLoading: boolean = false;
  error: string | null = null;
  success: string | null = null;
  showAll: boolean = false;

  constructor(private http: HttpClient, private userService: UserService) {}

  ngOnInit(): void {
    this.loadPropositions();
  }

  loadPropositions(): void {
    this.isLoading = true;
    this.error = null;
    this.success = null;
    this.http.get<Proposition[]>(`${this.apiUrl}`, {
      headers: { Authorization: `Bearer ${this.userService.getToken()}` }
    }).subscribe({
      next: (data) => {
        this.propositions = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load propositions. Please try again.';
        console.error('Error fetching propositions:', err);
        this.isLoading = false;
      }
    });
  }

  approveProposition(propositionId: number, propositionName: string): void {
    if (!confirm(`Are you sure you want to approve "${propositionName}"?`)) return;
    this.isLoading = true;
    this.error = null;
    this.success = null;
    
    this.http.post(`${this.apiUrl}/${propositionId}/valider`, {}, {
      headers: { Authorization: `Bearer ${this.userService.getToken()}` }
    }).subscribe({
      next: () => {
        this.success = `Proposition "${propositionName}" approved successfully.`;
        this.loadPropositions(); // Refresh the list
      },
      error: (err) => {
        this.error = 'Failed to approve proposition.';
        console.error('Error approving proposition:', err);
        this.isLoading = false;
      }
    });
  }

  rejectProposition(propositionId: number, propositionName: string): void {
    if (!confirm(`Are you sure you want to reject "${propositionName}"?`)) return;
    this.isLoading = true;
    this.error = null;
    this.success = null;
    
    this.http.post(`${this.apiUrl}/${propositionId}/rejeter`, {}, {
      headers: { Authorization: `Bearer ${this.userService.getToken()}` }
    }).subscribe({
      next: () => {
        this.success = `Proposition "${propositionName}" rejected successfully.`;
        this.loadPropositions(); // Refresh the list
      },
      error: (err) => {
        this.error = 'Failed to reject proposition.';
        console.error('Error rejecting proposition:', err);
        this.isLoading = false;
      }
    });
  }

  filterPropositions(): void {
    if (this.showAll) {
      this.filteredPropositions = this.propositions;
    } else {
      this.filteredPropositions = this.propositions.filter(prop =>
        this.getStatusClass(prop.statut) === 'pending'
      );
    }
  }

  toggleShowAll(): void {
    this.showAll = !this.showAll;
    this.filterPropositions();
  }

  getStatusClass(status: string): string {
    const normalized = status?.toLowerCase();
    if (normalized === 'en_attente' || normalized === 'pending') return 'pending';
    if (normalized === 'approuvee' || normalized === 'approved') return 'approved';
    if (normalized === 'rejetee' || normalized === 'rejected') return 'rejected';
    return normalized || '';
  }

  getStatusDisplay(status: string): string {
    const normalized = status?.toLowerCase();
    if (normalized === 'en_attente' || normalized === 'pending') return 'pending';
    if (normalized === 'approuvee' || normalized === 'approved') return 'approved';
    if (normalized === 'rejetee' || normalized === 'rejected') return 'rejected';
    return status || '';
  }

}