import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { of } from 'rxjs'; // <-- Utilisé pour le mock
import { delay } from 'rxjs/operators'; // <-- Pour simuler un délai réseau

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

  constructor(
    private fb: FormBuilder,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    console.log('Init du composant MyProfile');

    this.profileForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6)]]
    });

    // ✅ Mock User
    const mockUser = {
      nom: 'Jean Dupont',
      email: 'jean.dupont@example.com',
      photo: 'assets/profile2.jpg'
    };

    of(mockUser)
      .pipe(delay(500)) // Simule une réponse asynchrone
      .subscribe((user) => {
        this.profileForm.patchValue({
          name: user.nom,
          email: user.email
        });
        this.photoPreview = user.photo;
        console.log('Mock user chargé avec succès.');
      });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.photoFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.photoPreview = this.sanitizer.bypassSecurityTrustUrl(reader.result as string);
      };
      reader.readAsDataURL(this.photoFile);
    }
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      console.warn('Formulaire invalide');
      return;
    }

    alert('Mock : Profil mis à jour !');
    console.log('FormData simulé :', this.profileForm.value);
  }
}
