import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PlacesComponent } from './pages/places/places.component';
import { AuthGuard } from './services/auth.guards';
import { PlaceSummaryComponent } from './pages/place-summary/place-summary.component';

const routes: Routes = [
  {path: '', component: PlacesComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'places', component: PlacesComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard]},
  {path: 'place-summary', component: PlaceSummaryComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
