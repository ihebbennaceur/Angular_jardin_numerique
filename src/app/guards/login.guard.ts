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

  canActivate_admin(): boolean {
    if (this.userService.isLoggedIn() && this.userService.isAdmin()) {
      // L'utilisateur est connecté et est un administrateur, accès autorisé
      return true;
    }
    // Redirection vers la page de connexion ou une autre page si l'utilisateur n'est pas admin
    this.router.navigate(['/not-authorized']);
    return false;
  }


}
