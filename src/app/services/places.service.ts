import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  constructor(private http: HttpClient) { }

  add(userId, place) {
    return this.http.post(environment.api_url + '/user/' + userId + '/place', place);
  }

  update(place) {
    return this.http.put(environment.api_url + '/user/update/' + place.id + '/place', place);
  }

  remove(id) {
    return this.http.delete(environment.api_url + '/user/remove/' + id + '/place');
  }

  listAlerts(place_id, period = 30) {
    const params = {
      'period': period
    };
    return this.http.post(environment.api_url + `/user-place/${place_id}`, params);
  }

  listAlertsByIds(place_ids) {
    return this.http.get(environment.api_url + `/alert/list?place_ids=${place_ids}`);
  }

}
