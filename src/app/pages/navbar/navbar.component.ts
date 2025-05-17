import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { NgIf } from '@angular/common';

import { FormsModule } from '@angular/forms'


@Component({
  selector: 'app-navbar',
  imports: [RouterLink,NgIf, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  unreadCount: number = 0;
  

  constructor(public userService: UserService, private router: Router) {

  }

  ngOnInit(): void {
    console.log('Role:', this.userService.isAdmin());
    console.log('Logged in:', this.userService.isLoggedIn());

  }


  navigateToProposePlant() {
    console.log('Navigating to propose-plant');
    this.router.navigate(['/propose-plant']).then(success => {
      console.log('Navigation to propose-plant success:', success);
    }).catch(err => {
      console.error('Navigation to propose-plant error:', err);
    });
  }

 searchQuery: string = '';
  searchPlants() {
    if (this.searchQuery.trim()) {
      // Navigate to search results page with query parameter
      this.router.navigate(['/search'], { queryParams: { query: this.searchQuery } });
    }
  }


logout() {
  this.userService.logout();
  this.router.navigate(['/login']);
}

}
