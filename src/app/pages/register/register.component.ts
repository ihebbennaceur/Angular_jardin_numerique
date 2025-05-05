import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { RouterLink } from '@angular/router';
import {User} from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [NgIf, RouterLink,
    FormsModule
  ],
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  // name: string = '';
  // surname: string = '';
  // email: string = '';
  // password: string = '';
  // confirmPassword: string = '';

  user: User = new User();

constructor(private userService: UserService ,  private router: Router) {}

  onSubmit():void{
    console.log('Form submitted!' , this.user);
    this.userService.register(this.user).subscribe({
      next: (res) => {
        console.log('User registered successfully:', res);
        // Redirection vers la page de connexion après l'inscription réussie
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error registering user:', err);
      }
    });
  }

}