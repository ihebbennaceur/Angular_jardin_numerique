import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Pipe } from '@angular/core'; 
import { TitleCasePipe } from '@angular/common';



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
  imports: [NgFor, NgIf, TitleCasePipe],
  templateUrl: './admin-propositions.component.html',
  styleUrls: ['./admin-propositions.component.css']
})
export class AdminPropositionsComponent implements OnInit {
  propositions: Proposition[] = [];
  isLoading: boolean = false;
  error: string | null = null;
  success: string | null = null;

  constructor(private http: HttpClient, private userService: UserService) {}

  ngOnInit(): void {
    this.loadPropositions();
  }

  loadPropositions(): void {
    this.isLoading = true;
    this.error = null;
    this.success = null;
    this.http.get<Proposition[]>('http://localhost:8000/admin/propositions', {
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
    this.http.post(`http://localhost:8000/admin/propositions/${propositionId}/valider`, {}, {
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
    this.http.post(`http://localhost:8000/admin/propositions/${propositionId}/rejeter`, {}, {
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
}