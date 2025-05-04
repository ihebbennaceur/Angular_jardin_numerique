import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
//import les directives ng if
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';


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
  mot_de_passe: string = '';

  constructor(private userService: UserService) {}

  onSubmit() {
    // Handle login logic here
    console.log('Email:', this.email);
    console.log('Password:',this.mot_de_passe);

}
}