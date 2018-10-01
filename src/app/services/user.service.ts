import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getPlaces(userId) {
    return this.http.get<any>(environment.api_url + '/user/' + userId + '/place/public');
  }

  getPlan(userId) {
    return this.http.get<any>(environment.api_url + '/user/' + userId + '/plan');
  }

  getRelationships(userId, relationships) {
    return this.http.post<any>(environment.api_url + `/user/${userId}/relationships`, relationships);
  }

  getVouchers() {
    return this.http.get('./assets/vouchers.json');
  }

  update(obj, userId) {
    return this.http.put<any>(environment.api_url + `/user/${userId}`, obj);
  }

}
