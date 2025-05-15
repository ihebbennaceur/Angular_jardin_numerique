import { Component, OnInit } from '@angular/core';
import { PlantService } from '../../services/plant.service';
import { CommonModule } from '@angular/common';
import { Plant } from '../../models/plant.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-propositions',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './my-propositions.component.html',
  styleUrls: ['./my-propositions.component.css']
})
export class MyPropositionsComponent implements OnInit {
  propositions: Plant[] = [];
  errorMessage = '';

  constructor(private plantService: PlantService) {}

  ngOnInit() {
    console.log('MyPropositionsComponent initialized');
    this.loadPropositions();
  }

  loadPropositions() {
    this.plantService.getUserPropositions().subscribe({
      next: (propositions) => {
        console.log('Propositions loaded:', propositions);
        propositions.forEach(prop => {
          if (prop.image_url) {
            console.log(`Image URL for ${prop.name}: ${prop.image_url}`);
          }
        });
        this.propositions = propositions;
      },
      error: (err) => {
        console.error('Error loading propositions:', err);
        this.errorMessage = 'Failed to load propositions';
      }
    });
  }

  onImageError(prop: Plant) {
    console.error(`Failed to load image for ${prop.name}: ${prop.image_url}`);
    this.errorMessage = `Failed to load image for ${prop.name}`;
  }
}