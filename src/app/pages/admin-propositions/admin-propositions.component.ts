import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { UserService } from '../../services/user.service';
import { NgIf } from '@angular/common';

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
  templateUrl: './admin-propositions.component.html',
  styleUrls: ['./admin-propositions.component.css']
  , imports: [NgFor, NgIf]
})
export class AdminPropositionsComponent implements OnInit {
  propositions: Proposition[] = [];

  constructor(private http: HttpClient, private userService: UserService) {}

  ngOnInit(): void {
    this.loadPropositions();
  }

  loadPropositions(): void {
    this.http.get<Proposition[]>('http://localhost:8000/admin/propositions', {
      headers: { Authorization: `Bearer ${this.userService.getToken()}` }
    }).subscribe({
      next: (data) => {
        this.propositions = data;
      },
      error: (err) => {
        console.error('Error fetching propositions:', err);
      }
    });
  }

  approveProposition(propositionId: number): void {
    this.http.post(`http://localhost:8000/admin/propositions/${propositionId}/valider`, {}, {
      headers: { Authorization: `Bearer ${this.userService.getToken()}` }
    }).subscribe({
      next: () => {
        this.loadPropositions(); // Refresh the list
      },
      error: (err) => {
        console.error('Error approving proposition:', err);
      }
    });
  }

  rejectProposition(propositionId: number): void {
    this.http.post(`http://localhost:8000/admin/propositions/${propositionId}/rejeter`, {}, {
      headers: { Authorization: `Bearer ${this.userService.getToken()}` }
    }).subscribe({
      next: () => {
        this.loadPropositions(); // Refresh the list
      },
      error: (err) => {
        console.error('Error rejecting proposition:', err);
      }
    });
  }
}