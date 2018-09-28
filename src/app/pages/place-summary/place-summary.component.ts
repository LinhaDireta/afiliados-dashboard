import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from '../../services/places.service';


@Component({
  selector: 'app-place-summary',
  templateUrl: './place-summary.component.html',
  styleUrls: ['./place-summary.component.scss']
})
export class PlaceSummaryComponent implements OnInit {

  place: any = {};
  alerts: any = [];
  summary: any = [];
  current_period = 30;

  constructor(
    private _placeService: PlacesService
  ) { }

  ngOnInit() {

    const place = localStorage.getItem('place-summary');

    if (place != null) {
      this.place = JSON.parse(place);
      this.listAlerts(30);
    }
  }

  formatAddress() {
    if (this.place.full_address != null && this.place.full_address != '') {
      return this.place.full_address;
    } else {
      return this.place.address + ', ' + this.place.street_number + ' - ' + this.place.neighborhood + ' - ' + this.place.uf;
    }
  }

  listAlerts(period) {
    this.current_period = period;
    this._placeService.listAlerts(this.place.id, period).subscribe( res => {
      console.log(res);
      this.alerts = res['alerts'];
      this.summary = res['summary'];
    });
  }

  getAlertsSummaryTotal(summary) {

    let total = 0;

    summary.forEach(element => {
      total += element.count;
    });
    console.log(total);
    return total;
  }
 
}
