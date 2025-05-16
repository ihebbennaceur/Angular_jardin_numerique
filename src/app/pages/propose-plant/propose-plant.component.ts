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
  selectedFile: File | null = null;

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

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log('Selected file:', this.selectedFile.name);
    } }

  // 
  
  submitProposition() {
  if (this.proposeForm.invalid) {
    console.log('Form is invalid:', this.proposeForm.errors);
    return;
  }

  this.errorMessage = '';
  this.successMessage = '';

  const plant = this.proposeForm.value;

  if (this.selectedFile) {
    // Étape 1 : uploader l'image
    this.plantService.uploadImage(this.selectedFile).subscribe({
      next: (imageResponse) => {
        console.log('Image uploaded successfully:', imageResponse.image_url);
        plant.image_url = imageResponse.image_url;

        // Étape 2 : envoyer les données du formulaire avec l'URL de l'image
        this.sendPlantData(plant);
      },
      error: (uploadErr) => {
        console.error('Failed to upload image:', uploadErr);
        this.errorMessage = uploadErr.message || 'Erreur lors du téléversement de l\'image';
      }
    });
  } else {
    // Pas d'image, envoyer juste les données textuelles
    this.sendPlantData(plant);
  }
}

private sendPlantData(plant: any) {
  this.plantService.proposePlant(plant).subscribe({
    next: (response) => {
      console.log('Plant proposition response:', response);
      this.successMessage = 'Proposition soumise avec succès !';
      this.proposeForm.reset();
      this.selectedFile = null;
    },
    error: (err) => {
      console.error('Error submitting proposition:', err);
      this.errorMessage = err.message || 'Échec de la soumission de la proposition';
    }
  });
}

}