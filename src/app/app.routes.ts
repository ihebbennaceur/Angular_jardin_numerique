import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component'; 
import { PlantsComponent } from './pages/plants/plants.component';
import { HomeComponent } from './components/home/home.component';
import { MyProfileComponent } from './pages/myprofile/myprofile.component';

export const routes: Routes = [

    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
   {path : 'plants', component: PlantsComponent},
   {path :'home' , component :HomeComponent},
   {path :'myprofile' , component : MyProfileComponent},
   {path : '' , redirectTo : 'home' , pathMatch : 'full'},
   {path : '**' , redirectTo : 'home' , pathMatch : 'full'},

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}