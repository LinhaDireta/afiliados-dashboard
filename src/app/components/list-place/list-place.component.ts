import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PlacesService } from '../../services/places.service';
import { AuthService } from '../../services/auth.service';

declare var alertify: any;

@Component({
  selector: 'app-list-place',
  templateUrl: './list-place.component.html',
  styleUrls: ['./list-place.component.scss']
})
export class ListPlaceComponent implements OnInit {

  @Input() place: any = {};

  // output event to open modal edit on parent component
  @Output() editAction = new EventEmitter<boolean>();
  // output event to remove place
  @Output() deleteAction = new EventEmitter<boolean>();
  // output event to view place summary
  @Output() viewAction = new EventEmitter<boolean>();

  tooltipe: boolean = false;
  
  constructor(
    private _placesService: PlacesService,
    private _auth: AuthService
  ) { }

  ngOnInit() {
 
  }

  // onCheck(value: boolean) {
  //   console.log('OnClick:', value);
  //   this.enableMonitoring = value;
  // }

  onEditAction() {
    this.editAction.emit(this.place);
  }

  onDeleteAction() {
    this.deleteAction.emit(this.place);
  }

  onViewAction() {
    this.viewAction.emit(this.place);
  }

  formatAddress(place) {
    if (place.full_address != null && place.full_address !== '') {
      return place.full_address;
    } else {
      return place.address + ', ' + place.street_number + ' - ' + place.neighborhood + ' - ' + place.uf + ' ' + place.postal_code;
    }
  }

  monitoringChange(place) {

    const payload = {
      'id' : place.id,
      'affiliate_monitoring': place.affiliate_monitoring
    }

    this._placesService.update(payload).subscribe( res => {
      if (!res['success']) {
        place.affiliate_monitoring = false;
        alertify.error('Ocorreu um erro inesperado, por favor tente mais tarde');
      }
    });
  }

}
