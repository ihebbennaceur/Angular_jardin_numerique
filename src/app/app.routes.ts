import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component'; 
import { PlantsComponent } from './pages/plants/plants.component';
import { HomeComponent } from './components/home/home.component';
import { MyProfileComponent } from './pages/myprofile/myprofile.component';
import { LoginGuard } from './guards/login.guard';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';


export const  routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'plants', component: PlantsComponent },
  { path: 'myprofile', component: MyProfileComponent },
  { path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [LoginGuard] },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}