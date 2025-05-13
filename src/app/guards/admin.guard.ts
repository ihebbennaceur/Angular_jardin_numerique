import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean {
    if (this.userService.isAdmin()) {
      // L'utilisateur est un administrateur, accès autorisé
      return true;
    }
    // L'utilisateur n'est pas un administrateur, redirection vers la page d'accueil
    this.router.navigate(['/home']);
    return false;
  }
}