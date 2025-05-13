import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-myprofile',
  standalone: true,
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class MyProfileComponent implements OnInit {
  profileForm!: FormGroup;
  photoFile: File | null = null;
  photoPreview: string | SafeUrl | null = null;
  error: string | null = null; // Add this property

  constructor(
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      mot_de_passe: ['']
    });

    this.userService.getProfile().subscribe({
      next: (user) => {
        this.profileForm.patchValue({
          nom: user.nom,
          email: user.email
        });
        this.photoPreview = user.profilepic ? user.profilepic : 'assets/profile.jpg';
      },
      error: () => {
        this.error = 'Failed to load profile information'; // Set error message
        this.router.navigate(['/login']);
      }
    });
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('nom', this.profileForm.get('nom')?.value);
    formData.append('email', this.profileForm.get('email')?.value);
    formData.append('mot_de_passe', this.profileForm.get('mot_de_passe')?.value || '');
    if (this.photoFile) {
      formData.append('photo', this.photoFile);
    }

    this.userService.updateProfile(formData).subscribe({
      next: () => {
        alert('Profil mis à jour avec succès');
        this.error = null; // Clear error on success
      },
      error: (err) => {
        this.error = 'Erreur lors de la mise à jour du profil'; // Set error message
        console.error('Erreur lors de la mise à jour du profil:', err);
      }
    });
  }
}