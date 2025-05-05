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
  error: string | null = null;

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
      mot_de_passe: ['', [Validators.minLength(6)]]
    });

    this.userService.getProfile().subscribe({
      next: (user) => {
        console.log('Utilisateur:', user);
        this.profileForm.patchValue({
          nom: user.nom,
          email: user.email
        });
        // this.photoPreview = user.profilepic ? user.profilepic : 'assets/profile.jpg';
      },
      error: () => {
        this.router.navigate(['/login']);
      }
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
      this.profileForm.markAllAsTouched();
      return;
    }
  
    const formData = new FormData();
    formData.append('nom', this.profileForm.get('nom')?.value);
    formData.append('email', this.profileForm.get('email')?.value);
    
    const motDePasse = this.profileForm.get('mot_de_passe')?.value;
    if (motDePasse) {
      formData.append('mot_de_passe', motDePasse);
    }
  
    // ❌ NE PAS inclure la photo si tu ne veux pas la mettre à jour
    // if (this.photoFile) {
    //   formData.append('photo', this.photoFile);
    // }
  
    this.userService.updateProfile(formData).subscribe({
      next: (response) => {
        alert(response.message);
        this.error = null;
      },
      error: (err) => {
        this.error = err.error?.message || 'Erreur lors de la mise à jour du profil';
        console.error('Erreur:', err);
      }
    });
  }
  
  
}