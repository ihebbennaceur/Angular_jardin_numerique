import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean {
    if (this.userService.isLoggedIn()) {
      // L'utilisateur est déjà connecté, redirection vers la page d'accueil
      this.router.navigate(['/home']);
      return false;
    }
    // L'utilisateur n'est pas connecté, accès autorisé à la page de connexion
    return true;
  }
}
