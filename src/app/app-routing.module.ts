import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PlacesComponent } from './pages/places/places.component';
import { AuthGuard } from './services/auth.guards';
import { OptInComponent } from './components/opt-in/opt-in.component';

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'places', component: PlacesComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard]},
  {path: 'optin', component: OptInComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
