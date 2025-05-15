import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PlantsComponent } from './pages/plants/plants.component';
import { HomeComponent } from './components/home/home.component';
import { MyProfileComponent } from './pages/myprofile/myprofile.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { ProposePlantComponent } from './pages/propose-plant/propose-plant.component';
import { AdminCreatePlantComponent } from './pages/admin-create-plant/admin-create-plant.component';
import { LoginGuard } from './guards/login.guard';
import { AuthGuard } from './guards/auth.guard';
import { MyPropositionsComponent } from './pages/my-propositions/my-propositions.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'plants', component: PlantsComponent },
  { path: 'myprofile', component: MyProfileComponent, canActivate: [AuthGuard] },
  { path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard] },
  { path: 'propose-plant', component: ProposePlantComponent, canActivate: [AuthGuard] },
  { path: 'admin/create-plant', component: AdminCreatePlantComponent, canActivate: [AuthGuard] },
  { path: 'my-propositions', component: MyPropositionsComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}