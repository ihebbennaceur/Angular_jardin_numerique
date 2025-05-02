import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component'; 
import{ Router } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
            NavbarComponent,
            LoginComponent,
            RegisterComponent],
  
  
  
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'jardin_projet';
}
