import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { RouterLink } from '@angular/router';
import {User} from '../../models/user.model';

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

  onSubmit():void{
    console.log('Form submitted!' , this.user);
  }

}