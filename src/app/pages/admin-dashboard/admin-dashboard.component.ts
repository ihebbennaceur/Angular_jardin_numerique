import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Plant } from '../../models/plant.model';
import { User } from '../../models/user.model';

import { Router } from '@angular/router';
interface Proposition {
  id: number;
  name: string;
  type?: string;
  description: string;
  image_url?: string;
  statut: 'pending' | 'approved' | 'rejected';
  utilisateur_id: number;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  propositions: Proposition[] = [
    { id: 1, name: 'Monstera', type: 'Tropical', description: 'Large, split leaves', image_url: 'https://example.com/monstera.jpg', statut: 'pending', utilisateur_id: 1 },
    { id: 2, name: 'Cactus', type: 'Desert', description: 'Spiky, low water', image_url: 'https://example.com/cactus.jpg', statut: 'pending', utilisateur_id: 2 }
  ];
  plants: Plant[] = [
    { id: 1, name: 'Ficus', type: 'Indoor', description: 'Lush green leaves', image_url: 'https://example.com/ficus.jpg', approuvee: true, proprietaire_id: 1, created_by: 'User1' },
    { id: 2, name: 'Succulent', type: 'Desert', description: 'Thick leaves', image_url: 'https://example.com/succulent.jpg', approuvee: true, proprietaire_id: 2, created_by: 'User2' }
  ];
  users: User[] = [];
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    if (!this.userService.isAdmin()) {
      this.errorMessage = 'Access restricted to admins';
      this.router.navigate(['/home']);
      return;
    }

    this.fetchUsers();
  }

  fetchUsers(): void {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
    if (!token) {
      this.errorMessage = 'Authorization token is missing';
      return;
    }

    fetch('http://localhost:8000/admin/utilisateurs?skip=0&limit=10', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        return response.json();
      })
      .then(data => {
        this.users = data;
      })
      .catch(error => {
        this.errorMessage = error.message;
      });
  }

  approveProposition(propositionId: number): void {
    if (confirm('Are you sure you want to approve this proposition?')) {
      const proposition = this.propositions.find(p => p.id === propositionId);
      if (proposition) {
        proposition.statut = 'approved';
        this.plants.push({
          id: this.plants.length + 1,
          name: proposition.name,
          type: proposition.type,
          description: proposition.description,
          image_url: "",
          approuvee: true,
          proprietaire_id: proposition.utilisateur_id,
          created_by: 'Unknown'
        });
        this.propositions = this.propositions.filter(p => p.statut !== 'approved');
        this.errorMessage = '';
      }
    }
  }

  rejectProposition(propositionId: number): void {
    if (confirm('Are you sure you want to reject this proposition?')) {
      const proposition = this.propositions.find(p => p.id === propositionId);
      if (proposition) {
        proposition.statut = 'rejected';
        this.propositions = this.propositions.filter(p => p.statut !== 'rejected');
        this.errorMessage = '';
      }
    }
  }

  deletePlant(plantId: number): void {
    if (confirm('Are you sure you want to delete this plant?')) {
      this.plants = this.plants.filter(plant => plant.id !== plantId);
      this.errorMessage = '';
    }
  }
}