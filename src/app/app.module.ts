import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS } from '../../node_modules/@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { RefreshTokenInterceptor } from './interceptors/refresh-token.interceptor';
import { AplicationErrorHandle } from './app.error-handle';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskModule } from 'ngx-mask';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guards';
import { SearchService } from './services/search.service';
import { PlacesService } from './services/places.service';
import { AlertifyService } from './services/alertify.service';

import { AppComponent } from './app.component';
import { PlacesComponent } from './pages/places/places.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { LoaderComponent } from './components/loader/loader.component';
import { MenuComponent } from './components/menu/menu.component';
import { ListPlaceComponent } from './components/list-place/list-place.component';
import { BtnCheckboxSwitchComponent } from './components/atoms/btn-checkbox-switch/btn-checkbox-switch.component';
import { PlaceSummaryComponent } from './pages/place-summary/place-summary.component';
import { RealTimeComponent } from './pages/real-time/real-time.component';
import { OptInComponent } from './components/opt-in/opt-in.component';
import { ProfileComponent } from './pages/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    PlacesComponent,
    LoginComponent,
    HomeComponent,
    LoaderComponent,
    MenuComponent,
    ListPlaceComponent,
    BtnCheckboxSwitchComponent,
    PlaceSummaryComponent,
    RealTimeComponent,
    OptInComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
    AngularFontAwesomeModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    SearchService,
    PlacesService,
    AlertifyService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true },
    { provide: ErrorHandler, useClass: AplicationErrorHandle },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
