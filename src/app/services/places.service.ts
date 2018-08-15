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

}
