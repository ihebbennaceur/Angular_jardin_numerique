import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
//import les directives ng if
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service'; // Importez le service de cookies
import { User } from '../../models/user.model'; // Importez le modèle User



@Component({
  selector: 'app-login',
  imports: [FormsModule,
    NgIf,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  errorMessage: string = '';

  constructor(private userService: UserService ,  private router: Router ,     private cookieService: CookieService) {}

  onSubmit() {
    this.userService.login({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        console.log('success:', res.access_token);
        this.cookieService.set('token', res.access_token, 1); // Expires in 1 day
        this.cookieService.set('user_role', res.user_role, 1); // Store user role in cookies
        console.log('Cookies set - token:', this.cookieService.get('token'), 'role:', res.user_role);
        const redirectTo = res.user_role === 'admin' ? '/admin/dashboard' : '/home';
        this.router.navigate([redirectTo]).then(success => {
          console.log('Navigation to', redirectTo, 'success:', success);
        }).catch(err => {
          console.error('Navigation error:', err);
        });
      },
      error: (err) => {
        this.errorMessage = err.error.detail || 'Wrong credentials';
        console.error('Login error:', err);
      }
    });
  

    // console.log('Email:', this.email);
    // console.log('Password:',this.password);

}
}