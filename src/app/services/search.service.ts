import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

    constructor(private http: HttpClient) { }

    cep(cep){
        return this.http.get<any>('https://viacep.com.br/ws/' + cep + '/json/');
    }

    geolocation(address) {
        return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURI(address) + '&key=' + environment.GOOGLE_KEY);
    }

}
