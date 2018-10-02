import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'app-real-time',
  templateUrl: './real-time.component.html',
  styleUrls: ['./real-time.component.scss']
})
export class RealTimeComponent implements OnInit {

  places: any = [];
  alerts: any = [];

  exec: any = null;

  constructor(
    private _userService: UserService,
    private _authService: AuthService,
    private _placesService: PlacesService
  ) { }

  ngOnInit() {
    this.getPlaces();
  }


  getPlaces() {
    this._userService.getPlaces(this._authService.getUser().id).subscribe((places) => {
      this.places = places;
      this.getAlerts();
    });
  }


  getAlerts() {

    let place_ids = '';

    // Select only places with field 'affliliate_monitoring' == true
    this.places.forEach(element => {
      if (element.affiliate_monitoring) {
        place_ids += ',' + element.id;
      }
      
    });

    // Remove the fist comma
    place_ids = place_ids.substring(1);

    this._placesService.listAlertsByIds(place_ids).subscribe( res => {
      this.alerts = res;
      this.exec = setTimeout(() => this.getAlerts(), 15000);
    });
  }

  public ngOnDestroy() {
    clearTimeout(this.exec);
  }

}
