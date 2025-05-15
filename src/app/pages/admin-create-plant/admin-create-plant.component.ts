import { Component, OnInit } from '@angular/core';
import { PlantService } from '../../services/plant.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-create-plant',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-create-plant.component.html',
  styleUrls: ['./admin-create-plant.component.css']
})
export class AdminCreatePlantComponent implements OnInit {
  plant = {
    name: '',
    type: '',
    description: '',
    image_url: ''
  };
  errorMessage = '';
  successMessage = '';

  constructor(
    private plantService: PlantService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    // Redirect non-admins
    if (!this.userService.isAdmin()) {
      this.router.navigate(['/']);
    }
  }

  createPlant() {
    this.errorMessage = '';
    this.successMessage = '';
    this.plantService.createPlant(this.plant).subscribe({
      next: () => {
        this.successMessage = 'Plant created successfully!';
        this.plant = { name: '', type: '', description: '', image_url: '' }; // Reset form
      },
      error: (err) => {
        this.errorMessage = err.error.detail || 'Failed to create plant';
      }
    });
  }
}