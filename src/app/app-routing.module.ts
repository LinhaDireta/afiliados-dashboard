import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PlacesComponent } from './pages/places/places.component';
import { AuthGuard } from './services/auth.guards';
import { PlaceSummaryComponent } from './pages/place-summary/place-summary.component';
import { RealTimeComponent } from './pages/real-time/real-time.component';
import { OptInComponent } from './components/opt-in/opt-in.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  // {path: '', component: HomeComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard]},
  {path: '', component: PlacesComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'places', component: PlacesComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard]},
  {path: 'place-summary', component: PlaceSummaryComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard]},
  {path: 'real-time', component: RealTimeComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard]},
  {path: 'optin', component: OptInComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
