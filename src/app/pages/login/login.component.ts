import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
//import les directives ng if
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';



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

  constructor(private userService: UserService ,  private router: Router) {}

  onSubmit() {
this.userService.login({email:this.email, password:this.password})
.subscribe({ next: (res) =>
  {console.log("success :" ,res.access_token)
  localStorage.setItem('token', res.access_token); 
  // Redirection vers la page d'accueil après la connexion réussie

  this.router.navigate(['/home']);

}
  

                   ,error : (err)=> {-console.log("wrong credentials",err) }
}
)

    // console.log('Email:', this.email);
    // console.log('Password:',this.password);

}
}