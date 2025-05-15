import { Component, OnInit } from '@angular/core';
import { PlantService } from '../../services/plant.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-propose-plant',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './propose-plant.component.html',
  styleUrls: ['./propose-plant.component.css']
})
export class ProposePlantComponent implements OnInit {
  proposeForm: FormGroup;
  errorMessage = '';
  successMessage = '';

  constructor(
    private plantService: PlantService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.proposeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      type: [''],
      description: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit() {
    console.log('ProposePlantComponent initialized');
  }

  submitProposition() {
    if (this.proposeForm.invalid) {
      console.log('Form is invalid:', this.proposeForm.errors);
      return;
    }
    const plant = this.proposeForm.value;
    console.log('Submitting plant:', plant);
    this.errorMessage = '';
    this.successMessage = '';
    this.plantService.proposePlant(plant).subscribe({
      next: (response) => {
        console.log('Proposition response:', response);
        this.successMessage = 'Plant proposition submitted successfully!';
        this.proposeForm.reset();
      },
      error: (err) => {
        console.error('Proposition error:', err);
        this.errorMessage = err.message || 'Failed to submit proposition';
        console.log('Error details:', err.error); // Log full error response
      }
    });
  }
}