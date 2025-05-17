import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlantService } from '../../services/plant.service';
import { UserService } from '../../services/user.service';
import { Plant } from '../../models/plant.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  plants: Plant[] = [];
  errorMessage: string = '';
  isAdmin: boolean = false;

  constructor(private plantService: PlantService, private userService: UserService) {}

  ngOnInit(): void {
    this.loadPlants();
    if (this.userService.isLoggedIn()) {
      this.userService.getProfile().subscribe({
        next: (user) => {
          localStorage.setItem('user_role', user.role);
          this.isAdmin = this.userService.isAdmin();
        },
        error: (err) => {
          console.error('Failed to fetch user profile:', err);
        }
      });
    }
  }

  loadPlants(): void {
    this.plantService.getPlants().subscribe({
      next: (data: Plant[]) => {
        this.plants = data;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load plants';
        console.error(err);
      }
    });
  }

  deletePlant(plantId: number): void {
    if (confirm('Are you sure you want to delete this plant?')) {
      this.plantService.deletePlant(plantId).subscribe({
        next: () => {
          this.plants = this.plants.filter(plant => plant.id !== plantId);
          this.errorMessage = '';
        },
        error: (err) => {
          this.errorMessage = err.error.detail || 'Failed to delete plant';
          console.error(err);
        }
      });
    }
  }
}